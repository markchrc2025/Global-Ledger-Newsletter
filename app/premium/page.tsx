"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MeridianMotif } from "@/components/MeridianMotif";
import { GlobeMark } from "@/components/GlobeMark";

/* ---------- NAV (gold CTA variant) ---------- */
function PremiumNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="border-b border-line-2 sticky top-0 z-50 bg-paper">
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-[11px] font-mono font-semibold tracking-[0.12em] uppercase text-[13px] text-ink">
          <GlobeMark className="w-6 h-6 text-forest" />
          The Global Ledger
        </Link>
        <div className="hidden md:flex gap-2 items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/topics/corporate-tax">Topics</NavLink>
          <NavLink href="/issues/estonia-distribution-tax">Sample Issue</NavLink>
          <Link
            href="#pricing"
            className="font-mono text-[11px] tracking-[0.14em] uppercase bg-gold text-ink px-[14px] py-2 rounded-btn hover:bg-gold-l transition-colors font-medium whitespace-nowrap"
          >
            Go Premium
          </Link>
        </div>
        <button
          className="md:hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft p-2"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? "✕" : "☰ Menu"}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-paper px-[22px] py-4 flex flex-col gap-1">
          <NavLink href="/" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink href="/topics/corporate-tax" onClick={() => setMobileOpen(false)}>Topics</NavLink>
          <Link href="#pricing" onClick={() => setMobileOpen(false)} className="font-mono text-[11px] tracking-[0.14em] uppercase bg-gold text-ink px-[14px] py-2 rounded-btn text-center">
            Go Premium
          </Link>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, onClick, children }: { href: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-soft px-[14px] py-2 hover:text-forest transition-colors whitespace-nowrap">
      {children}
    </Link>
  );
}

/* ---------- VALUE PROPS ---------- */
const VALUE_PROPS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8 text-forest">
        <path d="M4 5h11a2 2 0 0 1 2 2v13M4 5v13a2 2 0 0 0 2 2h11M4 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2" />
        <line x1="7" y1="9" x2="13" y2="9" /><line x1="7" y1="13" x2="13" y2="13" />
      </svg>
    ),
    title: "The full archive",
    body: "Every issue since № 01, searchable — not just the latest four free reads.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8 text-forest">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
      </svg>
    ),
    title: "Country playbooks",
    body: "A standing reference for 40+ jurisdictions — rates, triggers, and the catch.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8 text-forest">
        <path d="M4 19h16M6 19V9m4 10V5m4 14v-7m4 7V8" />
      </svg>
    ),
    title: "Data & models",
    body: "Download the figures behind every chart — spreadsheets, sourced and dated.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-8 h-8 text-forest">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 20l1-4.2A8.4 8.4 0 1 1 21 11.5z" />
      </svg>
    ),
    title: "Live editor Q&A",
    body: "Monthly open call with the editors — bring the question that's nagging you.",
  },
];

/* ---------- PLAYBOOK CARDS ---------- */
const PLAYBOOKS = [
  { region: "Europe", coord: "59.4°N", country: "Estonia", rate: "22% · on distribution only", unlocked: true },
  { region: "Gulf", coord: "25.2°N", country: "United Arab Emirates", rate: "9% · above AED 375k", unlocked: true },
  { region: "Europe", coord: "53.3°N", country: "Ireland", rate: "12.5% · trading income" },
  { region: "Asia", coord: "1.3°N", country: "Singapore", rate: "17% · partial exemptions" },
  { region: "Americas", coord: "38.9°N", country: "United States", rate: "21% federal · +state" },
  { region: "Europe", coord: "51.5°N", country: "United Kingdom", rate: "25% · 19% small profits" },
  { region: "Europe", coord: "52.5°N", country: "Germany", rate: "~30% · incl. trade tax" },
  { region: "+ 33 more", coord: "Worldwide", country: "40+ jurisdictions", rate: "Unlock the full set →" },
];

/* ---------- COMPARISON TABLE ---------- */
const COMPARE_ROWS = [
  { feature: "The weekly deep-dive issue", sub: "One country, one idea, every Thursday", free: true, prem: true },
  { feature: "Regional desk briefs + commentary", free: true, prem: true },
  { feature: "Plain-English, fully sourced data", free: true, prem: true },
  { feature: "The full issue archive", sub: "Every issue since № 01, searchable", free: false, prem: true },
  { feature: "Country Tax Playbooks", sub: "40+ jurisdictions, added weekly", free: false, prem: true },
  { feature: "Downloadable data & models", free: false, prem: true },
  { feature: "Monthly live editor Q&A", free: false, prem: true },
  { feature: "Full premium issues — no paywall", free: false, prem: true },
  { feature: "Support independent tax journalism", free: false, prem: true },
];

/* ---------- FAQ ---------- */
const FAQS = [
  { q: "Is the weekly issue really free forever?", a: "Yes — no asterisk. The Thursday deep dive, the regional briefs, and the sourced data are free for everyone, permanently. Premium adds the archive and reference tools on top; it never takes the free issue away.", open: true },
  { q: "Can I cancel anytime?", a: "Anytime, in two clicks, no email-us-to-cancel nonsense. You keep access through the end of the period you've paid for. We also offer a 14-day refund if it isn't for you." },
  { q: "What's the difference between monthly and annual?", a: "Only the price. Annual is $80/year — that's two months free versus paying monthly. Same access either way; annual just costs less and means one fewer thing to think about." },
  { q: "Do you offer a student discount?", a: "Yes — 50% off with any valid student email. A big part of who we write for is people learning the field, and the playbooks make a genuinely good study companion." },
  { q: "How current are the playbooks and data?", a: "Every figure carries a source and an \"as of\" date, and we revise playbooks as rates change rather than letting them go stale. It's editorial reference, not tax advice — always confirm specifics with a qualified adviser before acting." },
  { q: "Can I expense it, or get a team plan?", a: "Plenty of readers expense Premium — we'll send a proper receipt. For finance teams and classrooms we offer group rates; just reach out and we'll sort it." },
];

/* ========== PAGE ========== */
export default function PremiumPage() {
  const [billing, setBilling] = useState<"month" | "year">("month");

  return (
    <>
      <PremiumNav />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "The Ledger · Premium" }]} />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-line-2">
        <MeridianMotif centered />
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] relative z-[2] pt-[72px] pb-[64px] text-center">
          <span className="inline-flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.18em] uppercase text-gold border border-gold rounded-[40px] px-4 py-[7px] mb-7 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            The Ledger · Premium Membership
          </span>
          <h1
            className="font-spectral font-light text-[clamp(44px,6.4vw,84px)] leading-[1.0] tracking-[-0.022em] mx-auto mb-6 max-w-[15ch]"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            Keep the <strong className="font-semibold text-forest">whole world&apos;s</strong> tax code on your desk.
          </h1>
          <p className="text-[21px] text-ink-soft max-w-[54ch] mx-auto mb-9 leading-[1.5]">
            The free issue gives you one story a week.{" "}
            <strong className="text-ink font-medium">Premium gives you the reference library</strong>{" "}
            — every back issue, country playbooks for 40+ jurisdictions, the data behind every
            chart, and the editors on call.
          </p>
          <div className="flex gap-[14px] justify-center items-center flex-wrap">
            <Link
              href="#pricing"
              className="font-mono text-[13px] tracking-[0.12em] uppercase bg-gold text-ink px-7 py-4 rounded-btn hover:bg-gold-l transition-colors font-semibold"
            >
              Go Premium — $8/mo →
            </Link>
            <Link
              href="#compare"
              className="font-mono text-[13px] tracking-[0.12em] uppercase text-forest border-b-[1.5px] border-forest pb-0.5 px-2 py-4"
            >
              Compare plans
            </Link>
          </div>
          <div className="mt-[22px] font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft">
            Cancel anytime · 14-day refund · Student rate available
          </div>
        </div>
      </header>

      {/* Value props */}
      <section className="border-b border-line-2">
        <div className="max-w-wrap mx-auto grid grid-cols-4 p-0 max-[920px]:grid-cols-2">
          {VALUE_PROPS.map((vp, i) => (
            <div
              key={i}
              className={`px-[30px] py-[38px] border-r border-line last:border-r-0 max-[920px]:border-b max-[920px]:border-line ${i === 1 ? "max-[920px]:border-r-0" : ""} max-sm:border-r-0`}
            >
              <div className="mb-4">{vp.icon}</div>
              <h3 className="font-spectral font-medium text-[19px] m-0 mb-2">{vp.title}</h3>
              <p className="text-[14px] text-ink-soft m-0 leading-[1.5]">{vp.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Country playbooks */}
      <section className="py-[74px] border-b border-line-2">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="flex items-baseline gap-[18px] mb-[14px]">
            <span className="font-mono text-[12px] text-gold">◆ 01</span>
            <h2 className="font-spectral font-medium text-[30px] m-0">The Country Tax Playbooks</h2>
            <span className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Premium&apos;s killer asset</span>
          </div>
          <p className="text-[18px] text-ink-soft max-w-[64ch] mb-[38px] leading-[1.55]">
            A living, one-page reference for each jurisdiction: the headline rate, what
            actually triggers it, the local quirk that catches people out, and the source.{" "}
            <strong className="text-ink font-medium">New playbooks added every week.</strong>{" "}
            The free issue gives you the story — the playbook gives you the answer.
          </p>
          <div className="grid grid-cols-4 gap-[14px] max-[920px]:grid-cols-2 max-sm:grid-cols-1">
            {PLAYBOOKS.map((pb, i) => (
              <div
                key={i}
                className={`border border-line-2 rounded-card px-5 py-[22px] relative min-h-[150px] flex flex-col transition-all duration-[180ms] ${
                  pb.unlocked
                    ? "bg-paper hover:bg-paper-2 hover:-translate-y-0.5 hover:border-money cursor-pointer"
                    : "bg-paper-2"
                }`}
              >
                {!pb.unlocked && (
                  <svg
                    className="absolute top-[18px] right-[18px] w-[15px] h-[15px] text-gold"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="1.5" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                )}
                <div className="flex items-center justify-between mb-[14px]">
                  <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-money">{pb.region}</span>
                  <span className="font-mono text-[8.5px] tracking-[0.06em] text-ink-soft whitespace-nowrap">{pb.coord}</span>
                </div>
                <h4 className={`font-spectral font-medium text-[20px] m-0 mb-1 ${!pb.unlocked ? "opacity-45" : ""}`}>
                  {pb.country}
                </h4>
                <div className={`font-mono text-[11px] text-ink-soft tracking-[0.04em] mt-auto ${!pb.unlocked ? "opacity-45" : ""}`}>
                  {pb.rate}
                </div>
                {pb.unlocked && (
                  <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-forest mt-2">Preview →</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-[26px] font-mono text-[11px] tracking-[0.1em] uppercase text-ink-soft">
            Two previews open free ·{" "}
            <strong className="text-gold">Unlock all 40+ with Premium</strong>
          </div>
        </div>
      </section>

      {/* Soft paywall demo */}
      <section className="py-[74px] border-b border-line-2">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="grid grid-cols-[1.05fr_.95fr] gap-[52px] items-center max-[920px]:grid-cols-1 max-[920px]:gap-9">
            {/* Demo article */}
            <div className="border border-line-2 rounded-fig overflow-hidden bg-paper" aria-hidden="true">
              <div className="px-6 pt-5">
                <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-money mb-2.5">
                  Premium issue · preview
                </div>
                <p className="font-spectral font-medium text-[23px] leading-[1.15] mb-[14px]">
                  Singapore&apos;s territorial system, and the exemption founders miss
                </p>
              </div>
              <div className="px-6 text-[14.5px] text-ink-soft leading-[1.6]">
                <p className="mb-3">
                  Singapore taxes corporate profit at a headline 17% — but the number on the
                  tin is almost never what a new company actually pays. Between the partial
                  exemption on the first tranche of profit and the start-up relief scheme,
                  the effective rate in year one can fall to single digits.
                </p>
                <div className="relative">
                  <p className="mb-3">
                    The mechanism works like this: the first portion of chargeable income is
                    exempt at a fixed percentage, then a second band receives a partial
                    exemption, and only above that does the full rate bite. For a company
                    earning…
                  </p>
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(transparent, var(--paper))" }}
                  />
                </div>
              </div>
              <div className="border-t border-line bg-paper-2 px-6 py-6 text-center">
                <svg
                  className="w-[22px] h-[22px] text-gold mx-auto mb-2.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="5" y="11" width="14" height="9" rx="1.5" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                <p className="font-spectral text-[18px] m-0 mb-1">Keep reading with Premium</p>
                <p className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-soft m-0">
                  Full issue · data table · downloadable model
                </p>
              </div>
            </div>

            {/* Copy */}
            <div>
              <h3 className="font-spectral font-medium text-[28px] leading-[1.12] mb-4">
                The free issue ends where the reference begins.
              </h3>
              <p className="text-[17px] text-ink-soft mb-[14px] leading-[1.55]">
                Every week&apos;s deep dive stays free, forever. But premium issues, the
                country playbooks, and the data tables run deeper — and they&apos;re the
                parts you&apos;ll come back to.
              </p>
              <p className="text-[17px] text-ink-soft mb-[18px] leading-[1.55]">
                Premium isn&apos;t a different newsletter. It&apos;s the{" "}
                <em>same</em> plain-English voice, with the full toolkit attached.
              </p>
              <ul className="list-none m-0 mt-[18px] p-0">
                {["Full premium issues — no cut-off", "The data table & downloadable model behind each one", "The matching country playbook, one click away"].map((item) => (
                  <li key={item} className="flex gap-[11px] text-[15px] py-[9px] border-b border-line last:border-b-0">
                    <span className="text-gold">✦</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-[74px] border-b border-line-2" id="compare">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="flex items-baseline gap-[18px] mb-[14px]">
            <span className="font-mono text-[12px] text-gold">◆ 02</span>
            <h2 className="font-spectral font-medium text-[30px] m-0">Free vs Premium</h2>
            <span className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Keep the free issue, always</span>
          </div>
          <p className="text-[18px] text-ink-soft max-w-[64ch] mb-[38px] leading-[1.55]">
            The weekly issue stays free for everyone — that&apos;s a promise. Premium adds
            the archive and the reference tools on top.
          </p>
          <div className="border border-line-2 rounded-fig overflow-hidden overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left px-[22px] py-[17px] border-b border-line bg-paper-2 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-soft font-medium">
                    What you get
                  </th>
                  <th className="px-[22px] py-[17px] border-b border-line bg-paper-2 text-center w-[140px] font-mono text-[10px] tracking-[0.1em] uppercase text-ink-soft font-medium">
                    <span className="font-spectral text-[19px] normal-case tracking-normal block mb-1 text-forest">Free</span>
                    $0 forever
                  </th>
                  <th className="px-[22px] py-[17px] border-b border-line bg-[#efe7d2] text-center w-[160px] border-l border-line font-mono text-[10px] tracking-[0.1em] uppercase text-gold font-medium">
                    <span className="font-spectral text-[19px] normal-case tracking-normal block mb-1 text-gold">Premium</span>
                    from $8/mo
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td className="px-[22px] py-[17px] border-b border-line text-[15.5px]">
                      {row.feature}
                      {row.sub && <span className="block text-[12.5px] text-ink-soft mt-0.5">{row.sub}</span>}
                    </td>
                    <td className="px-[22px] py-[17px] border-b border-line text-center w-[140px]">
                      {row.free ? (
                        <span className="text-money text-[17px]">✓</span>
                      ) : (
                        <span className="text-ink-soft opacity-40 text-[15px]">—</span>
                      )}
                    </td>
                    <td className="px-[22px] py-[17px] border-b border-line border-l text-center w-[160px] bg-[rgba(169,128,58,0.05)]">
                      <span className="text-gold text-[17px]">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-[74px] border-b border-line-2 text-center" id="pricing">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <h2 className="font-spectral font-medium text-[34px] m-0 mb-[18px]">
            Simple pricing. Cancel anytime.
          </h2>

          {/* Toggle */}
          <div className="inline-flex border border-line-2 rounded-[40px] p-1 bg-paper mb-[14px]">
            {(["month", "year"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setBilling(mode)}
                className={`font-mono text-[11px] tracking-[0.1em] uppercase px-[22px] py-2.5 rounded-[30px] border-none cursor-pointer transition-all duration-200 ${
                  billing === mode ? "bg-forest text-paper" : "bg-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {mode === "month" ? "Monthly" : "Annual"}
              </button>
            ))}
          </div>

          <div className="h-[14px] mb-[34px] font-mono text-[10px] tracking-[0.08em] uppercase text-gold">
            {billing === "year" ? "✦ Save $16 — two months free" : ""}
          </div>

          <div className="grid grid-cols-[1fr_1.15fr] gap-[18px] max-w-[760px] mx-auto text-left max-[920px]:grid-cols-1">
            {/* Free card */}
            <div className="border border-line-2 rounded-[10px] p-[34px_32px] bg-paper relative">
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-money mb-4">The Weekly Edition</div>
              <div className="flex items-baseline gap-1.5 font-spectral font-light text-[58px] leading-none tracking-[-0.02em]">
                $0<span className="font-mono text-[13px] tracking-[0.04em] font-normal">/ forever</span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.06em] uppercase mt-2 mb-[22px] opacity-70">
                Free, forever
              </div>
              <ul className="list-none m-0 mb-[26px] p-0">
                {["One deep-dive issue every Thursday", "Regional desk briefs + commentary", "Plain-English, sourced data", "Read in 6 minutes or less"].map((item) => (
                  <li key={item} className="flex gap-[11px] text-[14.5px] py-2.5 border-b border-line last:border-b-0">
                    <span className="font-mono text-money">→</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/#subscribe"
                className="block text-center font-mono text-[12px] tracking-[0.12em] uppercase px-4 py-[15px] rounded-btn border border-ink text-ink font-semibold hover:bg-ink hover:text-paper transition-colors"
              >
                Subscribe free
              </Link>
            </div>

            {/* Premium card */}
            <div className="border border-forest rounded-[10px] p-[34px_32px] bg-forest text-paper relative">
              <span className="absolute top-0 right-0 bg-gold text-ink font-mono text-[9.5px] tracking-[0.12em] uppercase px-[14px] py-1.5 rounded-bl-[8px] font-semibold">
                Best value
              </span>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-gold-l mb-4">
                The Ledger — Premium
              </div>
              <div className="flex items-baseline gap-1.5 font-spectral font-light text-[58px] leading-none tracking-[-0.02em]">
                <span>{billing === "month" ? "$8" : "$80"}</span>
                <span className="font-mono text-[13px] tracking-[0.04em] font-normal">
                  {billing === "month" ? "/ month" : "/ year"}
                </span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.06em] uppercase mt-2 mb-[22px] opacity-70">
                {billing === "month" ? "Billed monthly · cancel anytime" : "Billed annually · cancel anytime"}
              </div>
              <ul className="list-none m-0 mb-[26px] p-0">
                {["Everything in Free, plus —", "The full searchable archive", "Country playbooks · 40+ jurisdictions", "Downloadable data & models", "Monthly live editor Q&A"].map((item) => (
                  <li key={item} className="flex gap-[11px] text-[14.5px] py-2.5 border-b border-[rgba(243,239,226,0.18)] last:border-b-0">
                    <span className="font-mono text-gold-l">✦</span> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full text-center font-mono text-[12px] tracking-[0.12em] uppercase px-4 py-[15px] rounded-btn bg-gold text-ink border border-gold font-semibold hover:bg-gold-l transition-colors cursor-pointer">
                Go Premium →
              </button>
            </div>
          </div>

          {/* Student callout */}
          <div className="max-w-[760px] mx-auto mt-[18px] border border-dashed border-line-2 rounded-fig px-6 py-[18px] flex items-center justify-between gap-4 flex-wrap text-left">
            <span className="text-[15px]">
              <strong className="text-forest">Student or just learning the field?</strong>{" "}
              Premium is half price — because that&apos;s half our audience.
            </span>
            <Link href="#" className="font-mono text-[11px] tracking-[0.1em] uppercase text-gold border-b border-gold pb-0.5 hover:text-gold-l transition-colors">
              Get 50% off →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[74px] border-b border-line-2">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="flex items-baseline gap-[18px] mb-[14px]">
            <span className="font-mono text-[12px] text-gold">◆ 03</span>
            <h2 className="font-spectral font-medium text-[30px] m-0">Questions, answered</h2>
            <span className="flex-1 h-px bg-line" />
          </div>
          <div className="max-w-[820px] mx-auto">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} defaultOpen={faq.open} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — dark forest */}
      <section className="py-[88px] relative overflow-hidden bg-forest text-paper text-center">
        <div className="meridian-container" aria-hidden="true">
          <svg
            className="meridian-svg"
            viewBox="0 0 400 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            style={{ left: "50%", right: "auto", transform: "translate(-50%,-50%)", opacity: 0.14, color: "#bcd9c5" }}
          >
            <circle cx="200" cy="200" r="190" />
            <circle cx="200" cy="200" r="120" />
            <circle cx="200" cy="200" r="60" />
            <ellipse cx="200" cy="200" rx="80" ry="190" />
            <line x1="10" y1="200" x2="390" y2="200" />
          </svg>
        </div>
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] relative z-[2]">
          <span className="inline-flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.18em] uppercase text-gold-l border border-gold-l rounded-[40px] px-4 py-[7px] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-l" />
            The Ledger · Premium
          </span>
          <h2
            className="font-spectral font-light text-[clamp(34px,4.6vw,56px)] leading-[1.04] tracking-[-0.018em] mb-4"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            The world&apos;s tax code,
            <br />
            <strong className="font-semibold text-[#bcd9c5]">finally on your side.</strong>
          </h2>
          <p className="text-[#cfe0d4] text-[18px] max-w-[46ch] mx-auto mb-8">
            Start with the free issue this Thursday. Upgrade to Premium whenever the
            archive&apos;s worth it to you.
          </p>
          <Link
            href="#pricing"
            className="inline-block font-mono text-[14px] tracking-[0.12em] uppercase bg-gold text-ink px-[34px] py-[17px] rounded-btn hover:bg-gold-l transition-colors font-semibold"
          >
            Go Premium — $8/mo →
          </Link>
          <div className="mt-5 font-mono text-[10px] tracking-[0.08em] uppercase text-[#9fbcaa]">
            Cancel anytime · 14-day refund · Student rate available
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function FAQItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-5 py-[22px] text-left cursor-pointer bg-transparent border-0 p-0"
      >
        <span className="font-spectral font-medium text-[20px] leading-[1.3]">{q}</span>
        <span
          className={`font-mono text-[20px] text-gold flex-shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-6 text-[16px] text-ink-soft leading-[1.6] max-w-[64ch]">{a}</div>
      )}
    </div>
  );
}
