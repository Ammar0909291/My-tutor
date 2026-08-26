/**
 * Stale provider labels in telemetry.
 *
 * MEASURED IN PRODUCTION during Phase G, on a turn independently proven to
 * have been served by Gemini (`[ai/attempt] provider=gemini … http_status=200`,
 * `[ai/router] success provider=gemini`, and `messages.provider = 'gemini'` for
 * all 7 assistant rows), the SAME turn logged:
 *
 *   [learn/chat] RESPONSE provider=gemini … source=Groq … groq_invoked=true
 *   CUE dispatch … engine:"routeAI (Groq primary / Yandex fallback)"
 *
 * Anyone diagnosing from `source=` or `groq_invoked=` alone would have
 * concluded Groq served the turn. Routing was correct throughout; only the
 * labels lied.
 *
 * THE FIELD NAMES ARE KEPT. Consumers grep these keys, so `source=` and
 * `groq_invoked=` survive — only their VALUES become truthful. `source=` names
 * the serving PATH everywhere else in this file (LessonAttempt,
 * ExplanationMemory, GateAssessmentRenderer); the model path was the one value
 * naming a provider instead, which is why it could go stale at all.
 *
 * DELIBERATELY NOT CHANGED: `BrainMetricsSnapshot.groqCalls`. Its own module
 * header already states "the `groqCalls` counter name predates the Gemini
 * migration and now counts a call to whichever provider the failover chain
 * selects" — the behaviour is correct and documented, and the key is part of a
 * JSON payload consumers parse. Renaming it would be a compatibility break in
 * exchange for cosmetics.
 */
import { describe, it, expect } from 'vitest'

const ROUTE = require('fs').readFileSync('src/app/api/learn/chat/route.ts', 'utf8') as string
const DISPATCHER = require('fs').readFileSync('src/lib/understanding/dispatcher.ts', 'utf8') as string
const METRICS = require('fs').readFileSync('src/lib/understanding/brainMetrics.ts', 'utf8') as string

describe('the RESPONSE line never hardcodes a provider it did not use', () => {
  it('no longer claims source=Groq', () => {
    expect(ROUTE).not.toMatch(/` source=Groq`/)
  })

  it('names the serving PATH, consistently with the other three sources', () => {
    expect(ROUTE).toMatch(/` source=LLM`/)
    // the pre-existing path labels are untouched
    expect(ROUTE).toMatch(/source=LessonAttempt/)
    expect(ROUTE).toMatch(/` source=ExplanationMemory`/)
    expect(ROUTE).toMatch(/` source=GateAssessmentRenderer`/)
  })

  it('groq_invoked reports whether GROQ was actually the provider', () => {
    expect(ROUTE).toMatch(/groq_invoked=\$\{provider === 'groq'\}/)
    // and is not asserted true regardless
    expect(ROUTE).not.toMatch(/` groq_invoked=true`/)
  })

  it('still reports the real provider on the same line', () => {
    expect(ROUTE).toMatch(/RESPONSE provider=\$\{provider\}/)
  })

  it('the deterministic paths keep groq_invoked=false', () => {
    // those turns genuinely make no model call at all
    expect(ROUTE).toMatch(/groq_invoked=false/)
  })
})

describe('the CUE dispatch engine description matches the real chain', () => {
  /** The `engine:` VALUE only — comments explaining what it used to say must
   *  not be able to fail this. */
  const engineValue = (DISPATCHER.match(/^\s*engine: 'routeAI[^']*'/m) ?? [''])[0]

  it('no longer describes the default chain as Groq primary / Yandex fallback', () => {
    // Wrong twice over: the default chain is Groq -> Gemini -> OpenRouter, and
    // Yandex is the RUSSIAN chain's primary, never the default's fallback.
    expect(engineValue).not.toMatch(/Groq primary/)
    expect(engineValue).not.toMatch(/Yandex fallback/)
  })

  it('describes routeAI without naming a provider order that can drift', () => {
    expect(engineValue).toMatch(/routeAI/)
    expect(engineValue).toMatch(/language-selected failover chain/)
  })
})

describe('groqCalls is left alone, on purpose', () => {
  it('the counter still exists for its consumers', () => {
    expect(METRICS).toMatch(/groqCalls: number/)
  })

  it('and its documented meaning is provider-agnostic', () => {
    expect(METRICS).toMatch(/counter name predates the Gemini migration/)
  })
})

describe('no telemetry change can affect provider selection', () => {
  it('the router is not imported by any telemetry module', () => {
    expect(METRICS).not.toMatch(/from '@\/lib\/ai\/router'/)
    expect(DISPATCHER).not.toMatch(/from '@\/lib\/ai\/router'/)
  })

  it('the changed line is a console.log, not a decision', () => {
    const idx = ROUTE.indexOf('` source=LLM`')
    expect(idx).toBeGreaterThan(0)
    // the field belongs to the RESPONSE console.log and nothing else: walk back
    // to the nearest console.log( and confirm that is the statement it is in
    const before = ROUTE.slice(0, idx)
    const logStart = before.lastIndexOf('console.log(')
    expect(logStart).toBeGreaterThan(0)
    expect(ROUTE.slice(logStart, idx)).toMatch(/RESPONSE provider=\$\{provider\}/)
  })
})
