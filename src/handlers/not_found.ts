import type { Handler } from "../types.ts";
import { renderPage } from "../lib/render.ts";
import { notFoundPage } from "../pages/not_found.ts";

export const handleNotFound: Handler = () => {
  const body = renderPage(
    {
      title: "Page not found | Definitive Structures LLC",
      description: "This page doesn't exist.",
    },
    notFoundPage(),
  );
  return new Response(body, {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
