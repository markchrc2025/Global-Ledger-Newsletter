export interface ColumnBar {
  year: string;
  value: string;
  heightPercent: number;
  variant: "past" | "current" | "future";
  subLabel?: string;
}

export interface ColumnChartProps {
  kicker: string;
  title: string;
  bars: ColumnBar[];
  caption: string;
  source: string;
}

export function ColumnChart({ kicker, title, bars, caption, source }: ColumnChartProps) {
  return (
    <figure className="border border-line-2 rounded-fig overflow-hidden bg-paper my-11">
      {/* Header */}
      <div className="px-[26px] py-[22px] pb-[18px] border-b border-line">
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-money mb-2.5">
          {kicker}
        </div>
        <p className="font-spectral font-medium text-[21px] leading-[1.2] m-0">{title}</p>
      </div>

      {/* Body */}
      <div className="px-[26px] py-7">
        {/* Bars */}
        <div className="flex items-end gap-0 h-[230px] border-b-2 border-line-2 relative pt-2.5">
          {bars.map((bar) => (
            <div
              key={bar.year}
              className="flex-1 flex flex-col items-center justify-end h-full relative"
            >
              <div
                className={`w-16 max-sm:w-11 rounded-t relative flex justify-center col-bar ${
                  bar.variant === "current"
                    ? "bg-forest"
                    : bar.variant === "future"
                    ? "col-bar-future"
                    : "bg-money"
                }`}
                style={{ height: `${bar.heightPercent}%` }}
              >
                <span className="absolute -top-[26px] font-spectral text-[21px] text-ink">
                  {bar.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* X axis labels */}
        <div className="flex mt-3">
          {bars.map((bar) => (
            <div
              key={bar.year}
              className="flex-1 text-center font-mono text-[11px] tracking-[0.06em] text-ink-soft"
            >
              {bar.year}
              {bar.subLabel && (
                <b className="block text-forest font-semibold mt-0.5 text-[9px] tracking-[0.1em]">
                  {bar.subLabel}
                </b>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <figcaption className="px-[26px] py-[14px] pb-[18px] border-t border-line text-[13px] text-ink-soft leading-[1.5] flex justify-between gap-5 flex-wrap">
        <span>{caption}</span>
        <span className="font-mono text-[9.5px] tracking-[0.06em] uppercase whitespace-nowrap">
          {source}
        </span>
      </figcaption>
    </figure>
  );
}
