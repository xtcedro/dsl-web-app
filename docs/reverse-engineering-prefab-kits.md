# Reverse-Engineering Prefab Carport Kits

*A field guide for turning a store-bought kit into our own repeatable, cheaper-to-build design.*

Prefab carport kits sell for **$2,500–$7,000** (roughly **$8–$25/sq ft**) and arrive pre-cut,
pre-drilled, and fully specced. That's exactly why they're worth studying: someone already paid an
engineer to solve the post spacing, beam sizing, and hardware layout. Our job isn't to copy their
brand — it's to extract the *engineering decisions* baked into the product, verify them against
code, and rebuild the same performance with our own labor and materials at a lower cost.

---

## Table of contents

1. [Ground rules](#1-ground-rules)
2. [The 6-step teardown process](#2-the-6-step-teardown-process)
3. [Tools you'll need](#3-tools-youll-need)
4. [Reference numbers (start here, verify locally)](#4-reference-numbers-start-here-verify-locally)
5. [Spec sheet template](#5-spec-sheet-template)
6. [Turning one teardown into a product line](#6-turning-one-teardown-into-a-product-line)
7. [Checklist](#7-checklist)

---

## 1. Ground rules

**What's fair game:**
- Structural methods — post spacing, footing depth, beam sizing, roof pitch, bracing patterns.
  These are general engineering practice, not proprietary IP.
- Hardware selection — if a kit uses a Simpson Strong-Tie post base, that's a catalog part anyone
  can buy. Look up its published load rating instead of guessing.
- Panel type/gauge/finish for roofing — these are industry-standard categories (R-panel, 5V-crimp,
  26 ga, Galvalume), not brand secrets.

**What's not fair game:**
- Copying a competitor's branding, marketing copy, model names, or exact packaging/marketing photos.
- Presenting *their* engineering stamp or code-compliance claim as our own. If a jurisdiction
  requires an engineer-stamped drawing for a given size/wind zone, we get our own stamp — we don't
  reuse theirs.

**The one rule that overrides everything else:** a teardown gives us a *starting point*, not a final
answer. Every dimension gets checked against current Oklahoma code and, for anything load-bearing
past a basic single-car carport, a local engineer's sign-off before it goes in the ground.

---

## 2. The 6-step teardown process

### Step 1 — Pick targets worth studying
Study 2–3 kits, not one. Prioritize kits that are:
- Sold in our size range (single-car, double-car, RV-length)
- From manufacturers who publish spec sheets or installation manuals online (free reverse-engineering
  data — read these before measuring anything in person)
- Physically visible somewhere nearby (a showroom, a completed install, a neighbor's yard) so we can
  measure the real thing, not just marketing photos

### Step 2 — Document the frame system
For each target, record:
- Post size and spacing (is it 8', 10', 12' on-center?)
- Beam/header size and species (doubled 2x12? LVL? 6x6?)
- Roof pitch and truss/rafter spacing
- Bracing style (knee braces, diagonal, none)

### Step 3 — Catalog the hardware
Photograph every connector. Identify the part number if it's stamped on the metal (Simpson Strong-Tie
stamps most of theirs). Look up:
- The published load rating (uplift, lateral) for that part
- Whether it's rated for ground contact / pressure-treated lumber (matters — some fasteners corrode
  against PT chemicals unless coated for it)

### Step 4 — Identify the roofing spec
- Panel profile (R-panel, 5V-crimp, corrugated, standing seam)
- Gauge (26 ga is the residential-carport standard; 29 ga is the cut-rate option)
- Finish (bare Galvalume vs. SMP-painted vs. Kynar/PVDF-painted — this is often the single biggest
  cost lever in the whole structure)
- Fastener spacing and type (exposed-fastener panels need neoprene-washered screws at every rib or
  every other rib — check which)

### Step 5 — Reverse the footing/anchor system
- Footing diameter/depth (bell footing? straight bore?)
- Anchor hardware (J-bolts embedded wet, or post-installed wedge anchors after cure?)
- How the post base sits — direct wood-to-concrete embedment (cheaper, but shortens post life) vs.
  a standoff post base bracket (costs more upfront, prevents rot, is what most codes now expect)

### Step 6 — Build the cost teardown
This is the payoff step. Build a bill of materials with **our** local supplier pricing for every
item identified in Steps 2–5, then compare the total to the kit's retail price. The delta is either:
- Our labor margin (if we're cutting and assembling ourselves), or
- A signal the kit's price already reflects thin margins and isn't worth undercutting on price alone

---

## 3. Tools you'll need

| Tool | Use |
|---|---|
| Tape measure + laser measure | Post spacing, spans, footing depth on visible installs |
| Digital calipers | Panel gauge/thickness, bolt diameter |
| Angle finder / protractor | Roof pitch, brace angles |
| Camera / phone | Hardware part numbers, connector orientation, panel profile |
| Magnet or metal-ID app | Confirm steel vs. aluminum hardware at a glance |
| Notebook or spreadsheet | Structured capture — use the template in §5 so every teardown is comparable |

---

## 4. Reference numbers (start here, verify locally)

These are industry-typical figures to sanity-check what we measure — **not** a substitute for
Oklahoma code lookup or an engineer's stamp on anything past a basic single-bay structure.

**Framing**
- Post spacing: 8' typical, up to 10'–12' with a beefier beam or doubled trusses
- 6x6 posts: don't push spans much past 7'–8' without stepping up beam size
- 20'+ spans: expect LVL or doubled/tripled 2x12 beams, not solid-sawn 6x6

**Footings**
- Minimum footing depth per code: 12" below undisturbed grade, extended below the local frost line
- Oklahoma frost line: roughly 12" (south) to 18"–24" (north) depending on county — check the county
  before quoting a depth
- A common pier spec seen in the wild: 24"x24"x6" pad, 12" column, minimum 48" total depth — treat
  this as a starting benchmark, not a universal number

**Wind**
- Oklahoma design wind speeds run 105–135 mph depending on location — this drives anchor hardware
  and hold-down requirements, especially for open-sided structures like carports where wind gets
  under the roof

**Roofing**
- 26-gauge R-panel or 5V-crimp, bare Galvalume: cheapest solid option, ~$0.70–$2.50/sq ft material
- Same panel, SMP paint: ~$1.50–$2.00/sq ft
- Same panel, Kynar/PVDF paint: ~$2.30–$2.65/sq ft (best fade resistance, priciest)
- 29-gauge: acceptable for low-stakes storage structures, not the residential-grade default

---

## 5. Spec sheet template

Copy this block per kit studied — keeping every teardown in the same shape is what makes them
comparable later.

```
KIT: [manufacturer / model / size]
SOURCE: [spec sheet URL / showroom visit / customer site]
DATE STUDIED:

FRAME
  Post size:            Post spacing:
  Beam size/species:     Roof pitch:
  Bracing style:

HARDWARE
  Post base part #:      Rated load:
  Other connectors:

ROOFING
  Panel profile:         Gauge:
  Finish:                 Fastener type/spacing:

FOOTING
  Depth:                  Diameter:
  Anchor method:          Post-to-footing detail:

COST TEARDOWN
  Kit retail price:       $
  Our material cost:      $
  Estimated labor hrs:
  Margin if self-built:   $
```

---

## 6. Turning one teardown into a product line

Once we've torn down 2–3 kits across different sizes, look for the patterns that repeat — that's
our own standard spec, not any one competitor's. In practice this becomes:

- **A standard post spacing** we default to (probably 8' or 10')
- **A standard footing spec** per soil condition we commonly hit
- **A default roofing package** (e.g., 26-ga R-panel, Galvalume standard / SMP-painted upgrade) so
  quoting is fast instead of custom-engineered every time
- **A small set of size templates** (single-car, double-car, RV) with pre-built cut lists, so a job
  becomes "pick a template, adjust for the site" instead of designing from zero each time

This is what eventually lets us quote fast and build consistently — which is the actual advantage a
small shop has over a big-box kit seller: we can hit the same spec at a lower price *and* customize
when a customer wants something the catalog doesn't offer.

---

## 7. Checklist

- [ ] Pulled spec sheets/manuals for 2–3 target kits before measuring anything in person
- [ ] Measured or confirmed post spacing, beam size, and roof pitch for each
- [ ] Photographed and identified every hardware connector + its rated load
- [ ] Identified roofing panel profile, gauge, and finish
- [ ] Documented footing depth, diameter, and anchor method
- [ ] Built a full cost teardown comparing our materials to kit retail price
- [ ] Cross-checked footing depth against local frost line and county code
- [ ] Cross-checked wind/anchor hardware against Oklahoma design wind speed for the job site
- [ ] Confirmed nothing borrowed is branded/trademarked — specs and methods only
- [ ] Flagged anything past basic single-bay size for a local engineer's stamp before building
