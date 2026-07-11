# Educational Brain — Quality Assurance Layer

This directory is the **permanent quality system** for the Educational
Brain. It does not author concepts, does not modify blueprints, and does
not touch runtime, the framework, or the ADRs. It exists so that after
hundreds or thousands of concepts are authored, quality stays consistent
— and so authoring can continue uninterrupted while every blueprint is
validated against one objective, deterministic standard before it enters
the Brain.

## What this layer is, and is not

- **Is**: a set of checklists, pass/fail criteria, scoring rubrics, and
  audit procedures that a reviewer (human or a future CI script) runs
  against a blueprint. Every check is objective — it resolves to
  PASS/FAIL or a number, never to opinion.
- **Is not**: a rewrite of any blueprint, a new authoring framework, or a
  second source of truth. The single source of truth for *what a
  blueprint must contain* remains `educational-brain/concepts/TEMPLATE.md`
  and `educational-brain/concepts/COVERAGE.md`. This layer only *checks
  conformance* to them.

## Grounding — the real artifacts every check references

| Artifact | Role in QA |
|---|---|
| `educational-brain/concepts/TEMPLATE.md` | The 14 mandatory sections (+1 conditional). Section-presence checks key off these exact headers. |
| `educational-brain/concepts/COVERAGE.md` | The two valid entry classes (FULL entry / INSTRUMENTED SKELETON) and the instrument definition. |
| `docs/architecture/RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md` §4 | The AI Removal Test — the authoring quality gate. |
| `educational-brain/misconceptions/01-birth-taxonomy.md`, `02-the-repair-sequence.md` | Birth types, diagnostic procedure, the 7-step repair — the misconception quality standard. |
| `educational-brain/teaching-actions/` | The 27-action / 6-family catalog — the Teaching Action namespace. |
| `educational-brain/validation/08-evidence-architecture.md` | Which sections are HIGH-moat instruments vs. prose. |
| `educational-brain/concepts/TEMPLATE.md` authoring checklist | The 9 pre-commit self-checks the reviewer re-verifies. |

## The documents

| # | Document | Purpose |
|---|---|---|
| 1 | `EDUCATIONAL_BRAIN_BLUEPRINT_VALIDATION.md` | Master validation spec: every mandatory section + per-section rules. |
| 2 | `AI_REMOVAL_AUDIT.md` | Repeatable proof that a blueprint teaches without AI reasoning. |
| 3 | `TEACHING_ACTION_CONSISTENCY.md` | Duplicate/conflict/drift/terminology rules for teaching actions. |
| 4 | `PRIMITIVE_USAGE_AUDIT.md` | Forward-compatible: primitive-usage rules (construct is FUTURE). |
| 5 | `PROTOCOL_USAGE_AUDIT.md` | Forward-compatible: protocol-usage rules (construct is FUTURE). |
| 6 | `MISCONCEPTION_QUALITY_AUDIT.md` | Per-misconception 5-field scoring. |
| 7 | `CPA_COMPLIANCE_AUDIT.md` | Forward-compatible: Concrete→Pictorial→Abstract check (construct is FUTURE). |
| 8 | `EDUCATIONAL_BRAIN_SCORECARD.md` | The 100-point weighted score. |
| 9 | `EDUCATIONAL_BRAIN_DASHBOARD.md` | Tier/readiness/failure dashboards. |
| 10 | `PRODUCTION_ACCEPTANCE_CHECKLIST.md` | The final gate: fail any mandatory item → not accepted. |

## Standing note on FUTURE constructs (documents 4, 5, 7)

Primitives, Teaching Protocols, and CPA/PPA progression **are not part of
the current authored framework** (verified: no `primitives/`,
`protocols/`, or CPA terminology exists in `educational-brain/`; the
Runtime ↔ Educational Brain Contract §10–§11 designates them FUTURE).
Their audits are therefore written **forward-compatible**: they define
the quality bar so that the day these constructs are authored, quality
is enforced from the first entry — but they must never be applied
retroactively to fail an existing blueprint against a section the
framework never defined. Each of those three documents states this
conditional-activation rule at its top. This is the one genuine
framework observation surfaced by building this layer (see each
document's "Framework note").
