/**
 * A TUTOR MAY NOT DRAW A PICTURE OF SOMETHING WHEN NO FIGURE IS ATTACHED.
 *
 * ── THE DEFECT, REPRODUCED LIVE ─────────────────────────────────────────────
 * Driving `chem.found.matter` and `chem.equil.weak-acid` on a real account
 * (2026-09-14), asked "can you show me a diagram or picture for this?" with
 * NO figure attached (`visualSpec`/`sceneSpec`/`visual` all absent both
 * times) — the tutor answered with a hand-drawn ASCII figure in a code fence
 * both times:
 *
 *   chem.found.matter: a full box-drawing decision tree (┌┐└┘│) classifying
 *   matter into element/compound/mixture — 18 lines of pure ASCII art.
 *
 *   chem.equil.weak-acid: `HA(aq) ⇌ H⁺(aq) + A⁻(aq)` followed by two lines of
 *   bare `^`/`|` pointer characters aligning "reactants"/"products" under it.
 *
 * `visualContract.ts`'s own NO-FIGURE prompt block already instructs "Teach
 * this concept normally in prose" and, when the learner explicitly asked for
 * a visual, "acknowledge that in ONE short clause... then give the clearest
 * possible prose explanation" — it does NOT ask for ASCII art, and its own
 * header names the OLD, now-replaced prompt as the one that told the model to
 * "draw ASCII instead." The model drew one anyway. Same class as every other
 * advisory-prompt-rule failure this repo has measured and then enforced
 * deterministically (`figureReference.ts`, `gateProbeContract.ts`,
 * `withholdUngradedGateQuestion`).
 *
 * ── WHY A WHOLE-BLOCK STRIP IS THE WRONG DEFAULT ─────────────────────────────
 * The two reproduced cases are NOT the same shape. `chem.found.matter`'s fence
 * is decoration only — every fact in it (element vs. compound vs. mixture) is
 * separately restated in the "**Guidance:**" paragraph that follows, so
 * removing the whole fence loses nothing. `chem.equil.weak-acid`'s fence OPENS
 * with a real, useful chemical equation (`HA(aq) ⇌ H⁺(aq) + A⁻(aq)`) that the
 * bullet-point explanation immediately after it depends on ("On the left is
 * the weak acid... On the right are the hydrogen ions...") — removing the
 * WHOLE fence would delete the one piece of notation the rest of the answer
 * is explaining. So this distinguishes two things a fenced block can hold:
 *
 *   BOX-DRAWING — any Unicode box-drawing character (U+2500-U+257F: ┌┐└┘│─
 *   ├┤┬┴┼ etc.). Never legitimate prose or notation in any subject this
 *   platform teaches; unambiguous ASCII art. Removed WHOLE.
 *
 *   POINTER LINES — a line inside the fence containing ONLY whitespace and a
 *   small symbol set (^ | < > - + * = ~ . : _ / \) with no letter or digit —
 *   used to spatially align labels under real notation, as in the acid/base
 *   example. Removed individually; any REAL content line in the same fence
 *   (the equation itself) survives and is unwrapped from the fence, since a
 *   single line of chemistry notation does not need to render as a code
 *   block.
 *
 * An ordinary fenced block with neither signal (real multi-line code, a
 * legitimate multi-line equation with no pointer decoration) is left exactly
 * as written — this guard has no branch that can touch it.
 *
 * ── THE LEAD-IN ──────────────────────────────────────────────────────────────
 * Both reproduced cases open with a sentence promising a diagram
 * ("Below is a simple text diagram that shows...", "I can describe a simple
 * diagram in text for you:") immediately before the fence. Once the ASCII art
 * is gone, that promise is either false (nothing visual follows) or
 * misleading (what follows is text, not "a diagram"). Removed only when it
 * immediately precedes a fence this guard has just processed, ends in a
 * colon, and names a diagram-shaped noun — the same narrow-scope discipline
 * `stripLeadingFalseConfirmation` and `figureReference.ts` already use, so
 * ordinary teaching prose that happens to end a sentence in a colon is never
 * touched.
 *
 * ── WHEN IT STAYS QUIET ──────────────────────────────────────────────────────
 * Never fires while a real figure is on the learner's screen (`figureOnScreen`
 * — the SAME condition `stripUnbackedFigureReferences` already uses, reused
 * rather than re-derived): a genuinely code-fenced worked example beside a
 * real visual is ordinary teaching and must not be touched.
 */

/** Any Unicode box-drawing character — unambiguous hand-drawn ASCII art. */
const BOX_DRAWING_RE = /[─-╿]/

/** A line whose only non-whitespace characters are drawing/pointer symbols —
 *  no letter, no digit. A blank line is never "pointer-only": it is spacing,
 *  not decoration, and dropping it would collapse the remaining content. */
function isPointerOnlyLine(line: string): boolean {
  const trimmed = line.trim()
  if (trimmed.length === 0) return false
  if (/[a-zA-Z0-9]/.test(line)) return false
  return /^[\s^|<>\-+*=~.:_/\\]*$/.test(line)
}

/** Names a diagram-shaped noun — the vocabulary actually observed in the two
 *  reproduced lead-ins, kept short rather than guessed wider. */
const DIAGRAM_WORD_RE = /\b(diagram|chart|sketch|picture|figure)\b/i

function processFenceBody(body: string): { text: string; removed: boolean } {
  if (BOX_DRAWING_RE.test(body)) {
    return { text: '', removed: true }
  }
  const lines = body.split('\n')
  const firstPointerIdx = lines.findIndex(isPointerOnlyLine)
  if (firstPointerIdx === -1) {
    return { text: body, removed: false } // no pointer decoration at all — untouched
  }
  // EVERYTHING FROM THE FIRST POINTER LINE ONWARD IS ANNOTATION, NOT CONTENT.
  //
  // The reproduced case (chem.equil.weak-acid) is real equation, then two
  // pointer lines, then bare labels ("reactants products") the pointers were
  // aligning under the equation. Keeping the labels while dropping only the
  // symbol lines that gave them their meaning ("^ ^" / "| |") left a floating
  // "reactants products" with nothing explaining why it was there — worse
  // than the diagram, not better. A line of bare labels is decoration of
  // whatever came before it, exactly like the pointer symbols themselves, so
  // both are dropped together; only what precedes the first pointer line
  // survives.
  const before = lines.slice(0, firstPointerIdx)
  const hasRealContent = before.some((l) => /[a-zA-Z0-9]/.test(l))
  if (!hasRealContent) {
    // Every line before the pointers (if any) was itself blank — decoration
    // with nothing underneath it.
    return { text: '', removed: true }
  }
  return { text: before.join('\n').trim(), removed: true }
}

export interface AsciiDiagramStripResult {
  text: string
  stripped: boolean
  removedBlocks: number
}

const FENCE_WITH_LEADIN_RE = /(?:^|\n)([^\n]{0,140}:)[ \t]*\n+```[^\n]*\n([\s\S]*?)```\n?/g
const BARE_FENCE_RE = /```[^\n]*\n([\s\S]*?)```\n?/g

/**
 * PASS 3 — THE MODEL DOES NOT ALWAYS USE A CODE FENCE.
 *
 * Live re-verification after Passes 1-2 shipped (2026-09-14, real account,
 * chem.found.matter, deployed app): the SAME behaviour in a THIRD shape
 * neither pass catches —
 *
 *   Below is a simple, text-based "diagram" of a glass of water and its key
 *   features.
 *
 *   +-------------------+ ← Glass
 *
 *   - The dots represent water molecules moving around.
 *   ...
 *
 * Plain `+`/`-` ASCII, no Unicode box-drawing, no code fence — so neither
 * `BOX_DRAWING_RE` nor the fence-scoped passes above can see it. The model's
 * own words are the reliable signal instead: all three reproduced cases
 * (this one and the two in the module header) have the model EXPLICITLY
 * SELF-LABEL what follows as a "text diagram" — the two words co-occurring
 * is rare in ordinary teaching prose and does not depend on drawing style.
 *
 * Scoped narrowly to avoid the false-positive risk a looser pattern-match on
 * the art itself would carry (a markdown table row, a short arithmetic line
 * like "3 - 2 = 1", a horizontal rule): BOTH conditions must hold — (a) the
 * lead-in names "text" and "diagram" together, and (b) the very next
 * paragraph is genuinely line-drawn (a run of 3+ consecutive symbol
 * characters AND at least 30% of its non-whitespace content is symbols, not
 * letters). A markdown table (`| Concept | Definition |`) is ~15% symbols by
 * that measure and is never touched; "3 - 2 = 1" has no 3-symbol run. Both
 * were checked, not assumed.
 */
// `[^\n]{0,60}?` is LAZY, not greedy — a greedy quantifier here swallows the
// trailing period/colon itself (it matches `[^\n]` too), leaving nothing for
// `[.:]` to match and silently failing the whole pattern. Caught by the
// verification script against the real reproduced text before this shipped:
// the greedy version matched zero times against the exact defect it exists
// to catch.
const TEXT_DIAGRAM_LEADIN_RE =
  /(?:^|\n)([^\n]{0,160}\btext\b[^\n]{0,25}\bdiagram\b[^\n]{0,60}?|[^\n]{0,160}\bdiagram\b[^\n]{0,25}\btext\b[^\n]{0,60}?)[.:]\s*\n+([^\n]+(?:\n[^\n]+)*)\n+/gi

const SYMBOL_CHAR_RE = /[+\-|=_<>^~*/\\]/g
const SYMBOL_RUN_RE = /[+\-|=_~]{3,}/

function isArtShapedParagraph(block: string): boolean {
  const compact = block.replace(/\s/g, '')
  if (compact.length === 0) return false
  if (!SYMBOL_RUN_RE.test(compact)) return false
  const symbolCount = (compact.match(SYMBOL_CHAR_RE) ?? []).length
  return symbolCount / compact.length >= 0.3
}

export function stripUnbackedAsciiDiagram(
  text: string,
  figureOnScreen: boolean,
): AsciiDiagramStripResult {
  if (figureOnScreen) return { text, stripped: false, removedBlocks: 0 }
  if (typeof text !== 'string' || text.length === 0) {
    return { text, stripped: false, removedBlocks: 0 }
  }
  // NOT a `text.includes('\`\`\`')` early-exit — Pass 3 below matches an
  // unfenced self-labeled "text diagram" (the live-verified defect that
  // motivated it carried no fence at all), so requiring one here would skip
  // Pass 3 on every turn it needs to run. Caught by re-running the
  // verification script against the real reproduced text after adding Pass
  // 3: it silently matched zero times until this line was corrected.

  let removedBlocks = 0

  // Pass 1: fences with an immediately-preceding colon-terminated lead-in.
  // The lead-in is removed ONLY if the fence itself turns out to need
  // processing (box-drawing or pointer lines present) — a lead-in before an
  // ordinary code block is left alone, because nothing about it was false.
  let result = text.replace(FENCE_WITH_LEADIN_RE, (whole, leadin: string, body: string) => {
    const processed = processFenceBody(body)
    if (!processed.removed) return whole // untouched fence — keep the lead-in too
    removedBlocks += 1
    const dropLeadin = DIAGRAM_WORD_RE.test(leadin)
    const prefix = dropLeadin ? '' : `\n${leadin}\n\n`
    return processed.text.length > 0 ? `${prefix}${processed.text}\n` : prefix
  })

  // Pass 2: any remaining bare fence (no colon-terminated lead-in, or one
  // that didn't match pass 1's shape).
  result = result.replace(BARE_FENCE_RE, (whole, body: string) => {
    const processed = processFenceBody(body)
    if (!processed.removed) return whole
    removedBlocks += 1
    return processed.text.length > 0 ? `${processed.text}\n` : ''
  })

  // Pass 3: a self-labeled "text diagram" with no fence at all. See the
  // constant's own header for the reproduction and the false-positive checks.
  result = result.replace(TEXT_DIAGRAM_LEADIN_RE, (whole, _leadin: string, paragraph: string) => {
    if (!isArtShapedParagraph(paragraph)) return whole
    removedBlocks += 1
    return ''
  })

  if (removedBlocks === 0) return { text, stripped: false, removedBlocks: 0 }
  // Collapse a run of blank lines a removal can leave behind, never touching
  // a single blank line (ordinary paragraph spacing).
  return { text: result.replace(/\n{3,}/g, '\n\n').trim(), stripped: true, removedBlocks }
}
