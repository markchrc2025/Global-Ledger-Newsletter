import type { GlanceStat } from "@/components/AtAGlanceStrip";
import type { CompareChartProps } from "@/components/charts/CompareChart";
import type { ColumnChartProps } from "@/components/charts/ColumnChart";
import type { HBarChartProps } from "@/components/charts/HBarChart";
import type { DataRow } from "@/components/DataTable";
import type { Source } from "@/components/SourcesBox";

export interface RelatedArticle {
  hub: string;
  title: string;
  dek: string;
  href?: string;
}

export type ChartData =
  | ({ type: "compare" } & Omit<CompareChartProps, "type">)
  | ({ type: "column" } & Omit<ColumnChartProps, "type">)
  | ({ type: "hbar" } & Omit<HBarChartProps, "type">);

export interface Issue {
  slug: string;
  number: string;
  title: string;
  titleHtml: string;
  standfirst: string;
  topic: string;
  region: string;
  access: "free" | "premium";
  readTime: string;
  publishDate: string;
  author: string;
  metaDescription: string;
  atAGlance: GlanceStat[];
  bodyHtml: string;
  figure1: CompareChartProps;
  figure2: ColumnChartProps;
  figure3: HBarChartProps;
  byTheNumbers: {
    rows: DataRow[];
    caption: string;
    source: string;
  };
  sources: Source[];
  asOfDate: string;
  related: RelatedArticle[];
}
