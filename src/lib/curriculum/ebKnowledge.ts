/**
 * AUTHORITATIVE KNOWLEDGE EXTRACTION — the one place EB prose becomes structure.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The Content Completeness Audit found that authored teaching knowledge could
 * disappear between the Educational Brain corpus and the model with NO signal.
 * Measured across all 1,118 EB concept entries on 2026-09-13, before this
 * module existed:
 *
 *   misconceptions   3,016 authored candidate blocks -> 1,220 parsed
 *                    664 files (59%) parsed to ZERO while authoring real
 *                    content: chem 75, eng 214, math 192, phys 183
 *   core understanding  22.7% of authored characters reached the model, and
 *                    794 of 1,115 files dropped a tail containing governing
 *                    language (only if / must / never / assumes / except /
 *                    conserved / sign convention / boundary / valid when).
 *
 * Neither loss was observable. The parser returned `[]`, the caller could not
 * distinguish "this concept has no misconceptions" from "this concept's
 * misconceptions did not parse", and the model then improvised.
 *
 * ── THE CONTRACT THIS MODULE EXISTS TO MAKE MECHANICAL ──────────────────────
 *
 *   IF authoritative teaching content exists in a supported EB section,
 *   THEN the runtime either exposes it, OR reports an observable
 *        knowledge-exposure failure.
 *
 * It must never silently become: authored -> parsed away -> model improvises.
 *
 * ── ONE PARSER, NOT TWO ─────────────────────────────────────────────────────
 * `countMisconceptionCandidates` and `parseAuthoritativeMisconceptions` share
 * `MC_HEAD_RE` — the SAME regex, not two that agree today and drift tomorrow.
 * So for every supported shape, `authored === parsed` is true by construction
 * rather than by coincidence, and the corpus contract test in
 * `ebKnowledgeContract.test.ts` calls these exact functions rather than
 * reimplementing them.
 *
 * This module is PURE: no I/O, no imports. It is the canonical extraction
 * layer beneath `blueprintLoader`, which keeps ownership of file loading,
 * caching and prompt assembly.
 */

// ── Provenance ──────────────────────────────────────────────────────────────

/**
 * Where an authoritative teaching claim came from.
 *
 * The runtime must be able to answer "where did this come from?" without
 * guessing. Provenance is machine-readable and internal — it is NOT rendered
 * to the learner; `blueprintLoader` prints the human-facing text only.
 */
export interface KnowledgeProvenance {
  /** Always `educational-brain` today; named so a second corpus cannot be
   *  mistaken for this one if one is ever added. */
  sourceType: 'educational-brain'
  /** The KG concept id the entry is keyed to, e.g. `chem.bond.resonance`. */
  conceptSlug: string
  /** The authored `## ...` section the claim was extracted from. */
  section: string
  /** 1-based line within the section, for pinpointing an authoring defect. */
  line: number
}

// ── Misconceptions ──────────────────────────────────────────────────────────

/** The canonical internal representation. One shape, whatever the authored
 *  convention was. */
export interface AuthoritativeMisconception {
  /** Authored label, verbatim: `M1`, `MC-3`, `MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS`. */
  id: string
  /** The claim itself, as authored. */
  title: string
  /** What a learner holding it says or does — the detection surface. */
  symptom: string | null
  /** The authored probe, verbatim where one exists. */
  probe: string | null
  /** How to repair it. */
  correction: string | null
  /** A worked example or evidence line, where the entry carries one. */
  evidence: string | null
  provenance: KnowledgeProvenance
}

/**
 * The five authored label conventions in the corpus, and nothing else.
 *
 *   `MC-3`                               numeric
 *   `MC-A`, `MC-B`                        single-letter (eng.communication)
 *   `MC-VERBS-ARE-ONLY-PHYSICAL-ACTIONS`  descriptive slug
 *   `M1`                                  the original physics/english shape
 *
 * Deliberately CLOSED. After `MC-` the label must be digits or SHOUTING-CASE,
 * and `M\d+` requires digits, so ordinary prose cannot produce one: a line has
 * to literally begin `MC-…`/`M<n>` followed by a separator. There is no
 * bare-number form and no free-text-label form — "do not blindly accept
 * arbitrary prose as a misconception" is enforced here, at the label, not
 * downstream.
 *
 * The single-letter case was found by DIFFING this closed rule against a
 * deliberately loose scan of the same corpus: an earlier draft required a
 * hyphenated slug, which silently excluded 157 genuine `MC-A`/`MC-B` entries
 * across `eng.communication.*`. Narrowing the definition of "authored" until
 * it matches the parser is the same defect this module exists to stop, one
 * level up — so the diff is part of the contract test.
 */
const MC_LABEL = String.raw`(?:MC-[0-9]+|MC-[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*|M[0-9]+)`

/**
 * A misconception HEAD: the line that introduces an authored entry.
 *
 * Anchored to the start of a line, and only these prefixes may precede the
 * label — a list marker, a markdown heading, an opening `**`, in that order,
 * each optional. Measured against the real corpus, the five live shapes are:
 *
 *   (a) `**M1 — Title**`                                physics, english
 *   (b) `- **MC-1 — "Title"**:`                         maths, chemistry
 *   (c) `- **MC-1 (Type 5 — instruction-induced)**: …`  chemistry, maths
 *   (d) `### MC-1: TITLE (Foundational; Type 1 …)`      maths
 *   (e) `**MC-DESCRIPTIVE-SLUG (Blueprint Component 1) — Type 1, …**`  english
 *
 * (a) and (b) parsed before this module. (c), (d) and (e) did not, for three
 * separate reasons, all of them the parser being stricter than the corpus:
 * (c) has a parenthetical qualifier where a dash was required, (d) is a
 * non-bold heading with a colon, (e) has a non-numeric id.
 *
 * The separator after the label is required — `—`, `–`, `-`, or `:` — with an
 * optional parenthetical qualifier and optional closing `**` between. That
 * requirement is what keeps this a LABEL test rather than a prose test.
 */
const MC_HEAD_SRC = String.raw`^[ \t]*(?:[-*+][ \t]+)?(?:#{3,6}[ \t]+)?(?:\*\*[ \t]*)?(${MC_LABEL})\b[ \t]*(?:\([^)\n]{0,200}\))?[ \t]*(?:\*\*)?[ \t]*[—–:-]`
const MC_HEAD_RE = new RegExp(MC_HEAD_SRC, 'gm')

/** Exported for the corpus contract test, so the shapes it asserts and the
 *  shapes the runtime accepts cannot diverge. */
export const MISCONCEPTION_HEAD_PATTERN = MC_HEAD_SRC

/**
 * How many authored misconception blocks this section CONTAINS.
 *
 * The denominator of the contract. Shares `MC_HEAD_RE` with the parser, so a
 * shape this counts is a shape that parser can start a block on.
 */
export function countMisconceptionCandidates(section: string): number {
  if (!section) return 0
  MC_HEAD_RE.lastIndex = 0
  let n = 0
  while (MC_HEAD_RE.exec(section) !== null) n++
  return n
}

/** Strip markdown furniture from an extracted fragment. */
function clean(s: string): string {
  return s
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Pull a labelled field out of a block.
 *
 * Field labels vary by authoring batch — `*Symptom / phrases*:`,
 * `**Detection probe:**`, `**Trigger**:`, and bare inline `Probe:` /
 * `Intervention:` mid-sentence in the chemistry one-liners. Matching is on the
 * label's STEM at a boundary, so a new batch that writes `Detection probe
 * (verbatim)` is read without another parser change.
 */
function field(block: string, ...stems: string[]): string | null {
  for (const stem of stems) {
    const re = new RegExp(
      // optional bold/italic wrapper, the stem, optional trailing words, colon
      String.raw`(?:^|\s|\*)\*{0,2}[ \t]*${stem}[^\n:*]{0,40}\*{0,2}[ \t]*:` +
        // The value runs to the NEXT labelled field, the next head, or the end
        // of the block. No `m` flag: with it, `$` matches end-of-LINE and a
        // lazy value stops at the first newline — which silently truncated
        // every multi-line authored field to its first line. Caught by the
        // pre-existing `ebMisconceptionRetrieval` guard, not by reading.
        String.raw`[ \t]*([\s\S]*?)(?=\n\s*[-*+]\s*\*|\n\s*\*{1,2}[A-Z][^\n:*]{0,40}\*{0,2}\s*:|\n\s*#{3,6}\s|\n${MC_HEAD_SRC.slice(1)}|$)`,
      'i',
    )
    const m = re.exec(block)
    const v = m?.[1] ? clean(m[1]) : ''
    if (v) return v.slice(0, 400)
  }
  return null
}

/**
 * The title, given a head line and the label that opened it.
 *
 * Removes the prefix furniture and the label, then the leading separator. A
 * parenthetical qualifier that sits BEFORE the separator is a type
 * classification (`(Type 5 — instruction-induced)`), not the claim, so it is
 * dropped; one that sits after is part of the authored title and is kept.
 */
function titleFrom(block: string, label: string): string {
  // A head may WRAP: the english descriptive-slug batch writes
  // `**MC-SLUG (Blueprint Component 1) —\nType 1, overgeneralization**`, so
  // reading one line only would discard the half after the separator. Two
  // lines is enough for every wrapped head in the corpus and cannot run into
  // the body, which always starts on its own bulleted line.
  const headLine = block.split('\n').slice(0, 2).join(' ')
  let t = headLine
    .replace(/^[ \t]*(?:[-*+][ \t]+)?(?:#{3,6}[ \t]+)?(?:\*\*[ \t]*)?/, '')
    .slice(label.length)
  t = t.replace(/^[ \t]*\([^)\n]{0,200}\)/, '')
  t = t.replace(/^[ \t]*(?:\*\*)?[ \t]*[—–:-][ \t]*/, '')
  // Stop at the first field label, so a head that did not wrap does not absorb
  // the block's first bullet.
  t = t.split(/\s[-*+]\s\*|\s\*(?:Why|Symptom|Detection|Recovery|Trigger|Repair)/)[0] ?? t
  const title = clean(t).replace(/^["“](.*)["”][:.]?$/, '$1').trim()
  if (title) return title.slice(0, 360)

  // A DESCRIPTIVE-SLUG label carries the claim in the id itself
  // (`MC-PASSIVE-VOICE-IS-ALWAYS-BAD-WRITING`). Re-rendering it as words is a
  // faithful restatement of authored text, never an invented claim — and it is
  // what stops the prompt printing `MC-X: "MC-X"` for 114 english entries.
  const slug = /^MC-([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)$/.exec(label)
  if (slug) return slug[1].toLowerCase().replace(/-/g, ' ')
  return ''
}

/**
 * Parse an authored `## Misconceptions` section into canonical entries.
 *
 * An entry that yields only a title is still returned: knowing the claim
 * exists is what stops the tutor agreeing with it, and that is the failure
 * this closes. Returning fewer entries than `countMisconceptionCandidates`
 * reports is a CONTRACT BREACH, caught by `ebKnowledgeContract.test.ts`.
 */
export function parseAuthoritativeMisconceptions(
  section: string,
  provenance: Omit<KnowledgeProvenance, 'line'>,
): AuthoritativeMisconception[] {
  if (!section) return []

  // Locate every head, then slice block boundaries between consecutive heads.
  MC_HEAD_RE.lastIndex = 0
  const heads: Array<{ index: number; label: string }> = []
  let m: RegExpExecArray | null
  while ((m = MC_HEAD_RE.exec(section)) !== null) {
    heads.push({ index: m.index, label: m[1] })
    // A zero-length match cannot happen (the separator is required), but guard
    // the loop anyway — an infinite loop here would hang every chat turn.
    if (MC_HEAD_RE.lastIndex === m.index) MC_HEAD_RE.lastIndex++
  }
  if (heads.length === 0) return []

  const out: AuthoritativeMisconception[] = []
  for (let i = 0; i < heads.length; i++) {
    const start = heads[i].index
    const end = i + 1 < heads.length ? heads[i + 1].index : section.length
    const block = section.slice(start, end)
    const title = titleFrom(block, heads[i].label)

    out.push({
      id: heads[i].label,
      title: title || heads[i].label,
      symptom: field(block, 'Symptom', 'Characteristic phrase', 'Trigger', 'Description'),
      probe: field(block, 'Detection probe', 'Probe'),
      correction: field(block, 'Recovery', 'Repair', 'Intervention', 'Correction'),
      evidence: field(block, 'Why this birth type', 'Why', 'Verification of death', 'Example'),
      provenance: {
        ...provenance,
        line: section.slice(0, start).split('\n').length,
      },
    })
  }
  return out
}

// ── Core Understanding ──────────────────────────────────────────────────────

/**
 * Words that mark a statement as GOVERNING rather than descriptive: the
 * conditions, invariants, exceptions and conventions that make a rule true
 * only sometimes. These are exactly the sentences whose loss lets a model
 * state a plausible but false universal.
 *
 * Used to ORDER packing under a budget, never to invent or rewrite. A sentence
 * is kept or dropped whole; nothing is summarised.
 */
const GOVERNING_RE =
  /\b(only if|only when|only for|must|never|always|provided that|assumes?|assumption|except|unless|valid (?:only|when|if|for)|requires?|cannot|conserved?|conservation|sign convention|boundary|boundaries|limitation|constraint|in the limit|approximation|units? of|per unit|domain of validity|breaks down|does not hold|no longer)\b/i

/**
 * Openers that make a unit depend on the one before it: it states no subject of
 * its own, so admitting it alone strands a condition from the statement it
 * governs. Deliberately a closed list of discourse connectives — it decides
 * ADJACENCY only, never whether a unit is important.
 */
const BACKREF_RE =
  /^(?:\*+)?(?:this|that|these|those|it|they|such|the same|the above|hence|therefore|thus|so|then|however|but|and|also|in that case|otherwise|conversely|similarly|likewise)\b/i

/**
 * Abbreviations that end in a period WITHOUT ending a sentence. Splitting on a
 * bare `[.!?]` cuts "ethanol bp 78°C vs. diethyl ether 35°C" in half and hands
 * the model "ethanol bp 78°C vs." — a comparison missing the thing compared.
 * Measured before this list existed: 21 such fragments across the corpus.
 */
const SENTENCE_ABBREVIATIONS = new Set([
  'vs', 'e.g', 'eg', 'i.e', 'ie', 'etc', 'cf', 'al', 'approx', 'ca', 'est',
  'fig', 'figs', 'eq', 'eqn', 'ref', 'refs', 'vol', 'no', 'nos', 'pp', 'ch',
  'sec', 'st', 'dr', 'mr', 'mrs', 'ms', 'prof', 'inc', 'ltd', 'co',
  'min', 'max', 'avg', 'resp', 'temp', 'wt', 'mol', 'aq', 'conc', 'sat',
])

/**
 * Split a paragraph into complete sentences.
 *
 * A boundary is a run of `.!?` followed by whitespace, EXCEPT where the token
 * before it is an abbreviation, a single-letter initial, or a list/decimal
 * number, or where the next character is lowercase (so a sentence never starts
 * mid-clause). The result is always complete authored sentences — never a
 * fragment, which is what "no arbitrary truncation" has to mean at this level.
 */
export function splitSentences(paragraph: string): string[] {
  const text = paragraph.trim()
  if (!text) return []
  const out: string[] = []
  let start = 0
  const boundary = /[.!?]+["')\]]*(\s+)/g
  let m: RegExpExecArray | null
  while ((m = boundary.exec(text)) !== null) {
    const endOfSentence = m.index + m[0].length - m[1].length
    const before = text.slice(start, m.index)
    const lastToken = (before.match(/([A-Za-z.]+)$/)?.[1] ?? '').toLowerCase()
    const next = text.slice(m.index + m[0].length)
    const isAbbrev =
      SENTENCE_ABBREVIATIONS.has(lastToken) ||
      SENTENCE_ABBREVIATIONS.has(lastToken.replace(/\.$/, '')) ||
      /^[a-z]$/.test(lastToken) ||                       // single-letter initial
      /\d$/.test(before) ||                               // "1." / "3.5"
      /^[a-z]/.test(next)                                 // clause continues
    if (isAbbrev) continue
    const sentence = text.slice(start, endOfSentence).trim()
    if (sentence) out.push(sentence)
    start = m.index + m[0].length
  }
  const tail = text.slice(start).trim()
  if (tail) out.push(tail)
  return out.length ? out : [text]
}

export interface PackedKnowledge {
  /** The text to expose, complete logical units only. */
  text: string
  /** Authored characters available in the section. */
  authoredChars: number
  /** Characters actually exposed. */
  exposedChars: number
  /** True when the budget forced whole units to be left out. */
  truncated: boolean
  /** True when a unit carrying governing language was left out. This is the
   *  one that matters: it means a condition on a rule did not reach the model. */
  droppedGoverning: boolean
}

/**
 * Pack authored Core Understanding into a bounded exposure.
 *
 * NOT `slice(0, N)`. The prior behaviour took the first paragraph and cut it
 * at character 400, so a rule's governing clause was dropped purely because of
 * where it sat in the string — measured, 794 of 1,115 entries lost a tail
 * containing governing language, and raising 400 to 800 only moves that
 * boundary rather than removing it.
 *
 * Instead: split into complete logical units (paragraphs, then sentences
 * within an over-long paragraph) and admit whole units under the budget,
 * GOVERNING UNITS FIRST. Units are emitted in authored order regardless of
 * which pass admitted them, so the text still reads as written.
 *
 * ── WHY GOVERNING-FIRST, NOT AUTHORED-ORDER-FIRST (2026-09-13) ──────────────
 * The first version filled the budget in authored order and only then rescued
 * whatever governing unit still fitted. That makes admission depend on
 * POSITION: a descriptive paragraph early in the section could consume the
 * budget a later condition needed, and the condition was then reported lost
 * even though it was smaller than the text that displaced it. Measured over
 * all 1,166 entries carrying the section, that cost 188 entries a governing
 * unit; ordering the same whole units by governing-first costs 42, and total
 * exposure goes UP (80.3% -> 80.6%) because the rescue pass no longer has to
 * work against a budget already spent.
 *
 * Nothing is summarised, paraphrased, or cut mid-sentence, and no unit is
 * split further than the authored structure already splits it: this only
 * changes WHICH whole units are admitted when they cannot all fit.
 *
 * ── THE ADJACENCY RULE ──────────────────────────────────────────────────────
 * A governing condition must never be separated from the statement it
 * governs. Ordering by governing-first can otherwise strand one: measured,
 * `phys.rel.length-contraction` kept "It is emphatically NOT the case
 * that..." while dropping the sentence it contradicts. So a unit that OPENS
 * with a back-reference (`BACKREF_RE`) carries no subject of its own, and is
 * admitted only together with its antecedent — the whole group fits, or none
 * of it is taken. Re-measured after the rule: 0 stranded back-references,
 * against 1 without it.
 *
 * When the budget still cannot hold everything, that is reported
 * (`truncated`, `droppedGoverning`) rather than hidden.
 */
export function packCoreUnderstanding(section: string, budgetChars: number): PackedKnowledge {
  const authored = (section ?? '').trim()
  if (!authored) {
    return { text: '', authoredChars: 0, exposedChars: 0, truncated: false, droppedGoverning: false }
  }

  // Complete logical units: paragraphs, subdivided into sentences only when a
  // single paragraph is itself larger than the budget.
  const units: string[] = []
  for (const para of authored.split(/\n\s*\n+/)) {
    const p = para.trim().replace(/\s+/g, ' ')
    if (!p) continue
    if (p.length <= budgetChars) { units.push(p); continue }
    for (const s of splitSentences(p)) units.push(s)
  }
  if (units.length === 0) {
    return { text: '', authoredChars: authored.length, exposedChars: 0, truncated: true, droppedGoverning: GOVERNING_RE.test(authored) }
  }

  const chosen = new Set<number>()
  let used = 0

  /**
   * The unit plus every unadmitted antecedent it back-references, so a
   * condition is never admitted without the statement it governs.
   */
  const groupFor = (i: number): number[] => {
    const group = [i]
    let j = i
    while (j > 0 && BACKREF_RE.test(units[j]) && !chosen.has(j - 1)) { group.unshift(j - 1); j-- }
    return group
  }
  /** Would the WHOLE group fit? A partial admission would strand a reference. */
  const groupFits = (group: number[]): boolean => {
    let u = used
    let size = chosen.size
    for (const i of group) {
      if (chosen.has(i)) continue
      u += units[i].length + (size ? 1 : 0)
      size++
    }
    return u <= budgetChars
  }
  const takeGroup = (group: number[]) => {
    for (const i of group) {
      if (chosen.has(i)) continue
      chosen.add(i)
      used += units[i].length + (chosen.size > 1 ? 1 : 0)
    }
  }

  // Pass 1 — governing units first, in authored order. A condition outranks
  // the next descriptive sentence when both cannot fit.
  for (let i = 0; i < units.length; i++) {
    if (chosen.has(i) || !GOVERNING_RE.test(units[i])) continue
    const group = groupFor(i)
    if (groupFits(group)) takeGroup(group)
  }
  // Pass 2 — fill the remainder with descriptive units, still in authored order.
  for (let i = 0; i < units.length; i++) {
    if (chosen.has(i)) continue
    const group = groupFor(i)
    if (groupFits(group)) takeGroup(group)
  }

  const kept = units.filter((_, i) => chosen.has(i))
  const dropped = units.filter((_, i) => !chosen.has(i))
  const text = kept.join(' ')
  return {
    text,
    authoredChars: authored.length,
    exposedChars: text.length,
    truncated: dropped.length > 0,
    droppedGoverning: dropped.some((u) => GOVERNING_RE.test(u)),
  }
}

/** Exported so the contract test classifies governing language exactly as the
 *  packer does. */
export function carriesGoverningLanguage(text: string): boolean {
  return GOVERNING_RE.test(text ?? '')
}

// ── Exposure failure ────────────────────────────────────────────────────────

/**
 * What went wrong, when authored content did not reach the model.
 *
 * FAIL-CLOSED, and deliberately typed rather than a log line: the runtime must
 * be able to tell "this concept has no misconceptions" from "this concept's
 * misconceptions did not parse". It never carries a replacement claim — the
 * runtime's job is to preserve authored truth, not to author it.
 */
export interface KnowledgeExposureFailure {
  kind: 'misconceptions-unparsed' | 'core-understanding-truncated-governing'
  conceptSlug: string
  section: string
  /** What the section contains. */
  authored: number
  /** What reached the model. */
  exposed: number
}
