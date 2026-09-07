/**
 * LAST LINE OF DEFENCE — no machine markup ever reaches a learner.
 *
 * ── THE DEFECT THIS EXISTS FOR (observed live, 2026-08-16) ──────────────────
 * A real production turn on a real account ended with this in the chat bubble,
 * and it was saved to the message history, so it came back on every reload:
 *
 *   <!--ATMPT channel="verbal" representation="narrative" … -->
 *   <!--OBSERVATION signal="false" confidence="low" confusion="true" phrase="A"-->
 *
 * The prompts ask the model for `<!--ATTEMPT …-->` (attemptVectorSignal.ts) and
 * `<!--SIGNAL …-->` (signals.ts). The parsers match exactly those names. The
 * model abbreviated one to ATMPT and renamed the other to OBSERVATION — it even
 * renamed the attribute `correctness` to `signal`. No parser keyed to a tag
 * NAME can ever recover from the model choosing a different name.
 *
 * That has two costs, and the quiet one is worse:
 *   (1) raw markup in front of a learner, persisted;
 *   (2) the signal is never parsed, so PROBE_OUTCOME / MISCONCEPTION_DETECTED
 *       and the attempt vector are silently not written for that turn. The
 *       evidence spine records nothing and every count still looks healthy.
 *
 * This module cannot fix (2) — a misnamed tag carries no recoverable contract,
 * and guessing at one would fabricate evidence, which is worse than losing it.
 * It fixes (1) absolutely, for every tag family, including ones not invented
 * yet.
 *
 * ── SCOPE, MEASURED ────────────────────────────────────────────────────────
 * Across all 1,986 assistant messages in production (2026-07-08 → 2026-08-16),
 * 9 contain raw `<!--` markup — 0.45%. They are not one bug but five families:
 *   4 × <!--SIGNAL …/>   ← CORRECTLY named and still leaked
 *   2 × <!--MCQ q="…"-->
 *   1 × <!--VISUAL type="three_crystal_lattice"-->
 *   1 × <!--LESSON_COMPLETE-->
 *   1 × <!--ATMPT-->/<!--OBSERVATION-->
 * So name-specific parsers are necessary but demonstrably not sufficient. This
 * runs AFTER all of them, deletes only what they left behind, and is the reason
 * a sixth family cannot become a sixth incident.
 *
 * ── WHY A BLANKET SWEEP IS SAFE HERE ───────────────────────────────────────
 * Checked before writing it: no client feature reads `<!--` out of chat text.
 * The MCQ wizard renders from the separate `mcq` JSON field, visuals from
 * `visual`/`sceneSpec`/`visualSpec`. LessonScreen already strips stray SIGNAL
 * tags client-side (defence in depth) — the codebase already treats residual
 * tags as garbage, not content. The one `<!--` literal in the client is a
 * placeholder inside the CODE EDITOR's default document, which never passes
 * through here.
 */

/**
 * Machine tags are SHOUTED: ATTEMPT, SIGNAL, MCQ, VISUAL, LESSON_COMPLETE,
 * ATMPT, OBSERVATION. Requiring an uppercase opening token of three or more
 * characters catches every family seen and any plausible future one, while
 * leaving an ordinary lowercase HTML comment alone — this deletes text from a
 * learner's message, so it should delete only what is unmistakably markup.
 */
const MACHINE_TAG_RE = /<!--\s*[A-Z][A-Z0-9_]{2,}\b[\s\S]*?(?:-->|\/>)/g

/**
 * P1 (visual reference integrity, 2026-08-22): a raw HTML-ELEMENT-shaped
 * `<visual ...>...</visual>` or self-closing `<visual .../>` tag, case-
 * insensitive. No prompt in this codebase asks the model for this shape —
 * the real visual tag is the uppercase `VISUAL:<type>` line
 * (`src/lib/school/visuals/detectVisual.ts`'s `parseVisualTag`) — but a
 * model can hallucinate markup it was never asked for (the exact lesson
 * `MACHINE_TAG_RE` above already exists for), and this codebase's own
 * component tree genuinely renders lowercase `<visual>`-shaped JSX
 * (`VisualCard`, `VisualRenderer`) elsewhere, which is precisely the kind of
 * plausible-looking tag a model could imitate in prose. Swept here,
 * defensively, alongside the comment-style machine tags above, so the same
 * "no machine markup ever reaches a learner" guarantee covers this shape
 * too — never in the render path today, but never a silent gap either.
 */
const RAW_VISUAL_ELEMENT_RE = /<visual\b[^>]*>[\s\S]*?<\/visual\s*>|<visual\b[^>]*\/?>/gi

/**
 * PHASE 6 — THE THIRD MARKUP SHAPE, and the one this module's own header
 * wrongly claimed to already cover ("for every tag family, including ones not
 * invented yet"). That was true of the two COMMENT-shaped families above and
 * false of a third shape the prompts actively ask for: SQUARE BRACKETS.
 *
 * ── OBSERVED LIVE (Phase 6 certification, eng.grammar.nouns, disposable QA
 * account) ─────────────────────────────────────────────────────────────────
 * The learner's chat bubble ended with:
 *
 *   …how countable and uncountable nouns affect article use and quantifiers.
 *   [ASSESSMENT_RESULT correctness=1 reasoning=2 confidence=3]
 *
 * `src/app/api/learn/chat/route.ts` INSTRUCTS the model to emit exactly this
 * tag, and then strips two of the three bracket tags it asks for: `[HINT]` is
 * consumed by the hint parser, `[LESSON_COMPLETE]` has dedicated handling, and
 * `[ASSESSMENT_RESULT …]` had no stripper anywhere on the Library path. The
 * comment-shaped sweep above cannot see it, so it reached the learner and was
 * persisted to message history.
 *
 * Worse, and the reason this belongs HERE rather than at the call site:
 * `hasResidualMachineTag` reported that text as CLEAN, so the repository's own
 * residual-tag assertion was structurally blind to the entire bracket shape.
 *
 * The codebase already knew: `kernel/verifier/lexicons.ts` carries a
 * `BRACKET_TAG_PATTERN` and a V-TAG rule ("any bracketed tag not in this list
 * is STRIPPED") — but the K5 Output Verifier is off by default, so that
 * knowledge never runs on the serving path. This is the always-on equivalent.
 *
 * ── WHAT MUST SURVIVE, AND WHY (checked before writing this) ───────────────
 * `[LESSON_COMPLETE]` is NOT residue — it is a LIVE CLIENT CONTROL TAG.
 * `LessonScreen.tsx` calls `parseLessonCompletionTag(full)` on the response
 * text to trigger the completion transition, and the route's own two
 * `[LESSON_COMPLETE]` strips are FAIL-CLOSED error paths (a gate throw, or a
 * Library turn with no state machine) — on the authorized happy path the tag
 * is deliberately allowed through. Sweeping it here would have silently broken
 * lesson completion for every subject. It is excluded by name, not by luck.
 *
 * Everything else is deleted on the same SHOUTED-name discipline as
 * `MACHINE_TAG_RE`: an uppercase opening token of three or more characters.
 * The trailing `(?!\()` protects markdown links — `[NASA](https://nasa.gov)`
 * is prose a tutor may legitimately write, and is not markup.
 */
const CLIENT_CONTROL_TAGS = ['LESSON_COMPLETE'] as const
const BRACKET_MACHINE_TAG_RE = new RegExp(
  `\\[(?!(?:${CLIENT_CONTROL_TAGS.join('|')})\\b)[A-Z][A-Z0-9_]{2,}(?:[ \\t][^\\]\\n]*)?\\](?!\\()`,
  'g',
)

/**
 * PHASE 7 — THE FOURTH MARKUP SHAPE: bare JSON.
 *
 * ── OBSERVED LIVE (real-account student-experience study, 2026-09-06) ──────
 * A turn's ENTIRE learner-facing reply was, verbatim:
 *
 *   {"question_stage":"1"}
 *
 * matching neither the comment shape (`<!--ATTEMPT …-->`) nor the bracket
 * shape (`[ASSESSMENT_RESULT …]`) this sweep already covers — a third
 * "renamed the tag" incident this module's own header already predicted
 * ("no parser keyed to a tag NAME can ever recover from the model choosing a
 * different name"), this time in a different SYNTAX entirely. The prompt's
 * QUESTION STAGE POLICY (`src/lib/ai/client.ts`) talks about stage numbers in
 * prose — "Stage 1 Observation", "Stage 2 Recognition" — never as JSON; the
 * model appears to have invented a structured self-declaration in the shape
 * of the OTHER machine tags it has seen (SIGNAL, ATTEMPT), in a syntax none of
 * the name-keyed parsers above can recognise.
 *
 * ── WHY A KEY ALLOWLIST, NOT A BLANKET JSON SWEEP ───────────────────────────
 * Unlike `<!--NAME…-->` or `[NAME …]`, a bare `{…}` is not reserved
 * vocabulary — this is a subject-agnostic platform that teaches Computer
 * Science, and a genuine lesson turn can legitimately contain JSON as TEXT
 * ("a JSON object looks like `{"name": "Ada"}`"). Deleting every `{…}` would
 * delete real teaching content, which is the opposite of this module's job.
 * So this checks the PARSED KEYS, not the syntax alone: only when every key is
 * drawn from this codebase's own internal signal/attempt/stage vocabulary
 * (`signals.ts`, `attemptVectorSignal.ts`, `conversationState.ts`'s "Question
 * stage") is a fragment unmistakably a machine declaration rather than a
 * worked example. A CS lesson's own `{"name": "Ada"}` shares none of these
 * keys and is left untouched.
 */
const MACHINE_JSON_KEYS: ReadonlySet<string> = new Set([
  'question_stage', 'stage', 'phase', 'move', 'signal', 'correctness',
  'confidence', 'confusion', 'phrase', 'probe', 'mastery', 'gap',
])

/** Is this candidate fragment, trimmed, a bare JSON object made entirely of
 *  this codebase's own internal machine vocabulary? */
function isMachineJsonFragment(candidate: string): boolean {
  const trimmed = candidate.trim()
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) return false
  let parsed: unknown
  try {
    parsed = JSON.parse(trimmed)
  } catch {
    return false
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return false
  const keys = Object.keys(parsed as Record<string, unknown>)
  return keys.length > 0 && keys.every((k) => MACHINE_JSON_KEYS.has(k))
}

/**
 * Remove a machine-JSON fragment wherever it stands ALONE on its own line —
 * the shape observed in production, and the shape every other sweep in this
 * file already assumes for a tag that is not woven into surrounding prose.
 * Never touches JSON that is part of a longer line of text (a worked example
 * embedding one inline), which is exactly the case the key allowlist above
 * cannot itself distinguish from a standalone declaration.
 */
function stripStandaloneMachineJson(text: string): string {
  if (!text.includes('{')) return text
  const lines = text.split('\n')
  const kept = lines.filter((line) => !isMachineJsonFragment(line))
  return kept.length === lines.length ? text : kept.join('\n')
}

/**
 * An UNTERMINATED tag at the very end — the model ran out of tokens mid-tag.
 * attemptVectorSignal.ts documents the same hazard for its own tag and resolves
 * it the same way: a visible `<!--ATTEMPT` fragment is worse than over-deleting
 * a trailing line that was never prose to begin with. Anchored to end-of-text
 * so it can only ever eat the tail.
 */
const UNTERMINATED_TRAILING_RE = /\n?[ \t]*<!--\s*[A-Z][A-Z0-9_]{2,}\b[^>]*$/

/**
 * Remove any machine markup the named parsers left behind.
 *
 * Total: never throws, and never returns null/undefined for a string input.
 * Idempotent, and applied repeatedly until stable so that a tag reconstructed
 * by the removal of an overlapping one cannot survive — the same nesting
 * hazard attemptVectorSignal.ts guards against.
 */
export function stripResidualMachineTags(text: string): string {
  if (typeof text !== 'string') return text
  // Fast path: none of the shapes of markup this sweep removes is present.
  // `/<visual\b/i` is cheap and only tested once here (not per-pass), since
  // the loop below re-tests via the full regex on each pass anyway.
  if (!text.includes('<!--') && !/<visual\b/i.test(text) && !text.includes('[') && !text.includes('{')) return text
  let out = text
  for (let pass = 0; pass < 4; pass++) {
    const next = out
      .replace(MACHINE_TAG_RE, '')
      .replace(RAW_VISUAL_ELEMENT_RE, '')
      .replace(BRACKET_MACHINE_TAG_RE, '')
    if (next === out) break
    out = next
  }
  out = stripStandaloneMachineJson(out)
  out = out.replace(UNTERMINATED_TRAILING_RE, '')
  // Collapse the blank-line crater a removed tag block leaves mid-message.
  out = out.replace(/\n{3,}/g, '\n\n')
  return out.trimEnd()
}

/** True when the text still carries machine markup. For assertions and tests. */
export function hasResidualMachineTag(text: string): boolean {
  if (typeof text !== 'string') return false
  // The bracket shape is included because its ABSENCE here is what let the
  // observed `[ASSESSMENT_RESULT …]` leak be reported as clean. A detector
  // that cannot see a leak class is worse than no detector, because it is
  // trusted. `[LESSON_COMPLETE]` is excluded for the same reason the sweep
  // excludes it: it is a live client control tag, not residue.
  return /<!--\s*[A-Z][A-Z0-9_]{2,}\b/.test(text)
    || /<visual\b/i.test(text)
    || new RegExp(BRACKET_MACHINE_TAG_RE.source).test(text)
    // The JSON shape, same reasoning as the bracket shape above: a detector
    // blind to it would report a leak like this file's own header example as
    // clean.
    || text.split('\n').some((line) => isMachineJsonFragment(line))
}
