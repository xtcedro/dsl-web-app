# Definitive Structures LLC — web app

Marketing site and quote-request form for **Definitive Structures LLC**, a wood carport builder
serving the Oklahoma City metro. Built as a small Deno server — no frontend framework, no bundler,
no database.

## Stack

- **Runtime:** Deno (native `Deno.serve`, `URLPattern`, `crypto`, file APIs — no Express-alikes)
- **Routing/serving:** [`jsr:@std/http`](https://jsr.io/@std/http) (`cookie`, `file-server`)
- **Validation:** [`zod`](https://zod.dev)
- **Frontend:** hand-written HTML/CSS/JS — no build step, no client framework
- **Storage:** quote requests append to `data/leads.jsonl` (newline-delimited JSON). Swap
  `src/lib/storage.ts` for a real database when you outgrow that.

## Run it

```sh
deno task dev     # watch mode, http://localhost:8000
deno task start    # no watch
deno task test      # unit + integration tests
deno task check     # type-check
deno task lint       # lint
deno task fmt         # format
```

`PORT` and `DENO_ENV` are the only environment variables read (`src/lib/env.ts`). Set
`DENO_ENV=production` to mark the CSRF cookie `Secure` (requires HTTPS in front of the app).

## Architecture

Each file does one job and says so. There's no framework, no dependency injection container, no ORM
— just functions:

```
main.ts                    Deno.serve entry point
src/
  app.ts                   composes routing + security headers + logging
  router.ts                URLPattern-based route matching
  routes.ts                the route table
  types.ts                 Handler / Route / RouteContext shapes
  handlers/                one file per route, each a plain function
  middleware/               security headers, rate limiting, request logging
  schemas/                  zod schemas (contact form)
  lib/                       html escaping/templating, csrf, storage, env
  pages/                     page markup, built with the `html` tagged template
static/
  css/styles.css             the whole design system, one file
  js/main.js                  nav toggle, scroll reveal, fetch-enhanced form
  fonts/                       self-hosted webfonts (see below)
data/
  leads.jsonl                 quote requests land here (gitignored)
tests/                        Deno.test files, one concern per file
```

Nothing here reaches for a class or an abstraction it doesn't need yet. If a future feature needs a
real database, swap `saveLead()` in `src/lib/storage.ts` — nothing else has to change.

## Security notes (OWASP-informed)

- **Strict CSP, no inline script/style.** All JS/CSS is external and same-origin;
  `script-src 'self'` and `style-src 'self'` mean an injected `<script>` tag simply won't execute.
- **Every dynamic string is escaped by default.** `src/lib/html.ts`'s `html` tagged template escapes
  interpolated values unless explicitly wrapped in `raw()` (used only for markup we authored
  ourselves, never user input).
- **CSRF via double-submit cookie.** `GET /` sets an `HttpOnly`, `SameSite=Strict` cookie and embeds
  the same token in a hidden form field. `POST /api/contact` rejects the request unless both match,
  using a constant-time comparison (`src/lib/csrf.ts`) to avoid timing side-channels.
- **Rate limiting keyed off the TCP connection**, not a client-supplied header — `X-Forwarded-For`
  is never trusted for this because it's trivially spoofed by a direct client. Put a reverse proxy
  in front in production if you need per-real-IP limiting behind a CDN.
- **Honeypot field** (`website`) — invisible to sighted and keyboard users, silently
  accepted-and-dropped for bots so they don't learn to route around it.
- **Zod-validated, length-bounded input** on every field; nothing is echoed back into HTML
  unescaped.
- **Static files served via `@std/http/file-server`'s `serveDir`**, which handles path-traversal and
  dotfile protection — no hand-rolled file path logic.
- **Fixed, minimal security header set** on every response (`src/middleware/security_headers.ts`):
  CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
  `Permissions-Policy`, cross-origin isolation headers, HSTS.
- **No secrets, PII, or request bodies in logs** — `src/middleware/logger.ts` logs only method,
  path, status, timing, and the connection's IP.

## Design

The visual identity treats the site like a structural drawing set — warm paper background, oxide-red
drafting-ink accents, a hand-drafted SVG elevation of the carport itself as the hero image, and a
title-block footer. Type is self-hosted (no Google Fonts requests at runtime, so the CSP stays
`font-src 'self'` and no visitor data goes to a third-party font CDN): Big Shoulders Display for
headlines, IBM Plex Sans for body copy, IBM Plex Mono for every measurement-style label. See
`static/fonts/LICENSE.txt` for font licensing (SIL OFL).

## Before this goes live

The copy ships with realistic placeholder business details you should replace or verify in
`src/lib/business.ts` and `src/pages/home.ts`:

- [ ] Real phone number and email (`src/lib/business.ts` currently uses a reserved fictional number,
      `(405) 555-0142`)
- [ ] Confirm the "licensed & insured" / warranty / permit-pulled claims are actually true before
      publishing them
- [ ] Confirm or replace the starting-price figures in the styles section (`src/pages/home.ts`)
- [ ] Point `deno task start` at a real domain behind HTTPS, and set `DENO_ENV=production` so the
      CSRF cookie gets `Secure`
- [ ] Decide where `data/leads.jsonl` should actually live in production (a mounted volume, or swap
      `saveLead()` for a database)
