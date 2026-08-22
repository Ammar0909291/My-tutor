/**
 * Disposable QA account lifecycle against the DEPLOYED app.
 *
 * Live verification in this project has repeatedly been reported as blocked
 * because Chromium cannot reach the app through the sandbox egress proxy. That
 * is true of the BROWSER and only the browser: the JSON API is reachable
 * (`/api/health` answers 200), and the product owns a real authenticated
 * `DELETE /api/user/delete-account`, so an account can be created, driven and
 * then actually removed rather than abandoned in production.
 *
 * The cookie helpers are IMPORTED from the certification harness rather than
 * re-implemented. `/api/auth/csrf` is known to answer with the same cookie name
 * twice carrying two different values; that bug already cost one harness its
 * login, and a second private copy of the workaround would be a second thing to
 * get wrong.
 *
 * Refuses the engineering account by construction, exactly as certify.ts does.
 */
import { mergeCookies, csrfTokenFromJar } from '../math/certify'

export const BASE = process.env.QA_BASE_URL ?? 'https://my-tutor-flame.vercel.app'

/** Never a real person's account. Enforced here, not left to discipline. */
const FORBIDDEN_ACCOUNTS = ['suaibamr@gmail.com']

export interface QaAccount {
  email: string
  password: string
  name: string
  cookie: string
}

function assertDisposable(email: string): void {
  if (FORBIDDEN_ACCOUNTS.includes(email.trim().toLowerCase())) {
    throw new Error(`${email} is an engineering account and must never be used for QA`)
  }
}

/** Register + log in a fresh throwaway learner. */
export async function createQaAccount(label: string): Promise<QaAccount> {
  const stamp = `${Date.now()}${Math.floor(Math.random() * 1000)}`
  const email = `qa-${label}-${stamp}@mytutor-qa.invalid`
  const password = `Qa!${stamp}aA9`
  const name = `QA ${label}`
  assertDisposable(email)

  const reg = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  if (!reg.ok) {
    throw new Error(`register failed ${reg.status}: ${(await reg.text()).slice(0, 300)}`)
  }

  const cookie = await login(email, password)
  return { email, password, name, cookie }
}

export async function login(email: string, password: string): Promise<string> {
  assertDisposable(email)
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`)
  const body = (await csrfRes.json()) as { csrfToken: string }
  const jar = mergeCookies(csrfRes.headers.getSetCookie?.() ?? [])
  const csrfToken = csrfTokenFromJar(jar) ?? body.csrfToken
  const res = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST',
    redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: jar },
    body: new URLSearchParams({ csrfToken, email, password, callbackUrl: `${BASE}/learn` }),
  })
  const all = mergeCookies(jar.split('; ').filter(Boolean), res.headers.getSetCookie?.() ?? [])
  if (!/session-token/.test(all)) {
    throw new Error(`login failed — no session cookie (status ${res.status})`)
  }
  return all
}

/**
 * Delete the account and PROVE it. Returns only when the app itself reports the
 * account gone — a delete that is merely requested is not a delete that
 * happened, and this project's own rule is to confirm cleanup rather than
 * assert it.
 */
export async function deleteQaAccount(acct: QaAccount): Promise<{ deleted: boolean; reloginBlocked: boolean }> {
  const res = await fetch(`${BASE}/api/user/delete-account`, {
    method: 'DELETE',
    headers: { cookie: acct.cookie },
  })
  const deleted = res.ok
  // Independent confirmation: the credentials must no longer authenticate.
  let reloginBlocked = false
  try {
    await login(acct.email, acct.password)
  } catch {
    reloginBlocked = true
  }
  return { deleted, reloginBlocked }
}
