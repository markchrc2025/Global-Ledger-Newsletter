export interface HBar {
  name: string;
  value: string;
  widthPercent: number;
  variant?: "highlight" | "muted" | "default";
}

export interface HBarChartProps {
  kicker: string;
  title: string;
  bars: HBar[];
  referenceLine?: {
    leftPercent: number;
    label: string;
  };
  axisLabels: string[];
  caption: string;
  source: string;
}

export function HBarChart({
  kicker,
  title,
  bars,
  referenceLine,
  axisLabels,
  caption,
  source,
}: HBarChartProps) {
  return (
    <figure className="fig-wide border border-line-2 rounded-fig overflow-hidden bg-paper my-11">
      {/* Header */}
      <div className="px-[26px] py-[22px] pb-[18px] border-b border-line">
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-money mb-2.5">
          {kicker}
        </div>
        <p className="font-spectral font-medium text-[21px] leading-[1.2] m-0">{title}</p>
      </div>

      {/* Body */}
      <div className="px-[26px] py-7 pb-6">
        <div className="relative pt-1.5">
          {/* Reference line */}
          {referenceLine && (
            <div
              className="absolute top-6 bottom-[30px] border-l-2 border-dashed border-gold z-[5]"
              style={{ left: `${referenceLine.leftPercent}%` }}
            >
              <span className="absolute -top-[22px] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.08em] uppercase text-gold bg-paper px-1.5">
                {referenceLine.label}
              </span>
            </div>
          )}

          {/* Bars */}
          {bars.map((bar, i) => (
            <div key={i} className="mb-[15px] relative z-[2]">
              <div className="flex justify-between items-baseline mb-1.5">
                <span
                  className="text-[14.5px]"
                  dangerouslySetInnerHTML={{ __html: bar.name }}
                />
                <span className="font-mono text-[12px] text-forest font-medium">
                  {bar.value}
                </span>
              </div>
              <div className="h-[18px] bg-paper-3 rounded-[3px] overflow-hidden">
                <div
                  className="h-full rounded-[3px] hbar-fill"
                  style={{
                    width: `${bar.widthPercent}%`,
                    background:
                      bar.variant === "highlight"
                        ? "var(--forest)"
                        : bar.variant === "muted"
                        ? "var(--money-l)"
                        : "var(--money)",
                    opacity: bar.variant === "muted" ? 0.55 : 1,
                  }}
                />
              </div>
            </div>
          ))}

          {/* X axis */}
          <div className="flex justify-between mt-2.5 font-mono text-[9.5px] text-ink-soft tracking-[0.06em]">
            {axisLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
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
