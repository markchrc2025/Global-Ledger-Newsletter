import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIssue, getAllIssueSlugs } from "@/lib/issues";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleHeader } from "@/components/ArticleHeader";
import { AtAGlanceStrip } from "@/components/AtAGlanceStrip";
import { CompareChart } from "@/components/charts/CompareChart";
import { ColumnChart } from "@/components/charts/ColumnChart";
import { HBarChart } from "@/components/charts/HBarChart";
import { InlineSignup } from "@/components/InlineSignup";
import { DataTable } from "@/components/DataTable";
import { SourcesBox } from "@/components/SourcesBox";
import { FinalCTA } from "@/components/FinalCTA";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllIssueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssue(slug);
  if (!issue) return {};
  return {
    title: issue.title,
    description: issue.metaDescription,
    alternates: { canonical: `/issues/${slug}` },
  };
}

export default async function IssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = await getIssue(slug);
  if (!issue) notFound();

  return (
    <>
      <ReadingProgress />
      <Nav />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: issue.topic, href: `/topics/${issue.topic.toLowerCase().replace(/\s+/g, "-")}` },
          { label: `${issue.number} · The Estonia Issue` },
        ]}
      />

      {/* Article header */}
      <ArticleHeader
        topic={issue.topic}
        region={issue.region}
        access={issue.access}
        title={
          <span
            dangerouslySetInnerHTML={{ __html: issue.titleHtml }}
          />
        }
        standfirst={issue.standfirst}
        issueNumber={issue.number}
        readTime={issue.readTime}
        publishDate={issue.publishDate}
        author={issue.author}
      />

      {/* At-a-glance strip */}
      <AtAGlanceStrip stats={issue.atAGlance} />

      {/* Article body */}
      <article className="py-[60px] pb-[30px]">
        <div className="max-w-read-col mx-auto px-[46px] max-sm:px-[22px]">

          {/* Opening paragraphs */}
          <div
            className="[&>p]:text-[19px] [&>p]:leading-[1.7] [&>p]:mb-6 [&_em]:italic [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: issue.bodyHtml }}
          />

          {/* Figure 1 — Compare chart */}
          <CompareChart {...issue.figure1} />

          {/* Section 01 */}
          <h2 className="font-spectral font-medium text-[32px] leading-[1.1] mt-[50px] mb-[18px] tracking-[-0.012em]">
            <span className="font-mono text-[13px] text-money tracking-[0.1em] block mb-2.5">
              01 · The mechanism
            </span>
            Deferral, not exemption
          </h2>
          <p className="text-[19px] leading-[1.7] mb-6">
            A common misread is that Estonia is a tax haven. It isn&apos;t. The profit{" "}
            <em>is</em> taxed — eventually, at a fully normal European rate. What&apos;s
            unusual is the <strong>timing</strong>. By moving the trigger from &quot;when
            earned&quot; to &quot;when distributed,&quot; Estonia hands every company an
            interest-free loan equal to the tax it hasn&apos;t paid yet, on the condition
            that the money keeps doing work inside the business.
          </p>
          <p className="text-[19px] leading-[1.7] mb-6">
            That single design choice is why the country punches far above its size in
            startups per capita, and why founders from Lisbon to Lagos cite it as the
            system they wish they had. The rate isn&apos;t the headline.{" "}
            <strong>The trigger is.</strong>
          </p>

          {/* Pull quote */}
          <blockquote className="pullquote px-0 pl-7 my-10 font-spectral italic font-normal text-[27px] leading-[1.32] text-forest">
            Estonia didn&apos;t lower the price of tax. It changed the moment you pay —
            and that changed everything.
          </blockquote>

          <p className="text-[19px] leading-[1.7] mb-6">
            There&apos;s a catch worth stating plainly, because this newsletter doesn&apos;t
            sell fairy tales: the rate has been climbing. Estonia raised its corporate rate
            from 20% to 22% in January 2025, abolished the old reduced 14% rate on regular
            distributions, and has a further increase to 24% scheduled for 2026. The{" "}
            <em>structure</em> is the draw — not a permanently low number.
          </p>

          {/* Figure 2 — Column chart */}
          <ColumnChart {...issue.figure2} />

          {/* Section 02 */}
          <h2 className="font-spectral font-medium text-[32px] leading-[1.1] mt-[50px] mb-[18px] tracking-[-0.012em]">
            <span className="font-mono text-[13px] text-money tracking-[0.1em] block mb-2.5">
              02 · The context
            </span>
            Where 22% actually sits
          </h2>
          <p className="text-[19px] leading-[1.7] mb-6">
            Strip away the timing and Estonia&apos;s rate is unremarkable — squarely mid-pack
            for Europe and close to the OECD average. The international story of the last
            few years isn&apos;t a race to the bottom anymore; statutory rates have{" "}
            <strong>stabilised</strong>, and a new floor has appeared underneath them.
            Here&apos;s the global field, with the OECD&apos;s Pillar Two 15% minimum
            marked.
          </p>

          {/* Figure 3 — Horizontal bar chart */}
          <HBarChart {...issue.figure3} />

          <p className="text-[19px] leading-[1.7] mb-6">
            The takeaway isn&apos;t that 22% is cheap — it plainly isn&apos;t. It&apos;s
            that Estonia competes on <em>when</em> rather than <em>how much</em>, and that
            turns out to matter more to a growing company than a couple of points on the
            headline rate ever could.
          </p>

          {/* Inline signup */}
          <InlineSignup
            headline="Enjoying the Estonia issue?"
            subtext="One country, one idea, one Thursday — straight to your inbox. Free, forever."
          />

          {/* Section 03 */}
          <h2 className="font-spectral font-medium text-[32px] leading-[1.1] mt-[50px] mb-[18px] tracking-[-0.012em]">
            <span className="font-mono text-[13px] text-money tracking-[0.1em] block mb-2.5">
              03 · By the numbers
            </span>
            The reference table
          </h2>
          <p className="text-[19px] leading-[1.7] mb-6">
            The figures behind this issue, in one place — the part you can screenshot and
            come back to.
          </p>

          {/* Data table */}
          <DataTable
            rows={issue.byTheNumbers.rows}
            caption={issue.byTheNumbers.caption}
            source={issue.byTheNumbers.source}
          />

          <p className="text-[19px] leading-[1.7] mb-6">
            Next week we follow the thread to the Gulf, where the UAE has just ended its
            own zero-tax era with a 9% corporate rate — the mirror image of Estonia&apos;s
            bet. Same question, opposite answer.
          </p>

          {/* Sources */}
          <SourcesBox sources={issue.sources} asOfDate={issue.asOfDate} />
        </div>
      </article>

      {/* Related articles */}
      <section className="border-t border-line-2 py-14">
        <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px]">
          <div className="flex items-baseline gap-[18px] mb-7">
            <span className="font-mono text-[12px] text-money">⊕</span>
            <h3 className="font-spectral font-medium text-[24px] m-0">Read Next</h3>
            <span className="flex-1 h-px bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              From the same hubs
            </span>
          </div>
          <div
            className="related-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}
          >
            {issue.related.map((card, i) => (
              <RelatedCard key={i} {...card} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer issueNumber={issue.number} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: issue.title,
            description: issue.metaDescription,
            datePublished: issue.publishDate,
            author: { "@type": "Organization", name: "The Global Ledger" },
          }),
        }}
      />
    </>
  );
}

function RelatedCard({
  hub,
  title,
  dek,
  href,
}: {
  hub: string;
  title: string;
  dek: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-money mb-3">{hub}</div>
      <h4 className="font-spectral font-medium text-[19px] leading-[1.18] mb-2">{title}</h4>
      <p className="text-[13.5px] text-ink-soft m-0 leading-[1.45]">{dek}</p>
    </>
  );

  const className =
    "block border border-line-2 rounded-card px-[22px] py-6 transition-all duration-[180ms] hover:bg-paper-2 hover:-translate-y-0.5";

  return href ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}
