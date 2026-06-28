# Mathematics Knowledge Graph — Roadmap

## Phase: Canonical Knowledge Graph v1

### Domain Build Order (prerequisite-first)

| # | Domain | ID Prefix | Level Range | Est. Concepts |
|---|--------|-----------|-------------|---------------|
| 01 | Mathematical Foundations | math.found | 0–1 | ~30 |
| 02 | Arithmetic | math.arith | 0–2 | ~35 |
| 03 | Number Theory | math.nt | 2–5 | ~28 |
| 04 | Algebra | math.alg | 2–4 | ~45 |
| 05 | Geometry | math.geom | 1–5 | ~52 |
| 06 | Trigonometry | math.trig | 3–4 | ~26 |
| 07 | Functions | math.func | 3–4 | ~30 |
| 08 | Sequences & Series | math.seq | 3–5 | ~22 |
| 09 | Calculus | math.calc | 4–5 | ~58 |
| 10 | Differential Equations | math.de | 4–6 | ~32 |
| 11 | Linear Algebra | math.linalg | 4–5 | ~42 |
| 12 | Probability | math.prob | 3–5 | ~32 |
| 13 | Statistics | math.stats | 3–5 | ~30 |
| 14 | Discrete Mathematics | math.disc | 3–5 | ~32 |
| 15 | Abstract Algebra | math.abst | 5–6 | ~36 |
| 16 | Real Analysis | math.real | 5–6 | ~32 |
| 17 | Complex Analysis | math.cx | 5–6 | ~26 |
| 18 | Topology | math.top | 5–7 | ~26 |
| 19 | Measure Theory | math.meas | 6–7 | ~22 |
| 20 | Functional Analysis | math.fnal | 6–7 | ~22 |
| 21 | Numerical Analysis | math.num | 4–6 | ~26 |
| 22 | Optimization | math.opt | 4–6 | ~22 |
| 23 | Graph Theory | math.graph | 4–6 | ~26 |
| 24 | Category Theory | math.cat | 6–7 | ~22 |

**Target total: ~756 atomic concepts**

### After All Domains
1. Merge into `kg/graph.json`
2. Final validation pass
3. Freeze as Canonical Mathematics Knowledge Graph v1
4. Push

## Concept Format
```json
{
  "id": "math.{domain}.{slug}",
  "name": "...",
  "aliases": [],
  "parent": "...",
  "children": [],
  "requires": [],
  "unlocks": [],
  "related": [],
  "cross_links": [],
  "description": "...",
  "difficulty": "foundational|developing|proficient|advanced|expert|research",
  "estimated_hours": 0,
  "bloom": "remember|understand|apply|analyze|evaluate|create",
  "mastery_threshold": 0.80,
  "references": []
}
```

## Difficulty Scale
- `foundational` — Level 0–1 (no prerequisites)
- `developing` — Level 2–3 (elementary school–middle school)
- `proficient` — Level 3–4 (high school–early undergraduate)
- `advanced` — Level 4–5 (undergraduate–early graduate)
- `expert` — Level 5–6 (graduate)
- `research` — Level 6–7 (active research frontier)
