/**
 * Twelfth batch — how mathematics is written, how patterns are found, how
 * problems are attacked, and two tools that get trusted too far.
 *
 *   WRITE     mathematical-language, mathematical-notation,
 *             mathematical-symbols. See the note below: these three overlap
 *             in the KG and are deliberately authored as three different
 *             things here.
 *   FIND      pattern-recognition. The habit that produces conjectures —
 *             and the one that must not be mistaken for proof.
 *   ATTACK    problem-solving, problem-solving-strategies. Systematic trial
 *             is not guessing, and a repertoire is only useful if the
 *             choice among its members is made on the problem's structure.
 *   TRUST     venn-diagram, well-ordering-principle. A Venn diagram
 *             illustrates and does not prove; well-ordering needs BOTH
 *             non-empty and the naturals, and is silently assumed
 *             elsewhere.
 *
 * CURRICULUM FEEDBACK (recorded, not acted on — no KG file modified):
 * `mathematical-notation` and `mathematical-symbols` carry near-identical
 * KG descriptions, identical prerequisites and identical Bloom level. This
 * was first recorded as an open item during math.found Wave 2 and is still
 * unresolved. Rather than author two entries saying the same thing, they
 * are split on the only line that makes them separately masterable:
 *   notation = the SYSTEM — its conventions, and the distinctions between
 *              symbols that look alike (∈ vs ⊆, ⊆ vs ⊂, ⟹ vs ⟺)
 *   symbols  = the individual MARKS — what each one denotes, and the fact
 *              that a symbol's meaning cannot be read off its shape
 * If the pipeline later merges the two KG nodes, these two entries merge
 * with them; nothing here depends on them staying separate.
 *
 * All eight carried a full Educational Brain entry and served the learner
 * nothing. Each now has one explanation and three closed-choice probes.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const LANG = 'math.found.mathematical-language'
const NOT = 'math.found.mathematical-notation'
const SYM = 'math.found.mathematical-symbols'
const PATT = 'math.found.pattern-recognition'
const PS = 'math.found.problem-solving'
const PSS = 'math.found.problem-solving-strategies'
const VENN = 'math.found.venn-diagram'
const WOP = 'math.found.well-ordering-principle'

export const MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: LANG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Mathematical language exists to remove ambiguity, not to save space. "A number that '
      + 'when doubled and increased by three gives eleven" and 2x + 3 = 11 are the same '
      + 'claim, and the second is shorter — but shortness is a side effect. The real gain is '
      + 'that the second sentence can only be read one way.\n\n'
      + 'Ordinary English tolerates vagueness because context repairs it. Mathematics cannot '
      + 'rely on that, so precision is not a stylistic preference here: "some" means at least '
      + 'one and possibly all, "or" includes the case where both hold, and "if" is not "if '
      + 'and only if". Changing one of those words changes what has been claimed, so an '
      + 'imprecise statement is not a slightly untidy true one — it is a different '
      + 'statement.\n\n'
      + 'And none of it is self-evident. Every symbol and every technical use of an everyday '
      + 'word was defined by somebody and has to be learnt, which is why reading mathematics '
      + 'slowly is the correct speed rather than a sign of weakness.',
    targetedMisconceptions: [`${LANG}:MC-1`, `${LANG}:MC-2`],
    source: eb(LANG, 'Identity + Misconception register — precision is the purpose, brevity a side effect'),
  },
  {
    conceptId: NOT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Notation is the SYSTEM: an agreed set of marks plus the conventions for combining and '
      + 'reading them. Its value is that everyone reading 3 < x ≤ 7 recovers the same meaning '
      + 'without discussion, and its cost is that neighbouring symbols are often deliberately '
      + 'similar while meaning genuinely different things.\n\n'
      + 'Three pairs cause most of the trouble. ∈ relates an ELEMENT to a set and ⊆ relates a '
      + 'SET to a set — for A = {1,2}, both 1 ∈ A and {1} ⊆ A are true while 1 ⊆ A and {1} ∈ '
      + 'A are not, so they are not two spellings of "is in". ⊆ allows equality and ⊂ often '
      + 'signals a proper subset, so A ⊆ A holds and A ⊂ A does not.\n\n'
      + 'The third pair is the costliest. ⟹ runs one way and ⟺ runs both: "x = 2 ⟹ x² = 4" '
      + 'is true, and reversing it is false, since x could be −2. Writing ⟺ where ⟹ was meant '
      + 'claims a converse you have not proved — which is why the direction of the arrow is '
      + 'part of the mathematics and not part of the typography.',
    targetedMisconceptions: [`${NOT}:MC-1`, `${NOT}:MC-3`],
    source: eb(NOT, 'Identity + Misconception register — the system, and the look-alike pairs'),
  },
  {
    conceptId: SYM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Where notation is the system, the symbols are the individual marks in it, and they '
      + 'come in families that behave differently. Operational symbols (+, ×, √) build a new '
      + 'object out of old ones. Relational symbols (=, <, ∈) make a CLAIM, which is either '
      + 'true or false. Logical connectives (∧, ∨, ¬, ⟹) join whole statements. Quantifiers '
      + '(∀, ∃) say how much of a domain a statement covers.\n\n'
      + 'Knowing which family a symbol is in tells you what kind of thing you are looking at '
      + 'before you know anything else: 3 + 4 is a number, 3 < 4 is a true statement, and '
      + 'those are not the same kind of object at all.\n\n'
      + 'A symbol\'s meaning cannot be read off its shape. ∑ and ∏ look related because both '
      + 'are large Greek letters, and they mean sum and product; ∅ is not the letter O with a '
      + 'line through it; ⊕ is not "plus, but bigger". Every one of these was assigned its '
      + 'meaning by convention, so guessing from appearance is unreliable in exactly the '
      + 'cases where being wrong costs most — the unfamiliar ones.',
    targetedMisconceptions: [`${SYM}:MC-1`, `${SYM}:MC-2`],
    source: eb(SYM, 'Identity + Misconception register — the families, and shape does not carry meaning'),
  },
  {
    conceptId: PATT, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Pattern recognition is noticing a regularity and using it to predict. Given 2, 4, 8, '
      + '16 you propose "doubling" and expect 32 — and the useful part is not that you '
      + 'remembered the sequence, it is that you can now produce a term nobody showed you.\n\n'
      + 'A finite list rarely pins down one rule. 2, 4, 8, 16 fits doubling, and it fits '
      + '"powers of 2", and it also fits rules that agree for four terms and then part '
      + 'company. So the honest output of spotting a pattern is a CANDIDATE — worth testing, '
      + 'and not yet established. This is the same boundary inductive reasoning sits on: a '
      + 'pattern is where a proof starts, never a substitute for one.\n\n'
      + 'Patterns are also not confined to number lists. Symmetry in a shape, a repeating '
      + 'structure in an argument, the same algebraic form appearing in two unrelated '
      + 'problems — all are patterns, and the last kind is the most valuable, because '
      + 'noticing that a new problem has the shape of a solved one is how most hard problems '
      + 'actually get solved.',
    targetedMisconceptions: [`${PATT}:MC-1`, `${PATT}:MC-2`],
    source: eb(PATT, 'Identity + Misconception register — a candidate rule, and not only in numbers'),
  },
  {
    conceptId: PS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'Problem solving is what you do when no procedure has been handed to you. The work is '
      + 'in choosing an approach, and the choice is made by reading the problem\'s structure '
      + 'rather than by reaching for whatever was practised most recently.\n\n'
      + 'Systematic trial is one such approach and it is not guessing. Guessing tries values '
      + 'at random and learns nothing from a failure; systematic trial orders the '
      + 'possibilities, records what each attempt rules out, and narrows the field. If x '
      + 'must lie between 1 and 100 and trying 50 is too large, half the range is gone — '
      + 'that is information, and repeating it a handful of times finishes the job.\n\n'
      + 'Working backwards suits problems that state an end and hide a beginning: to find the '
      + 'starting amount when a sequence of operations gave 40, undo them in reverse order, '
      + 'reversing each one — the last operation applied is the first one undone. Getting the '
      + 'order right matters as much as reversing correctly, because undoing the steps in '
      + 'their original order answers a different question.',
    targetedMisconceptions: [`${PS}:MC-1`, `${PS}:MC-3`],
    source: eb(PS, 'Identity + Misconception register — systematic trial is not guessing; reverse the order too'),
  },
  {
    conceptId: PSS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'The strategies are a repertoire, and each one earns its place by suiting a shape of '
      + 'problem. Draw a diagram when the relationships are spatial or easy to lose track of. '
      + 'Work backwards when the end is given. Solve a simpler related problem when the '
      + 'numbers are large but the structure is not. Look for symmetry when the setup treats '
      + 'several things alike. Analyse cases when the possibilities genuinely fork.\n\n'
      + 'Symmetry deserves defending as a real strategy rather than a lucky observation, '
      + 'because it does concrete work: if a problem treats x and y identically, then any '
      + 'solution with x and y swapped is also a solution, which can halve the work or reveal '
      + 'that the answer must have x = y.\n\n'
      + 'The one thing a strategy cannot do is settle an infinite claim by sampling. Checking '
      + 'several representative cases is a strategy for FINDING the answer and never for '
      + 'establishing it — the same line pattern recognition sits on. When a claim covers '
      + 'infinitely many cases, cases must be exhaustive to prove anything, and '
      + '"representative" is not exhaustive.',
    targetedMisconceptions: [`${PSS}:MC-1`, `${PSS}:MC-2`],
    source: eb(PSS, 'Identity + Misconception register — symmetry is a real strategy; sampling is not proof'),
  },
  {
    conceptId: VENN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.MIDDLE,
    content:
      'A Venn diagram draws sets as regions inside a rectangle that stands for the universal '
      + 'set. Two overlapping circles cut the rectangle into four regions — in A only, in B '
      + 'only, in both, in neither — and every element of the universe lands in exactly one '
      + 'of them, which is what makes the picture a partition and therefore trustworthy for '
      + 'counting.\n\n'
      + 'The overlapping-circles picture is the general case and not the only one. Disjoint '
      + 'sets are drawn as separate circles, and A ⊆ B is drawn as one circle inside another; '
      + 'the standard picture is standard because it assumes nothing, not because sets always '
      + 'overlap.\n\n'
      + 'Regions grow quickly: three sets give eight regions, not five, because each new set '
      + 'splits every existing region in two — 2ⁿ regions for n sets. And the diagram '
      + 'illustrates rather than proves. Seeing that two shadings coincide is strong evidence '
      + 'and it is a picture of one arrangement; a proof of a set identity argues about an '
      + 'arbitrary element, which is what a drawing cannot do for you.',
    targetedMisconceptions: [`${VENN}:MC-2`, `${VENN}:MC-3`],
    source: eb(VENN, 'Identity + Misconception register — 2^n regions, and illustration is not proof'),
  },
  {
    conceptId: WOP, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The well-ordering principle says every NON-EMPTY subset of the natural numbers has a '
      + 'least element. Pick any collection of naturals with something in it, and one member '
      + 'is smaller than all the rest.\n\n'
      + 'Both conditions are load-bearing. The empty set has no least element and is the '
      + 'stated exception, not an oversight. And the principle is about ℕ specifically: the '
      + 'integers fail it, since the negatives run down forever, and so do the positive '
      + 'rationals, where any candidate for smallest can be halved. Well-ordering is a '
      + 'special property of the naturals rather than a general fact about ordered sets.\n\n'
      + 'Its main use is the minimal counterexample. To prove a claim about all naturals, '
      + 'suppose it fails somewhere; then the set of failures is non-empty, so it has a '
      + 'SMALLEST member — and showing that a smaller failure would have to exist contradicts '
      + 'minimality, so the set of failures was empty after all. That is why well-ordering '
      + 'and induction are equivalent over ℕ: they are the same fact used from opposite ends.',
    targetedMisconceptions: [`${WOP}:MC-1`, `${WOP}:MC-3`],
    source: eb(WOP, 'Identity + Misconception register — non-empty and ℕ are both required'),
  },
]

export const MATHEMATICS_LANGUAGE_STRATEGY_PROBES: SeedProbe[] = [
  // --- math.found.mathematical-language ---------------------------------------
  {
    conceptId: LANG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What is mathematical language mainly for?',
    choices: [
      { text: 'Removing ambiguity — shortness is a side effect', isCorrect: true },
      { text: 'Abbreviating long English sentences', isCorrect: false, misconceptionId: `${LANG}:MC-1` },
      { text: 'Making writing look more professional', isCorrect: false, misconceptionId: `${LANG}:MC-1` },
    ],
    targetedMisconceptions: [`${LANG}:MC-1`],
    source: eb(LANG, 'Assessment gate — precision, not abbreviation'),
  },
  {
    conceptId: LANG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'A proof says "if" where "if and only if" was meant. How serious is that?',
    choices: [
      { text: 'It changes what has been claimed — the statement is now a different one, not an untidy version of the same one', isCorrect: true },
      { text: 'Minor — the reader will infer the intended meaning from context', isCorrect: false, misconceptionId: `${LANG}:MC-2` },
      { text: 'Not serious; precision is a stylistic preference', isCorrect: false, misconceptionId: `${LANG}:MC-2` },
    ],
    targetedMisconceptions: [`${LANG}:MC-2`],
    source: eb(LANG, 'Misconception register — precision is not optional'),
  },
  {
    conceptId: LANG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In mathematics, "P or Q" is true in which cases?',
    choices: [
      { text: 'P alone, Q alone, or both — the mathematical "or" includes the both case', isCorrect: true },
      { text: 'P alone or Q alone, but not both, as in everyday speech', isCorrect: false, misconceptionId: `${LANG}:MC-3` },
      { text: 'Only when both hold', isCorrect: false, misconceptionId: `${LANG}:MC-3` },
    ],
    targetedMisconceptions: [`${LANG}:MC-3`],
    source: eb(LANG, 'Transfer probe — technical uses of everyday words are not self-evident'),
  },

  // --- math.found.mathematical-notation ---------------------------------------
  {
    conceptId: NOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For A = {1, 2}, which of these is TRUE?',
    choices: [
      { text: '{1} ⊆ A — a set is a subset of a set', isCorrect: true },
      { text: '{1} ∈ A — the set {1} is a member of A', isCorrect: false, misconceptionId: `${NOT}:MC-1` },
      { text: '1 ⊆ A — the element 1 is a subset of A', isCorrect: false, misconceptionId: `${NOT}:MC-1` },
    ],
    targetedMisconceptions: [`${NOT}:MC-1`],
    source: eb(NOT, 'Assessment gate — ∈ relates element to set, ⊆ set to set'),
  },
  {
    conceptId: NOT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is A ⊆ A true? Is A ⊂ A true?',
    choices: [
      { text: 'A ⊆ A is true and A ⊂ A is not — ⊆ allows equality, ⊂ signals a proper subset', isCorrect: true },
      { text: 'Both are true — the two symbols mean the same thing', isCorrect: false, misconceptionId: `${NOT}:MC-2` },
      { text: 'Neither — a set cannot be a subset of itself', isCorrect: false, misconceptionId: `${NOT}:MC-2` },
    ],
    targetedMisconceptions: [`${NOT}:MC-2`],
    source: eb(NOT, 'Misconception register — ⊆ and ⊂ are not the same symbol'),
  },
  {
    conceptId: NOT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Should "x = 2 ⟹ x² = 4" be written with ⟺ instead?',
    choices: [
      { text: 'No — the reverse fails, since x could be −2, so ⟺ would claim a converse that is false', isCorrect: true },
      { text: 'Yes — both arrows mean "leads to"', isCorrect: false, misconceptionId: `${NOT}:MC-3` },
      { text: 'Yes — the two sides are equivalent statements about x', isCorrect: false, misconceptionId: `${NOT}:MC-3` },
    ],
    targetedMisconceptions: [`${NOT}:MC-3`],
    source: eb(NOT, 'Transfer probe — the direction of the arrow is mathematics, not typography'),
  },

  // --- math.found.mathematical-symbols ----------------------------------------
  {
    conceptId: SYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: '3 + 4 and 3 < 4 are different kinds of object. How?',
    choices: [
      { text: '3 + 4 is a number; 3 < 4 is a claim that is true or false', isCorrect: true },
      { text: 'They are the same kind — both combine two numbers', isCorrect: false, misconceptionId: `${SYM}:MC-1` },
      { text: '3 + 4 is a claim and 3 < 4 is a number', isCorrect: false, misconceptionId: `${SYM}:MC-1` },
    ],
    targetedMisconceptions: [`${SYM}:MC-1`],
    source: eb(SYM, 'Assessment gate — operational versus relational symbols'),
  },
  {
    conceptId: SYM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You meet ⊕ for the first time. Can you work out what it means from its shape?',
    choices: [
      { text: 'No — a symbol\'s meaning is assigned by convention and must be looked up or defined', isCorrect: true },
      { text: 'Yes — it is a plus in a circle, so it means addition', isCorrect: false, misconceptionId: `${SYM}:MC-2` },
      { text: 'Yes — circled symbols always mean the operation is done modulo something', isCorrect: false, misconceptionId: `${SYM}:MC-2` },
    ],
    targetedMisconceptions: [`${SYM}:MC-2`],
    source: eb(SYM, 'Misconception register — shape does not carry meaning'),
  },
  {
    conceptId: SYM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which family does ∀ belong to, and what does membership of that family tell you?',
    choices: [
      { text: 'A quantifier — it says how much of a domain the statement covers', isCorrect: true },
      { text: 'An operational symbol — it builds a new object from old ones', isCorrect: false, misconceptionId: `${SYM}:MC-1` },
      { text: 'A relational symbol — it compares two quantities', isCorrect: false, misconceptionId: `${SYM}:MC-1` },
    ],
    targetedMisconceptions: [`${SYM}:MC-1`],
    source: eb(SYM, 'Transfer probe — the family tells you what kind of thing you are reading'),
  },

  // --- math.found.pattern-recognition ------------------------------------------
  {
    conceptId: PATT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What makes spotting a pattern useful?',
    choices: [
      { text: 'It lets you produce a term nobody showed you', isCorrect: true },
      { text: 'It means you have memorised the sequence', isCorrect: false, misconceptionId: `${PATT}:MC-1` },
      { text: 'It proves the rule holds for every term', isCorrect: false, misconceptionId: `${PATT}:MC-2` },
    ],
    targetedMisconceptions: [`${PATT}:MC-1`],
    source: eb(PATT, 'Assessment gate — prediction, not recall'),
  },
  {
    conceptId: PATT, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: '2, 4, 8, 16 — is "doubling" the rule?',
    choices: [
      { text: 'It is a candidate — other rules fit these four terms and then part company', isCorrect: true },
      { text: 'Yes — four terms in agreement settles it', isCorrect: false, misconceptionId: `${PATT}:MC-2` },
      { text: 'Yes — a sequence has exactly one pattern', isCorrect: false, misconceptionId: `${PATT}:MC-2` },
    ],
    targetedMisconceptions: [`${PATT}:MC-2`],
    source: eb(PATT, 'Misconception register — a finite list rarely pins down one rule'),
  },
  {
    conceptId: PATT, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Which of these counts as pattern recognition?',
    choices: [
      { text: 'Noticing a new problem has the same algebraic shape as one you have solved', isCorrect: true },
      { text: 'Only finding the rule behind a list of numbers', isCorrect: false, misconceptionId: `${PATT}:MC-3` },
      { text: 'Only recognising a sequence you have seen before', isCorrect: false, misconceptionId: `${PATT}:MC-1` },
    ],
    targetedMisconceptions: [`${PATT}:MC-3`],
    source: eb(PATT, 'Transfer probe — patterns are not confined to number lists'),
  },

  // --- math.found.problem-solving -----------------------------------------------
  {
    conceptId: PS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'x is between 1 and 100. You try 50 and it is too large. What have you gained?',
    choices: [
      { text: 'Half the range is eliminated — the attempt produced information', isCorrect: true },
      { text: 'Nothing — the guess was simply wrong', isCorrect: false, misconceptionId: `${PS}:MC-1` },
      { text: 'Nothing, unless you happen to hit the answer', isCorrect: false, misconceptionId: `${PS}:MC-1` },
    ],
    targetedMisconceptions: [`${PS}:MC-1`],
    source: eb(PS, 'Assessment gate — systematic trial learns from a failure'),
  },
  {
    conceptId: PS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How does systematic trial differ from guessing?',
    choices: [
      { text: 'It orders the possibilities and records what each attempt rules out; guessing learns nothing from a miss', isCorrect: true },
      { text: 'It does not — "systematic trial" is a polite name for guessing', isCorrect: false, misconceptionId: `${PS}:MC-1` },
      { text: 'It only differs in that you write the attempts down', isCorrect: false, misconceptionId: `${PS}:MC-1` },
    ],
    targetedMisconceptions: [`${PS}:MC-1`],
    source: eb(PS, 'Misconception register — systematic trial is not random guessing'),
  },
  {
    conceptId: PS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A number was doubled, then had 3 added, giving 11. Working backwards, what do you do first?',
    choices: [
      { text: 'Subtract 3 — the last operation applied is the first one undone', isCorrect: true },
      { text: 'Halve it — undo the operations in the order they were applied', isCorrect: false, misconceptionId: `${PS}:MC-3` },
      { text: 'Add 3 — reverse the direction but keep the operation', isCorrect: false, misconceptionId: `${PS}:MC-3` },
    ],
    targetedMisconceptions: [`${PS}:MC-3`],
    source: eb(PS, 'Transfer probe — reverse the order as well as each operation'),
  },

  // --- math.found.problem-solving-strategies -------------------------------------
  {
    conceptId: PSS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'A problem gives you the end result and hides the start. Which strategy fits?',
    choices: [
      { text: 'Work backwards', isCorrect: true },
      { text: 'Whichever strategy you practised most recently', isCorrect: false, misconceptionId: `${PSS}:MC-1` },
      { text: 'Draw a diagram, since diagrams always help', isCorrect: false, misconceptionId: `${PSS}:MC-1` },
    ],
    targetedMisconceptions: [`${PSS}:MC-1`],
    source: eb(PSS, 'Assessment gate — the strategy is chosen from the problem\'s shape'),
  },
  {
    conceptId: PSS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'You checked several representative cases and they all worked. Is the claim established?',
    choices: [
      { text: 'No — sampling finds the answer; only exhaustive cases establish one', isCorrect: true },
      { text: 'Yes — representative cases stand in for the rest', isCorrect: false, misconceptionId: `${PSS}:MC-1` },
      { text: 'Yes, provided the cases were chosen carefully', isCorrect: false, misconceptionId: `${PSS}:MC-1` },
    ],
    targetedMisconceptions: [`${PSS}:MC-1`],
    source: eb(PSS, 'Misconception register — representative is not exhaustive'),
  },
  {
    conceptId: PSS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A problem treats x and y identically. What concrete work does noticing that do?',
    choices: [
      { text: 'Any solution with x and y swapped is also a solution, which can halve the work or force x = y', isCorrect: true },
      { text: 'None — noticing symmetry is an observation, not a strategy', isCorrect: false, misconceptionId: `${PSS}:MC-2` },
      { text: 'It guarantees the problem has exactly one solution', isCorrect: false, misconceptionId: `${PSS}:MC-2` },
    ],
    targetedMisconceptions: [`${PSS}:MC-2`],
    source: eb(PSS, 'Transfer probe — symmetry-seeking is a real strategy'),
  },

  // --- math.found.venn-diagram ----------------------------------------------------
  {
    conceptId: VENN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Two overlapping circles inside a rectangle cut it into how many regions?',
    choices: [
      { text: 'Four — in A only, in B only, in both, in neither', isCorrect: true },
      { text: 'Three — the overlap and the two crescents', isCorrect: false },
      { text: 'Two — inside the circles and outside them', isCorrect: false },
    ],
    targetedMisconceptions: [`${VENN}:MC-2`],
    source: eb(VENN, 'Assessment gate — the "neither" region is part of the diagram'),
  },
  {
    conceptId: VENN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'How many regions does a three-set Venn diagram have?',
    choices: [
      { text: 'Eight — each new set splits every existing region in two, giving 2ⁿ', isCorrect: true },
      { text: 'Five — the four from two sets plus one more', isCorrect: false, misconceptionId: `${VENN}:MC-2` },
      { text: 'Six — one per circle plus one per overlap', isCorrect: false, misconceptionId: `${VENN}:MC-2` },
    ],
    targetedMisconceptions: [`${VENN}:MC-2`],
    source: eb(VENN, 'Misconception register — a third set does not add one region'),
  },
  {
    conceptId: VENN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.MIDDLE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Two shadings coincide on your Venn diagram. Have you proved the set identity?',
    choices: [
      { text: 'No — the diagram illustrates one arrangement; a proof argues about an arbitrary element', isCorrect: true },
      { text: 'Yes — matching shadings is exactly what a proof of an identity is', isCorrect: false, misconceptionId: `${VENN}:MC-3` },
      { text: 'Yes, provided the circles were drawn in the general overlapping position', isCorrect: false, misconceptionId: `${VENN}:MC-3` },
    ],
    targetedMisconceptions: [`${VENN}:MC-3`],
    source: eb(VENN, 'Transfer probe — illustration is not proof'),
  },

  // --- math.found.well-ordering-principle -------------------------------------------
  {
    conceptId: WOP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'What does the well-ordering principle say?',
    choices: [
      { text: 'Every non-empty subset of ℕ has a least element', isCorrect: true },
      { text: 'Every subset of ℕ has a least element', isCorrect: false, misconceptionId: `${WOP}:MC-1` },
      { text: 'Every non-empty set of numbers has a least element', isCorrect: false, misconceptionId: `${WOP}:MC-3` },
    ],
    targetedMisconceptions: [`${WOP}:MC-1`, `${WOP}:MC-3`],
    source: eb(WOP, 'Assessment gate — both conditions stated'),
  },
  {
    conceptId: WOP, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the well-ordering principle hold for the integers?',
    choices: [
      { text: 'No — the negatives run down forever, so a non-empty subset need have no least element', isCorrect: true },
      { text: 'Yes — it holds for any set of whole numbers', isCorrect: false, misconceptionId: `${WOP}:MC-3` },
      { text: 'Yes — every ordered set is well-ordered', isCorrect: false, misconceptionId: `${WOP}:MC-3` },
    ],
    targetedMisconceptions: [`${WOP}:MC-3`],
    source: eb(WOP, 'Misconception register — a special property of ℕ, not of ordered sets'),
  },
  {
    conceptId: WOP, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In a minimal-counterexample proof, what does well-ordering supply?',
    choices: [
      { text: 'That the non-empty set of failures has a SMALLEST member, so producing a smaller failure is a contradiction', isCorrect: true },
      { text: 'That the set of failures is empty to begin with', isCorrect: false, misconceptionId: `${WOP}:MC-2` },
      { text: 'That the claim can be checked case by case', isCorrect: false, misconceptionId: `${WOP}:MC-2` },
    ],
    targetedMisconceptions: [`${WOP}:MC-2`],
    source: eb(WOP, 'Transfer probe — the minimal counterexample structure'),
  },
]
