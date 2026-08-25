/**
 * PHASE 7K TRACK C — a generation Groq refuses to return is not a lost generation.
 *
 * THE INCIDENT, from production logs (2026-08-25, phys.opt.total-internal-reflection):
 *
 *   [ai/attempt] provider=groq http_status=400 error_name=Error
 *     message="400 {\"error\":{\"message\":\"Tool choice is none, but model called
 *     a tool\",\"type\":\"invalid_request_error\",\"code\":\"tool_use_failed\",
 *     \"failed_generation\":\"{\\\"name\\\": \\\"assistant\\\", \\\"arguments\\\":
 *     <!--MCQ …correct=\\\"A\\\"--> <!--MCQ …correct=\\\"B\\\"-->}\"}}"
 *   [ai/router] failing over to gemini
 *   [ai/attempt] provider=gemini http_status=403 "project has been denied access"
 *   [learn/chat] all providers down — serving degraded template (RS P-3)
 *
 * This app sends no `tools`, so nothing requested a tool call — Groq's own
 * server-side parser classified the model's output as one. The rejected payload
 * held TWO well-formed MCQs with correct answer keys: precisely the gradeable
 * questions the mastery ladder cannot advance without. The learner got an
 * outage template instead.
 *
 * INVARIANTS PINNED HERE:
 *   1. A tool_use_failed 400 is salvaged, and the MCQ tags survive intact.
 *   2. Salvage is NARROW — wrong status, wrong code, or no payload all decline,
 *      so ordinary failures still fail over exactly as before.
 *   3. Salvage does not grade, parse or reinterpret anything; the recovered
 *      text is byte-identical to what the model wrote.
 */
import { describe, it, expect } from 'vitest'
import { salvageToolUseFailure, unwrapToolCallEnvelope } from '@/lib/ai/providers/groq'
import { parseMcqTag } from '@/lib/teaching/mcq'

const MCQ_A =
  '<!--MCQ q="Which of the following is required for total internal reflection to occur?" ' +
  'a="Light must travel from a denser to a less dense medium and the angle of incidence must be greater than the critical angle" ' +
  'b="Light must travel from a less dense to a denser medium and the angle of incidence must be less than the critical angle" ' +
  'correct="A"-->'
const MCQ_B =
  '<!--MCQ q="What is the critical angle for light going from water (n=1.33) into air (n=1.0)?" ' +
  'a="41.8°" b="48.8°" c="24.4°" d="90°" correct="B"-->'

/** The exact error shape the Groq SDK raises for this case. */
function toolUseError(failed: string, code = 'tool_use_failed', status = 400): any {
  return {
    status,
    message: '400 tool_use_failed',
    error: { error: { message: 'Tool choice is none, but model called a tool', type: 'invalid_request_error', code, failed_generation: failed } },
  }
}

describe('Phase 7K Track C — the destroyed generation is recovered', () => {
  it('recovers the production payload, and BOTH MCQs survive', () => {
    const payload = `{"name": "assistant", "arguments": ${MCQ_A}\n${MCQ_B}}`
    const out = salvageToolUseFailure(toolUseError(payload))
    expect(out).not.toBeNull()
    expect(out).toContain('total internal reflection')
    expect(out).toContain('critical angle for light going from water')
  })

  it('the recovered MCQ is still GRADEABLE by the existing parser — no second grading path', () => {
    const payload = `{"name": "assistant", "arguments": ${MCQ_B}}`
    const salvaged = salvageToolUseFailure(toolUseError(payload))!
    const parsed = parseMcqTag(salvaged)
    expect(parsed).not.toBeNull()
    // 48.8° is the correct critical angle for water -> air; the key must survive.
    expect(parsed!.mcq!.options[parsed!.mcq!.correctIndex]).toBe('48.8°')
  })

  it('text with no envelope is returned unchanged', () => {
    expect(unwrapToolCallEnvelope(`Here is a question. ${MCQ_A}`)).toBe(`Here is a question. ${MCQ_A}`)
  })

  it('a JSON-quoted payload is unescaped rather than shown raw', () => {
    const payload = `{"name": "assistant", "arguments": ${JSON.stringify('Light bends. ' + MCQ_A)}}`
    const out = unwrapToolCallEnvelope(payload)!
    expect(out.startsWith('Light bends.')).toBe(true)
    expect(out).not.toContain('\\"')
  })
})

// ── NEGATIVE CONTROLS — salvage must not swallow real failures ───────────────
describe('Phase 7K Track C — negative controls', () => {
  it('a 400 that is NOT tool_use_failed is not salvaged', () => {
    expect(salvageToolUseFailure(toolUseError(`{"name":"assistant","arguments": hi}`, 'invalid_api_key'))).toBeNull()
  })

  it('a 429 rate limit is not salvaged even if it carries a payload', () => {
    expect(salvageToolUseFailure(toolUseError(`{"name":"assistant","arguments": hi}`, 'tool_use_failed', 429))).toBeNull()
  })

  it('tool_use_failed with no failed_generation is not salvaged', () => {
    expect(salvageToolUseFailure({ status: 400, error: { error: { code: 'tool_use_failed' } } })).toBeNull()
  })

  it('an empty or whitespace payload declines rather than returning ""', () => {
    expect(salvageToolUseFailure(toolUseError('   '))).toBeNull()
    expect(unwrapToolCallEnvelope('{"name": "assistant", "arguments": }')).toBeNull()
  })

  it('an ordinary network error is untouched', () => {
    expect(salvageToolUseFailure(new Error('fetch failed'))).toBeNull()
  })
})
