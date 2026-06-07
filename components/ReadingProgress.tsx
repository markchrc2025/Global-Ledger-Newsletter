"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max * 100 : 0;
      if (barRef.current) barRef.current.style.width = pct + "%";
    }
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[3px] bg-money z-[60] transition-[width] duration-100 ease-linear"
      style={{ width: "0%" }}
      aria-hidden="true"
    />
  );
}
