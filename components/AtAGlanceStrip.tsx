export interface GlanceStat {
  value: string;
  unit?: string;
  label: string;
  source: string;
}

export function AtAGlanceStrip({ stats }: { stats: GlanceStat[] }) {
  return (
    <section className="border-b border-line-2 bg-paper-2">
      <div className="max-w-[980px] mx-auto px-[46px] max-sm:px-[22px] py-[30px]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-money mb-5 flex items-center gap-3 after:flex-1 after:h-px after:bg-line">
          At a glance · the reference figures
        </div>
        <div
          className="glance-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${i === 0 ? "pl-0 pr-7" : i === stats.length - 1 ? "pr-0 pl-7 border-r-0" : "px-7"} border-r border-line max-sm:border-r-0 max-sm:border-b max-sm:border-line max-sm:pb-[18px] max-sm:last:border-b-0`}
            >
              <div className="font-spectral font-normal text-[46px] leading-none text-forest tracking-[-0.01em]">
                {stat.value}
                {stat.unit && (
                  <span className="text-[22px]">{stat.unit}</span>
                )}
              </div>
              <div
                className="text-[14.5px] text-ink mt-2.5 leading-[1.35]"
                dangerouslySetInnerHTML={{ __html: stat.label }}
              />
              <div className="font-mono text-[8.5px] tracking-[0.08em] uppercase text-ink-soft mt-2.5">
                {stat.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
