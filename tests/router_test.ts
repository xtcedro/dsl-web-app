import { assertEquals } from "@std/assert";
import { matchRoute, route } from "../src/router.ts";
import type { RouteContext } from "../src/types.ts";

const okHandler = () => new Response("ok");
const paramHandler = (_req: Request, ctx: RouteContext) => new Response(ctx.params.id ?? "missing");

const routes = [
  route("GET", "/", okHandler),
  route("GET", "/items/:id", paramHandler),
  route("POST", "/items/:id", paramHandler),
];

Deno.test("matchRoute finds an exact path match", () => {
  const match = matchRoute(routes, new Request("http://localhost/"));
  assertEquals(match?.params, {});
});

Deno.test("matchRoute extracts path parameters", () => {
  const match = matchRoute(routes, new Request("http://localhost/items/42"));
  assertEquals(match?.params, { id: "42" });
});

Deno.test("matchRoute respects the HTTP method", () => {
  const match = matchRoute(routes, new Request("http://localhost/items/42", { method: "POST" }));
  assertEquals(match?.params, { id: "42" });

  const noMatch = matchRoute(
    routes,
    new Request("http://localhost/items/42", { method: "DELETE" }),
  );
  assertEquals(noMatch, undefined);
});

Deno.test("matchRoute returns undefined for an unknown path", () => {
  const match = matchRoute(routes, new Request("http://localhost/nope"));
  assertEquals(match, undefined);
});
