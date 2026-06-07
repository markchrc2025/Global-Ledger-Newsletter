export function MeridianMotif({ centered = false }: { centered?: boolean }) {
  return (
    <div
      className={`meridian-container ${centered ? "meridian-centered" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="meridian-svg"
        viewBox="0 0 400 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="110" />
        <circle cx="200" cy="200" r="60" />
        <ellipse cx="200" cy="200" rx="60" ry="190" />
        <ellipse cx="200" cy="200" rx="120" ry="190" />
        <line x1="10" y1="200" x2="390" y2="200" />
        <path d="M30 120 q170 60 340 0 M30 280 q170 -60 340 0" />
      </svg>
    </div>
  );
}
