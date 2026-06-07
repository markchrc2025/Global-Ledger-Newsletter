import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="border-b border-line bg-paper-2">
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] flex items-center gap-[11px] h-[42px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-soft">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-[11px]">
            {i > 0 && <span className="opacity-50">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-forest transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-forest">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
