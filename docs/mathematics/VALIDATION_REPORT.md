# Mathematics Knowledge Graph — Validation Report

## Current Status: IN PROGRESS

Updated automatically after each domain freeze.

## Validation Checks

| Check | Status | Details |
|-------|--------|---------|
| Orphan concepts (no requires, no parent, not a root) | PENDING | — |
| Circular prerequisite chains | PENDING | — |
| Missing domain coverage | PENDING | — |
| Concepts unreachable from Level 0 | PENDING | — |
| Duplicate concept IDs | PENDING | — |
| Broken cross-links (ID references non-existent concept) | PENDING | — |
| Incorrect ordering (high-level requires low-level) | PENDING | — |

## Domain Freeze Checklist

Each domain must pass before freezing:
- [ ] All units present
- [ ] All topics decomposed to atomic level
- [ ] All `requires` links point to existing concept IDs
- [ ] All `unlocks` are consistent with `requires` of target concepts
- [ ] No concept is both in `requires` and `unlocks` of the same concept (circular)
- [ ] `children` and `parent` are consistent
- [ ] At least one reference per concept

## Summary (updated per domain)
- Concepts validated: 0
- Edges validated: 0
- Issues found: 0
- Issues resolved: 0
