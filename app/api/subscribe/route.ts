import { Resend } from "resend";

// Resend's SDK needs the Node runtime (not edge).
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // 1. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const honeypot = typeof data.company === "string" ? data.company : "";
  const source = typeof data.source === "string" ? data.source : "unknown";

  // 2. Honeypot — bots fill the hidden "company" field. Pretend success.
  if (honeypot) {
    return Response.json({ ok: true }, { status: 200 });
  }

  // 3. Validate email
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // 4. Make sure the service is configured (graceful before keys are added)
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return Response.json(
      { error: "The newsletter isn't connected yet. Please try again soon." },
      { status: 503 }
    );
  }

  // 5. Add the contact to the Resend audience
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      // A duplicate contact also lands here — treat as success for the visitor.
      console.error(`[subscribe:${source}] Resend error:`, error);
      return Response.json({ ok: true }, { status: 200 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(`[subscribe:${source}] failed:`, err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
