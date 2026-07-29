import { raw, SafeHtml } from "../lib/html.ts";

const VIEW_W = 960;
const VIEW_H = 460;
const GROUND_Y = 400;
const ROOF_START = { x: 200, y: 178 };
const ROOF_END = { x: 860, y: 258 };
const ROOF_THICKNESS = 14;

function roofY(x: number): number {
  const slope = (ROOF_END.y - ROOF_START.y) / (ROOF_END.x - ROOF_START.x);
  return ROOF_START.y + slope * (x - ROOF_START.x);
}

function gradeHatch(): string {
  const xs = Array.from({ length: 18 }, (_, i) => 56 + i * 48);
  return xs
    .map((x) =>
      `<line x1="${x}" y1="${GROUND_Y}" x2="${x - 14}" y2="${
        GROUND_Y + 14
      }" class="bp-hatch" pathLength="1" />`
    )
    .join("");
}

function rafterTicks(): string {
  const xs = [250, 360, 470, 580, 690, 800];
  return xs
    .map((x) => {
      const top = (roofY(x) - 4).toFixed(1);
      const bottom = (roofY(x) + ROOF_THICKNESS + 4).toFixed(1);
      return `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" class="bp-rafter" pathLength="1" />`;
    })
    .join("");
}

function postAt(x: number): string {
  const topY = (roofY(x) + ROOF_THICKNESS).toFixed(1);
  const footing = `<rect x="${x - 22}" y="${
    GROUND_Y - 6
  }" width="44" height="14" class="bp-footing" pathLength="1" />`;
  const post = [
    `<line x1="${x - 6}" y1="${topY}" x2="${
      x - 6
    }" y2="${GROUND_Y}" class="bp-post" pathLength="1" />`,
    `<line x1="${x + 6}" y1="${topY}" x2="${
      x + 6
    }" y2="${GROUND_Y}" class="bp-post" pathLength="1" />`,
    `<line x1="${x - 8}" y1="${topY}" x2="${x + 8}" y2="${topY}" class="bp-post" pathLength="1" />`,
  ].join("");
  return footing + post;
}

/** A hand-drafted, static line drawing of the carport we're selling — the page's signature visual. */
export function heroDiagram(): SafeHtml {
  const postXs = [430, 645, 860];
  const roofBottom = ROOF_END.y + ROOF_THICKNESS;

  const svg = `
<svg viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-labelledby="bpTitle bpDesc" class="hero-blueprint">
  <title id="bpTitle">Structural line drawing of an attached wood carport</title>
  <desc id="bpDesc">Side elevation showing the house ledger, sloped roof deck, three posts on concrete footings, and the driveway span dimension.</desc>

  <line x1="30" y1="${GROUND_Y}" x2="930" y2="${GROUND_Y}" class="bp-ground" pathLength="1" />
  ${gradeHatch()}

  <rect x="60" y="150" width="100" height="250" class="bp-line" pathLength="1" />
  <polygon points="60,150 160,150 110,120" class="bp-line" pathLength="1" />
  <rect x="92" y="215" width="34" height="40" class="bp-line" pathLength="1" />
  <line x1="109" y1="215" x2="109" y2="255" class="bp-hatch" pathLength="1" />
  <line x1="92" y1="235" x2="126" y2="235" class="bp-hatch" pathLength="1" />

  <rect x="155" y="184" width="50" height="12" class="bp-beam" pathLength="1" />
  <circle cx="165" cy="190" r="2" class="bp-line" pathLength="1" />
  <circle cx="190" cy="190" r="2" class="bp-line" pathLength="1" />

  <polygon points="${ROOF_START.x},${ROOF_START.y} ${ROOF_END.x},${ROOF_END.y} ${ROOF_END.x},${roofBottom} ${ROOF_START.x},${
    ROOF_START.y + ROOF_THICKNESS
  }" class="bp-roof" pathLength="1" />
  ${rafterTicks()}

  ${postXs.map((x) => postAt(x)).join("")}

  <line x1="200" y1="428" x2="860" y2="428" class="bp-dim" pathLength="1" />
  <line x1="200" y1="420" x2="200" y2="436" class="bp-dim" pathLength="1" />
  <line x1="860" y1="420" x2="860" y2="436" class="bp-dim" pathLength="1" />
  <text x="530" y="452" text-anchor="middle" class="bp-label">22'-0&quot; SPAN</text>

  <line x1="205" y1="176" x2="150" y2="98" class="bp-lead" pathLength="1" />
  <text x="148" y="90" text-anchor="end" class="bp-label">LEDGER, LAG-BOLTED TO HOUSE</text>

  <line x1="430" y1="330" x2="330" y2="330" class="bp-lead" pathLength="1" />
  <text x="322" y="334" text-anchor="end" class="bp-label">6x6 POST</text>

  <line x1="645" y1="236" x2="645" y2="178" class="bp-lead" pathLength="1" />
  <text x="645" y="168" text-anchor="middle" class="bp-label">RAFTERS 24&quot; O.C.</text>

  <line x1="860" y1="394" x2="905" y2="360" class="bp-lead" pathLength="1" />
  <text x="910" y="356" text-anchor="start" class="bp-label">CONCRETE FOOTING</text>

  <text x="255" y="148" text-anchor="middle" class="bp-label bp-pitch">1.5:12 PITCH</text>
</svg>`.trim();

  return raw(svg);
}
