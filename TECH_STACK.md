# The Global Ledger — Tech Stack & Launch Plan

> Living document for how the site is built, hosted, and taken live.
> Last updated: 2026-06-08

---

## 0. Current status

**ESP decided: Resend.** The entire Phase 1 backend is already wired and tested locally:

- ✅ `app/api/subscribe/route.ts` — serverless handler (email validation, honeypot, graceful "not configured" fallback)
- ✅ `lib/useSubscribe.ts` — shared client hook (loading / success / error states)
- ✅ All **6 signup forms** connected (home hero, home final CTA, article inline, article final CTA, archive strip, topic sidebar)
- ✅ `.gitignore`, `.env.example`, `.env.local` scaffolding in place
- ✅ `resend` SDK installed; `npm run build` passes (8 routes)

**What's left to go live (you):** create a GitHub repo, a Vercel project, and a Resend account, then paste two keys into `.env.local` + Vercel (`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`). See §6–§7.

---

## 1. Guiding principle

The site is a **Next.js 15 (App Router)** app that is almost entirely **static**. Only two parts need a backend:

1. **Email capture** — the signup forms (currently UI-only).
2. **The premium paywall** — gating the archive + country playbooks (future).

Everything else is pre-rendered HTML served from a CDN. That shape drives every decision below: **serverless everywhere, no always-on server, and no database until the paid tier exists.**

We do **not** build our own email-sending infrastructure. A purpose-built Email Service Provider (ESP) owns the subscriber list and handles deliverability. We keep the custom front-end; the ESP is just the sending engine behind it.

---

## 2. The stack

| Layer | Choice | Role | Cost (approx.) |
|---|---|---|---|
| **Framework** | Next.js 15 + React 19 + TypeScript | Already built | — |
| **Styling** | Tailwind CSS 3 (custom design tokens) | Already built | — |
| **Hosting** | **Vercel** | Static pages on the edge CDN; API routes as serverless functions | $0 Hobby → $20/mo Pro |
| **Subscribers + sending** | **Resend** *(primary)* or **Buttondown** *(alt)* | Owns the email list, handles deliverability | Resend: free 3k/mo → $20/mo · Buttondown: free <100 subs → ~$9/mo |
| **Content (issues)** | **MDX files in the repo** | Git-versioned "CMS" — one issue/week | $0 |
| **Payments** *(Phase 2)* | **Stripe** | Premium checkout + webhooks | 2.9% + 30¢ per charge, no monthly |
| **Auth + DB** *(Phase 2)* | **Supabase** *(or Clerk + Neon)* | Know who paid; gate content | Free tier early → ~$25/mo |

> 💡 Pricing drifts — confirm current numbers when you sign up. Figures here are ballpark as of mid-2026.

---

## 3. How it fits together

```
                         ┌─────────────────────────────┐
   Visitor ───────────▶  │  Vercel (Edge CDN)           │
                         │  • Static pages (SSG)        │  ← home, /issues, /topics, /premium
                         │  • Serverless API routes     │
                         └──────────────┬──────────────┘
                                        │
                  ┌─────────────────────┼─────────────────────┐
                  │                     │                     │
            POST /api/subscribe   POST /api/checkout    POST /api/webhook
                  │                     │                     │
                  ▼                     ▼                     ▼
            ┌──────────┐          ┌──────────┐          ┌──────────┐
            │  Resend  │          │  Stripe  │          │ Supabase │
            │ (list +  │          │ (payment)│          │ (members)│
            │  send)   │          └──────────┘          └──────────┘
            └──────────┘            Phase 2               Phase 2
              Phase 1
```

**Phase 1** uses only the green path (subscribe → Resend). **No database, no auth, no server.**
**Phase 2** adds the Stripe + Supabase paths for paid memberships.

---

## 4. Phased rollout

### Phase 1 — Free newsletter (launch first)

**Goal:** real, working signup forms + a live site.

- Deploy the existing site to Vercel on a real domain.
- Add **one** serverless route: `app/api/subscribe/route.ts`.
- Wire the 3 existing signup forms (home hero, archive strip, final CTA) to POST to it.
- Route forwards the email to Resend/Buttondown → subscriber lands on the list.
- Write/publish issues as MDX in `content/`.

**Database needed?** ❌ No — the ESP holds the list.
**Auth needed?** ❌ No.
**Server needed?** ❌ No — serverless function only.

### Phase 2 — Premium / paid tier (when you have an audience)

**Goal:** turn on the `/premium` pricing you already designed.

- **Stripe Checkout** for the $8/mo · $80/yr plans.
- **Auth** (Supabase Auth or Clerk) so readers can log in.
- **Serverless Postgres** (Supabase or Neon) to store membership status.
- **Stripe webhook** route to flip a user to "active" on payment.
- **Paywall gate** on premium issues + country playbooks (the locked cards already exist in the UI).

**Database needed?** ✅ Yes — but serverless (scales to zero).
**Auth needed?** ✅ Yes.
**Server needed?** ❌ Still no — all serverless.

---

## 5. Cost summary

| Stage | Monthly cost |
|---|---|
| Phase 1, low volume | **$0 – $9** |
| Phase 1, growing (Pro hosting + paid ESP tier) | **~$30** |
| Phase 2 (add Stripe + auth + DB) | **~$30 – $50** + Stripe's 2.9% of revenue |

No upfront cost. Everything scales with usage.

---

## 6. Setup — do these in order

You do steps 1–6; I do step 7. Steps marked **[you]** need your action/accounts; **[me]** is code I'll write.

### Step 1 — Pick the ESP **[you — one decision]**
- **Resend** → most control, all-in-code, reuses React components for emails. Best if you're comfortable it lives in the repo.
- **Buttondown** → newsletter-native, has a subscriber dashboard + cheap indie pricing, less code.
- *Default recommendation: **Resend.***

### Step 2 — Put the code on GitHub **[you]**
The project isn't a git repo yet. We need it on GitHub so Vercel can deploy it.
- Create a new **private** GitHub repo (e.g. `global-ledger`).
- I can run `git init`, commit, and push once you give me the repo URL — or you can do it.

### Step 3 — Create the Vercel account + connect the repo **[you]**
- Sign up at **vercel.com** (use the GitHub login).
- "Add New Project" → import the `global-ledger` repo → deploy. It auto-detects Next.js.
- You'll get a free `*.vercel.app` URL immediately.

### Step 4 — Get a domain **[you]**
- Buy a domain (e.g. `thegloballedger.com`) — Namecheap, Cloudflare, or Vercel Domains (~$10–15/yr).
- Add it to the Vercel project (Vercel walks you through the DNS).

### Step 5 — Create the ESP account + sending identity **[you]**
- Sign up for **Resend** (or Buttondown).
- Create an **Audience / list** (this is where subscribers go).
- **Verify your sending domain** — add the SPF/DKIM DNS records the ESP gives you (so email comes from `hello@thegloballedger.com`, not a spammy default). This is the step that protects deliverability.

### Step 6 — Hand me the credentials **[you → me]**
See the checklist in §7. **Do not paste secret keys into chat.** Instead, put them in a local `.env.local` file (I'll create the template and add it to `.gitignore`), and set the same values in **Vercel → Project → Settings → Environment Variables**. Just tell me the variable *names* you've set.

### Step 7 — I wire it up **[me]**
- Create `app/api/subscribe/route.ts` (the serverless handler).
- Connect the 3 signup forms to it (replace the current `setSubmitted(true)` stubs with a real fetch).
- Add success/error states + basic spam protection (honeypot + email validation).
- Add a `.env.example` so the required vars are documented.
- Test against your ESP, then we redeploy. **Live.**

---

## 7. What I need from you to make it live (Phase 1 checklist)

Provide these and I can finish the wiring:

- [ ] **ESP choice** — Resend or Buttondown?
- [ ] **GitHub repo URL** (or permission for me to create + push)
- [ ] **Domain name** you're using (or "use the free vercel.app URL for now")
- [ ] **Sending "from" address** — e.g. `hello@thegloballedger.com`
- [ ] **ESP API key** — set in `.env.local` + Vercel (tell me the var name, e.g. `RESEND_API_KEY`)
- [ ] **Audience / List ID** from the ESP — set the same way (e.g. `RESEND_AUDIENCE_ID`)

Once I have these (or even just the ESP choice + keys), I'll build the subscribe route and connect the forms. **You can launch the free newsletter without touching anything from Phase 2.**

### For Phase 2 later (not needed now)
- [ ] Stripe account → publishable + secret keys, price IDs for $8/mo and $80/yr
- [ ] Auth provider choice (Supabase Auth vs Clerk)
- [ ] Supabase/Neon project → database connection string

---

## 8. Decisions still open

| Question | Options | Recommendation |
|---|---|---|
| Email service provider | Resend / Buttondown / Kit / Beehiiv | **Resend** (keeps custom front-end, all-in-code) |
| Launch domain | Custom domain now vs `vercel.app` first | Ship on `vercel.app`, add domain in parallel |
| Content authoring | MDX in repo vs headless CMS (Sanity/Notion) | **MDX now**; add a CMS only if a non-dev needs to edit |
| Premium at launch? | Phase 1 only vs Phase 1 + 2 together | **Phase 1 first** — validate audience, add paid tier later |
