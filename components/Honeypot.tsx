/**
 * Anti-spam honeypot. Hidden from real users; bots fill it and get silently
 * rejected server-side. Must sit inside each signup <form>.
 */
export function Honeypot() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] top-0 h-px w-px opacity-0 pointer-events-none"
    />
  );
}
