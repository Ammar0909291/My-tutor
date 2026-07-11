# Primitive Usage Audit — Forward-Compatible

> **CONDITIONAL ACTIVATION.** A "Primitive Library" is **not part of the
> current authored Educational Brain framework.** Verified: no
> `educational-brain/primitives/` directory and no primitive terminology
> exists in the tree. The Runtime ↔ Educational Brain Contract §10
> designates Primitives a FUTURE construct. **This audit is DORMANT until
> a Primitive Library is authored.** It must never be run against an
> existing blueprint to fail it for lacking primitives — no current
> blueprint references any, and none should. When Pappu authors the
> Primitive Library, this audit activates and enforces quality from the
> first entry.

---

## 1. Framework note (the genuine observation)

The task brief lists "Primitive Composition" among mandatory blueprint
sections. `educational-brain/concepts/TEMPLATE.md` — the actual authoring
contract — has no such section, and no authored blueprint contains one.
Treating primitives as mandatory today would fail every existing
blueprint (fractions, Newton's First Law, phonics) against a section the
framework never defined, which would be redesigning the framework — out
of QA's bounds. This document therefore defines the *standard primitives
must eventually meet*, not a present requirement. Surfacing this
mismatch is the correct QA action; fabricating the requirement is not.

---

## 2. What a Primitive is expected to be (from the Contract, not authored here)

Per Contract §10, a Primitive is the *smallest authored teaching move*,
retrieved by `(primitiveId, version)`, self-contained enough to pass the
AI Removal Test. This audit does NOT design primitives (that is Pappu's
authoring). It only defines how usage will be checked once they exist.

---

## 3. Audit rules (activate when the Primitive Library exists)

**P1 — Approved-only.** A blueprint may compose ONLY primitives that
exist in the authored Primitive Library, referenced by canonical id.
An unlisted primitive id → FAIL (unauthorized primitive).

**P2 — No hidden creation.** A blueprint may not define a new teaching
move inline and treat it as a primitive. If a blueprint needs a move the
library lacks, that is feedback to the Primitive Library author — recorded
in the blueprint's curriculum-feedback channel, never authored locally.
Inline primitive creation → FAIL.

**P3 — No renaming.** A primitive is referenced by its canonical id only.
The same primitive under a local alias → FAIL (mirrors the teaching-action
synonym rule).

**P4 — No duplication.** Two library primitives that do the same move are
a library defect, not a blueprint defect — but a blueprint that
references both interchangeably surfaces it; the audit flags the pair for
the library author to merge.

**P5 — Version pinning.** A blueprint references a primitive at a version
the library actually publishes; a dangling version → FAIL.

**P6 — Composition validity.** Where primitives compose into a larger
move, the composition respects any ordering/prerequisite the primitive
definitions declare (parallels the protocol sequence-fidelity rule).

---

## 4. Output (when active)

```
PRIMITIVE USAGE: {kg-id}   [ACTIVE only if Primitive Library exists]
Primitives referenced: {ids@versions}
P1 approved-only     PASS|FAIL
P2 no hidden creation PASS|FAIL
P3 no renaming       PASS|FAIL
P4 no duplication    PASS|FLAG(library)
P5 version pinning   PASS|FAIL
P6 composition valid PASS|FAIL
RESULT: N/A (construct not yet authored) | PASS | FAIL
```

Until the Primitive Library is authored, every blueprint's result is
**N/A — construct not yet authored**, and that N/A is a PASS for
acceptance purposes (a blueprint is never penalized for the absence of a
future construct).
