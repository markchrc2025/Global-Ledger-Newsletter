import type { Issue } from "@/lib/types";

const issue: Issue = {
  slug: "estonia-distribution-tax",
  number: "№ 27",
  title: "The country that taxes profit only when you take it out.",
  titleHtml:
    'The country that taxes profit <strong class="font-semibold text-forest">only when you take it out</strong>.',
  standfirst:
    "Estonia charges 0% on profit you reinvest and 22% the moment you distribute it. We put the numbers behind the system founders everywhere keep citing.",
  topic: "Corporate Tax",
  region: "Europe · Estonia",
  access: "free",
  readTime: "6 min",
  publishDate: "Jun 5, 2026",
  author: "By the Editors",
  metaDescription:
    "Estonia taxes corporate profit only on distribution — 22% when you take it out, 0% while it's reinvested. A data-backed deep dive on the system founders keep citing.",

  atAGlance: [
    {
      value: "22",
      unit: "%",
      label: "Tax on <b>distributed</b> profit (from 2025)",
      source: "Est. Tax & Customs Board",
    },
    {
      value: "0",
      unit: "%",
      label: "Tax on profit kept & <b>reinvested</b>",
      source: "PwC Tax Summaries '25",
    },
    {
      value: "24",
      unit: "%",
      label: "Scheduled rate from <b>2026</b>",
      source: "EY Tax Alert, 2025",
    },
    {
      value: "€22",
      unit: "k",
      label: "Tax on €100k profit, <b>if distributed</b>",
      source: "22/78 method · author calc",
    },
  ],

  bodyHtml: `
<p class="text-[23px] leading-[1.5] text-ink">Ask a founder what Estonia's corporate tax rate is and you'll get a number. Ask what an Estonian company actually <em>pays</em>, and you'll get a better question back: paid on what, and when?</p>

<p class="drop-cap">Because that's the trick. Most countries tax profit the year a company earns it. Estonia waits. <strong>As long as profit stays inside the business, the rate is zero.</strong> The tax only arrives when money leaves — as a dividend, a share buy-back, or a payment dressed up to look like something else. Reinvest everything and you can grow for years having paid no corporate income tax at all.</p>

<p>It's the cleanest real-world example of this newsletter's whole thesis: <em>taxes aren't rules, they're incentives wearing a uniform.</em> Estonia's uniform says, plainly, <strong>keep it working.</strong></p>
`,

  figure1: {
    kicker: "Figure 1 · The whole idea, in one comparison",
    title: "What happens to €100,000 of profit",
    boxes: [
      {
        variant: "zero",
        label: "Keep & reinvest it",
        scene: "Profit stays in the company — new hires, equipment, runway.",
        bigValue: "€0",
        subLabel: "Corporate income tax due",
        barPercent: 0,
      },
      {
        variant: "tax",
        label: "Distribute it as dividends",
        scene: "Profit leaves the company and goes to shareholders.",
        bigValue: "€22,000",
        subLabel: "Tax · €78,000 reaches shareholders",
        barPercent: 22,
      },
    ],
    caption:
      "Estonia applies its 22% rate at a 22/78 ratio on the net distribution — €78,000 paid out incurs €22,000 of tax. Reinvested profit is untaxed until distributed.",
    source: "Source: Est. Tax & Customs Board, 2025",
  },

  figure2: {
    kicker: "Figure 2 · The number is moving",
    title: "Estonia's headline corporate rate, on distributed profit",
    bars: [
      { year: "2024", value: "20%", heightPercent: 71, variant: "past" },
      {
        year: "2025",
        value: "22%",
        heightPercent: 79,
        variant: "current",
        subLabel: "Current",
      },
      {
        year: "2026",
        value: "24%",
        heightPercent: 87,
        variant: "future",
        subLabel: "Scheduled",
      },
    ],
    caption:
      "The reduced 14% rate on regular dividend distributions was abolished from 2025; all distributions are now taxed at the single headline rate.",
    source: "Source: EY & IMF, 2025",
  },

  figure3: {
    kicker: "Figure 3 · The global field, 2025",
    title: "Statutory corporate income tax rates, selected jurisdictions",
    bars: [
      {
        name: "<b>France</b> — highest in OECD",
        value: "36.1%",
        widthPercent: 90,
        variant: "default",
      },
      { name: "Colombia", value: "35.0%", widthPercent: 87.5, variant: "default" },
      { name: "OECD average", value: "24.2%", widthPercent: 60.5, variant: "default" },
      {
        name: "<b>Estonia</b> — on distribution",
        value: "22.0%",
        widthPercent: 55,
        variant: "highlight",
      },
      {
        name: "United States — federal",
        value: "21.0%",
        widthPercent: 52.5,
        variant: "default",
      },
      { name: "Ireland", value: "12.5%", widthPercent: 31.25, variant: "default" },
      {
        name: "UAE & Hungary — lowest positive",
        value: "9.0%",
        widthPercent: 22.5,
        variant: "muted",
      },
    ],
    referenceLine: {
      leftPercent: 37.5,
      label: "Pillar Two floor · 15%",
    },
    axisLabels: ["0%", "10%", "20%", "30%", "40%"],
    caption:
      "Statutory (headline) rates — the base each applies to differs, so effective rates vary. Many sub-15% jurisdictions now top up to the Pillar Two minimum for large multinationals.",
    source: "Source: OECD & Tax Foundation, 2025",
  },

  byTheNumbers: {
    rows: [
      {
        jurisdiction: "Estonia",
        rate: "22%",
        note: "On distributed profit only · 0% retained",
      },
      { jurisdiction: "Ireland", rate: "12.5%", note: "Trading income" },
      {
        jurisdiction: "United Arab Emirates",
        rate: "9%",
        note: "Above AED 375k threshold",
      },
      {
        jurisdiction: "France",
        rate: "36.1%",
        note: "Highest combined in OECD",
      },
      {
        jurisdiction: "OECD average",
        rate: "24.2%",
        note: "Combined statutory, 2025",
      },
      {
        jurisdiction: "Global minimum (Pillar Two)",
        rate: "15%",
        note: "Effective floor, large MNEs",
      },
    ],
    caption:
      "Headline statutory rates; effective rates differ by base and incentives. Estonia's rate applies at distribution via the 22/78 method.",
    source: "Compiled by The Global Ledger",
  },

  sources: [
    {
      org: "Estonian Tax and Customs Board (EMTA)",
      detail: "corporate income tax on distributed profit, 22/78 method, 2025.",
    },
    {
      org: "PwC Worldwide Tax Summaries — Estonia",
      detail: "corporate taxes on income, 2025.",
    },
    {
      org: "EY",
      detail:
        '"Estonia: significant tax changes apply in 2025–2026," 2025 (rate increases to 22% in 2025, 24% scheduled 2026).',
    },
    {
      org: "OECD",
      detail:
        "Corporate Tax Statistics 2025 — statutory rates & OECD averages; Pillar Two 15% global minimum.",
    },
    {
      org: "Tax Foundation",
      detail: '"Corporate Tax Rates by Country 2025" — cross-country comparison.',
    },
  ],
  asOfDate: "June 2026",

  related: [
    {
      hub: "Corporate Tax · Gulf",
      title: "The end of the zero-tax dream?",
      dek: "The UAE's new 9% corporate tax — Estonia's bet, run in reverse.",
    },
    {
      hub: "Tax Economics · Global",
      title: "The global minimum tax, in human language",
      dek: "What Pillar Two's 15% floor actually does, minus the jargon.",
    },
    {
      hub: "Consumption Tax · Global",
      title: "VAT, GST & sales tax",
      dek: "One idea, three headaches, for anyone selling across a border.",
    },
  ],
};

export default issue;
