"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MeridianMotif } from "@/components/MeridianMotif";
import { Honeypot } from "@/components/Honeypot";
import { useSubscribe, subscribeFromForm, subscribeLabel } from "@/lib/useSubscribe";
import { TOPICS, REGIONS, FEATURED_ISSUE, LIST_ISSUES, type IssueRow } from "@/lib/issues-list";

const ALL_ISSUES = [FEATURED_ISSUE, ...LIST_ISSUES];
const TOTAL = ALL_ISSUES.length;

export default function IssuesArchivePage() {
  const [topic, setTopic] = useState("all");
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");

  function matches(issue: IssueRow) {
    const q = query.toLowerCase();
    const okT = topic === "all" || issue.topic === topic;
    const okR = region === "all" || issue.region === region;
    const okQ =
      !q ||
      issue.searchTerms.includes(q) ||
      issue.topic.toLowerCase().includes(q) ||
      issue.region.toLowerCase().includes(q) ||
      issue.title.toLowerCase().includes(q);
    return okT && okR && okQ;
  }

  const featuredVisible = matches(FEATURED_ISSUE);
  const visibleList = LIST_ISSUES.filter(matches);
  const shownCount = (featuredVisible ? 1 : 0) + visibleList.length;
  const isFiltered = topic !== "all" || region !== "all" || query !== "";

  function clearAll() {
    setTopic("all");
    setRegion("all");
    setQuery("");
  }

  return (
    <>
      <Nav />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "The Archive" }]} />

      {/* Header */}
      <header className="relative overflow-hidden border-b border-line-2">
        <MeridianMotif />
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] relative z-[2] pt-[58px] pb-[50px]">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-money mb-5">The Archive</div>
          <h1
            className="font-spectral font-light text-[clamp(42px,5.6vw,76px)] leading-[1.0] tracking-[-0.022em] mb-5"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            Every issue, <strong className="font-semibold text-forest">one place</strong>.
          </h1>
          <p className="text-[20px] text-ink-soft max-w-[56ch] m-0 leading-[1.5]">
            One country, one idea, every Thursday — the full back catalogue. Filter by
            topic or region, or search for the jurisdiction on your mind.
          </p>
        </div>
      </header>

      {/* Sticky filter controls */}
      <div className="sticky top-16 z-40 bg-paper border-b border-line-2 max-sm:static">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] py-5">
          {/* Row 1: Topics + Search */}
          <div className="flex gap-[22px] items-start flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-ink-soft mb-2">Filter by topic</div>
              <div className="flex gap-[7px] flex-wrap">
                <Chip label="All topics" active={topic === "all"} onClick={() => setTopic("all")} />
                {TOPICS.map((t) => (
                  <Chip key={t} label={t} active={topic === t} onClick={() => setTopic(t)} />
                ))}
              </div>
            </div>
            <div className="flex-[0_0_260px] max-[860px]:flex-[1_1_100%]">
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-ink-soft mb-2">Search</div>
              <div className="relative">
                <svg
                  className="absolute left-3 bottom-[11px] w-[15px] h-[15px] text-ink-soft"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
                <input
                  type="text"
                  placeholder="e.g. Estonia, VAT, minimum tax…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full font-spectral text-[15px] px-[13px] pl-[34px] py-[9px] border border-line-2 rounded-[30px] bg-paper text-ink focus:outline-none focus:border-forest"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Regions */}
          <div className="mt-4">
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-ink-soft mb-2">Filter by region</div>
            <div className="flex gap-[7px] flex-wrap">
              <Chip label="All regions" active={region === "all"} onClick={() => setRegion("all")} />
              {REGIONS.map((r) => (
                <Chip key={r} label={r} active={region === r} onClick={() => setRegion(r)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] pt-0 pb-[60px]">
        {/* Results meta */}
        <div className="pt-6 pb-1.5 flex items-baseline justify-between gap-4 flex-wrap">
          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-soft">
            Showing <strong className="text-forest">{shownCount}</strong> of {TOTAL} issues
          </div>
          {isFiltered && (
            <button
              onClick={clearAll}
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-gold border-b border-gold pb-0.5 cursor-pointer hover:text-gold-l transition-colors"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Featured latest issue */}
        {featuredVisible && (
          <Link
            href={`/issues/${FEATURED_ISSUE.slug}`}
            className="group mt-7 mb-2.5 border border-line-2 rounded-fig overflow-hidden bg-paper grid grid-cols-[1.5fr_1fr] max-[860px]:grid-cols-1 hover:border-money transition-colors block"
          >
            <div className="p-[34px_36px]">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-gold mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                Latest issue · {FEATURED_ISSUE.number}
              </div>
              <h2 className="font-spectral font-medium text-[32px] leading-[1.1] mb-3 tracking-[-0.01em]">
                {FEATURED_ISSUE.title}
              </h2>
              <p className="text-[16px] text-ink-soft mb-5 leading-[1.5] max-w-[48ch]">
                {FEATURED_ISSUE.dek}
              </p>
              <div className="flex gap-2 flex-wrap items-center">
                <Tag variant="topic">{FEATURED_ISSUE.topic}</Tag>
                <Tag variant="region">Europe · Estonia</Tag>
                <Tag variant="free">Free · {FEATURED_ISSUE.readTime}</Tag>
              </div>
            </div>
            <div className="bg-forest text-paper relative overflow-hidden flex flex-col justify-center p-[34px_32px]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 31px,rgba(188,217,197,.13) 31px,rgba(188,217,197,.13) 32px)",
                }}
              />
              <div className="relative font-mono text-[11px] tracking-[0.14em] text-[#bcd9c5] mb-2">
                Filed · Tallinn
              </div>
              <div className="relative font-spectral font-light text-[64px] leading-[0.92] tracking-[-0.02em]">
                0%
              </div>
              <div className="relative font-mono text-[10px] tracking-[0.1em] uppercase text-[#bcd9c5] mt-2">
                on reinvested profit
              </div>
              <span className="relative mt-[22px] font-mono text-[11px] tracking-[0.12em] uppercase text-paper border-b border-paper pb-0.5 self-start">
                Read the issue →
              </span>
            </div>
          </Link>
        )}

        {/* Issue list */}
        <div className="mt-2">
          {visibleList.map((issue) => (
            <IssueRow key={issue.number} issue={issue} />
          ))}
        </div>

        {/* Empty state */}
        {shownCount === 0 && (
          <div className="text-center py-16 text-ink-soft">
            <div className="font-spectral text-[24px] text-ink mb-2">No issues match those filters.</div>
            <div className="text-[15px]">Try removing a filter or searching a different term.</div>
          </div>
        )}

        {/* Signup strip */}
        <SignupStrip />
      </main>

      <Footer />
    </>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10px] tracking-[0.1em] uppercase px-[13px] py-[7px] border rounded-[30px] cursor-pointer transition-all duration-150 whitespace-nowrap ${
        active
          ? "bg-forest text-paper border-forest"
          : "bg-paper text-ink-soft border-line-2 hover:border-forest hover:text-forest"
      }`}
    >
      {label}
    </button>
  );
}

function Tag({ variant, children }: { variant: "topic" | "region" | "free" | "premium"; children: React.ReactNode }) {
  const base = "font-mono text-[9px] tracking-[0.12em] uppercase px-[10px] py-1 rounded-btn";
  const variants = {
    topic: "bg-forest text-paper",
    region: "border border-line-2 text-money",
    free: "text-gold",
    premium: "text-gold",
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

function IssueRow({ issue }: { issue: IssueRow }) {
  const inner = (
    <>
      <div className="font-mono text-[13px] text-money tracking-[0.04em]">{issue.number}</div>
      <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-soft">{issue.date}</div>
      <div className="min-w-0">
        <h3 className="font-spectral font-medium text-[21px] leading-[1.18] mb-[7px] group-hover:text-forest transition-colors">
          {issue.title}
        </h3>
        <p className="text-[14px] text-ink-soft mb-2.5 leading-[1.45] max-w-[64ch]">{issue.dek}</p>
        <div className="flex gap-[7px] flex-wrap items-center">
          <span className="font-mono text-[8.5px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-btn border border-[rgba(58,125,87,0.4)] text-money">
            {issue.topic}
          </span>
          <span className="font-mono text-[8.5px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-btn border border-line text-ink-soft">
            {issue.region}
          </span>
        </div>
      </div>
      <div className="text-right font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft whitespace-nowrap">
        <span className={`block mb-[5px] ${issue.access === "free" ? "text-money" : "text-gold"}`}>
          {issue.access === "free" ? "Free" : "Premium"}
        </span>
        {issue.readTime}
        {issue.slug && (
          <span className="block text-forest mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        )}
      </div>
    </>
  );

  const rowClass =
    "group grid items-center py-[22px] border-b border-line transition-all duration-[160ms] max-[860px]:grid-cols-[54px_1fr] max-[860px]:gap-x-4 max-[860px]:gap-y-0";
  const desktopCols = "grid-cols-[70px_104px_1fr_auto] gap-6";

  if (issue.slug) {
    return (
      <Link
        href={`/issues/${issue.slug}`}
        className={`${rowClass} ${desktopCols} hover:bg-paper-2 hover:px-[14px] hover:rounded-card`}
      >
        {inner}
      </Link>
    );
  }
  return (
    <div className={`${rowClass} ${desktopCols}`}>
      {inner}
    </div>
  );
}

function SignupStrip() {
  const { status, error, subscribe } = useSubscribe("archive-strip");
  const busy = status === "loading" || status === "success";
  return (
    <div className="mt-[46px] bg-forest text-paper rounded-fig px-10 py-9 grid grid-cols-[1fr_auto] gap-[30px] items-center max-[860px]:grid-cols-1">
      <div>
        <h3 className="font-spectral font-normal text-[27px] m-0 mb-1.5">Never miss the next one.</h3>
        <p className="text-[15px] text-[#cfe0d4] m-0">
          New issue every Thursday — free, in plain English, with the data to back it.
        </p>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); subscribeFromForm(e.currentTarget, subscribe); }}
        className="flex flex-col gap-1.5 min-w-[340px] max-[860px]:min-w-0"
      >
        <div className="flex gap-[9px]">
          <Honeypot />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            disabled={busy}
            className="flex-1 font-spectral text-[15px] px-[14px] py-[13px] border border-[rgba(243,239,226,0.3)] bg-[rgba(243,239,226,0.07)] text-paper rounded-[3px] placeholder:text-[rgba(243,239,226,0.55)] focus:outline-none focus:border-paper disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy}
            className="font-mono text-[12px] tracking-[0.1em] uppercase bg-paper text-forest border-none px-[22px] rounded-[3px] cursor-pointer font-semibold hover:bg-paper-2 transition-colors whitespace-nowrap disabled:opacity-80 disabled:cursor-default"
          >
            {subscribeLabel(status, "Subscribe — free", "✓ Subscribed")}
          </button>
        </div>
        {status === "error" && (
          <p className="font-mono text-[10px] tracking-[0.04em] text-[#f1d9c0] m-0">{error}</p>
        )}
      </form>
    </div>
  );
}
