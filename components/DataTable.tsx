export interface DataRow {
  jurisdiction: string;
  rate: string;
  note: string;
}

export interface DataTableProps {
  rows: DataRow[];
  caption: string;
  source: string;
}

export function DataTable({ rows, caption, source }: DataTableProps) {
  return (
    <figure className="border border-line-2 rounded-fig overflow-hidden bg-paper my-11">
      <div className="px-[26px] pt-2 pb-2">
        <table className="w-full border-collapse text-[15px]">
          <thead>
            <tr>
              <th className="text-left px-4 py-[13px] border-b-[1.5px] border-line-2 font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink-soft">
                Jurisdiction
              </th>
              <th className="text-left px-4 py-[13px] border-b-[1.5px] border-line-2 font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink-soft">
                Headline CIT Rate (2025)
              </th>
              <th className="text-left px-4 py-[13px] border-b-[1.5px] border-line-2 font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink-soft">
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-paper-2 transition-colors">
                <td className="px-4 py-[13px] border-b border-line font-medium">{row.jurisdiction}</td>
                <td className="px-4 py-[13px] border-b border-line font-mono text-forest text-right">
                  {row.rate}
                </td>
                <td className="px-4 py-[13px] border-b border-line text-ink-soft text-[14px]">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="px-[26px] py-[14px] pb-[18px] border-t border-line text-[13px] text-ink-soft leading-[1.5] flex justify-between gap-5 flex-wrap">
        <span>{caption}</span>
        <span className="font-mono text-[9.5px] tracking-[0.06em] uppercase whitespace-nowrap">
          {source}
        </span>
      </figcaption>
    </figure>
  );
}
