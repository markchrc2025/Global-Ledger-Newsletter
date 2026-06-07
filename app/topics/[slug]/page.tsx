"use client";

import { use } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MeridianMotif } from "@/components/MeridianMotif";
import { FinalCTA } from "@/components/FinalCTA";
import { Honeypot } from "@/components/Honeypot";
import { useSubscribe, subscribeFromForm, subscribeLabel } from "@/lib/useSubscribe";
import { TOPIC_HUBS } from "@/lib/topics";
import { notFound } from "next/navigation";

export default function TopicHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hub = TOPIC_HUBS[slug];
  if (!hub) notFound();

  return (
    <>
      <Nav />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Topics", href: "/topics" },
          { label: hub.slug === "corporate-tax" ? "Corporate Tax" : hub.slug },
        ]}
      />

      {/* Hub header */}
      <header className="relative overflow-hidden border-b border-line-2">
        <MeridianMotif />
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] relative z-[2] pt-[70px] pb-[60px]">
          <div className="flex items-center gap-[14px] font-mono text-[11px] tracking-[0.18em] uppercase text-money mb-[26px]">
            <svg
              className="w-[30px] h-[30px] text-forest flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <rect x="4" y="9" width="16" height="11" rx="1" />
              <path d="M8 9V6a4 4 0 0 1 8 0v3" />
              <line x1="12" y1="13" x2="12" y2="16" />
            </svg>
            Topic Hub · Pillar {hub.pillarNumber}
          </div>
          <h1
            className="font-spectral font-light text-[clamp(44px,6vw,84px)] leading-[1.0] tracking-[-0.022em] mb-6 max-w-[15ch]"
            style={{ textWrap: "pretty" } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: hub.titleHtml }}
          />
          <p className="text-[21px] text-ink-soft max-w-[60ch] mb-8 leading-[1.5]">
            {hub.standfirst}
          </p>
          {/* Hub meta bar */}
          <div className="flex border border-line-2 rounded-[5px] overflow-hidden max-w-[620px]">
            {[
              { n: hub.issueCount.toString(), l: "Issues in this hub" },
              { n: hub.jurisdictionCount.toString(), l: "Jurisdictions covered" },
              { n: "Weekly", l: "Updated as rates change" },
            ].map((m, i) => (
              <div
                key={i}
                className={`flex-1 px-[22px] py-4 ${i < 2 ? "border-r border-line" : ""}`}
              >
                <div className="font-spectral text-[28px] text-forest leading-none">{m.n}</div>
                <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-soft mt-[7px]">
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Two-column body */}
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
        <div className="grid grid-cols-[1fr_300px] gap-16 pt-16 pb-5 max-[980px]:grid-cols-1 max-[980px]:gap-0">
          {/* Essay */}
          <article>
            <EssayContent hub={hub} />
          </article>

          {/* Sidebar */}
          <aside className="sticky top-[88px] self-start max-[980px]:static max-[980px]:mt-12 max-[980px]:grid max-[980px]:grid-cols-2 max-[980px]:gap-[22px] max-sm:grid-cols-1">
            {/* TOC */}
            <div className="border border-line-2 rounded-card overflow-hidden mb-[22px] max-[980px]:mb-0">
              <h4 className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-soft m-0 px-[18px] py-[15px] border-b border-line bg-paper-2">
                On this page
              </h4>
              <div className="px-[18px] py-1.5">
                {hub.tocLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center text-[14.5px] py-[9px] border-b border-line last:border-b-0 text-ink-soft hover:text-forest transition-colors leading-[1.3]"
                  >
                    <span className="font-mono text-[10px] text-money mr-2.5">→</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar signup */}
            <SidebarSignup topic="Corporate Tax" />
          </aside>
        </div>
      </div>

      {/* Issue list */}
      <section className="border-t border-line-2 py-16" id="issues">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="flex items-baseline gap-[18px] mb-2">
            <span className="font-mono text-[12px] text-money">↻</span>
            <h3 className="font-spectral font-medium text-[27px] m-0">Every Issue in This Hub</h3>
            <span className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Newest first</span>
          </div>
          <p className="text-[16px] text-ink-soft mb-9">
            {hub.issueCount} deep dives, each tagged to its region too. Free issues open in
            full; premium issues unlock with The Ledger.
          </p>
          <div className="flex flex-col">
            {hub.issues.map((issue) => {
              const isLive = !!issue.slug;
              const inner = (
                <>
                  <div
                    className={`font-mono text-[13px] text-money tracking-[0.06em] ${!isLive ? "opacity-[0.62]" : ""}`}
                  >
                    {issue.number}
                  </div>
                  <div className={`min-w-0 ${!isLive ? "opacity-[0.62]" : ""}`}>
                    <h4 className="font-spectral font-medium text-[22px] leading-[1.15] mb-[7px] group-hover:text-forest transition-colors">
                      {issue.title}
                      {issue.access === "premium" && (
                        <span className="font-mono text-[9px] tracking-[0.1em] text-gold align-middle ml-2">
                          ◆ Premium
                        </span>
                      )}
                    </h4>
                    <p className="text-[15px] text-ink-soft m-0 leading-[1.45] max-w-[62ch]">
                      {issue.dek}
                    </p>
                    <span className="inline-block font-mono text-[9px] tracking-[0.12em] uppercase text-money border border-line-2 rounded-btn px-2 py-0.5 mt-[11px]">
                      {issue.region}
                    </span>
                  </div>
                  <div className="text-right font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft whitespace-nowrap">
                    {issue.date}
                    <span className="block text-forest mt-1.5">
                      {issue.readTime} · {issue.access === "free" ? "Free" : "Premium"}
                    </span>
                  </div>
                </>
              );

              const rowClass = `group grid grid-cols-[84px_1fr_auto] gap-[26px] items-center py-6 border-b border-line transition-all duration-[180ms] max-sm:grid-cols-1 max-sm:gap-2`;

              return isLive ? (
                <Link
                  key={issue.number}
                  href={`/issues/${issue.slug}`}
                  className={`${rowClass} hover:bg-paper-2 hover:px-[14px] hover:rounded-[5px]`}
                >
                  {inner}
                </Link>
              ) : (
                <div key={issue.number} className={`${rowClass} cursor-default`}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related hubs */}
      <section className="border-t border-line-2 py-[60px]" id="related">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="flex items-baseline gap-[18px] mb-[30px]">
            <span className="font-mono text-[12px] text-money">⊕</span>
            <h3 className="font-spectral font-medium text-[24px] m-0">Related Hubs &amp; Regions</h3>
            <span className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Keep exploring</span>
          </div>
          <div className="grid grid-cols-4 gap-4 max-[980px]:grid-cols-2 max-sm:grid-cols-1">
            {hub.relatedHubs.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`border border-line-2 rounded-[5px] px-5 py-[22px] bg-paper transition-all duration-[180ms] hover:bg-paper-2 hover:-translate-y-0.5 ${card.type === "region" ? "border-dashed" : ""}`}
              >
                <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-money mb-3">{card.label}</div>
                <h4 className="font-spectral font-medium text-[18px] m-0 mb-1.5">{card.title}</h4>
                <div className="font-mono text-[9.5px] text-ink-soft">{card.href}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </>
  );
}

function EssayContent({ hub }: { hub: (typeof TOPIC_HUBS)[string] }) {
  return (
    <>
      <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-money mb-[18px] flex items-center gap-3 after:flex-1 after:h-px after:bg-line">
        The Pillar · Start here
      </p>
      <p className="text-[22px] leading-[1.5] mb-[22px]">
        Ask a founder what their corporate tax rate is and you&apos;ll usually get a
        number. Ask what they actually <em>pay</em>, and you&apos;ll get a pause — because
        the headline rate is the least interesting thing about corporate tax.
      </p>
      <p className="drop-cap text-[18.5px] leading-[1.68] mb-[22px]">
        Every country answers the same three questions differently:{" "}
        <strong>what</strong> counts as profit, <strong>when</strong> that profit is taxed,
        and <strong>how much</strong> is left after the deductions, credits, and carve-outs
        do their work. The headline rate is just the sticker price. The real story — the
        one this hub exists to tell — lives in the timing and the definitions.
      </p>
      <p className="text-[18.5px] leading-[1.68] mb-[22px]">
        Consider two companies earning the same profit in two countries with the{" "}
        <em>same</em> 20% rate. One reinvests everything and pays almost nothing for years;
        the other distributes profit and pays in full. Same rate, wildly different outcomes.
        That gap is policy, deliberately designed — and understanding it is the difference
        between a tax bill and a tax strategy.
      </p>
      <blockquote className="pullquote px-0 pl-[26px] my-[34px] font-spectral italic font-normal text-[25px] leading-[1.34] text-forest">
        A corporate tax rate is a headline. The base it applies to is the whole novel.
      </blockquote>
      <h2 id="levers" className="font-spectral font-medium text-[30px] leading-[1.12] mt-[46px] mb-4 tracking-[-0.01em]">
        <span className="font-mono text-[13px] text-money mr-3 align-middle">01</span>
        The four levers every system pulls
      </h2>
      <p className="text-[18.5px] leading-[1.68] mb-[22px]">
        Strip away the jurisdiction-specific jargon and corporate tax everywhere is built
        from four moving parts. Learn these once and every country&apos;s system becomes
        legible:
      </p>
      <div className="bg-paper-2 border border-line rounded-card px-[26px] py-6 mb-[30px]">
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-money mb-3">
          The mechanics, in plain English
        </div>
        <p className="text-[16px] text-ink-soft m-0 leading-[1.55]">
          <strong className="text-ink">The rate</strong> — the percentage everyone quotes.{" "}
          <strong className="text-ink">The base</strong> — what that percentage applies to,
          after deductions. <strong className="text-ink">The timing</strong> — when the
          liability actually triggers (earned? distributed? realized?).{" "}
          <strong className="text-ink">The credits</strong> — the incentives that quietly
          reduce the final bill. Change any one and the effective tax rate moves, often more
          than changing the headline rate would.
        </p>
      </div>
      <h2 id="timing" className="font-spectral font-medium text-[30px] leading-[1.12] mt-[46px] mb-4 tracking-[-0.01em]">
        <span className="font-mono text-[13px] text-money mr-3 align-middle">02</span>
        Why timing is the whole game
      </h2>
      <p className="text-[18.5px] leading-[1.68] mb-[22px]">
        The most underrated lever is <em>when</em>. Estonia built a growth story on a
        single idea — tax profit only when it leaves the company — and founders worldwide
        now cite it as a model. Defer the trigger and you hand businesses an interest-free
        loan in the form of unpaid tax, reinvested in the meantime. It&apos;s the clearest
        example of our whole thesis:{" "}
        <strong>taxes aren&apos;t rules, they&apos;re incentives wearing a uniform.</strong>
      </p>
      <p className="text-[18.5px] leading-[1.68] mb-[22px]">
        That&apos;s why this hub doesn&apos;t just track rates. We track the{" "}
        <em>design</em> — because a 9% rate with a generous base can cost more than a 15%
        rate with none, and the founder who only watches the headline number gets the math
        exactly backwards.
      </p>
      <div className="bg-paper-2 border border-line rounded-card px-[26px] py-6 mb-[22px]">
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-money mb-3">
          What this hub keeps current
        </div>
        <p className="text-[16px] text-ink-soft m-0 leading-[1.55]">
          Corporate rates and rules change constantly. We maintain this page as rates move —{" "}
          <strong className="text-ink">the UAE&apos;s 9% regime, Pillar Two&apos;s 15%
            floor, Ireland&apos;s 12.5%</strong>{" "}
          — so the explainers below stay accurate rather than freezing on their publish date.
        </p>
        <p className="text-[13px] italic text-ink-soft mt-3.5 pt-3 border-t border-line m-0 leading-[1.5]">
          Editorial note: figures in each issue are correct as of publication and reviewed on
          update. Always confirm current rates with a qualified adviser before acting — tax is
          jurisdiction-specific and changes often.
        </p>
      </div>
      <p className="text-[18.5px] leading-[1.68]">
        Below: every issue we&apos;ve published on corporate tax, newest first. Start with
        Estonia if you want the idea that ties the whole hub together — then follow it
        wherever your own borders take you.
      </p>
    </>
  );
}

function SidebarSignup({ topic }: { topic: string }) {
  const { status, error, subscribe } = useSubscribe("topic-sidebar");
  const busy = status === "loading" || status === "success";
  return (
    <div className="bg-forest text-paper rounded-card px-[22px] py-6" id="subscribe">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#bcd9c5] block mb-2.5">
        Follow this topic
      </span>
      <h4 className="font-spectral font-normal text-[19px] leading-[1.2] m-0 mb-4 text-paper">
        Get every {topic} issue.
      </h4>
      <form
        onSubmit={(e) => { e.preventDefault(); subscribeFromForm(e.currentTarget, subscribe); }}
        className="flex flex-col gap-[9px]"
      >
        <Honeypot />
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          disabled={busy}
          className="font-spectral text-[14px] px-[13px] py-3 border border-[rgba(243,239,226,0.3)] bg-[rgba(243,239,226,0.06)] text-paper rounded-[3px] placeholder:text-[rgba(243,239,226,0.55)] focus:outline-none focus:border-paper disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy}
          className="font-mono text-[11px] tracking-[0.12em] uppercase bg-paper text-forest border-none py-[13px] rounded-[3px] cursor-pointer font-semibold hover:bg-paper-2 transition-colors disabled:opacity-80 disabled:cursor-default"
        >
          {subscribeLabel(status, "Subscribe — free →", "✓ Subscribed")}
        </button>
        {status === "error" && (
          <p className="font-mono text-[9px] tracking-[0.04em] text-[#f1d9c0] m-0">{error}</p>
        )}
      </form>
      <div className="font-mono text-[9px] tracking-[0.06em] text-[#bcd9c5] mt-2.5">
        Weekly · no spam · unsubscribe anytime
      </div>
    </div>
  );
}
