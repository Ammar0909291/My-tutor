# Mathematics Knowledge Graph — Knowledge Log

Records key structural decisions and discoveries during the build.

## 2026-06-28

### Decision: Concept ID Format
`math.{domain_code}.{slug}` where slug is kebab-case.
Domain codes: found, arith, nt, alg, geom, trig, func, seq, calc, de, linalg, prob, stats, disc, abst, real, cx, top, meas, fnal, num, opt, graph, cat.

### Decision: Graph Type
Directed acyclic graph (DAG) on the `requires` relation.
`unlocks` is the inverse relation (auto-derivable but stored for query efficiency).
`related` and `cross_links` are undirected symmetric edges.

### Decision: Level Encoding
Not stored directly in the concept node — inferred from prerequisite depth.
`difficulty` field encodes approximate level: foundational=0-1, developing=2-3, proficient=3-4, advanced=4-5, expert=5-6, research=6-7.

### Decision: No Teaching Assets
Per spec: no explanations, visualizations, assessments, misconceptions, or learning objectives.
Those belong to the Educational Brain phase.

### Decision: References Field
Abbreviated citations (Author Year, Publisher/Course, URL-hint).
Never verbatim copyrighted text.
