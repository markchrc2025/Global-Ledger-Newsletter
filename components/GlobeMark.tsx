export function GlobeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.5" />
      <ellipse cx="12" cy="12" rx="4.5" ry="10.5" />
      <line x1="1.5" y1="12" x2="22.5" y2="12" />
      <path d="M3.5 7 q8.5 4 17 0 M3.5 17 q8.5 -4 17 0" />
    </svg>
  );
}
