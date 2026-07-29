import { setCookie } from "@std/http/cookie";
import type { Handler } from "../types.ts";
import { renderPage } from "../lib/render.ts";
import { homePage } from "../pages/home.ts";
import { CSRF_COOKIE_NAME, generateCsrfToken } from "../lib/csrf.ts";
import { isProduction } from "../lib/env.ts";

export const handleHome: Handler = (req) => {
  const url = new URL(req.url);
  const csrfToken = generateCsrfToken();

  const body = renderPage(
    {
      title: "Definitive Structures LLC | Custom Wood Carports in Oklahoma City, OK",
      description:
        "Definitive Structures LLC builds custom wood carports on driveways across the " +
        "Oklahoma City metro. Free on-site estimates, real dimensional lumber, built to local code.",
    },
    homePage({ csrfToken, showErrorBanner: url.searchParams.get("error") === "1" }),
  );

  const headers = new Headers({ "Content-Type": "text/html; charset=utf-8" });
  setCookie(headers, {
    name: CSRF_COOKIE_NAME,
    value: csrfToken,
    httpOnly: true,
    secure: isProduction(),
    sameSite: "Strict",
    path: "/",
    maxAge: 3600,
  });

  return new Response(body, { headers });
};
