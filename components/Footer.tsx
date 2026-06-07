export function Footer({ issueNumber }: { issueNumber?: string }) {
  return (
    <footer className="border-t border-line-2 py-8">
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] flex justify-between items-center gap-5 flex-wrap">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          The Global Ledger{issueNumber ? ` · Issue ${issueNumber}` : ""}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          © MMXXVI · Data-backed, plain-English
        </span>
      </div>
    </footer>
  );
}
