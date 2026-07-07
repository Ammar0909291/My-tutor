# Groq Model Migration Report — `llama-3.1-8b-instant` → `openai/gpt-oss-20b`

Scope: model-identifier swap only. No architecture changes, no new AI
providers, no prompt/schema changes, no unrelated file refactors.

## Task 1 — Current configuration (verified, not assumed)

Searched the codebase for `llama-3.1-8b-instant`, `groq`, `GROQ_API_KEY`,
`model:`, and `chat.completions`. Findings:

- **No centralized `GROQ_MODEL` env var exists anywhere** (`.env`,
  `.env.example`, or source) — the model identifier was hardcoded as a
  literal string directly in each `groq.chat.completions.create()` call.
- `GROQ_API_KEY` IS read from the environment (`process.env.GROQ_API_KEY`)
  in both Groq client modules — left untouched.
- Exactly **5 call sites** hardcoded `model: 'llama-3.1-8b-instant'`, across
  two files:
  - `src/lib/ai/client.ts` — `generateAIResponse()` (line 20), `generateJSON()`
    (line 52), `summarizeSession()` (line 84).
  - `src/lib/ai/router.ts` — `callGroq()` (line 15), `routeJSON()` (line 130).
- `src/lib/ai/router.ts` is the production routing layer: `routeAI()` picks
  YandexGPT for `country === 'ru'` (falling back to `callGroq()` on missing
  Yandex credentials or any Yandex error/exception) and Groq for everyone
  else; `routeJSON()` always uses Groq directly for structured output.
- `src/lib/ai/client.ts` exposes the same three functions under what looks
  like a slightly older/parallel API surface (`generateAIResponse`,
  `generateJSON`, `summarizeSession`, `chatWithFallback`) — also Groq-backed,
  also had the same hardcoded model string.
- No other file constructs a `Groq` client or calls
  `groq.chat.completions.create()` — confirmed via repo-wide grep.

Since no centralized env var existed, per the task's own conditional
instruction ("if the project already has a centralized environment
variable, update that instead of hardcoding") the literal string was
replaced in place at all 5 call sites, rather than introducing a new
`GROQ_MODEL` env-var layer — that would have been a small architecture
addition outside this sprint's "no architecture changes" rule.

## Task 2 — Model update

| | Before | After |
|---|---|---|
| Model identifier | `llama-3.1-8b-instant` | `openai/gpt-oss-20b` |
| `GROQ_API_KEY` | unchanged | unchanged |

### Files changed

- `src/lib/ai/client.ts` — 3 occurrences updated (lines 20, 52, 84).
- `src/lib/ai/router.ts` — 2 occurrences updated (lines 15, 130).
- `src/tests/aiTutorFallback.test.ts` — doc comment only (line 5), updated
  for accuracy; no test assertion referenced the model string.
- `CLAUDE.md` — "Architecture facts" line updated (project memory, directly
  documents this exact fact).
- `docs/ARCHITECTURE_REFERENCE.md` — stack table row updated (same reason).

No other files touched. No prompt text, output schema, retry/timeout logic,
or fallback routing logic was changed.

## Task 3 — AI routing paths verified unaffected

All call paths funnel through the 5 updated `groq.chat.completions.create()`
call sites — confirmed no other model string or duplicate client exists:

- **Tutor chat generation** — `routeAI()` → `callGroq()` (router.ts) /
  `generateAIResponse()` (client.ts). Updated.
- **JSON generation/classification** — `routeJSON()` (router.ts) /
  `generateJSON()` (client.ts), both used by curriculum generation,
  checkpoint evaluation, and other structured-output callers. Updated.
- **Checkpoint evaluation** (`evaluateCheckpoint`, per
  `scripts/checkpoint-stress-test.ts`) — calls into `generateJSON`/`routeJSON`
  under the hood; no separate model string of its own.
- **Misconception detection** (`src/lib/school/adaptive/misconceptionEngine.ts`)
  — `buildRemediationStrategy` and related logic are pure/offline (string
  templating), not Groq calls; unaffected by this migration. Confirmed via
  `scripts/test-misconception-engine.ts` (24/24 pass, no network).
- **Assessment engine** — uses the same `generateJSON`/`routeJSON` path; no
  separate model configuration found.

No prompt text or output schema was touched in any of these.

## Task 4 — Validation

```
npx tsc --noEmit
```
Result: **0 errors.**

```
npx tsx scripts/test-misconception-engine.ts
```
Result: **24 passed, 0 failed** (pure-logic, no network — confirms
misconception/remediation logic is untouched by the model swap).

```
npx tsx scripts/checkpoint-stress-test.ts
```
Result: **could not run live** — `GROQ_API_KEY` is unset in this sandbox
environment (`.env` has `GROQ_API_KEY=""`), and the script aborts by design
with "GROQ_API_KEY not set — aborting (no mock fallback by design)" rather
than silently mocking. This sandbox has no live network path to
`api.groq.com` regardless (consistent with prior sprints' notes in
`scripts/test-scene-extraction-live.ts` and
`scripts/test-visualization-tiebreaker.ts`, which document the same
constraint). **This means "requests reach Groq" and "no 403 model errors"
were NOT independently verified against the live Groq API in this session**
— that check requires running `checkpoint-stress-test.ts` (or any real
tutor-chat/JSON-generation request) from a machine with a real
`GROQ_API_KEY` and unblocked network access to `api.groq.com`.

## Task 5 — Compatibility notes

- `openai/gpt-oss-20b` is served through Groq's OpenAI-compatible
  `chat.completions.create()` endpoint exactly like `llama-3.1-8b-instant`
  was — the SDK call shape (`messages`, `max_tokens`, `temperature`,
  `response_format`) is unchanged, so no caller-side code needed updating
  beyond the literal model string.
- `generateJSON()`/`routeJSON()` rely on the model returning clean JSON when
  instructed via the prompt ("Return ONLY valid JSON..."); this is a
  prompt-level instruction, not a model-specific feature, so behavior should
  carry over, but JSON-strictness can vary by model and was **not**
  independently verified live in this sandbox (see Task 4). Recommend a
  quick live smoke test of `generateJSON`/`routeJSON` against a couple of
  real curriculum/checkpoint prompts before relying on this in production.
- No changes were made to `consumeAIBudget()`, retry/timeout configuration
  (`maxRetries: 2`, `timeout: 20000`), or the Yandex-fallback routing logic
  in `routeAI()` — all preserved exactly as before.

## Commit

```
git commit -m "Replace deprecated Groq model"
```
Pushed to `claude/my-tutor-foundation-KDSUO`. See chat report for the exact
commit hash.
