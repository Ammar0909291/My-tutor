/**
 * Mathematics real-learner run (2026-10-06, 908 lessons, ten accounts) —
 * docs/qa/MATHEMATICS_REAL_LEARNER_DEFECTS.md. Every string below is a reply
 * or a figure the run's learners actually received (production rows).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import {
  dropVerdictOnUngradedRequest, dropOrphanConditionalOpener, balanceMathDelimiters,
  isStubReply, learnerWantsTeaching, isBareWhyQuestion, pickUnseenExplanation,
  preferredExplanationKinds, looksLikeHandle, restoreServerVerdict,
} from '@/lib/teaching/replyHygiene'
import { stripMetaTalk, stripEmpathyOpener, analogyCapReached } from '@/lib/teaching/reuseCaps'
import { deferCloseForRequest, CONCEPT_TURN_BUDGET, ABSOLUTE_TURN_CEILING, MAX_TEACHING_ATTEMPTS } from '@/lib/teaching/conceptBudget'
import { initialConversationState } from '@/lib/teaching/conversationState'
import { verdictParagraphToKeep } from '@/lib/teaching/lessonCompletion'
import { lookupConceptVisualBinding, getConceptVisualType } from '@/lib/teaching/visualRegistry'
import { VISUAL_META } from '@/lib/school/visuals/visualTypes'
import { layoutStep, wrapWords } from '@/lib/visuals/processFlowLayout'
import { isCountAxis, countAxisPoints } from '@/lib/visuals/graphAxis'
import { buildStatisticsBarChartScene, checkStatisticsConsistency } from '@/lib/teaching/sceneGenerators/statisticsBarChart.pure'
import { buildTutorSystemPrompt } from '@/lib/ai/client'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('MATH-001 the budget close', () => {
  const base = { ...initialConversationState('math.found.set'), conceptId: 'math.found.set' }
  it('waits for a help request whatever budget reason fired (attempts measured at turns 8-25)', () => {
    const attempts = { ...base, turnsOnConcept: 10, turnsTotalOnConcept: 10, remediationCount: MAX_TEACHING_ATTEMPTS + 1, correctAtCheck: 1 } as never
    expect(deferCloseForRequest(attempts, true)).toBe(true)
    expect(deferCloseForRequest(attempts, false)).toBe(false)
    const turns = { ...base, turnsOnConcept: CONCEPT_TURN_BUDGET + 6, turnsTotalOnConcept: CONCEPT_TURN_BUDGET + 6 } as never
    expect(deferCloseForRequest(turns, true)).toBe(true)
    const ceiling = { ...base, turnsOnConcept: ABSOLUTE_TURN_CEILING, turnsTotalOnConcept: ABSOLUTE_TURN_CEILING, remediationCount: 9, correctAtCheck: 1 } as never
    expect(deferCloseForRequest(ceiling, true)).toBe(false)
  })
  it('"why?" counts as a request for the close (21 closes landed on it)', () => {
    expect(isBareWhyQuestion('why?')).toBe(true)
    expect(isBareWhyQuestion('what is this?')).toBe(true)
    expect(isBareWhyQuestion('A ⊆ B')).toBe(false)
    expect(ROUTE).toMatch(/\|\| \(await import\('@\/lib\/teaching\/replyHygiene'\)\)\.isBareWhyQuestion\(learnerAuthoredMessage\)/)
  })
  it('the verdict on a card graded on the closing turn stays above the close', () => {
    expect(verdictParagraphToKeep('Not quite — the answer is: Type I error — rejecting a true H₀.\n\nNow try this one?'))
      .toBe('Not quite — the answer is: Type I error — rejecting a true H₀.')
    expect(verdictParagraphToKeep("That's right. The empty set is a subset of every set.")).toBe("That's right. The empty set is a subset of every set.")
    expect(verdictParagraphToKeep('Imagine a bakery…')).toBeNull()
    expect(ROUTE).toMatch(/const keptVerdict = mcqGradeHoisted !== null \? verdictParagraphToKeep\(cleanText\) : null/)
    expect(ROUTE).toMatch(/if \(keptVerdict\) cleanText = `\$\{keptVerdict\}\\n\\n\$\{cleanText\}`/)
    // the assembler writes its own verdict line, so it gets the close alone
    expect(ROUTE).toMatch(/closeText: lessonCompletionHoisted \? \(lessonCloseTextOnlyHoisted \?\? cleanText\) : null/)
  })
})

describe('MATH-004/005/016/020/022/023/027 a stub is not a reply', () => {
  it.each([
    'Let’s take a tiny step together.',
    'I hear you—it can be a bit confusing at first. Let’s make it simpler.',
    'Okay — let\'s come at it differently. I hear that the idea of making sure every possible case is covered felt confusing. 🌱',
    'Sure!',
    'Imagine you have a row of',
    '=\\mu Q(x)\\)?',
    'Sure thing! Whenever you’re ready for the next question, just let me know and I’ll send it your way.',
    'Which term in the expression \\(4\\cdot\\mathbf 1_{[0,2)} + 1\\cdot\\mathbf 1_{[2,4)} + 0\\cdot\\mathbf 1_{[4,5]}\\) corresponds to the interval \\([2,4)\\)?',
  ])('%s', (stub) => expect(isStubReply(stub)).toBe(true))
  it('a real explanation is not a stub', () => {
    expect(isStubReply('A set is a well-defined collection of distinct objects. For example, the even numbers less than 10 form the set {2, 4, 6, 8}; order does not matter and nothing is listed twice.')).toBe(false)
  })
  it('only a help turn may be refilled', () => {
    const none = { request: false, practice: false }
    expect(learnerWantsTeaching('i dont know', none)).toBe(true)
    expect(learnerWantsTeaching('i dont understand', none)).toBe(true)
    expect(learnerWantsTeaching('why?', none)).toBe(true)
    expect(learnerWantsTeaching('ok', none)).toBe(false)
    expect(learnerWantsTeaching('A ⊆ B', none)).toBe(false)
    expect(learnerWantsTeaching('next question please', { request: false, practice: true })).toBe(true)
  })
  it('the refill is an authored explanation the learner has not read, preferring a worked example for steps', () => {
    const shown = 'A set is a well-defined collection of distinct objects where the order of listing does not matter and each object is either in the collection or not.'
    const pick = pickUnseenExplanation([
      { content: shown, familyKind: 'core_explanation' },
      { content: 'Worked example: list the vowels of the word "banana" as a set — {a}. Repeats are written once.', familyKind: 'worked_example' },
      { content: 'A common slip is to count {1, {2, 3}} as three elements; it has two.', familyKind: 'common_misconception_note' },
    ], [`Here is the idea. ${shown}`], preferredExplanationKinds('steps', null))
    expect(pick?.familyKind).toBe('worked_example')
    expect(pickUnseenExplanation([{ content: shown, familyKind: 'core_explanation' }], [shown], ['core_explanation'])).toBeNull()
  })
  it('route: the floor runs after every repair, on help turns with no card, and only replaces with authored content', () => {
    const floor = ROUTE.indexOf('THE TEACHING FLOOR (MATH-004')
    expect(floor).toBeGreaterThan(ROUTE.indexOf('THE FALLBACK SENTENCE IS NOT SAID TWICE'))
    expect(floor).toBeLessThan(ROUTE.indexOf('PHASE 0: TURN DECISION PROVENANCE'))
    expect(ROUTE).toMatch(/if \(!servedMcq && !serveLessonComplete && !lessonCompletionHoisted && provider !== 'degraded' && resolvedConceptId\) \{/)
    expect(ROUTE).toMatch(/const floorText = authored\?\.content\.trim\(\) \?\? regenerated/)
    // with nothing unseen, one regeneration — kept only if it teaches and recites nothing
    expect(ROUTE).toMatch(/const retry = await regenerateWithAppendix\(hy\.TEACHING_FLOOR_APPENDIX\)/)
    expect(ROUTE).toMatch(/if \(unrepeated && !hy\.isStubReply\(unrepeated\) && !\/\\\?\\s\*\$\/\.test\(unrepeated\.trim\(\)\)\) regenerated = unrepeated/)
  })
})

describe('MATH-017/021/026/009/015 the last look at a model-written reply', () => {
  it('MATH-021: the tutor\'s account of itself goes, the teaching stays', () => {
    const r = stripMetaTalk('I asked for the next question so we can check whether the idea of an eigenspace is clear to you. **Question:** Consider the matrix A with eigenvalue 2 repeated twice; how many independent eigenvectors can it have?')
    expect(r.removed.length).toBe(1)
    expect(r.text).toMatch(/^\*\*Question:\*\*/)
    const r2 = stripMetaTalk('I put that placeholder in because the system was telling me not to repeat the full explanation. A relation R on a set A is symmetric when every pair (a, b) in R has its mirror (b, a) in R too.')
    expect(r2.removed.length).toBe(1)
    const r3 = stripMetaTalk('I asked you to resend because the system didn’t register the last message you sent. Reflexive means every element is related to itself, so (1,1), (2,2) and (3,3) must all be in R.')
    expect(r3.removed.length).toBe(1)
  })
  it('MATH-017: a second "I hear you…" opener within four replies goes', () => {
    const prev = 'I hear you—it can feel a bit abstract when we talk about “cones” and “universality.” Let’s look at it again.'
    const cur = 'I hear you—it can feel overwhelming when the ideas feel abstract. Let’s try a different everyday picture with two lists of numbers that we compare.'
    expect(stripEmpathyOpener(cur, 'i dont understand', [prev]).stripped).toBe(true)
  })
  it('MATH-026: a verdict glued to a help reply that graded nothing goes', () => {
    const r = dropVerdictOnUngradedRequest('Correct – the Σ matrix for a 5 × 3 A is indeed 5 × 3. 1. Start with A and compute AᵀA. 2. Find its eigenvalues. 3. Their square roots are the singular values.')
    expect(r.dropped).toMatch(/^Correct/)
    expect(r.text).toMatch(/^1\. Start with A/)
    expect(dropVerdictOnUngradedRequest('Imagine a bakery that sells bread.').dropped).toBeNull()
    expect(dropVerdictOnUngradedRequest('Right, let us go through it one step at a time with a small example.').dropped).toBeNull()
  })
  it('MATH-009: an opener that answers a question nobody sees goes', () => {
    const r = dropOrphanConditionalOpener('If not, please let me know what you’d like to focus on. A linear inequality compares two expressions with <, ≤, > or ≥.')
    expect(r.dropped).toMatch(/^If not/)
    expect(r.text).toMatch(/^A linear inequality/)
  })
  it('MATH-015/022: math delimiters always pair', () => {
    const r = balanceMathDelimiters('1. **Define the map** by \\[ T(x,y)=\\bigl(2x+y,\\;x-y\\bigr).\n2. **Apply \\(T\\) to each basis vector** \\[ T(1,0)=(2,1) \\]')
    expect(r.repaired).toBe(true)
    expect((r.text.match(/\\\[/g) ?? []).length).toBe((r.text.match(/\\\]/g) ?? []).length)
    expect(r.text).toMatch(/\\bigr\)\.\\\]\n2\./)
    const stray = balanceMathDelimiters('Sure, let’s keep building on that idea. \\]')
    expect(stray.text).not.toMatch(/\\\]/)
    expect(balanceMathDelimiters('Balanced \\(x^2\\) and \\[y\\].').repaired).toBe(false)
  })
  it('route: one hygiene pass on model-written turns, before the delivery contract', () => {
    const at = ROUTE.indexOf('THE LAST LOOK AT A MODEL-WRITTEN REPLY')
    expect(at).toBeGreaterThan(0)
    expect(at).toBeLessThan(ROUTE.indexOf("const { enforceQuestionDeliveryContract, WITHHELD_QUESTION_CONTINUATION_TEXT } = await import('@/lib/teaching/gateAssessment')"))
    expect(ROUTE).toMatch(/!\['memory', 'gate', 'degraded', 'deterministic', 'fallback'\]\.includes\(provider\)/)
  })
})

describe('MATH-028 a login handle is not a name', () => {
  it('handles are recognised, names are not', () => {
    for (const h of ['test4', 'test 10', 'test0', 'kushw.eti', 'user_123', '']) expect(looksLikeHandle(h), h).toBe(true)
    for (const n of ['Asha', 'Mohammad Suaib', 'Léa']) expect(looksLikeHandle(n), n).toBe(false)
  })
  it('the prompt never tells the tutor to address a learner by a handle', () => {
    const p = buildTutorSystemPrompt('Mathematics', 'test4', 'beginner', 'learn')
    expect(p).not.toMatch(/Student name: test4/)
    expect(p).toMatch(/do NOT address the student by any name/)
    expect(buildTutorSystemPrompt('Mathematics', 'Asha', 'beginner', 'learn')).toMatch(/Student name: Asha — address the student by this name/)
  })
})

describe('MATH-010/011/012/025/029 stock cards only where they depict the concept', () => {
  it.each([
    ['math.stats.hypothesis-testing'], ['math.alg.linear-equation-1var'], ['math.alg.inequality-1var'],
    ['math.stats.linear-regression'], ['math.arith.column-addition'], ['math.real.cauchy-sequence'],
    ['math.geom.platonic-solids'], ['math.geom.ellipse'],
  ])('%s gets no stock card', (id) => expect(getConceptVisualType(id)).toBeNull())
  it('solids get the solids figure; the shapes card still serves what it draws', () => {
    for (const id of ['math.geom.surface-area', 'math.geom.volume', 'math.geom.solid-3d']) expect(getConceptVisualType(id), id).toBe('three_geometric_solids')
    expect(lookupConceptVisualBinding('math.geom.triangle-angle-sum')?.entry.primary).toBe('geometry_shape')
    expect(lookupConceptVisualBinding('math.arith.negative-numbers')?.entry.primary).toBe('number_line')
  })
  it('the tutor is told exactly what each stock card draws', () => {
    expect(VISUAL_META.coordinate_plane.description).toMatch(/one point plotted at \(2, 3\)/)
    expect(VISUAL_META.coordinate_plane.description).toMatch(/no line, curve or other points/)
    expect(VISUAL_META.percentage_grid.description).toMatch(/65 of the 100 squares/)
    expect(VISUAL_META.number_line.description).toMatch(/-5 to 5/)
    expect(VISUAL_META.geometry_shape.description).toMatch(/triangle/)
  })
})

describe('MATH-019 a figure already shown is never denied', () => {
  it('route: the "no picture" rewrite checks the rendered-reality log', () => {
    expect(ROUTE).toMatch(/if \(!figureOnScreen && figureQuestionHoisted && !figureShownForConcept\)/)
  })
})

describe('MATH-013 process-flow text fits its box', () => {
  it('the title starts right of the badge and long text wraps, growing the box', () => {
    const l = layoutStep({ title: 'Determining the Order of a Differential Equation', note: 'Find the highest derivative in the equation, e.g., y″ + 3y′ + 2y = 0, with all terms on one side' }, 210)
    expect(l.textX).toBeGreaterThanOrEqual(30)
    expect(l.titleLines.length).toBeGreaterThan(1)
    expect(l.noteLines.length).toBeGreaterThan(1)
    expect(l.height).toBeGreaterThan(56)
    const maxTitle = Math.floor(l.textW / 7)
    for (const line of l.titleLines) expect(line.length).toBeLessThanOrEqual(maxTitle)
  })
  it('words are never cut mid-word unless longer than the line', () => {
    expect(wrapWords('Combine indicators with non-negative coefficients', 20)).toEqual(['Combine indicators', 'with non-negative', 'coefficients'])
  })
})

describe('MATH-014 a count axis has no negative n', () => {
  it('"Number of terms n (count)" is drawn at n = 1, 2, 3 … only', () => {
    expect(isCountAxis('Number of terms n (count)')).toBe(true)
    expect(isCountAxis('Time (s)')).toBe(false)
    const pts = countAxisPoints(-10, 10)
    expect(pts[0]).toBe(1)
    expect(pts.every((n) => n >= 1 && Number.isInteger(n))).toBe(true)
  })
})

describe('MATH-031 the frequency chart a beginner can read', () => {
  const params = { chartTitle: 'Marks scored', bars: [{ label: '0-10', frequency: 2 }, { label: '10-20', frequency: 5 }, { label: '20-30', frequency: 9 }, { label: '30-40', frequency: 4 }] }
  const spec = buildStatisticsBarChartScene(params as never)
  const objs = spec.steps.flatMap((s) => s.objects)
  it('bars are visible, each with its count; no "mean index"', () => {
    for (let i = 0; i < 4; i++) {
      expect((objs.find((o) => o.id === `bar-${i}`) as { thickness?: number }).thickness ?? 0).toBeGreaterThanOrEqual(0.5)
      expect(objs.find((o) => o.id === `count-${i}`)?.text).toBe(String(params.bars[i].frequency))
    }
    expect(JSON.stringify(spec)).not.toMatch(/mean index|mean category index/)
    expect(objs.find((o) => o.id === 'meanLabel')?.text).toBe('total = 20')
  })
  it('the independent consistency check still passes', () => {
    expect(checkStatisticsConsistency(spec, params as never).ok).toBe(true)
  })
})

describe('MATH-018 one story, then simpler maths', () => {
  it('in mathematics one analogy in the last four replies is the cap', () => {
    const prior = ['Think of making a LEGO house: each brick is one step.', 'A model is an equation that stands for a situation.']
    expect(analogyCapReached(prior, 1)).toBe(true)
    expect(analogyCapReached(prior)).toBe(false)
    expect(ROUTE).toMatch(/caps\.analogyCapReached\(priorTutor, \['mathematics', 'english'\]\.includes\(learnSession\.subject\.slug\) \? 1 : 2\)/)
  })
})

describe('MATH-002 residual: a regeneration never erases the server verdict', () => {
  it('a graded wrong tap answered only by a story gets the verdict back in front', () => {
    const r = restoreServerVerdict('Imagine you have a sheet of paper with a drawing on it, and you hold a ruler upright as a mirror line.', false, 'A reflection across the y-axis')
    expect(r).toMatch(/^Not quite — the answer is: A reflection across the y-axis\n\nImagine/)
    expect(restoreServerVerdict('Not quite — the answer is: 4. Add 7 to both sides.', false, '4')).toBe('Not quite — the answer is: 4. Add 7 to both sides.')
    expect(restoreServerVerdict('Lovely work on that one.', true, 'x')).toMatch(/^That's right\./)
  })
  it('route: restored only on an authored-key grade', () => {
    expect(ROUTE).toMatch(/if \(gradeForVerdict !== null && pendingMcqHoisted && Array\.isArray\(pendingMcqHoisted\.options\)/)
  })
})

describe('MATH-009 the opening turn is owed the lesson', () => {
  it('a lone figure pointer or an orphan "If not, …" on the first "ok" is refilled', () => {
    expect(isStubReply('')).toBe(true)
    expect(ROUTE).toMatch(/const wantsTeaching = openingTurn \|\| hy\.learnerWantsTeaching\(/)
  })
})
