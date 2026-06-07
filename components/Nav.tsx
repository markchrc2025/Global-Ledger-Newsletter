"use client";

import Link from "next/link";
import { useState } from "react";
import { GlobeMark } from "./GlobeMark";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-line-2 sticky top-0 z-50 bg-paper">
      <div className="max-w-wrap mx-auto px-[46px] max-sm:px-[22px] flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-[11px] font-mono font-semibold tracking-[0.12em] uppercase text-[13px] text-ink"
        >
          <GlobeMark className="w-6 h-6 text-forest" />
          The Global Ledger
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-2 items-center">
          <NavLinks />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-paper px-[22px] py-4 flex flex-col gap-1">
          <NavLinks onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const links = [
    { href: "/issues", label: "Issues" },
    { href: "/topics", label: "Topics" },
    { href: "/regions", label: "Regions" },
    { href: "/premium", label: "Pricing" },
  ];

  return (
    <>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={onClick}
          className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-soft px-[14px] py-2 transition-colors duration-200 hover:text-forest whitespace-nowrap"
        >
          {l.label}
        </Link>
      ))}
      <Link
        href="/#subscribe"
        onClick={onClick}
        className="font-mono text-[11px] tracking-[0.14em] uppercase bg-forest text-paper px-[14px] py-2 rounded-btn hover:bg-forest-2 transition-colors duration-200 whitespace-nowrap"
      >
        Subscribe Free
      </Link>
    </>
  );
}
