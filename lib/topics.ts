export interface TopicHubIssueRow {
  number: string;
  title: string;
  dek: string;
  region: string;
  date: string;
  readTime: string;
  access: "free" | "premium";
  slug?: string;
}

export interface RelatedHub {
  type: "topic" | "region";
  label: string;
  title: string;
  href: string;
}

export interface TopicHub {
  slug: string;
  pillarNumber: string;
  title: string;
  titleHtml: string;
  standfirst: string;
  metaDescription: string;
  issueCount: number;
  jurisdictionCount: number;
  tocLinks: { label: string; href: string }[];
  issues: TopicHubIssueRow[];
  relatedHubs: RelatedHub[];
}

export const TOPIC_HUBS: Record<string, TopicHub> = {
  "corporate-tax": {
    slug: "corporate-tax",
    pillarNumber: "01",
    title: "How the world taxes companies.",
    titleHtml: "How the world taxes <b>companies</b>.",
    standfirst:
      "Corporate tax is where ambition meets arithmetic. This hub is the permanent home for everything The Global Ledger publishes on how businesses are taxed — the rates, the regimes, and the structures founders actually lose sleep over.",
    metaDescription:
      "How the world taxes companies — rates, regimes, and the structures founders actually care about. Plain-English explainers from The Global Ledger.",
    issueCount: 4,
    jurisdictionCount: 12,
    tocLinks: [
      { label: "The four levers", href: "#levers" },
      { label: "Why timing wins", href: "#timing" },
      { label: "All issues (4)", href: "#issues" },
      { label: "Related hubs", href: "#related" },
    ],
    issues: [
      {
        number: "№ 27",
        title: "The country that taxes profit only when you take it out",
        dek: "Estonia's distribution-based system, and why deferral became a national growth engine founders everywhere keep citing.",
        region: "Europe · Estonia",
        date: "Jun 2026",
        readTime: "6 min",
        access: "free",
        slug: "estonia-distribution-tax",
      },
      {
        number: "№ 21",
        title: "The end of the zero-tax dream? The UAE's new 9%",
        dek: "A region built on no income tax introduces a corporate levy. What changes for founders, free zones, and the expat calculus.",
        region: "Middle East · UAE",
        date: "Apr 2026",
        readTime: "7 min",
        access: "free",
      },
      {
        number: "№ 14",
        title: "Ireland's 12.5%, and the machinery behind it",
        dek: "How a small rate plus a clever base turned one country into the headquarters of half the software you use.",
        region: "Europe · Ireland",
        date: "Feb 2026",
        readTime: "8 min",
        access: "premium",
      },
      {
        number: "№ 09",
        title: "Effective vs headline: the rate that actually matters",
        dek: "A worked example across three jurisdictions showing why the number in the press release is rarely the number you pay.",
        region: "Global",
        date: "Jan 2026",
        readTime: "6 min",
        access: "premium",
      },
    ],
    relatedHubs: [
      { type: "topic", label: "Sibling topic", title: "The Economics of Tax", href: "/topics/tax-economics" },
      { type: "topic", label: "Sibling topic", title: "Consumption Tax", href: "/topics/consumption-tax" },
      { type: "region", label: "Region", title: "Europe Desk", href: "/regions/europe" },
      { type: "region", label: "Region", title: "Middle East Desk", href: "/regions/middle-east" },
    ],
  },
};

export async function getTopicHub(slug: string): Promise<TopicHub | null> {
  return TOPIC_HUBS[slug] ?? null;
}

export function getAllTopicSlugs(): string[] {
  return Object.keys(TOPIC_HUBS);
}
