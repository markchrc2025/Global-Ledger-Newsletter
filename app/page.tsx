"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MeridianMotif } from "@/components/MeridianMotif";
import { Honeypot } from "@/components/Honeypot";
import { useSubscribe, subscribeFromForm, subscribeLabel } from "@/lib/useSubscribe";

const STATS = [
  { n: "70", l: "Countries covered" },
  { n: "14.2k", l: "Weekly readers" },
  { n: "1", l: "Deep dive / week" },
  { n: "6 min", l: "Average read" },
];

const DESKS = [
  { n: "01", region: "Europe", coord: "EU · 2025", title: "The global minimum tax, in human language", dek: "Pillar Two sounds like flat-pack furniture. It's really a 15% floor under the world's biggest companies." },
  { n: "02", region: "Gulf", coord: "UAE · 25.2°N", title: "The end of the zero-tax dream?", dek: "The UAE's new 9% corporate tax rewrites the playbook for a region built on no income tax at all." },
  { n: "03", region: "Global", coord: "Worldwide", title: "VAT, GST & sales tax: one idea, three headaches", dek: "They all tax consumption — and behave nothing alike. A field guide for anyone selling across a border." },
  { n: "04", region: "Nordics", coord: "NO · 60.4°N", title: "Norway's exit tax and the founders leaving", dek: "What the headlines miss about wealth, mobility, and the real numbers behind the great departure." },
  { n: "05", region: "Curio", coord: "UK · 51.5°N", title: "Why the tax year starts in April", dek: "Blame an 18th-century calendar bug nobody ever fixed. A short, true, slightly absurd story." },
  { n: "06", region: "Trade", coord: "EU · CBAM", title: "Carbon border taxes arrive in Europe", dek: "A primer for exporters on the levy that taxes the carbon baked into what crosses the border." },
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />

      {/* Stat bar */}
      <div className="border-b border-line-2 bg-paper-2">
        <div className="max-w-wrap mx-auto grid grid-cols-4 max-[900px]:grid-cols-2">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`px-[30px] py-7 border-r border-line text-center flex flex-col items-center justify-center last:border-r-0 max-[900px]:border-b max-[900px]:border-line max-[900px]:p-5 ${i === 1 ? "max-[900px]:border-r-0" : ""}`}
            >
              <div className="font-spectral font-normal text-[38px] leading-none text-forest">{s.n}</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-soft mt-2 whitespace-nowrap">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* This Week's Deep Dive feature */}
      <section className="py-[78px] border-b border-line-2">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="flex items-baseline gap-[18px] mb-10">
            <span className="font-mono text-[12px] text-money">№ 27</span>
            <h3 className="font-spectral font-medium text-[26px] m-0">This Week&apos;s Deep Dive</h3>
            <span className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">The Estonia Issue</span>
          </div>
          <div className="grid grid-cols-[1fr_1.1fr] gap-14 items-center max-[900px]:grid-cols-1 max-[900px]:gap-8">
            {/* Stat card */}
            <div className="relative bg-forest text-paper rounded-card px-11 py-11 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 33px,rgba(188,217,197,.14) 33px,rgba(188,217,197,.14) 34px)",
                }}
              />
              <div className="relative font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#bcd9c5] mb-auto">
                Filed from · Tallinn, Estonia
              </div>
              <div className="relative font-spectral font-light text-[120px] leading-[0.9] my-[30px] mb-1.5">
                0%
              </div>
              <div className="relative font-mono text-[11px] tracking-[0.1em] uppercase text-[#bcd9c5]">
                Corporate tax on reinvested profit
              </div>
            </div>

            {/* Text side */}
            <div>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-money mb-[18px]">
                Deep Dive · 6 min read
              </div>
              <h2 className="font-spectral font-normal text-[clamp(30px,3.6vw,46px)] leading-[1.06] mb-5 tracking-[-0.012em]">
                The country that taxes profit <em className="italic text-forest">only</em> when you take it out.
              </h2>
              <p className="text-[18px] text-ink-soft mb-4 max-w-[50ch]">
                Estonia made a radical bet: leave your profits in the business and pay
                nothing. Take them out, and the tax arrives. We trace how a deferral quirk
                became a national growth engine — and why founders everywhere keep citing it.
              </p>
              <p className="text-[18px] text-ink-soft mb-6 max-w-[50ch]">
                It&apos;s the whole point of this newsletter in one country: taxes
                aren&apos;t rules, they&apos;re incentives wearing a uniform.
              </p>
              <Link
                href="/issues/estonia-distribution-tax"
                className="inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] uppercase text-forest border-b-[1.5px] border-forest pb-0.5 hover:text-money hover:border-money transition-colors"
              >
                Read the full issue →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regional desks */}
      <section className="py-[78px] border-b border-line-2" id="desks">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="flex items-baseline gap-[18px] mb-10">
            <span className="font-mono text-[12px] text-money">↻</span>
            <h3 className="font-spectral font-medium text-[26px] m-0">From the Regional Desks</h3>
            <span className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Free + Premium archive
            </span>
          </div>
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
            {DESKS.map((desk) => (
              <article
                key={desk.n}
                className="border border-line-2 rounded-[5px] px-7 pt-7 pb-[46px] bg-paper relative transition-all duration-200 hover:bg-paper-2 hover:-translate-y-0.5"
              >
                <span className="absolute bottom-[18px] right-[26px] font-mono text-[10px] tracking-[0.1em] text-ink-soft opacity-50">
                  {desk.n}
                </span>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-money">{desk.region}</span>
                  <span className="font-mono text-[9.5px] tracking-[0.08em] text-ink-soft whitespace-nowrap">{desk.coord}</span>
                </div>
                <h4 className="font-spectral font-medium text-[21px] leading-[1.15] mb-2.5">{desk.title}</h4>
                <p className="text-[14.5px] text-ink-soft m-0 leading-[1.5]">{desk.dek}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Two Ways to Read (tiers) */}
      <TiersSection />

      {/* Final CTA */}
      <FinalCTASection />

      <Footer />
    </>
  );
}

function HeroSection() {
  const { status, error, subscribe } = useSubscribe("home-hero");
  const busy = status === "loading" || status === "success";
  return (
    <header className="relative border-b border-line-2 overflow-hidden">
      <MeridianMotif />
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] relative z-[2] pt-[76px] pb-[76px]">
        {/* Coordinate datelines */}
        <div className="flex gap-[26px] mb-[34px] font-mono text-[10.5px] tracking-[0.14em] uppercase text-ink-soft flex-wrap">
          {["51.5°N London", "1.3°N Singapore", "59.4°N Tallinn", "40.7°N New York"].map((c) => (
            <span key={c} className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-money before:rounded-full">
              {c}
            </span>
          ))}
        </div>

        <h1
          className="font-spectral font-light text-[clamp(44px,6.2vw,86px)] leading-[1.02] tracking-[-0.018em] mb-[26px] max-w-[16ch]"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          How the <strong className="font-semibold text-forest">world</strong> taxes money,{" "}
          <em>decoded</em> every week.
        </h1>

        <div className="grid grid-cols-[1fr_auto] gap-[50px] items-end mt-2 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <p className="text-[20px] text-ink-soft max-w-[44ch] m-0 leading-[1.5]">
            One country, one idea, one Thursday at a time.{" "}
            <strong className="text-ink font-medium">The Global Ledger</strong> turns the
            planet&apos;s tax codes into plain-English stories — for founders, students, and
            the endlessly curious.
          </p>

          {/* Hero signup card */}
          <aside
            id="subscribe"
            className="bg-forest text-paper rounded-[5px] p-[30px] min-w-[380px] max-[900px]:min-w-0"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#bcd9c5] block mb-3">
              Free Weekly Edition
            </span>
            <h2 className="font-spectral font-normal text-[23px] leading-[1.15] mb-[18px]">
              Get the next dispatch<br />in your inbox.
            </h2>
            <form
              onSubmit={(e) => { e.preventDefault(); subscribeFromForm(e.currentTarget, subscribe); }}
              className="flex flex-col gap-2.5"
            >
              <Honeypot />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                disabled={busy}
                className="font-spectral text-[16px] px-[15px] py-[14px] border border-[rgba(243,239,226,0.3)] bg-[rgba(243,239,226,0.06)] text-paper rounded-[3px] placeholder:text-[rgba(243,239,226,0.55)] focus:outline-none focus:border-paper disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={busy}
                className="font-mono text-[12px] tracking-[0.14em] uppercase bg-paper text-forest border-none py-[15px] rounded-[3px] cursor-pointer font-semibold hover:bg-paper-2 transition-colors disabled:opacity-80 disabled:cursor-default"
              >
                {subscribeLabel(status, "Subscribe — free →", "✓ Subscribed — check your inbox")}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-2 font-mono text-[10px] tracking-[0.04em] text-[#f1d9c0]">{error}</p>
            )}
            <div className="mt-[13px] font-mono text-[10px] tracking-[0.08em] text-[#bcd9c5]">
              No spam · unsubscribe anytime · 14,200 readers
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
}

function TiersSection() {
  return (
    <section className="py-[82px] border-b border-line-2" id="tiers">
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
        <div className="flex items-baseline gap-[18px] mb-10">
          <span className="font-mono text-[12px] text-money">$</span>
          <h3 className="font-spectral font-medium text-[26px] m-0">Two Ways to Read</h3>
          <span className="flex-1 h-px bg-line" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            Free forever · upgrade anytime
          </span>
        </div>
        <div className="grid grid-cols-2 border border-line-2 rounded-card overflow-hidden max-[900px]:grid-cols-1">
          {/* Free tier */}
          <div className="px-[38px] py-10 border-r border-line-2 bg-paper max-[900px]:border-r-0 max-[900px]:border-b">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-money mb-[18px]">
              The Weekly Edition
            </div>
            <div className="font-spectral font-light text-[54px] leading-none mb-1">
              Free<span className="font-mono text-[13px] tracking-[0.04em] align-baseline ml-1">/ forever</span>
            </div>
            <p className="text-[14px] text-ink-soft mt-0 mb-[26px]">The whole world, once a week.</p>
            <ul className="list-none m-0 mb-7 p-0">
              {["One deep-dive explainer every Thursday", "Regional desk briefs + commentary", "Plain-English, no-jargon promise", "Read in 6 minutes or less"].map((item) => (
                <li key={item} className="flex gap-[11px] text-[15px] py-[11px] border-b border-line last:border-b-0">
                  <span className="font-mono text-money">→</span> {item}
                </li>
              ))}
            </ul>
            <Link
              href="#subscribe"
              className="block text-center font-mono text-[12px] tracking-[0.14em] uppercase px-4 py-[15px] rounded-btn border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              Subscribe free
            </Link>
          </div>
          {/* Premium tier */}
          <div className="px-[38px] py-10 bg-forest text-paper relative">
            <span className="absolute top-0 right-0 bg-gold text-ink font-mono text-[10px] tracking-[0.14em] uppercase px-[14px] py-1.5 rounded-bl-card font-semibold">
              Most Popular
            </span>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold mb-[18px]">
              The Ledger — Premium
            </div>
            <div className="font-spectral font-light text-[54px] leading-none mb-1">
              $8<span className="font-mono text-[13px] tracking-[0.04em] align-baseline ml-1">/mo · $80/yr</span>
            </div>
            <p className="text-[14px] text-[#bcd9c5] mt-0 mb-[26px]">For the seriously curious.</p>
            <ul className="list-none m-0 mb-7 p-0">
              {["Everything in Free, plus the full archive", "Country tax playbooks — 40+ jurisdictions", "Monthly live Q&A with the editors", "Data drops & downloadable models"].map((item) => (
                <li key={item} className="flex gap-[11px] text-[15px] py-[11px] border-b border-[rgba(188,217,197,0.2)] last:border-b-0 text-paper">
                  <span className="font-mono text-[#bcd9c5]">→</span> {item}
                </li>
              ))}
            </ul>
            <Link
              href="/premium"
              className="block text-center font-mono text-[12px] tracking-[0.14em] uppercase px-4 py-[15px] rounded-btn bg-paper text-forest font-semibold hover:bg-paper-2 transition-colors"
            >
              Go Premium →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const { status, error, subscribe } = useSubscribe("home-final-cta");
  const busy = status === "loading" || status === "success";
  return (
    <section className="py-[92px] relative overflow-hidden">
      <div className="meridian-container meridian-centered" aria-hidden="true">
        <svg
          className="meridian-svg"
          viewBox="0 0 400 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ left: "50%", right: "auto", transform: "translate(-50%,-50%)" }}
        >
          <circle cx="200" cy="200" r="190" />
          <circle cx="200" cy="200" r="120" />
          <circle cx="200" cy="200" r="60" />
          <ellipse cx="200" cy="200" rx="80" ry="190" />
          <line x1="10" y1="200" x2="390" y2="200" />
        </svg>
      </div>
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] relative z-[2] text-center">
        <div className="flex justify-center gap-[26px] mb-[34px] font-mono text-[10.5px] tracking-[0.14em] uppercase text-ink-soft flex-wrap">
          <span className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-money before:rounded-full">
            Filed weekly from everywhere
          </span>
        </div>
        <h2
          className="font-spectral font-light text-[clamp(38px,5vw,68px)] leading-[1.02] tracking-[-0.018em] mb-[14px]"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          Read the world&apos;s tax stories,
          <br />
          <strong className="font-semibold text-forest">starting this Thursday.</strong>
        </h2>
        <p className="text-ink-soft text-[18px] max-w-[40ch] mx-auto mb-[30px]">
          Join 14,200 founders, students, and curious minds across 70 countries.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); subscribeFromForm(e.currentTarget, subscribe); }}
          className="flex gap-2.5 max-w-[500px] mx-auto max-sm:flex-col"
        >
          <Honeypot />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            disabled={busy}
            className="flex-1 font-spectral text-[16px] px-4 py-4 bg-paper-2 border border-line-2 rounded-[3px] text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-forest disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy}
            className="font-mono text-[12px] tracking-[0.12em] uppercase bg-forest text-paper px-7 py-0 rounded-[3px] hover:bg-forest-2 transition-colors cursor-pointer font-medium whitespace-nowrap max-sm:py-4 disabled:opacity-80 disabled:cursor-default"
          >
            {subscribeLabel(status, "Subscribe", "✓ Done")}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-3 font-mono text-[11px] tracking-[0.04em] text-[#9a3b2c]">{error}</p>
        )}
      </div>
    </section>
  );
}
