"use client";

import { useSubscribe, subscribeFromForm, subscribeLabel } from "@/lib/useSubscribe";
import { Honeypot } from "./Honeypot";

export function InlineSignup({
  headline,
  subtext,
}: {
  headline: string;
  subtext: string;
}) {
  const { status, error, subscribe } = useSubscribe("inline-signup");
  const busy = status === "loading" || status === "success";

  return (
    <div
      id="subscribe"
      className="bg-forest text-paper rounded-fig px-[38px] py-[34px] my-12 inlsign-grid relative overflow-hidden"
      style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "28px", alignItems: "center" }}
    >
      <div>
        <h3 className="font-spectral font-normal text-[26px] leading-[1.15] mb-2">{headline}</h3>
        <p className="text-[15px] text-[#cfe0d4] m-0">{subtext}</p>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); subscribeFromForm(e.currentTarget, subscribe); }}
        className="flex flex-col gap-[9px] min-w-[300px] max-[920px]:min-w-0"
      >
        <Honeypot />
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          disabled={busy}
          className="font-spectral text-[15px] px-[14px] py-[13px] border border-[rgba(243,239,226,0.3)] bg-[rgba(243,239,226,0.07)] text-paper rounded-[3px] placeholder:text-[rgba(243,239,226,0.55)] focus:outline-none focus:border-paper disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy}
          className="font-mono text-[12px] tracking-[0.12em] uppercase bg-paper text-forest border-none py-[13px] rounded-[3px] cursor-pointer font-semibold hover:bg-paper-2 transition-colors disabled:opacity-80 disabled:cursor-default"
        >
          {subscribeLabel(status, "Subscribe — free →", "✓ Subscribed — see you Thursday")}
        </button>
        {status === "error" && (
          <p className="font-mono text-[10px] tracking-[0.04em] text-[#f1d9c0] m-0">{error}</p>
        )}
      </form>
    </div>
  );
}
