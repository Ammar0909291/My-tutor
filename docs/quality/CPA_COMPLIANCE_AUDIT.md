# CPA Compliance Audit — Forward-Compatible

> **CONDITIONAL ACTIVATION.** A formal Concrete → Pictorial → Abstract
> (CPA / PPA) progression is **not an authored construct in the current
> framework.** Verified: no CPA/PPA terminology in `educational-brain/`,
> and `concepts/TEMPLATE.md` has no CPA section. The Runtime ↔
> Educational Brain Contract lists CPA sequences as a FUTURE retrieval.
> **This audit does not run as a hard gate against existing blueprints.**
> What it CAN check today is the weaker, already-present principle that
> the framework does enforce — concrete-before-symbolic ordering, visible
> in the mental-model stages and the demonstration/discovery sections.

---

## 1. Framework note (the genuine observation)

The brief asks to "verify every blueprint follows Concrete → Pictorial →
Abstract." No blueprint declares a CPA sequence, because the framework
has no CPA construct. However, the *underlying pedagogy* CPA encodes —
never lead with the abstract symbol; ground it first — IS present in the
framework, distributed across:
- **Mental models** (`TEMPLATE.md` §2): the beginner→…→expert stages are
  explicitly ordered concrete-first, with "do not upgrade early" rules.
- **Discovery lesson** (§8): the 6-step design is need→playground(concrete
  play)→…→formalization(abstract)→compression.
- **Demonstration library** (§7): home-doable physical demos precede
  abstract statement.
- **Analogy anti-analogies** (§6): e.g. fractions' "two-separate-boxes"
  and number-line-first warnings are exactly symbolic-first violations
  the framework already forbids.

So the audit checks CPA-as-principle against these existing sections, and
holds the CPA-as-construct check dormant until a CPA library exists.

---

## 2. Live check — symbolic-first violation detection (runs today)

Against the mental-model, discovery, and demonstration sections:

**C1 — Concrete grounding precedes abstract symbol.** The beginner mental
model is a runnable concrete/physical simulation, not a symbolic
definition. A blueprint whose beginner model IS the formal notation →
FAIL (symbolic-first violation). Example standard: fractions' beginner
model is "fair shares of a chocolate bar," not "a/b where b≠0."

**C2 — Pictorial/representational bridge present.** There is an
intermediate representation between the concrete model and the abstract
one (number line, diagram, three-boxes-one-sound, motion strips). A jump
straight from concrete to abstract with no bridge → FLAG (weak, not
always fatal — some convention concepts legitimately lack a pictorial
stage; reviewer judgement).

**C3 — Abstract arrives last and is earned.** The abstract/expert model
is presented as the compression of what came before, with an upgrade
trigger, not as the starting point. An entry that installs the abstract
model first → FAIL.

**C4 — Anti-analogy honors ordering.** Where the concept has a known
symbolic-first trap (documented in the analogy anti-analogy list), the
blueprint names it. A concept with a famous symbolic-first failure mode
that its anti-analogy list omits → FLAG.

**C5 — Demonstration-before-explanation.** At least one concrete
demonstration precedes the abstract explanation in the teaching-action
dispatch order (also enforced by first-lesson rules for beginners). A
dispatch that leads with abstract TELL before any SHOW → FAIL for
beginner-reachable concepts.

---

## 3. Future CPA-construct rules (activate when authored)

When a CPA/PPA library is authored, this audit gains:
- CPA1: blueprint references a CPA sequence by canonical id (approved-only).
- CPA2: the three stages are present and correctly ordered.
- CPA3: no stage skipped without an argued exception.
- CPA4: the concrete stage is genuinely concrete (manipulable/physical),
  not a picture mislabelled as concrete.
Until then these are N/A.

---

## 4. Output

```
CPA COMPLIANCE: {kg-id}
[CPA construct: N/A — not yet authored]
C1 concrete-before-abstract  PASS|FAIL
C2 pictorial bridge          PASS|FLAG
C3 abstract earned & last    PASS|FAIL
C4 anti-analogy ordering     PASS|FLAG
C5 demonstrate-before-explain PASS|FAIL
RESULT: PASS | FAIL (live symbolic-first checks) ; CPA-construct N/A
```

C1, C3, C5 are hard acceptance gates for beginner-reachable concepts (a
symbolic-first beginner model is a documented cause of the failures the
first-lesson standard exists to prevent). C2/C4 are quality FLAGs.
