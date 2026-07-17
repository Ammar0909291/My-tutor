/**
 * Resend email client — shared transport, reused by every existing email
 * sender in src/lib/email/index.ts and src/lib/notifications/email.ts.
 *
 * Development-only integration (2026-07): the project has no custom domain
 * yet, so EMAIL_FROM is expected to be a `resend.dev` sandbox address
 * (`My Tutor <onboarding@resend.dev>`) until a verified domain is added in
 * Resend. Nothing here hardcodes that address — both RESEND_API_KEY and
 * EMAIL_FROM are read from environment variables only, with a fallback to
 * the pre-existing SMTP_FROM value so a deployment that hasn't set
 * EMAIL_FROM yet doesn't silently lose its configured sender identity.
 *
 * This module owns ONLY the Resend transport (client construction + a
 * single send primitive). It does not know about welcome emails, password
 * resets, or verification links — those stay in src/lib/email/index.ts,
 * unchanged in every way except which transport they call.
 */
import { Resend } from 'resend'

let client: Resend | null = null

/** True when RESEND_API_KEY is set — the gate every caller in this file
 * (and every email sender that wraps it) uses before attempting a send. */
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY
}

/** Lazy singleton — constructed on first use, not at module load, so
 * importing this file never throws in an environment where
 * RESEND_API_KEY isn't set yet (e.g. local dev, or any test file that
 * imports src/lib/email/index.ts without configuring Resend). */
function getResendClient(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY)
  }
  return client
}

/** The verified sender identity for every outbound email. Reads
 * EMAIL_FROM first (the Resend-specific variable set in Vercel per this
 * integration); falls back to the pre-existing SMTP_FROM value so any
 * environment that configured that instead keeps working; falls back to
 * the same literal default src/lib/email/index.ts already used before
 * this integration, so behavior is unchanged when neither is set. */
export function getEmailFrom(): string {
  return process.env.EMAIL_FROM ?? process.env.SMTP_FROM ?? 'My Tutor <noreply@mytutor.app>'
}

export interface ResendSendInput {
  to: string
  subject: string
  html?: string
  text?: string
}

export interface ResendSendResult {
  success: boolean
  error?: string
  /** The Resend message ID, when the send succeeded. */
  id?: string
}

/**
 * Send one email through Resend. Never throws — every failure mode (missing
 * API key, a rejected send, a network error, an unexpected exception) is
 * caught and returned as a typed failure result, so a caller can log it and
 * degrade gracefully instead of the request/route crashing.
 */
export async function sendViaResend(input: ResendSendInput): Promise<ResendSendResult> {
  if (!isResendConfigured()) {
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }
  if (!input.html && !input.text) {
    return { success: false, error: 'sendViaResend requires html and/or text content' }
  }

  try {
    // Resend's CreateEmailOptions type requires at least one of html/text to
    // be a genuinely present string (not `string | undefined`) — spread
    // only the fields that were actually provided rather than passing
    // possibly-undefined keys.
    const { data, error } = await getResendClient().emails.send({
      from: getEmailFrom(),
      to: input.to,
      subject: input.subject,
      ...(input.html ? { html: input.html } : {}),
      ...(input.text ? { text: input.text } : {}),
    } as Parameters<ReturnType<typeof getResendClient>['emails']['send']>[0])

    if (error) {
      console.error('[email/resend] send failed:', error.name, error.message)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (err) {
    // Resend's SDK documents the {data, error} shape above as its normal
    // failure path, but network-level failures (DNS, timeout, fetch
    // rejection) can still throw — caught here so a Resend outage can never
    // crash the calling route.
    const message = err instanceof Error ? err.message : String(err)
    console.error('[email/resend] unexpected error:', message)
    return { success: false, error: message }
  }
}
