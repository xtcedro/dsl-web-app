import { assertEquals } from "@std/assert";
import { escapeHtml, html, raw } from "../src/lib/html.ts";

Deno.test("escapeHtml escapes the five reserved characters", () => {
  assertEquals(escapeHtml(`<script>&"'`), "&lt;script&gt;&amp;&quot;&#39;");
});

Deno.test("html escapes interpolated user input", () => {
  const name = "<img src=x onerror=alert(1)>";
  const out = html`<p>${name}</p>`.toString();
  assertEquals(out, "<p>&lt;img src=x onerror=alert(1)&gt;</p>");
});

Deno.test("html leaves raw() content unescaped", () => {
  const out = html`<div>${raw("<b>bold</b>")}</div>`.toString();
  assertEquals(out, "<div><b>bold</b></div>");
});

Deno.test("html flattens arrays of values", () => {
  const items = ["a", "b", "c"];
  const out = html`<ul>${items.map((item) => html`<li>${item}</li>`)}</ul>`.toString();
  assertEquals(out, "<ul><li>a</li><li>b</li><li>c</li></ul>");
});

Deno.test("html drops null, undefined, and false", () => {
  const out = html`<p>${null}${undefined}${false}ok</p>`.toString();
  assertEquals(out, "<p>ok</p>");
});
