"use client";

import { MeridianMotif } from "./MeridianMotif";
import { Honeypot } from "./Honeypot";
import { useSubscribe, subscribeFromForm, subscribeLabel } from "@/lib/useSubscribe";

export function FinalCTA() {
  const { status, error, subscribe } = useSubscribe("article-final-cta");
  const busy = status === "loading" || status === "success";

  return (
    <section className="py-20 relative overflow-hidden border-t border-line-2 bg-paper-2">
      <MeridianMotif centered />
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] relative z-[2] text-center">
        <h2
          className="font-spectral font-light text-hero-sm mb-4 text-ink"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          One country. One idea.{" "}
          <strong className="font-semibold text-forest">Every Thursday.</strong>
        </h2>
        <p className="text-ink-soft text-[18px] max-w-[40ch] mx-auto mb-8">
          Join 14,200 founders, students, and curious minds reading the world&apos;s
          tax stories in plain English — with the data to back them.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); subscribeFromForm(e.currentTarget, subscribe); }}
          className="flex gap-2.5 max-w-[480px] mx-auto max-sm:flex-col"
        >
          <Honeypot />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            disabled={busy}
            className="flex-1 font-spectral text-[16px] px-4 py-4 bg-paper border border-line-2 rounded-[3px] text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-forest disabled:opacity-60"
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
          <p className="font-mono text-[11px] tracking-[0.04em] text-[#9a3b2c] mt-3">{error}</p>
        )}
      </div>
    </section>
  );
}
