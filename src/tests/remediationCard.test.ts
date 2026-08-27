/**
 * PHASE H6 — THE REMEDIATION CARD.
 *
 * ── THE SEAM THIS CLOSES ────────────────────────────────────────────────────
 * H1 made confusion visible. H2 told the model to go simpler. H3 refused to
 * serve a turn that explained nothing. H5 handed the model the curriculum's
 * authored anti-analogy. Every one worked, and the learner was still taught
 * that kinetic friction does not depend on how hard you press, because through
 * all five phases the MODEL was still writing the physics.
 *
 * A card-backed remediation removes the author, not the fence.
 *
 * ── THE LIFECYCLE, AND WHY IT IS ENFORCED HERE RATHER THAN PROMISED ─────────
 * Every card in this pilot was DRAFTED BY AN LLM. None of it is authoritative
 * and none of it may reach a learner. That is not a policy note — it is a
 * predicate on the lookup: `findRemediationCard` returns `servable: false`
 * for anything that is not ACTIVE and human-reviewed, and the tests below
 * attack that predicate from every direction the route could reach it.
 *
 * Promotion is a human act. Until the owner performs it, this phase has built
 * a serving path with nothing to serve — which is the correct state, and is
 * reported as such rather than dressed up as coverage.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  REMEDIATION_CARDS, findRemediationCard, renderRemediationCard, cardCoverage,
  type RemediationCard,
} from '@/lib/teaching/remediationCards'
import { checkRemediationOutput, isRemediationTurn } from '@/lib/teaching/remediationOutputContract'
import { buildRemediationGrounding } from '@/lib/teaching/remediationGrounding'
import { detectLearnerRequest, isBareAcknowledgement } from '@/lib/teaching/masteryGate'
import { classifyConversation } from '@/lib/teaching/conversationDecision'
import { responseBudget } from '@/lib/teaching/conversationState'
import { loadEBConceptContext } from '@/lib/curriculum/blueprintLoader'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
const CARDS_SRC = readFileSync(join(process.cwd(), 'src/lib/teaching/remediationCards.ts'), 'utf8')

/** The five concepts whose live failures drove H2–H5. */
const CRITICAL = [
  'phys.mech.friction',
  'chem.sol.vapour-pressure',
  'chem.kinet.catalysis',
  'chem.equil.kc-kp',
  'chem.kinet.mechanism',
] as const

const card = (id: string): RemediationCard => {
  const c = REMEDIATION_CARDS.find((x) => x.conceptId === id)
  if (!c) throw new Error(`no card for ${id}`)
  return c
}

// ── A/B — the corpus and its provenance ────────────────────────────────────

describe('H6-A/B — the pilot corpus exists and declares its provenance', () => {
  it('the corpus spans physics and chemistry', () => {
    // Was 20 (the H6 pilot). 2026-08-27: the physics build-out added the whole
    // measurement domain and the mechanics entry spine — the concepts a physics
    // learner actually walks through — taking physics from 7 to 22.
    expect(REMEDIATION_CARDS.length).toBe(237)
    expect(REMEDIATION_CARDS.filter((c) => c.subject === 'physics').length).toBe(224)
    const subjects = new Set(REMEDIATION_CARDS.map((c) => c.subject))
    expect(subjects.has('physics')).toBe(true)
    expect(subjects.has('chemistry')).toBe(true)
    // Not cherry-picked to one easy subject.
    expect([...subjects].every((s) => s === 'physics' || s === 'chemistry')).toBe(true)
  })

  it('every concept whose failure drove H2–H5 has a card', () => {
    for (const id of CRITICAL) expect(REMEDIATION_CARDS.some((c) => c.conceptId === id), id).toBe(true)
  })

  it('every conceptId is real — no card for a concept that does not exist', async () => {
    const { getKGNode } = await import('@/lib/curriculum/knowledgeGraph')
    for (const c of REMEDIATION_CARDS) expect(getKGNode(c.conceptId), c.conceptId).toBeTruthy()
  })

  it('every card declares status and authorKind explicitly', () => {
    for (const c of REMEDIATION_CARDS) {
      expect(['DRAFT', 'ACTIVE'], c.conceptId).toContain(c.status)
      expect(['AI_AUTHORED', 'AI_AUTHORED_REVIEWED', 'HUMAN_CURATOR'], c.conceptId).toContain(c.authorKind)
      expect(c.provenance.length, c.conceptId).toBeGreaterThan(10)
    }
  })

  it('nothing was self-promoted — only the owner-approved cards are ACTIVE', () => {
    // The single most important assertion in this file, and it is NOT weakened
    // by the first promotion. It used to read "every card is DRAFT", which was
    // true only while the list of owner-approved cards was empty. What it
    // always meant is: no card is ACTIVE that a human did not name. That is now
    // said directly, against an explicit list — so a card promoted outside this
    // list still fails, exactly as before, and the list itself is the record of
    // who authorised what.
    //
    // H6.2, 2026-08-27: the owner reviewed two cards and approved ONE.
    // phys.mech.friction  → APPROVED as written.
    // chem.sol.vapour-pressure → REWRITE, explicitly NOT promoted, because the
    //   repository holds an unresolved conflict about the mechanism (the
    //   Educational Brain authors the surface-occupancy account that H5 filed
    //   as a live failure). That is a curriculum decision, not a model one.
    // THE RECORD OF WHAT THE OWNER AUTHORISED, and the guard that no card is
    // ACTIVE without it. 2026-08-27: phys.mech.friction was approved singly at
    // the H6.2 gate; the remaining physics set was approved in full after the
    // build-out. CHEMISTRY WAS NOT APPROVED and every chemistry card must still
    // read DRAFT here — chem.sol.vapour-pressure especially, which is frozen
    // behind the unresolved surface-occupancy conflict.
    const OWNER_PROMOTED = [
      'phys.mech.friction',
      'phys.meas.units',
      'phys.mech.newtons-first-law',
      'phys.meas.vector-products',
      'phys.mech.conservative-forces',
      'phys.meas.scalars-vectors',
      'phys.mech.momentum',
      'phys.meas.dimensions',
      'phys.meas.errors',
      'phys.meas.significant-figures',
      'phys.meas.vector-addition',
      'phys.meas.unit-conversion',
      'phys.mech.displacement',
      'phys.mech.velocity',
      'phys.mech.acceleration',
      'phys.mech.force',
      'phys.mech.newtons-third-law',
      'phys.mech.free-body-diagram',
      'phys.mech.normal-force',
      'phys.mech.kinetic-energy',
      'phys.mech.potential-energy',
      'phys.mech.work-energy-theorem',
    ]
    for (const c of REMEDIATION_CARDS) {
      if (OWNER_PROMOTED.includes(c.conceptId)) {
        expect(c.status, `${c.conceptId} status`).toBe('ACTIVE')
        expect(['AI_AUTHORED_REVIEWED', 'HUMAN_CURATOR'], `${c.conceptId} authorKind`)
          .toContain(c.authorKind)
        expect(c.provenance, `${c.conceptId} provenance`).toMatch(/reviewed|promoted/i)
        continue
      }
      expect(c.status, `${c.conceptId} status`).toBe('DRAFT')
      expect(c.authorKind, `${c.conceptId} authorKind`).toBe('AI_AUTHORED')
    }
  })

  it('the corpus file states the promotion contract in its own header', () => {
    expect(CARDS_SRC).toMatch(/DRAFT/)
    expect(CARDS_SRC).toMatch(/AI_AUTHORED/)
    expect(CARDS_SRC).toMatch(/promot/i)
  })
})

// ── C/D — DRAFT is structurally unreachable ────────────────────────────────

describe('H6-C/D — only an ACTIVE, human-reviewed card can serve', () => {
  it('every UNPROMOTED card is refused by the lookup, and the promoted one is not', () => {
    // Same allow-list, same reasoning as the guard above: the claim under test
    // is that DRAFT is unreachable, not that nothing is reachable.
    // THE RECORD OF WHAT THE OWNER AUTHORISED, and the guard that no card is
    // ACTIVE without it. 2026-08-27: phys.mech.friction was approved singly at
    // the H6.2 gate; the remaining physics set was approved in full after the
    // build-out. CHEMISTRY WAS NOT APPROVED and every chemistry card must still
    // read DRAFT here — chem.sol.vapour-pressure especially, which is frozen
    // behind the unresolved surface-occupancy conflict.
    const OWNER_PROMOTED = [
      'phys.mech.friction',
      'phys.meas.units',
      'phys.mech.newtons-first-law',
      'phys.meas.vector-products',
      'phys.mech.conservative-forces',
      'phys.meas.scalars-vectors',
      'phys.mech.momentum',
      'phys.meas.dimensions',
      'phys.meas.errors',
      'phys.meas.significant-figures',
      'phys.meas.vector-addition',
      'phys.meas.unit-conversion',
      'phys.mech.displacement',
      'phys.mech.velocity',
      'phys.mech.acceleration',
      'phys.mech.force',
      'phys.mech.newtons-third-law',
      'phys.mech.free-body-diagram',
      'phys.mech.normal-force',
      'phys.mech.kinetic-energy',
      'phys.mech.potential-energy',
      'phys.mech.work-energy-theorem',
    ]
    for (const c of REMEDIATION_CARDS) {
      const r = findRemediationCard(c.conceptId)
      if (OWNER_PROMOTED.includes(c.conceptId)) {
        expect(r.servable, c.conceptId).toBe(true)
        continue
      }
      expect(r.servable, c.conceptId).toBe(false)
      if (!r.servable) expect(r.reason).toBe('draft-not-promoted')
    }
  })

  it('an unknown concept is refused with its own reason', () => {
    const r = findRemediationCard('does.not.exist')
    expect(r.servable).toBe(false)
    if (!r.servable) expect(r.reason).toBe('no-card')
  })

  it('ACTIVE alone is not enough — an AI author is still refused', () => {
    // The exact laundering route H6's stop rule forbids: flip status, keep the
    // AI author, call it curriculum.
    const laundered: RemediationCard = { ...card('phys.mech.friction'), status: 'ACTIVE', authorKind: 'AI_AUTHORED' }
    expect(findRemediationCard(laundered.conceptId, [laundered]).servable).toBe(false)
    const r = findRemediationCard(laundered.conceptId, [laundered])
    if (!r.servable) expect(r.reason).toBe('unreviewed-author')
  })

  it('a human-reviewed ACTIVE card IS servable — the path is real, not decorative', () => {
    const promoted: RemediationCard = {
      ...card('phys.mech.friction'), status: 'ACTIVE', authorKind: 'HUMAN_CURATOR',
      provenance: 'reviewed and promoted by the owner',
    }
    const r = findRemediationCard(promoted.conceptId, [promoted])
    expect(r.servable).toBe(true)
    if (r.servable) expect(r.card.conceptId).toBe('phys.mech.friction')
  })

  it('AI_AUTHORED_REVIEWED counts as promoted — a human signed it off', () => {
    const reviewed: RemediationCard = {
      ...card('chem.kinet.catalysis'), status: 'ACTIVE', authorKind: 'AI_AUTHORED_REVIEWED',
      provenance: 'drafted by AI, reviewed line by line by the owner',
    }
    expect(findRemediationCard(reviewed.conceptId, [reviewed]).servable).toBe(true)
  })

  it('coverage reports DRAFT and ACTIVE separately — never as one number', () => {
    // H6.2: one owner-approved promotion. The point of this assertion is that
    // the two numbers are reported separately and never added together — which
    // only becomes meaningful now that they differ.
    const c = cardCoverage()
    expect(c.total).toBe(237)
    expect(c.draft).toBe(215)  // 13 chemistry + 202 physics awaiting review
    expect(c.active).toBe(22)  // physics, owner-approved 2026-08-27
  })
})

// ── E/F — a card is not scaffolding and not a misconception register ───────

describe('H6-E/F — the card is teaching content, distinct from every author-facing source', () => {
  it('no card contains authoring scaffolding, metadata or teaching instructions', () => {
    for (const c of REMEDIATION_CARDS) {
      const all = `${c.canonicalIdea} ${c.concreteAnchor} ${c.plainExplanation} ${c.microCheck}`
      // The shapes H4 measured leaking into learner-visible text.
      expect(all, c.conceptId).not.toMatch(/^#{1,6}\s/m)
      expect(all, c.conceptId).not.toMatch(/\b(concept_id|bloom|mastery_threshold|estimated_hours)\b/i)
      expect(all, c.conceptId).not.toMatch(/\b(the tutor should|the student should be able to|learning objective|MC-\d)\b/i)
      expect(all, c.conceptId).not.toMatch(/\bTrap:/)
      // It teaches the concept; it does not explain how to teach it.
      expect(all, c.conceptId).not.toMatch(/\b(demonstrate to the learner|ask the student|dispatch)\b/i)
    }
  })

  it('no card was copied from the concept\'s dense reference explanation', () => {
    // `core_explanation` is reference register (H2's finding). A card that
    // duplicated it would reintroduce exactly what H2 refused to serve.
    for (const c of REMEDIATION_CARDS) {
      expect(c.plainExplanation.length, `${c.conceptId} too long to be plain`).toBeLessThan(900)
    }
  })

  it('no card was sourced from the misconception register', () => {
    // H4 proved the registers describe LEARNERS, and that none of them
    // contained the errors the model actually made. A card built from them
    // would inherit both problems.
    for (const id of ['chem.equil.kc-kp', 'chem.kinet.mechanism']) {
      const eb = loadEBConceptContext(id)
      const register = eb.found ? eb.context.ebMisconceptions.map((m) => m.title).join(' ') : ''
      const c = card(id)
      if (register.trim().length === 0) continue
      expect(c.plainExplanation).not.toContain(register.slice(0, 60))
    }
  })

  it('the plain explanation is 40–140 words and names its anchor', () => {
    for (const c of REMEDIATION_CARDS) {
      const words = c.plainExplanation.trim().split(/\s+/).length
      expect(words, `${c.conceptId} words=${words}`).toBeGreaterThanOrEqual(40)
      expect(words, `${c.conceptId} words=${words}`).toBeLessThanOrEqual(140)
      expect(c.concreteAnchor.length, c.conceptId).toBeGreaterThan(3)
    }
  })

  it('the micro-check is short, answerable, and is not an MCQ', () => {
    for (const c of REMEDIATION_CARDS) {
      const words = c.microCheck.trim().split(/\s+/).length
      expect(words, `${c.conceptId} microCheck=${words}w`).toBeLessThanOrEqual(28)
      expect(c.microCheck, c.conceptId).not.toMatch(/\b[A-D]\)\s/)
      expect(c.microCheck, c.conceptId).not.toMatch(/which of the following/i)
    }
  })

  it('every card names one tempting analogy AND why its mapping fails', () => {
    for (const c of REMEDIATION_CARDS) {
      expect(c.antiAnalogy.tempting.length, c.conceptId).toBeGreaterThan(8)
      expect(c.antiAnalogy.whyItFails.length, c.conceptId).toBeGreaterThan(20)
    }
  })

  it('the teaching is positive — the explanation is not written as a list of bans', () => {
    for (const c of REMEDIATION_CARDS) {
      const negatives = (c.plainExplanation.match(/\b(do not|don't|never|must not)\b/gi) ?? []).length
      expect(negatives, `${c.conceptId} reads as a ban list`).toBeLessThanOrEqual(2)
    }
  })
})

// ── M/N — the known false claims cannot be the card's teaching ─────────────

describe('H6-M/N — the measured false claims are absent from the cards', () => {
  it('friction: the card does not teach that friction ignores how hard you press', () => {
    const c = card('phys.mech.friction')
    const t = c.plainExplanation.toLowerCase()
    // The exact live failure: "depends only on how rough the two surfaces are,
    // not on how hard you push."
    expect(t).not.toMatch(/depends only on how rough/)
    expect(t).not.toMatch(/not on how hard you (push|press)/)
    // And it positively teaches the dependence it must preserve.
    expect(t).toMatch(/press|pressed|pushing them together|harder/)
  })

  it('vapour pressure: the card does not teach the surface-blocking mechanism', () => {
    const c = card('chem.sol.vapour-pressure')
    const t = c.plainExplanation.toLowerCase()
    expect(t).not.toMatch(/block(ed|ing|s)?\s+(the\s+)?(surface|water molecules)/)
    expect(t).not.toMatch(/sit(ting)?\s+(on|at)\s+the\s+surface/)
  })

  it('catalysis: dissolving is named as the trap, not taught as the idea', () => {
    const c = card('chem.kinet.catalysis')
    expect(c.antiAnalogy.tempting.toLowerCase()).toMatch(/dissolv|sugar/)
    expect(c.plainExplanation.toLowerCase()).not.toMatch(/sugar dissolves faster/)
  })

  it('kc-kp: the closed system is preserved and opening it is named as the trap', () => {
    const c = card('chem.equil.kc-kp')
    expect(`${c.antiAnalogy.tempting} ${c.antiAnalogy.whyItFails}`.toLowerCase()).toMatch(/open/)
    expect(c.plainExplanation.toLowerCase()).toMatch(/closed|sealed/)
  })

  it('mechanism: chain-reaction vocabulary is named as the trap, not used as the teaching', () => {
    const c = card('chem.kinet.mechanism')
    expect(c.antiAnalogy.tempting.toLowerCase()).toMatch(/initiation|propagation|termination|chain/)
    expect(c.plainExplanation.toLowerCase()).not.toMatch(/initiation|propagation|termination/)
  })
})

// ── G/H — deterministic serving, and what it renders ───────────────────────

describe('H6-G/H — a promoted card serves deterministically', () => {
  const promoted: RemediationCard = {
    ...card('phys.mech.friction'), status: 'ACTIVE', authorKind: 'HUMAN_CURATOR',
    provenance: 'owner-reviewed',
  }

  it('the rendered turn is the authored explanation plus the micro-check', () => {
    const text = renderRemediationCard(promoted)
    expect(text).toContain(promoted.plainExplanation.trim())
    expect(text).toContain(promoted.microCheck.trim())
  })

  it('the anti-analogy is NEVER shown to the learner', () => {
    // It is a guard on the author, not teaching. Showing it would name a wrong
    // idea to a learner who had not thought of it.
    const text = renderRemediationCard(promoted)
    expect(text).not.toContain(promoted.antiAnalogy.tempting)
    expect(text).not.toContain(promoted.antiAnalogy.whyItFails)
  })

  it('the render carries no labels, headings or field names', () => {
    const text = renderRemediationCard(promoted)
    for (const leak of [/canonicalIdea/i, /^#{1,6}\s/m, /^\s*(Anchor|Do not use|Micro-check|Canonical idea)\s*:/mi]) {
      expect(text, String(leak)).not.toMatch(leak)
    }
  })

  it('the rendered turn passes H3\'s structural floor', () => {
    expect(checkRemediationOutput({ remediationTurn: true, text: renderRemediationCard(promoted) }).violation)
      .toBeNull()
  })

  it('rendering is pure — no provider, no database, no model', () => {
    const mod = readFileSync(join(process.cwd(), 'src/lib/teaching/remediationCards.ts'), 'utf8')
    expect(mod).not.toMatch(/routeAI|generateJSON|prisma|fetch\(/)
  })

  it('every pilot card would render a floor-passing turn if promoted', () => {
    for (const c of REMEDIATION_CARDS) {
      const text = renderRemediationCard({ ...c, status: 'ACTIVE', authorKind: 'HUMAN_CURATOR' })
      expect(checkRemediationOutput({ remediationTurn: true, text }).violation, c.conceptId).toBeNull()
    }
  })
})

// ── The wiring — and that DRAFT cannot reach it ────────────────────────────

describe('H6 — the serving path is wired, and refuses DRAFT at the boundary', () => {
  it('the route consults the card on a remediation turn', () => {
    expect(ROUTE).toContain('findRemediationCard')
    const at = ROUTE.indexOf('findRemediationCard')
    expect(ROUTE.slice(Math.max(0, at - 2500), at)).toMatch(/isRemediationTurn/)
  })

  it('the route serves ONLY a servable lookup — never a raw card', () => {
    const at = ROUTE.indexOf('findRemediationCard')
    const scoped = ROUTE.slice(at, at + 2000)
    expect(scoped).toMatch(/\.servable/)
    // The card object is only reachable through the servable branch.
    expect(scoped).not.toMatch(/REMEDIATION_CARDS/)
  })

  it('a served card costs no provider call', () => {
    const at = ROUTE.indexOf('findRemediationCard')
    const scoped = ROUTE.slice(at, at + 2000)
    expect(scoped).not.toMatch(/await routeAI\(/)
    // H3's four call sites, unchanged — the card path adds none.
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(4)
  })

  it('the serving source is logged with its three honest values', () => {
    expect(ROUTE).toMatch(/CURATED_CARD/)
    expect(ROUTE).toMatch(/remediationSource/)
  })

  it('the card path changes no mastery, grading, probe or ladder state', () => {
    const at = ROUTE.indexOf('findRemediationCard')
    const scoped = ROUTE.slice(Math.max(0, at - 200), at + 2000)
    // `correctAtCheck` is forbidden AS AN ASSIGNMENT, not as a mention: the
    // H6.4 hold READS the mastery counters to decide whether the learner has
    // shown anything yet, and reading is the opposite of writing. The claim
    // under test has always been "the card path writes no mastery"; it now
    // says that precisely instead of by proxy.
    for (const forbidden of [
      /correctAtCheck\s*=[^=]/, /masteryVerified\s*=[^=]/, /mcqGradeHoisted\s*=/, /findBestProbe/,
      /conversationStateHoisted\s*=/, /arbitrateTurn\(/,
    ]) {
      expect(scoped, forbidden.source).not.toMatch(forbidden)
    }
  })

  it('U — the card mechanism attaches no MCQ', () => {
    const at = ROUTE.indexOf('findRemediationCard')
    const scoped = ROUTE.slice(at, at + 2000)
    expect(scoped).not.toMatch(/mcqHoisted\s*=/)
    for (const c of REMEDIATION_CARDS) {
      expect(renderRemediationCard(c), c.conceptId).not.toMatch(/<!--\s*MCQ/i)
    }
  })
})

// ── O/P — continuity and the already-served guard ──────────────────────────

describe('H6-O/P — the account survives the next turn without being repeated verbatim', () => {
  const promoted: RemediationCard = {
    ...card('phys.mech.friction'), status: 'ACTIVE', authorKind: 'HUMAN_CURATOR',
  }

  it('the same card is returned on every turn of the episode — the account is stable', () => {
    const a = findRemediationCard('phys.mech.friction', [promoted])
    const b = findRemediationCard('phys.mech.friction', [promoted])
    expect(a.servable && b.servable).toBe(true)
    if (a.servable && b.servable) expect(a.card.plainExplanation).toBe(b.card.plainExplanation)
  })

  it('the route reuses the existing already-served guard rather than adding a second one', () => {
    // The guard exists because production served an identical 787-char asset on
    // three consecutive turns. The card path must not reintroduce that.
    expect(ROUTE).toContain('hasServedExplanation')
    expect(ROUTE).toContain('Already served this concept')
  })

  it('the card supplies the NEXT turn as constrained source, not as a re-serve', () => {
    const at = ROUTE.indexOf('findRemediationCard')
    const scoped = ROUTE.slice(at, at + 2500)
    expect(scoped).toMatch(/buildRemediationCardSourceBlock|cardSourceBlock/)
  })
})

// ── Q/R/S/T — acknowledgement, micro-check, mastery, no new state ──────────

describe('H6-Q/R/S/T — "ok sir" is still an acknowledgement and nothing here changes that', () => {
  const ackBase = {
    recoveryKey: null, studentIntent: 'answering', lastAssistantAskedQuestion: true,
    lastSignalCorrectness: null, hedged: false, helpRequestKind: null as string | null,
  }

  it('Q — ok / ok sir / yes / fine are acknowledgements, not comprehension', () => {
    for (const m of ['ok', 'ok sir', 'yes', 'fine', 'okay', 'yes sir']) {
      expect(isRemediationTurn(classifyConversation(m, ackBase).type), m).toBe(false)
      expect(classifyConversation(m, ackBase).type, m).not.toBe('CONFIDENCE')
    }
    expect(isBareAcknowledgement('ok')).toBe(true)
    expect(isBareAcknowledgement('yes')).toBe(true)
  })

  it('R — a real micro-check answer is distinguishable from an acknowledgement', () => {
    // Not graded — see the boundary note in the module. Distinguishable is what
    // the existing readers already give us, and it is what R asks for.
    expect(isBareAcknowledgement('it presses down harder')).toBe(false)
    expect(isBareAcknowledgement('the normal force')).toBe(false)
    expect(isBareAcknowledgement('ok sir')).toBe(false)   // pre-existing: has an address token
    expect(isBareAcknowledgement('ok')).toBe(true)
  })

  it('S/T — the card mechanism introduces no mastery and no new learner state', () => {
    // COMMENTS ARE STRIPPED FIRST, deliberately. The claim under test is that
    // the module contains no mastery MECHANISM — not that it never says the
    // word. Its header states the boundary in prose ("it awards no mastery"),
    // which is the documentation this phase is required to carry, so scanning
    // raw source would fail on exactly the sentence that proves the point.
    const mod = readFileSync(join(process.cwd(), 'src/lib/teaching/remediationCards.ts'), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')
    // `/phase/i` is narrowed to the LADDER sense on purpose. The provenance
    // string names the authoring phase ("Phase H6"), which is the record this
    // work is required to carry; the claim under test is that no card touches
    // OBSERVE/DEMONSTRATE/GUIDE/CHECK/PRACTICE/TRANSFER or the state that
    // moves between them.
    // Same narrowing as above, for the same reason: `RemediationWindowInput`
    // declares `correctAtCheck` as an INPUT it is given, which is how the hold
    // reads evidence without owning any. A mastery mechanism would assign.
    for (const forbidden of [
      /mastery\s*[.=]/i, /verified\s*=/i, /correctAtCheck\s*=[^=]/, /confidence\s*=/i,
      /phaseAfter|sessionPhase|conversationState|DEMONSTRATE|PRACTICE|TRANSFER/,
    ]) {
      expect(mod, forbidden.source).not.toMatch(forbidden)
    }
  })
})

// ── V/W/X/Y — uncovered concepts and the phases below ─────────────────────

describe('H6-V/W/X/Y — everything not card-backed is untouched', () => {
  it('V — a concept with no card preserves existing behaviour exactly', () => {
    expect(findRemediationCard('phys.therm.phase-transitions').servable).toBe(false)
    // H5's grounding still answers for it, unchanged.
    expect(buildRemediationGrounding('phys.therm.phase-transitions').status).toBe('grounded')
  })

  it('W — H1 detector and budget', () => {
    expect(detectLearnerRequest('sir i not understand this')).toBe('explain_differently')
    expect(detectLearnerRequest('teach me about relativity')).toBeNull()
    expect(responseBudget('expert', 1, 0)).toBe(7)
    expect(responseBudget('expert', 2, 0)).toBe(6)
  })

  it('X — H3 structural floor', () => {
    expect(checkRemediationOutput({
      remediationTurn: true, text: 'What do you notice about the crowd when someone leaves?',
    }).violation).toBe('question-only')
    expect(ROUTE).toContain('[remediation-floor]')
  })

  it('Y — H5 grounding, including the three concepts that still have none', () => {
    for (const id of ['chem.kinet.catalysis', 'chem.equil.kc-kp', 'chem.kinet.mechanism']) {
      expect(buildRemediationGrounding(id).status, id).toBe('insufficient_authoritative_grounding')
    }
    expect(ROUTE).toContain('[remediation-grounding]')
  })
})
