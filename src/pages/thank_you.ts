import { html, SafeHtml } from "../lib/html.ts";
import { BUSINESS } from "../lib/business.ts";
import { siteFooter, siteHeader } from "./chrome.ts";

export function thankYouPage(): SafeHtml {
  return html`${siteHeader()}
<main id="main">
  <section class="section confirm">
    <div class="wrap confirm__inner">
      <p class="eyebrow">Request received</p>
      <h1 class="section__heading">Thanks — we've got it.</h1>
      <p>
        A real person will call you at the number you gave us, usually within one business
        day, to confirm details and set up a time to measure your driveway.
      </p>
      <p>Need us sooner? Call <a href="${BUSINESS.phoneHref}">${BUSINESS.phoneDisplay}</a>.</p>
      <a class="btn btn--ghost btn--lg" href="/">Back to the homepage</a>
    </div>
  </section>
</main>
${siteFooter()}`;
}
