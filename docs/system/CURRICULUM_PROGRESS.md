# Curriculum State — System-Layer Tracking

This file is generated from live repository state (`docs/**/kg/graph.json`, `docs/**/domains/*.json`,
`docs/**/chapters/*.md`, asset blueprints) by running the commands under each subject below — never
from memory. It tracks progress only; it never defines curriculum, KG, or teaching content. See
`docs/system/CURRICULUM_STATE.json` for the machine-readable form of the same data.

Generated: 2026-09-18 20:05 UTC · Commit: `fc772837841e56acf72fe840a3bae218a35f60e3` · Branch: `main`

Serving-DB counts were **UNAVAILABLE** this run (no `DATABASE_URL` in this environment). All
numbers below are static counts (KG + blueprints + on-disk assets) only.

## Scope (per operator instruction)

Tracked here: **Mathematics, Physics, English**. Chemistry/Biology/Computer Science are recorded
in the JSON sibling file for completeness (same audit run) but are out of this file's declared scope.

## Summary

| Subject | KG concepts | Domains | Asset-contract pairs at contract | Short | Status |
|---|---|---|---|---|---|
| Mathematics | 908 | 24 | 282/282 | 0 | EB campaign PAUSED at 581/908 narrative entries (10/24 domains certified) |
| Physics | 238 | 12 | 261/261 | 0 | content-complete — defect-hunting only |
| English | 216 | 12 | 409/412 | 3 | open campaign — gap-closing + defect-hunting |

## Mathematics

- KG: 908 concepts / 24 domains (frozen — not modified this session)
- Asset-contract: 282/282 pairs at contract, 0 short, 273/908 concepts have any authored serving
  content at all (this is a distinct measure from the Educational Brain narrative-entry count below)
- Educational Brain: 581/908 entries, 10/24 domains CERTIFIED
  (`math.found, math.calc, math.geom, math.alg, math.arith, math.nt, math.disc, math.func, math.trig, math.seq`)
- **Campaign status: PAUSED.** Do not resume Mathematics EB or content authoring without a fresh
  owner instruction (binding, CLAUDE.md 2026-09-16).
- Next domain: none queued — paused, not "next in line."
- Recompute: `npx tsx scripts/math/state.ts`

## Physics

- KG: 238 concepts / 12 domains
- Asset-contract: 261/261 pairs at contract, 0 short — **content-complete**
- Educational Brain: 238/238
- Campaign status: active ("fix physics/english/chemistry") — remaining work is defect-hunting only,
  not new content.
- Next domain: none (complete) — QA note: `suaibamr@gmail.com` is SATURATED for physics QA
  (237/238 concepts already COMPLETED as of 2026-09-17); use a disposable QA account instead.
- Recompute: `npx tsx scripts/physics/state.ts`

## English

- KG: 216 concepts / 12 domains
- Asset-contract: 409/412 pairs at contract, **3 short**:
  - `eng.phonics.letter-sound-correspondence::EARLY`
  - `eng.phonics.phonemic-awareness::ADULT`
  - `eng.phonics.phonemic-awareness::EARLY`
- Campaign status: active ("fix physics/english/chemistry") — gap-closing AND defect-hunting the
  servable pairs.
- Next domain: `eng.phonics` (the only domain with short pairs left).
- Recompute: `npx tsx scripts/assets/contract-audit.ts --subject english`

## Missing-data reporting

No missing source files this run. Serving-DB counts (live learner completion state) were
unavailable because no `DATABASE_URL` is configured in this environment — reported explicitly
rather than assumed as zero or omitted silently.
