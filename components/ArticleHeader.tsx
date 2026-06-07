import { MeridianMotif } from "./MeridianMotif";

interface ArticleHeaderProps {
  topic: string;
  region: string;
  access: "free" | "premium";
  title: React.ReactNode;
  standfirst: string;
  issueNumber: string;
  readTime: string;
  publishDate: string;
  author: string;
}

export function ArticleHeader({
  topic,
  region,
  access,
  title,
  standfirst,
  issueNumber,
  readTime,
  publishDate,
  author,
}: ArticleHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-line-2">
      <MeridianMotif />
      <div className="max-w-read-col mx-auto px-[46px] max-sm:px-[22px] relative z-[2] pt-[60px] pb-[52px]">
        {/* Tag row */}
        <div className="flex items-center gap-3 flex-wrap mb-7">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-[11px] py-[5px] rounded-btn bg-forest text-paper whitespace-nowrap">
            {topic}
          </span>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-[11px] py-[5px] rounded-btn border border-line-2 text-money whitespace-nowrap">
            {region}
          </span>
          {access === "free" ? (
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-[11px] py-[5px] rounded-btn border border-gold text-gold whitespace-nowrap">
              Free issue
            </span>
          ) : (
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-[11px] py-[5px] rounded-btn border border-gold bg-gold text-paper whitespace-nowrap">
              Premium
            </span>
          )}
        </div>

        {/* H1 */}
        <h1
          className="font-spectral font-light text-hero leading-[1.02] tracking-[-0.022em] mb-6 max-w-[18ch]"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {title}
        </h1>

        {/* Standfirst */}
        <p className="font-spectral italic text-standfirst text-ink-soft max-w-[60ch] mb-[34px] leading-[1.45]">
          {standfirst}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-[22px] flex-wrap font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-soft pt-[22px] border-t border-line">
          <span>
            Issue <span className="text-forest font-semibold">{issueNumber}</span>
          </span>
          <Dot />
          <span>{readTime} read</span>
          <Dot />
          <span>
            Published <span className="text-forest font-semibold">{publishDate}</span>
          </span>
          <Dot />
          <span>{author}</span>
        </div>
      </div>
    </header>
  );
}

function Dot() {
  return (
    <span className="w-1 h-1 rounded-full bg-money inline-block" />
  );
}
