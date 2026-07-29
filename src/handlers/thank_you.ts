import type { Handler } from "../types.ts";
import { renderPage } from "../lib/render.ts";
import { thankYouPage } from "../pages/thank_you.ts";

export const handleThankYou: Handler = () => {
  const body = renderPage(
    {
      title: "Thanks for your request | Definitive Structures LLC",
      description: "We received your carport quote request and will be in touch shortly.",
    },
    thankYouPage(),
  );
  return new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
};
