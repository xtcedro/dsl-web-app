import { html, SafeHtml } from "../lib/html.ts";
import { siteFooter, siteHeader } from "./chrome.ts";

export function notFoundPage(): SafeHtml {
  return html`${siteHeader()}
<main id="main">
  <section class="section confirm">
    <div class="wrap confirm__inner">
      <p class="eyebrow">404</p>
      <h1 class="section__heading">That page isn't on the drawing.</h1>
      <p>The page you're looking for doesn't exist. Head back and we'll get you where you're going.</p>
      <a class="btn btn--cta btn--lg" href="/">Back to the homepage</a>
    </div>
  </section>
</main>
${siteFooter()}`;
}
