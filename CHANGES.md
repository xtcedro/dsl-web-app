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
- `docs/reverse-engineering-prefab-kits.md`: internal ops guide for tearing down competitor prefab
  carport kits into a reusable in-house spec (framing, hardware, roofing, footings) with Oklahoma
  code reference numbers and a reusable spec-sheet template.
- `docs/finding-cheapest-kits-simplest-jobs.md`: sourcing guide for the lowest-cost kits and lowest-
  complexity job type (single-slope attached lean-to), with supplier categories, price benchmarks,
  and a red-flags list for underspecced "cheap" kits.
- `docs/okc-metro-permit-guide.md`: city-by-city permit/registration rules across OKC, Norman,
  Moore, and Edmond, plus the state-level 811/frost-line/wind-speed baseline.
- `docs/pricing-and-quoting.md`: market price benchmarks, a materials+labor+permit quote formula,
  size/style pricing tiers, and a reusable quick-quote worksheet.
- `docs/marketing-and-lead-gen-playbook.md`: Google Business Profile setup, local SEO basics,
  Nextdoor/Facebook community channels, portfolio strategy, and a review-generation flow, all
  funneling back to the site's quote-request form.
- `docs/jobsite-safety-checklist.md`: 811-before-digging protocol, OSHA excavation/ladder/fall-
  protection basics, power tool safety, and a PPE baseline for a small crew.
- `docs/quote-contract-template.md`: reusable construction agreement template covering scope,
  deposit terms, permits, change orders, warranty, insurance disclosure, and the FTC 3-day
  cancellation right.
- `docs/first-90-days-roadmap.md`: week-by-week launch sequence tying the legal, sourcing, pricing,
  and marketing docs together, ordered cheapest/most-reversible-first.
- `docs/in-person-marketing-guide.md`: identifying strong in-person prospects (property signals, HOA
  screening, referral partners, home shows) and presenting/closing in person, plus per-city peddler/
  solicitor license requirements and the FTC 3-day cancellation right.
