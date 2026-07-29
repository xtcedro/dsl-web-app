import { html, SafeHtml } from "../lib/html.ts";
import { BUSINESS } from "../lib/business.ts";
import { CARPORT_STYLES, SERVICE_AREAS } from "../schemas/contact.ts";
import { siteFooter, siteHeader } from "./chrome.ts";
import { heroDiagram } from "./hero_diagram.ts";

export interface HomePageProps {
  csrfToken: string;
  showErrorBanner: boolean;
}

export function homePage(props: HomePageProps): SafeHtml {
  return html`${siteHeader()}
<main id="main">
${heroSection()}
${whySection()}
${stylesSection()}
${processSection()}
${structureSection()}
${serviceAreaSection()}
${trustSection()}
${contactSection(props)}
</main>
${siteFooter()}`;
}

function heroSection(): SafeHtml {
  return html`<section class="hero">
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">${BUSINESS.city}, ${BUSINESS.state} &middot; Custom wood carports</p>
      <h1 class="hero__headline">Built for your driveway.<br />Built for Oklahoma weather.</h1>
      <p class="hero__sub">
        ${BUSINESS.shortName} frames and raises custom wood carports across the OKC metro —
        real dimensional lumber, set in concrete, priced for a family budget. Free on-site
        quote, drawn up in days.
      </p>
      <div class="hero__actions">
        <a class="btn btn--cta btn--lg" href="#contact">Get my free quote</a>
        <a class="btn btn--ghost btn--lg" href="#structure">See how we build</a>
      </div>
      <ul class="trust-strip">
        <li>Locally owned in OKC</li>
        <li>Free on-site estimates</li>
        <li>Built to local code</li>
        <li>Real wood, not a metal kit</li>
      </ul>
    </div>
    <div class="hero__art">${heroDiagram()}</div>
  </div>
</section>`;
}

function whySection(): SafeHtml {
  return html`<section class="section" id="why">
  <div class="wrap">
    <p class="eyebrow">Why OKC homeowners call us</p>
    <h2 class="section__heading">Hail dents metal. Wind rips up flimsy kits. We build heavier.</h2>
    <div class="spec-grid reveal">
      <article class="spec-card">
        <p class="spec-card__tag">Set, not staked</p>
        <p>Every post goes into a concrete footing below the frost line — not a bag of gravel and a prayer.</p>
      </article>
      <article class="spec-card">
        <p class="spec-card__tag">Real dimensional lumber</p>
        <p>6x6 posts, doubled 2x8 rafters. No aluminum tubing, no pre-fab kit shipped in a box.</p>
      </article>
      <article class="spec-card">
        <p class="spec-card__tag">Built to your code</p>
        <p>We pull the permit and frame to Oklahoma City's requirements — not a generic spec sheet from out of state.</p>
      </article>
    </div>
  </div>
</section>`;
}

interface StyleCard {
  name: string;
  blurb: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
}

const STYLE_CARDS: StyleCard[] = [
  {
    name: "Attached lean-to",
    blurb: "Ties into your existing roofline. The most affordable way to cover one car.",
    price: "From $2,900*",
    imageSrc: "/static/img/carport-lean-to.jpg",
    imageAlt: "Attached lean-to wood carport tied into a house wall",
  },
  {
    name: "Detached gable",
    blurb: "A freestanding two-car structure with a peaked roof that sheds water fast.",
    price: "From $6,400*",
    imageSrc: "/static/img/carport-detached-gable.jpg",
    imageAlt: "Detached gable wood carport with a peaked roof",
  },
  {
    name: "A-frame",
    blurb: "A steeper pitch built for heavy runoff and taller vehicle clearance.",
    price: "From $6,900*",
    imageSrc: "/static/img/carport-a-frame.jpg",
    imageAlt: "Steep A-frame wood carport with tall vehicle clearance",
  },
  {
    name: "Carport + storage combo",
    blurb: "Covered parking on one side, a locked storage bay on the other.",
    price: "From $8,200*",
    imageSrc: "/static/img/carport-storage-combo.jpg",
    imageAlt: "Wood carport with an enclosed storage bay",
  },
];

function stylesSection(): SafeHtml {
  return html`<section class="section section--alt" id="styles">
  <div class="wrap">
    <p class="eyebrow">Pick your shape</p>
    <h2 class="section__heading">Four ways to cover a driveway.</h2>
    <div class="style-grid reveal">
      ${
    STYLE_CARDS.map(
      (card) =>
        html`
          <article class="style-card">
            <div class="style-card__image">
              <img
                src="${card.imageSrc}"
                alt="${card.imageAlt}"
                width="900"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3>${card.name}</h3>
            <p>${card.blurb}</p>
            <p class="style-card__price">${card.price}</p>
          </article>
        `,
    )
  }
    </div>
    <p class="fine-print">
      *Ballpark pricing for a standard install. Your exact quote depends on size, roof pitch,
      and site access — free on-site estimate, no obligation.
    </p>
  </div>
</section>`;
}

interface ProcessStep {
  title: string;
  blurb: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Free measure & quote",
    blurb: "We walk your driveway, take real measurements, and price it on the spot.",
  },
  {
    title: "Custom drawing",
    blurb:
      "You get a simple spec sheet — post spacing, roof pitch, height — before you sign anything.",
  },
  {
    title: "Permit & materials",
    blurb: "We pull the city permit and order lumber cut to your exact spec.",
  },
  {
    title: "Build day(s)",
    blurb:
      "Most single-car carports go up in 1–2 days. Two-car and combo builds take a bit longer.",
  },
  {
    title: "Walkthrough & sign-off",
    blurb: "We walk it with you, answer every question, and leave you with care instructions.",
  },
];

function processSection(): SafeHtml {
  return html`<section class="section" id="process">
  <div class="wrap">
    <p class="eyebrow">How a project goes</p>
    <h2 class="section__heading">Five steps from driveway to done.</h2>
    <ol class="process-list reveal">
      ${
    PROCESS_STEPS.map(
      (step, i) =>
        html`
          <li class="process-step">
            <span class="process-step__num">${String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>${step.title}</h3>
              <p>${step.blurb}</p>
            </div>
          </li>
        `,
    )
  }
    </ol>
  </div>
</section>`;
}

interface MaterialRow {
  part: string;
  spec: string;
}

const MATERIALS: MaterialRow[] = [
  { part: "Posts", spec: '6x6 pressure-treated pine, set 42" into a concrete footing' },
  { part: "Beams & headers", spec: "Doubled 2x8, through-bolted — not nailed" },
  { part: "Rafters", spec: '2x6, 24" on-center' },
  {
    part: "Roof deck",
    spec: '5/8" CDX plywood under shingles, or exposed steel panel — your call',
  },
  { part: "Fasteners", spec: "Structural screws and galvanized hardware, no framing staples" },
  { part: "Finish", spec: "Stained or primed and painted to match your house trim" },
];

function structureSection(): SafeHtml {
  return html`<section class="section section--alt" id="structure">
  <div class="wrap">
    <p class="eyebrow">What actually holds it up</p>
    <h2 class="section__heading">The bill of materials, not the sales pitch.</h2>
    <p class="section__lede">
      Ask any carport company what's actually in the structure. Here's ours, up front.
    </p>
    <div class="materials-table-wrap reveal">
      <table class="materials-table">
        <thead>
          <tr>
            <th scope="col">Part</th>
            <th scope="col">Spec</th>
          </tr>
        </thead>
        <tbody>
          ${
    MATERIALS.map(
      (row) =>
        html`
          <tr>
            <th scope="row">${row.part}</th>
            <td>${row.spec}</td>
          </tr>
        `,
    )
  }
        </tbody>
      </table>
    </div>
  </div>
</section>`;
}

function serviceAreaSection(): SafeHtml {
  const areas = SERVICE_AREAS.filter((area) => area !== "Other OKC metro");
  return html`<section class="section" id="area">
  <div class="wrap">
    <p class="eyebrow">Where we build</p>
    <h2 class="section__heading">Serving the OKC metro.</h2>
    <ul class="area-grid reveal">
      ${areas.map((area) => html`<li>${area}</li>`)}
    </ul>
    <p class="fine-print">
      Don't see your town? Call us — if you're within about 30 miles of downtown OKC, we
      probably build there.
    </p>
  </div>
</section>`;
}

function trustSection(): SafeHtml {
  return html`<section class="section section--alt" id="trust">
  <div class="wrap">
    <p class="eyebrow">The fine print, up front</p>
    <h2 class="section__heading">What you get, in writing.</h2>
    <ul class="trust-list reveal">
      <li>A written estimate before any work starts — no surprise charges.</li>
      <li>The permit pulled in our name, not yours.</li>
      <li>A workmanship warranty backed in writing — ask us for the terms up front.</li>
      <li>A free on-site estimate. No pressure, no obligation.</li>
    </ul>
  </div>
</section>`;
}

function contactSection(props: HomePageProps): SafeHtml {
  return html`<section class="section section--contact" id="contact">
  <div class="wrap contact__grid">
    <div class="contact__intro">
      <p class="eyebrow">Get started</p>
      <h2 class="section__heading">Get your free quote.</h2>
      <p>
        Tell us about your driveway. We'll call to confirm details and set up a time to
        measure — usually within one business day.
      </p>
      <p class="contact__phone">
        Prefer to talk? Call <a href="${BUSINESS.phoneHref}">${BUSINESS.phoneDisplay}</a>
      </p>
    </div>
    <form class="quote-form" id="quoteForm" method="post" action="/api/contact" novalidate>
      ${
    props.showErrorBanner
      ? html`<p class="form-banner form-banner--error" role="alert">Please check the form and try again.</p>`
      : ""
  }
      <p class="form-banner form-banner--success" role="status" aria-live="polite" hidden id="formSuccess">
        Thanks — we've got your request and will call you shortly.
      </p>
      <p class="form-banner form-banner--error" role="alert" aria-live="assertive" hidden id="formError"></p>

      <input type="hidden" name="csrf_token" value="${props.csrfToken}" />
      <div class="field field--hp" aria-hidden="true">
        <label for="website">Leave this field blank</label>
        <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
      </div>

      <div class="field">
        <label for="name">Full name</label>
        <input type="text" id="name" name="name" autocomplete="name" required maxlength="100" />
      </div>
      <div class="field-row">
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" autocomplete="email" required maxlength="200" />
        </div>
        <div class="field">
          <label for="phone">Phone</label>
          <input type="tel" id="phone" name="phone" autocomplete="tel" required maxlength="20" />
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="city">City</label>
          <select id="city" name="city" required>
            <option value="" disabled selected>Choose your city</option>
            ${SERVICE_AREAS.map((area) => html`<option value="${area}">${area}</option>`)}
          </select>
        </div>
        <div class="field">
          <label for="style">Carport style</label>
          <select id="style" name="style" required>
            <option value="" disabled selected>Choose a style</option>
            ${CARPORT_STYLES.map((style) => html`<option value="${style}">${style}</option>`)}
          </select>
        </div>
      </div>
      <div class="field">
        <label for="message">Anything else we should know? <span class="field__optional">(optional)</span></label>
        <textarea id="message" name="message" rows="3" maxlength="2000" placeholder="Dimensions, roof tie-in, gate access..."></textarea>
      </div>
      <button class="btn btn--cta btn--lg" type="submit">Send my free quote request</button>
    </form>
  </div>
</section>`;
}
