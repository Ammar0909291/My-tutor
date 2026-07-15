/**
 * K4 — Policy Engine: 7-band evaluator (RS §5.2).
 *
 * Pure. Deterministic. Given PolicyInputs + a PolicyPack, produces an
 * EnginePolicyDecision with a complete provenance chain. Nothing about
 * this function is probabilistic; the ONLY randomness in the kernel is
 * the PRNG seed the DecisionRecorded event carries (RS C-7), computed
 * externally.
 *
 * Evaluation order (RS §5.2):
 *   Band 0 — if any fires, entire skeleton is that rule's effect;
 *            bands 1–4 SKIPPED; bands 5–6 refine surface only.
 *   Band 1 — obligations (order-preserving concat of contentSlots).
 *   Band 2 — legality: subtractive only (bannedMoves, vocabularyBans,
 *            stageCeiling floor).
 *   Band 3 — authored dispatch: if a matching rule exists it sets
 *            move/actionClass/contentSlots outright and Band 4 is
 *            SKIPPED for those fields. (K4 v1: empty; C4 populates.)
 *   Band 4 — policy tables: first-match by specificity fills any fields
 *            still unset. Conflict resolution: higher specificity wins;
 *            equal → mandatory beats optional; equal → lex-smallest
 *            ruleId AND emits a conflict record (RS §5.3).
 *   Band 5 — personalization: sets representation/pace/budgets/slots
 *            WITHOUT touching move/stageCeiling/legality outcomes.
 *   Band 6 — tie-break / final defaults (fallbackChain).
 */
import type {
  EnginePolicyDecision, PolicyInputs, PolicyPack, Rule, RuleEffect,
  Budgets, ContentSlot, DecisionTrace, BandId,
} from './types'
import type { PolicyMove } from '../types'
import { computeStageCeilingFromPhase } from './basePack'

const DEFAULT_BUDGETS: Budgets = { maxQuestions: 0, maxParagraphs: null, maxNewTerms: 2 }

interface WorkingDecision {
  move: PolicyMove | null
  actionClass: string | null
  budgets: Budgets
  stageCeiling: number
  vocabularyBans: string[]
  visualClass: string | null
  contentSlots: ContentSlot[]
  fallbackChain: string[]
  representation: string | null
  bannedMoves: Set<PolicyMove>
  provenance: DecisionTrace[]
  preemptedBy: string | null
  conflicts: EnginePolicyDecision['conflicts']
}

function initialDecision(inputs: PolicyInputs): WorkingDecision {
  return {
    move: null, actionClass: null,
    budgets: { ...DEFAULT_BUDGETS },
    stageCeiling: computeStageCeilingFromPhase(inputs.phase),
    vocabularyBans: [], visualClass: null, contentSlots: [], fallbackChain: [],
    representation: null, bannedMoves: new Set(),
    provenance: [], preemptedBy: null, conflicts: [],
  }
}

function trace(d: WorkingDecision, rule: Rule, set: (keyof RuleEffect)[]): void {
  d.provenance.push({ ruleId: rule.ruleId, band: rule.band, citation: rule.citation, set: set as string[] })
}

/** Apply an effect to the working decision. Returns the list of effect
 *  fields the rule actually contributed (for provenance). */
function applyEffect(d: WorkingDecision, e: RuleEffect, opts: { subtractive: boolean; personalization: boolean; forceMove?: boolean }): (keyof RuleEffect)[] {
  const set: (keyof RuleEffect)[] = []
  if (opts.subtractive) {
    if (e.bannedMoves) { e.bannedMoves.forEach((m) => d.bannedMoves.add(m)); set.push('bannedMoves') }
    if (e.vocabularyBans) { d.vocabularyBans = Array.from(new Set([...d.vocabularyBans, ...e.vocabularyBans])); set.push('vocabularyBans') }
    // stageCeiling in Band 2 is a floor tag — the real value was computed at init.
    if (e.stageCeiling !== undefined) set.push('stageCeiling')
    // Band 2 may set an upper-bound-only budget floor (mandatory).
    if (e.budgets?.maxQuestions !== undefined && e.budgets.maxQuestions < d.budgets.maxQuestions) {
      d.budgets.maxQuestions = e.budgets.maxQuestions; set.push('budgets')
    }
    return set
  }

  if (!opts.personalization) {
    if (e.move !== undefined && (opts.forceMove || d.move === null) && !d.bannedMoves.has(e.move)) {
      d.move = e.move; set.push('move')
    }
    if (e.actionClass !== undefined && d.actionClass === null) { d.actionClass = e.actionClass; set.push('actionClass') }
    if (e.visualClass !== undefined && d.visualClass === null) { d.visualClass = e.visualClass; set.push('visualClass') }
    if (e.budgets) {
      if (e.budgets.maxQuestions !== undefined) { d.budgets.maxQuestions = e.budgets.maxQuestions; set.push('budgets') }
      if (e.budgets.maxParagraphs !== undefined && d.budgets.maxParagraphs === DEFAULT_BUDGETS.maxParagraphs) { d.budgets.maxParagraphs = e.budgets.maxParagraphs; set.push('budgets') }
      if (e.budgets.maxNewTerms !== undefined) { d.budgets.maxNewTerms = e.budgets.maxNewTerms; set.push('budgets') }
    }
  } else {
    // Band 5: MUST NOT touch move / stageCeiling / legality outcomes;
    // MAY set budgets, representation, content slots. First-wins semantics
    // (higher specificity fires first thanks to sortBand — a lower-
    // specificity rule may not overwrite what a higher one already set).
    if (e.budgets) {
      if (e.budgets.maxParagraphs !== undefined && d.budgets.maxParagraphs === DEFAULT_BUDGETS.maxParagraphs) {
        d.budgets.maxParagraphs = e.budgets.maxParagraphs; set.push('budgets')
      }
      if (e.budgets.maxNewTerms !== undefined && d.budgets.maxNewTerms === DEFAULT_BUDGETS.maxNewTerms) {
        d.budgets.maxNewTerms = e.budgets.maxNewTerms; set.push('budgets')
      }
    }
    if (e.representation !== undefined && d.representation === null) { d.representation = e.representation; set.push('representation') }
  }
  if (e.contentSlots) { d.contentSlots.push(...e.contentSlots); set.push('contentSlots') }
  if (e.fallbackChain && d.fallbackChain.length === 0) { d.fallbackChain = [...e.fallbackChain]; set.push('fallbackChain') }
  return set
}

/** Sort rules within a band by specificity (desc), mandatory-first, then
 *  lex-smallest ruleId — the RS §5.3 tie-break. */
function sortBand(rules: Rule[]): Rule[] {
  return [...rules].sort((a, b) =>
    b.specificity - a.specificity ||
    Number(b.mandatory) - Number(a.mandatory) ||
    a.ruleId.localeCompare(b.ruleId),
  )
}

function rulesInBand(pack: PolicyPack, band: BandId): Rule[] {
  return sortBand(pack.rules.filter((r) => r.band === band))
}

function detectConflicts(d: WorkingDecision, band: BandId, fired: Rule[]): void {
  const byField = new Map<string, Rule[]>()
  for (const r of fired) {
    for (const key of Object.keys(r.effect) as (keyof RuleEffect)[]) {
      if (r.effect[key] === undefined) continue
      const list = byField.get(key) ?? []
      list.push(r); byField.set(key, list)
    }
  }
  for (const [, rs] of byField) {
    if (rs.length < 2) continue
    const same = rs.filter((r) => r.specificity === rs[0].specificity)
    if (same.length < 2) continue
    d.conflicts.push({
      band, ruleIds: same.map((r) => r.ruleId).sort(),
      resolvedBy: same.some((r) => r.mandatory && !same.every((s) => s.mandatory)) ? 'mandatory'
        : same.every((r) => r.specificity === same[0].specificity) ? 'lexical'
        : 'specificity',
    })
  }
}

/** The engine entry point. Pure. */
export function decide(pack: PolicyPack, inputs: PolicyInputs): EnginePolicyDecision {
  const d = initialDecision(inputs)

  // Band 0 — interrupts (short-circuit)
  const b0 = rulesInBand(pack, 0).filter((r) => r.guard.match(inputs))
  if (b0.length > 0) {
    // First-match by specificity (already sorted). Preemption sets the
    // whole skeleton; bands 1–4 SKIPPED.
    const rule = b0[0]
    const set = applyEffect(d, rule.effect, { subtractive: false, personalization: false, forceMove: true })
    trace(d, rule, set)
    d.preemptedBy = rule.ruleId
    detectConflicts(d, 0, b0)
  } else {
    // Band 1 — obligations
    for (const rule of rulesInBand(pack, 1)) {
      if (!rule.guard.match(inputs)) continue
      const set = applyEffect(d, rule.effect, { subtractive: false, personalization: false })
      trace(d, rule, set)
    }
    // Band 2 — legality (subtractive)
    const b2Fired: Rule[] = []
    for (const rule of rulesInBand(pack, 2)) {
      if (!rule.guard.match(inputs)) continue
      const set = applyEffect(d, rule.effect, { subtractive: true, personalization: false })
      trace(d, rule, set); b2Fired.push(rule)
    }
    detectConflicts(d, 2, b2Fired)

    // Band 3 — authored dispatch (K4 v1: empty; C4 fills)
    const b3 = rulesInBand(pack, 3).filter((r) => r.guard.match(inputs))
    if (b3.length > 0) {
      const rule = b3[0]
      const set = applyEffect(d, rule.effect, { subtractive: false, personalization: false, forceMove: true })
      trace(d, rule, set)
      detectConflicts(d, 3, b3)
    } else {
      // Band 4 — policy tables
      const b4Fired: Rule[] = []
      for (const rule of rulesInBand(pack, 4)) {
        if (!rule.guard.match(inputs)) continue
        const set = applyEffect(d, rule.effect, { subtractive: false, personalization: false })
        if (set.length > 0) { trace(d, rule, set); b4Fired.push(rule) }
      }
      detectConflicts(d, 4, b4Fired)
    }
  }

  // Band 5 — personalization (both short-circuit path AND normal path)
  const b5Fired: Rule[] = []
  for (const rule of rulesInBand(pack, 5)) {
    if (!rule.guard.match(inputs)) continue
    const set = applyEffect(d, rule.effect, { subtractive: false, personalization: true })
    if (set.length > 0) { trace(d, rule, set); b5Fired.push(rule) }
  }
  detectConflicts(d, 5, b5Fired)

  // Band 6 — final defaults (fallback chain)
  for (const rule of rulesInBand(pack, 6)) {
    if (!rule.guard.match(inputs)) continue
    const set = applyEffect(d, rule.effect, { subtractive: false, personalization: false })
    if (set.length > 0) trace(d, rule, set)
  }

  // Completeness (RS §5.2): every field MUST be set.
  if (d.move === null) {
    d.move = 'TEACH'
    d.provenance.push({ ruleId: 'engine:completeness-fallback', band: 6, citation: 'RS §5.2 completeness rule', set: ['move'] })
  }
  if (d.fallbackChain.length === 0) {
    d.fallbackChain = ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE']
  }
  // If Band 4 assigned an ASK move and the maxQuestions was clamped to 0 by
  // Band 2 (repeated struggle), demote the move to SHOW/TEACH honouring the
  // legality filter (subtractive filters WIN over Band 4 selection).
  if (d.move === 'ASK' && d.budgets.maxQuestions === 0) {
    d.move = inputs.consecutiveFailures >= 2 ? 'SHOW' : 'TEACH'
    d.provenance.push({ ruleId: 'engine:legality-demote-ask', band: 2, citation: 'RS §5.2 Band-2 subtractive', set: ['move'] })
  }
  // If ASK is legal, ensure maxQuestions is 1 (Band 4 default may not have set it).
  if (d.move === 'ASK' && d.budgets.maxQuestions === 0) d.budgets.maxQuestions = 1
  if (d.move !== 'ASK') d.budgets.maxQuestions = 0

  return {
    move: d.move, actionClass: d.actionClass,
    budgets: d.budgets, stageCeiling: d.stageCeiling,
    vocabularyBans: d.vocabularyBans, visualClass: d.visualClass,
    contentSlots: d.contentSlots, fallbackChain: d.fallbackChain,
    representation: d.representation,
    provenance: d.provenance, preemptedBy: d.preemptedBy, conflicts: d.conflicts,
  }
}
