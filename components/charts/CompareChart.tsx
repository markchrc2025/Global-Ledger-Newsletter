export interface CompareBox {
  label: string;
  scene: string;
  bigValue: string;
  subLabel: string;
  barPercent: number;
  variant: "zero" | "tax";
}

export interface CompareChartProps {
  kicker: string;
  title: string;
  boxes: [CompareBox, CompareBox];
  caption: string;
  source: string;
}

export function CompareChart({ kicker, title, boxes, caption, source }: CompareChartProps) {
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
      <div className="px-[26px] py-7">
        <div className="grid grid-cols-2 gap-[18px] max-[920px]:grid-cols-1">
          {boxes.map((box) => (
            <div
              key={box.variant}
              className={`rounded-card px-6 py-[26px] ${
                box.variant === "zero"
                  ? "bg-paper-2 border border-line"
                  : "bg-forest text-paper"
              }`}
            >
              <div
                className={`font-mono text-[10px] tracking-[0.12em] uppercase mb-1.5 ${
                  box.variant === "zero" ? "text-money" : "text-[#bcd9c5]"
                }`}
              >
                {box.label}
              </div>
              <div
                className={`text-[14px] opacity-85 mb-[18px] min-h-[40px] ${
                  box.variant === "zero" ? "text-ink" : "text-paper"
                }`}
              >
                {box.scene}
              </div>
              <div
                className={`font-spectral font-light text-[62px] leading-[0.95] tracking-[-0.02em] ${
                  box.variant === "zero" ? "text-forest" : "text-paper"
                }`}
              >
                {box.bigValue}
              </div>
              <div className="font-mono text-[10px] tracking-[0.08em] uppercase mt-2.5 opacity-80">
                {box.subLabel}
              </div>
              {/* Mini bar */}
              <div
                className={`h-2 rounded mt-[18px] overflow-hidden ${
                  box.variant === "zero"
                    ? "bg-[rgba(22,32,26,0.12)]"
                    : "bg-[rgba(243,239,226,0.18)]"
                }`}
              >
                <div
                  className="h-full rounded col-bar"
                  style={{
                    width: `${box.barPercent}%`,
                    background:
                      box.variant === "zero"
                        ? "var(--money)"
                        : "var(--paper)",
                  }}
                />
              </div>
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
