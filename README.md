# Handoff: The Global Ledger — Newsletter Website

## Overview
**The Global Ledger** is a newsletter publication about accounting and taxation around the globe — plain-English deep dives on how the world taxes money, for founders, students, and curious professionals. The business model is **free + premium**: a free weekly issue funnels readers toward a paid "Ledger" membership.

This package contains a complete, navigable **static design prototype** of the marketing site and reading experience: homepage, issues archive, topic hub, article template, and premium/pricing page — all cross-linked.

---

## About the Design Files
The files in `designs/` are **design references created in HTML/CSS/vanilla-JS**. They are prototypes that show the intended **look, layout, copy, and interactive behavior** — they are **not** production code to ship as-is.

Your task is to **recreate these designs in a real, deployable stack** using that stack's established patterns. There is **no existing codebase yet**, so you should choose an appropriate framework. Recommended (but use your judgment):

- **Next.js (App Router) + TypeScript** — the site is content-heavy and SEO-critical (see SEO notes below), so server-rendered/static-generated pages matter. Next.js with MDX or a headless CMS for issues is a strong fit.
- **Tailwind CSS** for styling, with the design tokens below encoded as theme values.
- **Content layer**: issues should be data, not hand-written pages. Model them as MDX files or a CMS (Sanity/Contentful/Keystatic). Each "issue" and "topic hub" and "country playbook" is a content record. The HTML article (`04-article-estonia.html`) is the *template* every issue renders into.

Do **not** copy the inline `<style>` blocks verbatim into production — translate them into your styling system. The HTML is the source of truth for *visual intent*, not architecture.

---

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all specified and intentional. Recreate the UI pixel-faithfully using your framework's components. The two fonts, the forest-green/cream palette, the hairline rules, the "meridian" globe motif, and the mono-type labels are the core of the brand identity — preserve them precisely.

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#f3efe2` | Primary background ("cream paper") |
| `--paper-2` | `#ebe5d3` | Secondary surfaces, alternating bands, breadcrumb bar |
| `--paper-3` | `#e3dcc6` | Chart tracks, subtle fills |
| `--ink` | `#16201a` | Primary text (near-black green) |
| `--ink-soft` | `#4a544a` | Secondary text, captions |
| `--forest` | `#15402c` | Primary brand green — CTAs, headings accents, dark panels |
| `--forest-2` | `#1d5739` | Hover state for forest elements |
| `--money` | `#3a7d57` | Mid-green accent — tags, chart bars, links |
| `--money-l` | `#5fa37b` | Lighter green — muted/secondary bars |
| `--gold` | `#a9803a` | Premium accent — used ONLY for premium/paid signifiers |
| `--gold-l` | `#c79a52` | Gold hover |
| `--line` | `rgba(22,32,26,.18)` | Hairline rules / dividers |
| `--line-2` | `rgba(22,32,26,.4)` | Stronger borders |

**Semantic rule:** green = the publication & free tier; **gold = premium/paid** exclusively. Never use gold for non-premium UI.

### Typography
Two Google Fonts:
- **Spectral** (serif) — all headlines, body copy, big numbers. Weights used: 300, 400, 500, 600; italics at 400/500. This is the editorial voice.
- **IBM Plex Mono** (monospace) — all labels, eyebrows, nav links, tags, metadata, dates, kickers, button text. Weights: 400, 500, 600. Always `text-transform: uppercase` with `letter-spacing` between `.08em`–`.22em`.

Import:
```
https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap
```

Type scale (key sizes):
- Hero H1: `clamp(40px, 6.4vw, 86px)`, weight 300, `line-height: ~1.0`, `letter-spacing: -.022em`
- Section H2: 30–34px, weight 500
- Card/article H3–H4: 19–23px, weight 500
- Body: 18–19px (articles up to 19px), `line-height: 1.6–1.7`
- Standfirst/lede: 20–23px, often italic
- Mono labels: 9–11px, uppercase, wide tracking
- Big stat numbers: 38–62px, Spectral weight 300–400

Body base: `font-size: 18px; line-height: 1.6;` on `<body>`. Use `text-wrap: pretty` on headings where supported.

### Spacing & layout
- Content container: `max-width: 1180–1280px`, side padding `46px` (desktop) → `22px` (mobile)
- Reading column (article body): `max-width: 720px`, centered
- Section vertical padding: `56–88px`
- Card padding: `22–40px`
- Generous use of CSS Grid and Flexbox with `gap`. Hairline `1px` dividers everywhere — this is a "newsprint" aesthetic.

### Border radius
- Cards/panels: `5–10px`
- Pills/chips/badges: `30–40px` (fully rounded) for filter chips & badges; `2–3px` for square tags & buttons
- Buttons: `2–3px` (nearly square — intentional, editorial)

### Shadows
**Almost none.** This design relies on **borders and hairline rules, not shadows.** Depth comes from the forest-green filled panels against cream. Do not add drop shadows.

### Motifs
- **The "meridian" globe**: an inline SVG of concentric circles + ellipses + latitude curves (a stylized globe/grid), positioned absolutely in hero/CTA sections at `opacity: .08–.14`, color forest-green. Reused across pages as the signature brand graphic. (See any hero `.meridian svg` in the files.)
- **Coordinate labels**: mono text like `51.5°N London`, `59.4°N Tallinn` used as decorative datelines — reinforces the "global" angle.
- **Brand mark**: small inline SVG globe (circle + ellipse + two curved lines) next to the wordmark in every nav.

---

## Screens / Views

> File references are in `designs/`. The site uses relative-link navigation between pages; in production these become routes (suggested routes given per screen).

### 1. Homepage — `01-homepage.html` → route `/`
- **Purpose:** Convert first-time visitors into free email subscribers; preview the product.
- **Layout (top to bottom):**
  1. **Sticky nav** (height 64px): brand wordmark + globe mark (left); links `Issues · Topics · Regions · Pricing` + `Subscribe Free` CTA button (right). Mono uppercase links.
  2. **Hero** (full-bleed, meridian motif bg): coordinate datelines row; huge Spectral H1 "How the **world** taxes money, *decoded* every week." (`world` in forest-green bold, `decoded` italic). Two-column bottom: lede paragraph (left) + **inline email signup card** in forest-green (right, min-width 380px) with email input + "Subscribe — free →" button.
  3. **Stat bar** (4 cells, `paper-2` bg, hairline dividers, centered): `70 / Countries covered`, `14.2k / Weekly readers`, `1 / Deep dive per week`, `6 min / Average read`. *(These numbers are PLACEHOLDERS — see Content Notes.)*
  4. **This Week's Deep Dive** feature: section head (`№ 27 · This Week's Deep Dive · The Estonia Issue`) + two-column: a forest-green stat card showing `0%` "Corporate tax on reinvested profit" (left) + article teaser with "Read the full issue →" linking to the article (right).
  5. **From the Regional Desks**: 3×2 grid of issue cards, each with region label + coordinate, headline, dek. Catalog number bottom-right corner.
  6. **Two Ways to Read** (`#tiers`): Free vs Premium comparison — two-column bordered table; premium side forest-green with gold "Most Popular" badge. *(Note: this duplicates the dedicated Premium page; in production, consider making this a short teaser linking to `/premium` instead of a full second pricing table.)*
  7. **Final CTA**: centered, meridian bg, big headline + email form.
  8. **Footer**: mono wordmark + tagline.
- **Signup forms** are inert in the prototype (JS swaps button text to a success message on submit). In production, wire to your ESP (see Integrations).

### 2. Issues Archive — `02-issues-archive.html` → route `/issues`
- **Purpose:** Browse/search the full back catalogue. The "Issues" half of the dual browse model (Topics is the other half).
- **Layout:**
  1. Nav + breadcrumb (`Home / The Archive`).
  2. Header: "Every issue, **one place**."
  3. **Sticky filter controls** (sticky at `top: 64px`, below nav): **Topic filter chips** (All + 5 topics), **Region filter chips** (All + 7 regions), and a **search input** with magnifier icon.
  4. **Results meta row**: live count "Showing **N** of 16 issues" + a "Clear filters ✕" button (appears only when a filter is active).
  5. **Featured latest issue** card (large, two-column, links to the article): left = labels + headline + dek + tags; right = forest-green panel with big `0%` and "Read the issue →".
  6. **Issue list**: ~15 rows. Each row = grid `[№ | date | title+dek+tags | access+readtime]`. Topic + region shown as small tags; access shown as `Free` (green) or `Premium` (gold).
  7. Empty state ("No issues match those filters") — hidden unless 0 results.
  8. Signup strip (forest-green) + footer.
- **THE KEY INTERACTION — client-side filtering** (see Interactions below). This is the most important behavior on the page; replicate exactly.

### 3. Topic Hub — `03-topic-hub-corporate-tax.html` → route `/topics/[slug]` (example: `/topics/corporate-tax`)
- **Purpose:** Evergreen **pillar page** for a topic. SEO anchor that ranks and links down to every issue in the topic. This is a TEMPLATE — there will be 5 of these (Corporate Tax, Consumption Tax, Cross-Border, Tax Economics, Compliance).
- **Layout:**
  1. Nav + breadcrumb (`Home / Topics / Corporate Tax`).
  2. **Hub header** (meridian bg): pillar icon + "Topic Hub · Pillar 01", big H1 "How the world taxes **companies**.", standfirst, and a 3-cell meta bar (`4 issues / 12 jurisdictions / Weekly updated`).
  3. **Two-column body**: left = the **pillar intro essay** (1,500+ word evergreen explainer — this is what ranks in search; drop cap, H2 sections, pull-quote, fact boxes). Right = **sticky sidebar** with on-page TOC + a topic-specific email signup ("Get every Corporate Tax issue").
  4. **Issue list** for this hub: rows like the archive. **Live issues link out; not-yet-published issues are non-links and visually dimmed (opacity ~.62)** to signal "queued."
  5. **Related hubs & regions** card grid (sibling topics + region pages).
  6. Final CTA + footer.
- **Production note:** The intro essay is editable long-form content (MDX/CMS field). The issue list is a query: "all issues where topic == this hub, newest first."

### 4. Article / Issue template — `04-article-estonia.html` → route `/issues/[slug]` (example: `/issues/estonia-distribution-tax`)
- **Purpose:** The reading experience for a single issue. **THE most important template** — every issue renders into this. Built to be **data-backed**: every article has a structured data layer.
- **The repeatable article spine (each issue follows this):**
  1. **Reading-progress bar** (fixed, top, fills green as you scroll).
  2. Nav + breadcrumb.
  3. **Header**: topic chip (forest) + region chip (outline) + access chip (gold "Free issue"); H1; italic standfirst; byline row (`Issue № · read time · publish date · author`).
  4. **"At a glance" strip** (`paper-2` band): 4 hard reference figures, **each with a source label** under it. (e.g., `22% — Tax on distributed profit — Est. Tax & Customs Board`.)
  5. **Body** (720px reading column): drop-cap opening, H2 sections with mono section-numbers, **pull-quotes**, inline links.
  6. **Charts/figures** — all hand-built in CSS/SVG, no chart library, in brand palette. Each `<figure>` has a header (kicker + title), the chart body, and a **figcaption with a source + "as of" date**. Three chart types demonstrated:
     - **Figure 1 — comparison pair**: two boxes (cream "€0 reinvested" vs forest "€22,000 distributed") with mini bars.
     - **Figure 2 — column chart**: 3 vertical bars (2024=20%, 2025=22%, 2026=24%); the current year forest-filled, future year dashed.
     - **Figure 3 — horizontal bar chart**: country rates with an absolutely-positioned **dashed gold reference line** marking the "Pillar Two floor · 15%". Bars scaled to a 40% axis max; reference line at `left: 37.5%` (= 15/40).
  7. **Inline signup** (forest band, mid-article).
  8. **"By the numbers" data table** — the screenshot-friendly reference.
  9. **Sources & methodology box** (`paper-2`, bordered): numbered source list, "Figures as of <date>", and an italic **not-tax-advice disclaimer**. *(Keep this disclaimer on every issue — credibility + liability.)*
  10. **Read Next** related cards + final CTA + footer.
- **Production note:** The data layer (at-a-glance figures, chart datasets, sources, table) should be **structured fields** in the content model, not free-form HTML, so charts render from data and sources are enforced. Charts can be React components fed by those fields.

### 5. Premium / Pricing — `05-premium.html` → route `/premium`
- **Purpose:** Convert free readers to paid "Ledger" members.
- **Layout:**
  1. Nav (CTA button is **gold** here, not green) + breadcrumb.
  2. **Hero** (meridian bg, centered): gold pill badge "The Ledger · Premium Membership", H1 "Keep the **whole world's** tax code on your desk.", subhead, gold "Go Premium — $8/mo →" + "Compare plans" ghost link, reassurance line.
  3. **4 value-prop columns**: archive · country playbooks · data & models · live Q&A.
  4. **Country Tax Playbooks** (the headline asset): grid of jurisdiction cards. 2 unlocked (Estonia, UAE) with "Preview →"; 6 locked (lock icon, dimmed) including a "+33 more / 40+ jurisdictions" card.
  5. **Soft-paywall demo**: a faded sample issue cutting off into a "Keep reading with Premium" lock block — paired with explanatory copy. Shows what the paywall looks like on premium articles.
  6. **Free vs Premium comparison table**: feature rows with `✓` (green/gold) and `—`. Premium column highlighted.
  7. **Pricing** (`#pricing`): a **Monthly/Annual toggle** that switches the premium card price (`$8/month` ↔ `$80/year` + "Save $16 — two months free"). Two cards: Free ($0) and Premium (forest-green, gold badge). Plus a **student 50%-off** dashed callout.
  8. **FAQ accordion** (`<details>` elements).
  9. Final CTA (full forest-green section) + footer.

### 6. Topic Hub Map — `06-topic-hub-map-INTERNAL.html` (INTERNAL planning artifact — NOT a public route)
- **Purpose:** Editorial/IA blueprint. Shows the 5-pillar topic structure, the Region×Topic matrix (dual taxonomy), how one issue feeds email + hub + region, and the anatomy of a hub page.
- **Do NOT ship this as a public page.** It's included so you understand the **information architecture** you're building toward. Use it as the spec for: the 5 topic hubs, the region pages, and the relationship between issues/topics/regions.

---

## Interactions & Behavior

### Issues archive filtering (`02-issues-archive.html`) — replicate precisely
- **State:** `{ topic: 'all', region: 'all', q: '' }`.
- **Topic chips & region chips:** single-select per group. Clicking a chip sets it `on` (forest-green fill), clears siblings, updates state, re-filters.
- **Search:** filters by a per-issue `data-title` keyword string (lowercased substring match), and also matches topic/region names.
- **Combination logic:** a row shows only if `topicOK AND regionOK AND searchOK`. The featured latest issue participates in filtering too.
- **Count:** "Showing N of TOTAL issues" updates live.
- **Clear filters:** button appears only when any filter is active; resets all to default.
- **Empty state:** shows when N == 0.
- In production: this is trivial with your data layer — filter the issues array by `topic`, `region`, and a search query. Keep it client-side for instant response (the list is small) or server-side with query params if the catalogue grows large (also better for shareable filtered URLs — consider `?topic=corporate-tax&region=europe`).

### Premium pricing toggle (`05-premium.html`)
- Monthly/Annual segmented toggle swaps: price number (`$8`→`$80`), period label (`/ month`→`/ year`), billing note, and a savings note ("Save $16 — two months free"). Active button = forest fill.

### Article reading-progress bar (`04-article-estonia.html`)
- Fixed 3px bar at top; width = `scrollTop / (scrollHeight - clientHeight) * 100%`. Forest-green fill.

### FAQ accordions (`05-premium.html`)
- Native `<details>/<summary>`. The `+` mark rotates 45° to `×` when open. One open by default.

### Hover states (global)
- Nav links: `ink-soft` → `forest`.
- Cards (issue rows, desk cards, playbook cards): subtle `paper-2` bg + `translateY(-2px)` lift + border→money-green. **Only clickable cards lift** (`[href]:hover`); dimmed/non-link cards don't.
- Buttons: green → `forest-2`; gold → `gold-l`.
- Article issue-list rows: linked rows pad inward + reveal a `→` arrow on hover.

### Navigation map (relative links → production routes)
```
/ (homepage)
 ├─ /issues ............ archive (filterable)
 │   └─ /issues/[slug] . article/issue page
 ├─ /topics/[slug] ..... topic hub (5 of them)
 │   └─ links to /issues/[slug]
 ├─ /regions/[slug] .... region pages (NOT yet designed — mirror topic hub layout)
 ├─ /premium ........... pricing
 └─ #subscribe ......... signup (anchor → forms throughout)
```
Currently only the Estonia article is "live"; other issue rows are non-links/dimmed. In production every issue is a real route.

### Responsive behavior
- All pages are responsive. Key breakpoints used: `~920px` (multi-column → stacked), `~560–680px` (mobile, reduced padding, single column).
- Nav does not currently have a hamburger menu — **you should add a mobile menu** for the nav links at small widths (the prototype just wraps/crowds). This is the one place to improve on the prototype.
- Grids collapse: 4-col → 2-col → 1-col. Article figures that bleed wide (`margin: 0 -80px`) reset to 0 on mobile.

---

## State Management
Mostly a content/marketing site — minimal client state:
- **Issues archive:** filter state (`topic`, `region`, `q`) — local component state, or URL query params for shareable filtered views (recommended).
- **Premium page:** billing-period toggle (`month`/`year`) — local state.
- **Article:** scroll-progress — local, from scroll listener.
- **Auth/membership (NOT in prototype but required for real product):** free vs premium user. Premium articles need a **paywall gate** — the soft-paywall demo on the premium page shows the intended UX (content fades, "Keep reading with Premium" block). You'll need auth + subscription status to decide whether to render full article or the gated preview.
- **Email subscription:** capture email → POST to ESP.

## Data Fetching / Content Model
Model the content as records (MDX or CMS):
- **Issue**: `number`, `slug`, `title`, `dek/standfirst`, `publishDate`, `topic` (1 of 5), `region` (1 of 7), `access` ('free'|'premium'), `readTime`, `body` (rich text), and a **dataLayer**: `atAGlance[]` (value, label, source), `figures[]` (typed chart data + caption + source), `byTheNumbers` (table), `sources[]`, `asOfDate`.
- **Topic hub**: `slug`, `title`, `pillarNumber`, `introEssay` (long evergreen rich text), `meta` (issue count etc.). Issue list is a derived query.
- **Region**: same shape as topic hub (region pages aren't designed yet — reuse the hub layout).
- **Country playbook** (premium): `country`, `region`, `coord`, `headlineRate`, `note`, `body`, `access`.

**Dual taxonomy is core:** every issue belongs to exactly one **topic** AND one **region**, and appears under both. Don't model topic as the only category.

---

## SEO Requirements (important — this is a content site)
The design assumes a hub-and-spoke SEO strategy. Implement:
- **Static generation / SSR** for all content pages (issues, hubs) — fast, crawlable.
- **Clean keyword URLs**: `/topics/corporate-tax`, `/issues/estonia-distribution-tax` — lowercase, hyphenated, no IDs.
- **One `<h1>` per page**; semantic `<h2>/<h3>`.
- **Meta title + description** per page (the prototypes include `<title>` and `<meta name="description">` — carry these patterns into per-content metadata).
- **Structured data (JSON-LD)**: `Article` schema on issues, `FAQPage` on the premium FAQ, `BreadcrumbList` on breadcrumbs.
- **Canonical tags** to avoid archive-vs-article duplication.
- **XML sitemap + robots.txt.**
- **Internal linking**: hubs link down to issues; issues link up to their hub and sideways to siblings (the "Read Next" / "Related hubs" sections) — preserve these, they're the SEO engine.

---

## Integrations to wire (not in prototype)
- **Email service provider** (subscribe forms) — e.g., ConvertKit/Beehiiv/Mailchimp/Resend. Every form posts an email; success state already designed (button text swap).
- **Payments / subscriptions** (premium) — e.g., Stripe. Monthly $8 / Annual $80 / student 50% off. The "Go Premium" buttons should start checkout.
- **Auth** — for gating premium content (see State Management).
- **Analytics** — for the traction the publication cares about.

---

## Assets
- **No external image assets** are used — all graphics are inline SVG (the meridian globe motif, brand mark, icons, lock icons, and all charts). These can be reimplemented as SVG/React components.
- **Fonts**: Spectral + IBM Plex Mono via Google Fonts (self-host in production for performance/privacy).
- **No raster images, no icon library** — icons are hand-drawn inline SVGs with `stroke-width` ~1.3–1.7, `fill: none`. You may swap to an icon library (e.g., Lucide) that matches the thin-stroke style, or keep the inline SVGs.

---

## Content Notes (tell the client / don't ship as fact)
Some content is **illustrative placeholder** and must be replaced with real values before launch:
- **Traction metrics**: "14,200 readers", "70 countries", "40+ jurisdictions", issue counts — all placeholders. Wire to real data or remove.
- **The Estonia article data IS real and sourced** (OECD, Estonian Tax & Customs Board, PwC, EY, Tax Foundation, 2025 figures) — but tax rates change; keep the "as of" dates and source citations, and build the update workflow the hub copy promises.
- Issue list beyond Estonia is realistic but **not yet written** — those are planned issues, not published articles.

---

## Files in this package (`designs/`)
| File | Screen | Suggested route |
|---|---|---|
| `01-homepage.html` | Homepage / landing | `/` |
| `02-issues-archive.html` | Issues archive (filterable) | `/issues` |
| `03-topic-hub-corporate-tax.html` | Topic hub (1 of 5 templates) | `/topics/corporate-tax` |
| `04-article-estonia.html` | Article / issue template | `/issues/[slug]` |
| `05-premium.html` | Premium / pricing | `/premium` |
| `06-topic-hub-map-INTERNAL.html` | IA blueprint (internal only) | — do not ship |

Open any file in a browser to see the live, interactive design. They are self-contained (only external deps are the two Google Fonts).

---

## Suggested build order
1. Project scaffold (Next.js + Tailwind + content layer) with the **design tokens** encoded in the theme.
2. Shared **layout**: nav (with mobile menu), footer, breadcrumb, the meridian motif component, signup form component.
3. **Article/issue template** (`/issues/[slug]`) + its chart components and data model — the highest-value, most reusable piece.
4. **Issues archive** (`/issues`) with filtering.
5. **Topic hub** template (`/topics/[slug]`) — build one, it covers all five.
6. **Homepage** (`/`).
7. **Premium** (`/premium`) + auth + Stripe + paywall gating.
8. SEO pass (metadata, JSON-LD, sitemap), ESP integration, analytics.
