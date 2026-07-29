import { getCookies } from "@std/http/cookie";
import type { Handler } from "../types.ts";
import { contactSchema, flattenContactErrors } from "../schemas/contact.ts";
import { CSRF_COOKIE_NAME, CSRF_FIELD_NAME, csrfTokensMatch } from "../lib/csrf.ts";
import { isRateLimited } from "../middleware/rate_limit.ts";
import { saveLead } from "../lib/storage.ts";

interface ApiResult {
  ok: boolean;
  errors?: Record<string, string>;
}

function wantsJson(req: Request): boolean {
  return req.headers.get("accept")?.includes("application/json") ?? false;
}

/** Replies as JSON for the fetch-enhanced form, or a redirect for the no-JS fallback. */
function respond(req: Request, status: number, payload: ApiResult): Response {
  if (wantsJson(req)) {
    return Response.json(payload, { status });
  }
  if (payload.ok) {
    return Response.redirect(new URL("/thank-you", req.url), 303);
  }
  const url = new URL("/", req.url);
  url.searchParams.set("error", "1");
  url.hash = "contact";
  return Response.redirect(url, 303);
}

const FORM_FIELDS = ["name", "email", "phone", "city", "style", "message"] as const;

export const handleContact: Handler = async (req, ctx) => {
  if (isRateLimited(ctx.ip)) {
    return respond(req, 429, {
      ok: false,
      errors: { form: "Too many requests from this connection. Try again in a minute." },
    });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return respond(req, 400, { ok: false, errors: { form: "Invalid form submission." } });
  }

  const cookies = getCookies(req.headers);
  const submittedToken = form.get(CSRF_FIELD_NAME);
  if (
    typeof submittedToken !== "string" ||
    !csrfTokensMatch(cookies[CSRF_COOKIE_NAME], submittedToken)
  ) {
    return respond(req, 403, {
      ok: false,
      errors: { form: "Your session expired. Refresh the page and try again." },
    });
  }

  const honeypot = form.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    // Silently succeed for bots so they don't learn to adapt.
    return respond(req, 200, { ok: true });
  }

  const rawInput = Object.fromEntries(FORM_FIELDS.map((key) => [key, form.get(key) ?? ""]));

  const parsed = contactSchema.safeParse(rawInput);
  if (!parsed.success) {
    return respond(req, 400, { ok: false, errors: flattenContactErrors(parsed.error) });
  }

  await saveLead({
    ...parsed.data,
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ip: ctx.ip,
  });

  return respond(req, 200, { ok: true });
};
