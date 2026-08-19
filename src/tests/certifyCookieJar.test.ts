/**
 * The certification harness could not authenticate at all, and the cause was in
 * the harness rather than in the product: `/api/auth/csrf` answers with the SAME
 * cookie name twice carrying two DIFFERENT values, and the harness joined every
 * Set-Cookie into one header. The server then read the FIRST csrf token while
 * the JSON body carried the SECOND, and NextAuth rejected the login with
 * `MissingCSRF` — reported to the operator only as "login failed".
 *
 * curl and every browser keep one value per cookie name. These tests hold the
 * harness to that, on the real header shapes observed in production.
 */
import { describe, it, expect } from 'vitest'
import { mergeCookies, csrfTokenFromJar } from '../../scripts/math/certify'

/** Verbatim from `/api/auth/csrf` on my-tutor-flame.vercel.app. */
const REAL_CSRF_RESPONSE = [
  '__Host-authjs.csrf-token=4e0a723d65fcfd810d6ad333c0c1c5170702d83565502acfc38377d8180f9b55%7C7680ccfcd17f9fd07e; Path=/; HttpOnly; Secure; SameSite=Lax',
  '__Secure-authjs.callback-url=https%3A%2F%2Fmy-tutor-flame.vercel.app; Path=/; HttpOnly; Secure; SameSite=Lax',
  '__Host-authjs.csrf-token=3f5a39a5f5dda908b5bcf7018c1e39f2c3a1243c02795072054ef6e62ec5c66a%7C41edc6a4013991d5b7; Path=/; HttpOnly; Secure; SameSite=Lax',
  '__Secure-authjs.callback-url=https%3A%2F%2Fmy-tutor-flame.vercel.app; Path=/; HttpOnly; Secure; SameSite=Lax',
]

describe('the cookie jar keeps one value per name', () => {
  it('sends the duplicated csrf cookie exactly once', () => {
    const jar = mergeCookies(REAL_CSRF_RESPONSE)
    const occurrences = jar.split('; ').filter((p) => p.startsWith('__Host-authjs.csrf-token='))
    expect(occurrences).toHaveLength(1)
  })

  it('keeps the LAST value written, as a browser does', () => {
    const jar = mergeCookies(REAL_CSRF_RESPONSE)
    expect(jar).toContain('3f5a39a5f5dda908b5bcf7018c1e39f2c3a1243c02795072054ef6e62ec5c66a')
    expect(jar).not.toContain('4e0a723d65fcfd810d6ad333c0c1c5170702d83565502acfc38377d8180f9b55')
  })

  it('collapses the duplicated callback-url too', () => {
    const jar = mergeCookies(REAL_CSRF_RESPONSE)
    expect(jar.split('; ').filter((p) => p.startsWith('__Secure-authjs.callback-url='))).toHaveLength(1)
  })

  it('lets a later response override an earlier jar', () => {
    const jar = mergeCookies(['a=1; Path=/', 'b=2'], ['a=3'])
    expect(jar).toBe('a=3; b=2')
  })

  it('treats an empty value as the deletion it is', () => {
    expect(mergeCookies(['a=1', 'b=2'], ['a=; Max-Age=0'])).toBe('b=2')
  })

  it('ignores a malformed entry rather than emitting a bare name', () => {
    expect(mergeCookies(['Secure', '=orphan', 'ok=1'])).toBe('ok=1')
  })
})

describe('the csrf token comes from the cookie that will actually be sent', () => {
  it('reads the token half of <token>|<hash>, url-decoded', () => {
    const jar = mergeCookies(REAL_CSRF_RESPONSE)
    expect(csrfTokenFromJar(jar))
      .toBe('3f5a39a5f5dda908b5bcf7018c1e39f2c3a1243c02795072054ef6e62ec5c66a')
  })

  it('agrees with the jar even when a response body would have disagreed', () => {
    // This is the whole defect: the body carried the token the jar dropped.
    const jar = mergeCookies(REAL_CSRF_RESPONSE)
    const bodyToken = '4e0a723d65fcfd810d6ad333c0c1c5170702d83565502acfc38377d8180f9b55'
    expect(csrfTokenFromJar(jar)).not.toBe(bodyToken)
    expect(jar).toContain(csrfTokenFromJar(jar)!)
  })

  it('finds the cookie under the non-secure name too', () => {
    expect(csrfTokenFromJar('authjs.csrf-token=abc%7Cdef')).toBe('abc')
  })

  it('returns null when there is no csrf cookie, so the body can stand in', () => {
    expect(csrfTokenFromJar('__Secure-authjs.session-token=xyz')).toBeNull()
  })
})
