# Changelog

All notable changes to this project are documented here.

## Unreleased

### Added

- Initial build of the Definitive Structures LLC marketing site and quote request form on Deno,
  using `jsr:@std/http`, native Deno APIs, and zod.
- Landing page: hero with a hand-drafted, self-drawing SVG carport elevation; why-us, carport styles
  & pricing, five-step process, bill-of-materials, service-area, and guarantees sections; a
  quote-request form.
- CSRF protection (double-submit cookie, constant-time comparison), per-connection rate limiting,
  honeypot spam field, and a fixed OWASP-aligned security header set (CSP, HSTS, X-Frame-Options,
  etc.) applied to every response.
- Zod-validated contact form, stored as newline-delimited JSON in `data/leads.jsonl`.
- Self-hosted webfonts (Big Shoulders Display, IBM Plex Sans, IBM Plex Mono) so the CSP can stay
  `font-src 'self'` with no third-party font requests.
- Progressive-enhancement client JS: fetch-based form submission with inline feedback, mobile nav
  toggle, and scroll-reveal — all functional with JavaScript disabled via the form's native
  `method`/`action`.
- Test suite (`deno task test`) covering the contact schema, CSRF comparison, router, rate limiter,
  HTML escaping, and full request/response integration.
- `README.md` with architecture, security notes, and a pre-launch checklist.
