# Prompt Builder

Converts a `TeachingGenerationRequest` into one deterministic `PromptPackage`
for a single LLM call.

```
TeachingGenerationRequest
  ↓
Prompt Builder          ← this module
  ↓  PromptPackage
ONE LLM CALL
  ↓  TeachingGenerationResponse
VIE → ADR 12 → Student
```

This is where prompt **text** is finally allowed. Everything upstream emits
structured data; the builder turns it into the exact strings one generation
receives. It never teaches, calls an LLM, renders, executes lessons, or
orchestrates.

## Assembly only

Every line comes from data the builder was given — the request, or context the
caller supplied. It **regenerates nothing, infers nothing, decides nothing
pedagogical**: all of that was settled upstream by the Brain.

**Explanation Memory and KG descriptions arrive as supplied inputs, not
fetches.** `TeachingGenerationRequest` carries no explanation assets, and that
contract is not modified; the builder has no database and no Prisma. So
`PromptBuilderInputs` accepts `explanationMemory` and `conceptFacts`
pre-fetched by the caller.

## `PromptPackage`

| Field | Contents |
|---|---|
| `packageId` | FNV-1a content hash — no clock, no randomness |
| `requestId` | the request this was assembled from |
| `systemPrompt` | teaching stance and role (stable constant) |
| `developerInstructions` | hard rules, derived from the request's requirements and constraints |
| `sections` | assembled context in `SECTION_ORDER`; empty sections **omitted** |
| `responseSchema` | expected reply shape, derived from the request |
| `generationConstraints` | limits carried through from the request, unchanged |
| `diagnostics` | assembly trace, including which sections were omitted and why |

Seven sections, always in this order: `TEACHING_CONTEXT`, `CONCEPT_CONTEXT`,
`EXPLANATION_MEMORY_CONTEXT`, `MISCONCEPTION_CONTEXT`,
`VISUALIZATION_CONTEXT`, `ASSESSMENT_CONTEXT`, `CONVERSATION_CONTEXT`.
Order is part of the determinism guarantee — a section missing from a package
was omitted for lack of content, never reordered.

## The VKR-coverage gap is stated, not papered over

The VKR carries authored knowledge for 26 concepts. For everything else
`visualization.intent` is null even when a visual is planned. An early draft
of this builder emitted *"Teach toward the visualization described below"*
with nothing described — a dangling instruction, and it fired on Newton's
Second Law, the exact concept from the original bug.

The builder now:
- emits **"No authored visualization guidance exists for this concept; a
  visual is still selected downstream."** instead of an empty section, and
- switches the instruction to *"Teach the concept itself; do not describe a
  specific diagram."*

Both branches are tested. Renderer identifiers never appear in any package —
only the VIE's `VisualIntent`. Renderer selection stays downstream.

## Response schema

Structured field descriptors — `name`, `type`, `required`, `description`, and
nested `fields` for objects. **No JSON example is ever emitted** (asserted in
the tests). Fields are derived from the request:

- always: `explanation`, `visualReference`, `returnedToLesson`, `metadata`
- `assessment` (nested object) only when an assessment was required
- `workedExample` only when one was required
- `disambiguationOffered` only when disambiguation was requested
- `followUpQuestion` only when the turn must end on a question

`returnedToLesson` is `required` only when a return is actually owed.

## Validation

`validatePromptPackage()` checks structural conformance: non-empty system
prompt and instructions, sections unique and in canonical order with no empty
section included, `explanation` always declared in the schema, `OBJECT` fields
carrying nested fields, and sane constraint values. It never judges prompt
quality — not a structural property.

## Status

Built, tested (35 tests), **not integrated into the runtime**, per scope.
