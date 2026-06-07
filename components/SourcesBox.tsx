export interface Source {
  org: string;
  detail: string;
}

export function SourcesBox({
  sources,
  asOfDate,
}: {
  sources: Source[];
  asOfDate: string;
}) {
  return (
    <div className="border border-line-2 rounded-fig bg-paper-2 px-[30px] py-7 my-[46px] mb-2.5">
      <h4 className="font-mono text-[11px] tracking-[0.14em] uppercase text-money m-0 mb-4">
        Sources &amp; methodology
      </h4>
      <ol className="m-0 pl-5">
        {sources.map((src, i) => (
          <li key={i} className="text-[14px] text-ink-soft leading-[1.5] mb-2.5">
            <strong className="text-ink font-medium">{src.org}</strong>{" "}
            — {src.detail}
          </li>
        ))}
      </ol>
      <div className="mt-4 pt-[14px] border-t border-line font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft">
        Figures as of {asOfDate} · reviewed on each update
      </div>
      <p className="text-[13px] italic text-ink-soft mt-3 leading-[1.5]">
        This is editorial analysis, not tax advice. Rates and rules change and
        vary by circumstance — confirm current figures with a qualified adviser
        before acting.
      </p>
    </div>
  );
}
