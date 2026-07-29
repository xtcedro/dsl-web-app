import { html, raw, SafeHtml } from "../lib/html.ts";
import { BUSINESS } from "../lib/business.ts";

const BRAND_MARK = raw(`<svg viewBox="0 0 32 32" aria-hidden="true" class="brand__mark">
  <line x1="4" y1="28" x2="28" y2="28" />
  <line x1="9" y1="28" x2="9" y2="14" />
  <line x1="23" y1="28" x2="23" y2="14" />
  <polyline points="4,16 16,6 28,16" />
</svg>`);

export function siteHeader(): SafeHtml {
  return html`
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="wrap site-header__inner">
        <a class="brand" href="/">
          ${BRAND_MARK}
          <span class="brand__text">Definitive<span class="brand__llc">Structures LLC</span></span>
        </a>
        <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false"
          aria-controls="siteNav">
          <span class="sr-only">Menu</span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
        <nav class="site-nav" id="siteNav">
          <a href="#why">Why us</a>
          <a href="#styles">Styles &amp; pricing</a>
          <a href="#process">How it works</a>
          <a href="#area">Service area</a>
          <a class="site-nav__phone" href="${BUSINESS.phoneHref}">${BUSINESS.phoneDisplay}</a>
          <a class="btn btn--cta site-nav__cta" href="#contact">Get my free quote</a>
        </nav>
      </div>
    </header>
  `;
}

export function siteFooter(): SafeHtml {
  const year = new Date().getFullYear();
  return html`
    <footer class="site-footer">
      <div class="wrap site-footer__grid">
        <div class="site-footer__brand">
          <p class="site-footer__name">${BUSINESS.name}</p>
          <p class="site-footer__tagline">Custom wood carports, built on ${BUSINESS
            .city} driveways.</p>
          <p
            class="site-footer__privacy">We only use what you send us to contact you about your quote — nothing sold, nothing shared.</p>
        </div>
        <div class="site-footer__col">
          <p class="site-footer__heading">Contact</p>
          <p><a href="${BUSINESS.phoneHref}">${BUSINESS.phoneDisplay}</a></p>
          <p><a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a></p>
          <p>${BUSINESS.hours}</p>
        </div>
        <div class="site-footer__col">
          <p class="site-footer__heading">Service area</p>
          <p>${BUSINESS.city}, ${BUSINESS.state} metro</p>
          <p><a href="#area">See all cities we build in</a></p>
        </div>
      </div>
      <div class="title-block wrap">
        <span>PROJECT: DEFINITIVESTRUCTURESLLC.COM</span>
        <span>SHEET 1 OF 1</span>
        <span>REV A</span>
        <span>&copy; ${year} ${BUSINESS.name} &middot; ${BUSINESS.city}, ${BUSINESS.state}</span>
      </div>
    </footer>
  `;
}
