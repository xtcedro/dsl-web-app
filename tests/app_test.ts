import { assert, assertEquals, assertExists } from "@std/assert";
import { createApp } from "../src/app.ts";

const FAKE_INFO: Deno.ServeHandlerInfo = {
  remoteAddr: { transport: "tcp", hostname: "127.0.0.1", port: 54321 },
  completed: Promise.resolve(),
};

const app = createApp();

Deno.test("GET / returns the landing page with security headers and a CSRF cookie", async () => {
  const res = await app(new Request("http://localhost/"), FAKE_INFO);
  assertEquals(res.status, 200);
  assert(res.headers.get("content-type")?.includes("text/html"));
  assertExists(res.headers.get("content-security-policy"));
  assertEquals(res.headers.get("x-frame-options"), "DENY");
  assert(res.headers.get("set-cookie")?.includes("csrf_token="));
  const body = await res.text();
  assert(body.includes("Definitive Structures"));
});

Deno.test("GET / includes a design drawing for each public carport shape", async () => {
  const res = await app(new Request("http://localhost/"), FAKE_INFO);
  const body = await res.text();

  assert(body.includes('aria-label="Attached lean-to carport design"'));
  assert(body.includes('aria-label="Detached gable carport design"'));
  assert(body.includes('aria-label="A-frame carport design"'));
  assert(body.includes('aria-label="Carport plus storage combo design"'));
  assertEquals(body.match(/class="style-card__design"/g)?.length, 4);
});

Deno.test("GET /healthz reports ok", async () => {
  const res = await app(new Request("http://localhost/healthz"), FAKE_INFO);
  assertEquals(res.status, 200);
  const json = await res.json();
  assertEquals(json.status, "ok");
});

Deno.test("unknown routes return a styled 404", async () => {
  const res = await app(new Request("http://localhost/does-not-exist"), FAKE_INFO);
  assertEquals(res.status, 404);
  const body = await res.text();
  assert(body.includes("isn't on the drawing"));
});

Deno.test("POST /api/contact without a CSRF token is rejected", async () => {
  const form = new FormData();
  form.set("name", "Pat Homeowner");
  form.set("email", "pat@example.com");
  form.set("phone", "405-555-0100");
  form.set("city", "Norman");
  form.set("style", "Attached lean-to");

  const res = await app(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
    }),
    FAKE_INFO,
  );
  assertEquals(res.status, 403);
  const json = await res.json();
  assertEquals(json.ok, false);
});

Deno.test("POST /api/contact with a matching CSRF cookie and field succeeds", async () => {
  const homeRes = await app(new Request("http://localhost/"), FAKE_INFO);
  const setCookie = homeRes.headers.get("set-cookie") ?? "";
  const token = /csrf_token=([^;]+)/.exec(setCookie)?.[1];
  assertExists(token);
  await homeRes.body?.cancel();

  const form = new FormData();
  form.set("csrf_token", token!);
  form.set("name", "Pat Homeowner");
  form.set("email", "pat@example.com");
  form.set("phone", "405-555-0100");
  form.set("city", "Norman");
  form.set("style", "Attached lean-to");

  const res = await app(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Cookie: `csrf_token=${token}`,
      },
      body: form,
    }),
    FAKE_INFO,
  );
  assertEquals(res.status, 200);
  const json = await res.json();
  assertEquals(json.ok, true);
});

Deno.test("POST /api/contact silently accepts honeypot-filled bot submissions without storing them", async () => {
  const homeRes = await app(new Request("http://localhost/"), FAKE_INFO);
  const setCookie = homeRes.headers.get("set-cookie") ?? "";
  const token = /csrf_token=([^;]+)/.exec(setCookie)?.[1];
  assertExists(token);
  await homeRes.body?.cancel();

  const form = new FormData();
  form.set("csrf_token", token!);
  form.set("website", "http://spam.example");
  form.set("name", "Bot");
  form.set("email", "bot@example.com");
  form.set("phone", "405-555-0100");
  form.set("city", "Norman");
  form.set("style", "Attached lean-to");

  const res = await app(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { Accept: "application/json", Cookie: `csrf_token=${token}` },
      body: form,
    }),
    FAKE_INFO,
  );
  assertEquals(res.status, 200);
  const json = await res.json();
  assertEquals(json.ok, true);
});

Deno.test("GET /static/css/styles.css is served with a CSS content type", async () => {
  const res = await app(new Request("http://localhost/static/css/styles.css"), FAKE_INFO);
  assertEquals(res.status, 200);
  assert(res.headers.get("content-type")?.includes("text/css"));
  await res.body?.cancel();
});
