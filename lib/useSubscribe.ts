"use client";

import { useState } from "react";

export type SubscribeStatus = "idle" | "loading" | "success" | "error";

/**
 * Shared client logic for every signup form.
 * Posts to /api/subscribe and tracks request state.
 *
 * Usage:
 *   const { status, error, subscribe } = useSubscribe("home-hero");
 *   <form onSubmit={(e) => { e.preventDefault(); subscribeFromForm(e.currentTarget, subscribe); }}>
 */
export function useSubscribe(source: string) {
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function subscribe(email: string, honeypot = "") {
    if (status === "loading" || status === "success") return;
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypot, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return { status, error, subscribe };
}

/** Pull email + honeypot from a submitted <form> and fire the subscribe call. */
export function subscribeFromForm(
  form: HTMLFormElement,
  subscribe: (email: string, honeypot?: string) => void
) {
  const fd = new FormData(form);
  const email = String(fd.get("email") || "");
  const honeypot = String(fd.get("company") || "");
  subscribe(email, honeypot);
}

/** Resolve the button label for the current request state. */
export function subscribeLabel(
  status: SubscribeStatus,
  idle: string,
  success: string,
  loading = "Subscribing…"
) {
  if (status === "loading") return loading;
  if (status === "success") return success;
  return idle;
}
