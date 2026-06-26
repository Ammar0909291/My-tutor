/**
 * TEMP DIAGNOSTIC — isolates which request field on generateJSON()'s Groq
 * call causes "403 Forbidden", by replaying the known-working minimal
 * request ({model, messages:[{role:'user',content:'Reply only OK'}]}) and
 * adding back ONE generateJSON()-only field at a time, in increasing order.
 *
 * generateJSON() (src/lib/ai/client.ts) currently sends ONLY these fields —
 * confirmed by reading the function directly, not assumed:
 *   { model, messages: [{ role: 'user', content }], max_tokens, temperature }
 * It does NOT set response_format, reasoning_format, stream, seed, tools,
 * tool_choice, or stop (none of these appear anywhere in client.ts).
 * So the only candidates that can differ from the working "Reply only OK"
 * call are: max_tokens, temperature, and the message content itself
 * (length/instruction wording).
 *
 * Run with a real, Groq-reachable network + GROQ_API_KEY set:
 *   npx tsx -r dotenv/config scripts/diagnose-generateJSON-403.ts
 *
 * Does NOT modify generateJSON(), SceneSpec, extractors, or the renderer —
 * this is a standalone read-only diagnostic against the Groq SDK directly.
 */
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })
const MODEL = 'openai/gpt-oss-20b'

// One real extractor's exact prompt shape (projectileMotion.ts), to test
// "content" as a variable distinct from max_tokens/temperature.
const REAL_PROMPT = `Read the explanation below and extract the projectile-motion launch parameters, if present.

Explanation:
"When you throw a ball at a 45-degree angle with an initial speed of 10 meters per second, it follows a parabolic trajectory. It starts at the origin, rises to a peak height, then falls back to the ground."

Reply with ONLY this JSON, no other text:
{"isProjectile": true|false, "angleDegrees": <number 0-90>, "speed": <number, m/s>}
- isProjectile is false if the text is not describing a projectile/launch/throw with an angle and speed.
- If a value is not explicitly stated, make your best single numeric estimate from the text; do not invent a launch that isn't there.

Return ONLY valid JSON. No markdown. No explanation.`

interface Case { name: string; body: Record<string, unknown> }

const CASES: Case[] = [
  { name: '0. baseline — known-working minimal request', body: { model: MODEL, messages: [{ role: 'user', content: 'Reply only OK' }] } },
  { name: '1. baseline + max_tokens: 1500',               body: { model: MODEL, messages: [{ role: 'user', content: 'Reply only OK' }], max_tokens: 1500 } },
  { name: '2. baseline + temperature: 0.3',                body: { model: MODEL, messages: [{ role: 'user', content: 'Reply only OK' }], temperature: 0.3 } },
  { name: '3. baseline + max_tokens + temperature',        body: { model: MODEL, messages: [{ role: 'user', content: 'Reply only OK' }], max_tokens: 1500, temperature: 0.3 } },
  { name: '4. baseline with REAL prompt content (no max_tokens/temperature)', body: { model: MODEL, messages: [{ role: 'user', content: REAL_PROMPT }] } },
  { name: '5. REAL prompt + max_tokens + temperature  (= exact current generateJSON() body)', body: { model: MODEL, messages: [{ role: 'user', content: REAL_PROMPT }], max_tokens: 1500, temperature: 0.3 } },
]

async function main() {
  let firstFailure: string | null = null
  for (const c of CASES) {
    try {
      const res = await groq.chat.completions.create(c.body as any)
      const content = res.choices[0]?.message?.content ?? ''
      console.log(`[OK]   ${c.name}\n       -> ${JSON.stringify(content).slice(0, 160)}`)
    } catch (err: any) {
      console.log(`[FAIL] ${c.name}\n       -> status=${err.status} message=${err.message}`)
      console.log(`       headers: ${JSON.stringify(err.headers ?? {})}`)
      if (!firstFailure) firstFailure = c.name
    }
  }
  console.log('\n=== RESULT ===')
  console.log(firstFailure
    ? `First failing case: "${firstFailure}" — the field/content added in THIS case (relative to the previous passing case) is the isolated cause.`
    : 'All cases passed — could not reproduce the 403 with any combination tested here.')
  process.exit(firstFailure ? 1 : 0)
}

main()
