#!/usr/bin/env python3
"""
Mathematics Knowledge Graph — Structural Validator
Produces: cycle_report.json, orphan_report.json, dependency_report.json,
          learner_tracks.json, validation_summary.json
"""

import json
import sys
from collections import defaultdict, deque

GRAPH_PATH = "docs/mathematics/kg/graph.json"
OUT_DIR    = "docs/mathematics/kg"

# ── Load ─────────────────────────────────────────────────────────────────────

with open(GRAPH_PATH) as f:
    graph = json.load(f)

concepts   = graph["concepts"]
all_ids    = {c["id"] for c in concepts}
concept_by_id = {c["id"]: c for c in concepts}

# ── 1. Dependency Integrity ───────────────────────────────────────────────────

broken_requires    = []  # {source, target, edge_type}
broken_unlocks     = []
broken_cross_links = []
aspirational_cross = []  # cross_links to IDs outside graph (expected future extensions)

FUTURE_DOMAINS = {"math.phys", "math.cs", "math.econ", "math.bio", "math.eng", "math.info"}

for c in concepts:
    cid = c["id"]
    for req in (c.get("requires") or []):
        if req not in all_ids:
            broken_requires.append({"source": cid, "target": req})
    for unl in (c.get("unlocks") or []):
        if unl not in all_ids:
            broken_unlocks.append({"source": cid, "target": unl})
    for cl in (c.get("cross_links") or []):
        if cl not in all_ids:
            prefix = ".".join(cl.split(".")[:2])
            if prefix in FUTURE_DOMAINS:
                aspirational_cross.append({"source": cid, "target": cl})
            else:
                broken_cross_links.append({"source": cid, "target": cl})

dep_report = {
    "status": "PASS" if not broken_requires and not broken_unlocks and not broken_cross_links else "FAIL",
    "broken_requires_count":    len(broken_requires),
    "broken_unlocks_count":     len(broken_unlocks),
    "broken_cross_links_count": len(broken_cross_links),
    "aspirational_cross_links_count": len(aspirational_cross),
    "broken_requires":    broken_requires,
    "broken_unlocks":     broken_unlocks,
    "broken_cross_links": broken_cross_links,
    "aspirational_cross_links": aspirational_cross,
}

# ── 2. Cycle Detection (DFS on `requires` edges) ─────────────────────────────

adj = defaultdict(list)
for c in concepts:
    for req in (c.get("requires") or []):
        if req in all_ids:
            adj[c["id"]].append(req)

WHITE, GRAY, BLACK = 0, 1, 2
color   = {cid: WHITE for cid in all_ids}
cycles  = []
stack   = []

def dfs(node):
    color[node] = GRAY
    stack.append(node)
    for nb in adj[node]:
        if color[nb] == GRAY:
            idx  = stack.index(nb)
            cycles.append(list(stack[idx:]) + [nb])
        elif color[nb] == WHITE:
            dfs(nb)
    stack.pop()
    color[node] = BLACK

sys.setrecursionlimit(20000)
for cid in list(all_ids):
    if color[cid] == WHITE:
        dfs(cid)

cycle_report = {
    "status":       "PASS" if not cycles else "FAIL",
    "cycles_found": len(cycles),
    "cycles":       cycles[:50],   # cap output at 50
}

# ── 3. Orphan Audit ───────────────────────────────────────────────────────────

# True orphan: no requires AND no unlocks AND no children AND no cross_links
# Intentional roots: no requires is fine (Level 0 entry points)
roots             = []  # no requires — expected entry points
true_orphans      = []  # no requires, no unlocks, no children, no related, no cross_links

for c in concepts:
    has_req  = bool(c.get("requires"))
    has_unl  = bool(c.get("unlocks"))
    has_ch   = bool(c.get("children"))
    has_rel  = bool(c.get("related"))
    has_cl   = bool(c.get("cross_links"))

    if not has_req:
        roots.append(c["id"])
        if not has_unl and not has_ch and not has_rel and not has_cl:
            true_orphans.append(c["id"])

orphan_report = {
    "status":            "PASS" if not true_orphans else "WARN",
    "root_nodes_count":  len(roots),
    "true_orphans_count":len(true_orphans),
    "note":              "Root nodes (no requires) are expected at Level 0. True orphans have no connections of any kind.",
    "root_nodes":        roots,
    "true_orphans":      true_orphans,
}

# ── 4. Learner Tracks ─────────────────────────────────────────────────────────

TRACK_DEFS = [
    {
        "track_id":   "T0",
        "name":       "Absolute Foundations",
        "level_range":[0, 1],
        "difficulty": ["foundational"],
        "domain_prefixes": ["math.found", "math.arith"],
        "description": "Entry-level mathematics. No prerequisites assumed. "
                        "Covers logic, sets, number sense, and basic arithmetic.",
    },
    {
        "track_id":   "T1",
        "name":       "Pre-University Mathematics",
        "level_range":[1, 3],
        "difficulty": ["foundational", "developing", "proficient"],
        "domain_prefixes": ["math.nt", "math.alg", "math.geom", "math.trig",
                            "math.func", "math.seq"],
        "description": "High-school to pre-university level. Builds on T0. "
                        "Algebra, geometry, trigonometry, functions, sequences.",
    },
    {
        "track_id":   "T2",
        "name":       "Undergraduate Core",
        "level_range":[2, 5],
        "difficulty": ["developing", "proficient", "advanced"],
        "domain_prefixes": ["math.calc", "math.de", "math.linalg",
                            "math.prob", "math.stats", "math.disc"],
        "description": "Standard first/second-year university mathematics. "
                        "Calculus, differential equations, linear algebra, "
                        "probability, statistics, discrete mathematics.",
    },
    {
        "track_id":   "T3",
        "name":       "Upper Undergraduate / Early Graduate",
        "level_range":[4, 6],
        "difficulty": ["advanced", "expert"],
        "domain_prefixes": ["math.abst", "math.real", "math.cx",
                            "math.top", "math.num", "math.opt", "math.graph"],
        "description": "Third/fourth-year university and early MSc level. "
                        "Abstract algebra, analysis, topology, numerical methods, optimization.",
    },
    {
        "track_id":   "T4",
        "name":       "Graduate / Research Mathematics",
        "level_range":[6, 7],
        "difficulty": ["expert", "research"],
        "domain_prefixes": ["math.meas", "math.fnal", "math.cat"],
        "description": "MSc/PhD-level mathematics. Measure theory, functional analysis, "
                        "category theory. Requires all prior tracks.",
    },
]

tracks_with_counts = []
for td in TRACK_DEFS:
    prefixes = td["domain_prefixes"]
    members  = [c["id"] for c in concepts
                if any(c["id"].startswith(p + ".") for p in prefixes)]
    entry_points = [cid for cid in members if not concept_by_id[cid].get("requires")]
    tracks_with_counts.append({
        **td,
        "concept_count":    len(members),
        "entry_point_count": len(entry_points),
        "entry_points":     entry_points[:20],  # first 20 for brevity
    })

learner_tracks = {
    "model":  "Five-tier progressive track model (T0–T4)",
    "status": "DEFINED",
    "note":   "Tracks are overlapping level ranges; a learner progresses T0→T1→T2→T3→T4. "
               "Each track's entry points are root concepts (no prerequisites) within that track's domains.",
    "tracks": tracks_with_counts,
}

# ── 5. Summary ────────────────────────────────────────────────────────────────

summary = {
    "graph_version":    graph["version"],
    "build_date":       graph["build_date"],
    "total_concepts":   len(concepts),
    "total_domains":    graph["statistics"]["total_domains"],
    "validation_date":  "2026-06-29",
    "checks": {
        "cycle_detection":      cycle_report["status"],
        "orphan_audit":         orphan_report["status"],
        "dependency_integrity": dep_report["status"],
        "learner_tracks":       learner_tracks["status"],
    },
    "overall_status": (
        "PASS"
        if cycle_report["status"] == "PASS"
           and dep_report["status"] == "PASS"
        else "FAIL"
    ),
    "metrics": {
        "cycles_found":              cycle_report["cycles_found"],
        "root_nodes":                orphan_report["root_nodes_count"],
        "true_orphans":              orphan_report["true_orphans_count"],
        "broken_requires":           dep_report["broken_requires_count"],
        "broken_unlocks":            dep_report["broken_unlocks_count"],
        "broken_cross_links":        dep_report["broken_cross_links_count"],
        "aspirational_cross_links":  dep_report["aspirational_cross_links_count"],
    },
    "learner_track_summary": [
        {"track": t["track_id"], "name": t["name"], "concepts": t["concept_count"]}
        for t in tracks_with_counts
    ],
}

# ── Write outputs ─────────────────────────────────────────────────────────────

for fname, data in [
    ("cycle_report.json",       cycle_report),
    ("orphan_report.json",      orphan_report),
    ("dependency_report.json",  dep_report),
    ("learner_tracks.json",     learner_tracks),
    ("validation_summary.json", summary),
]:
    path = f"{OUT_DIR}/{fname}"
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Wrote {path}")

print()
print("=" * 60)
print("VALIDATION SUMMARY")
print("=" * 60)
print(f"  Cycles found:             {summary['metrics']['cycles_found']}")
print(f"  True orphans:             {summary['metrics']['true_orphans']}")
print(f"  Broken requires edges:    {summary['metrics']['broken_requires']}")
print(f"  Broken unlocks edges:     {summary['metrics']['broken_unlocks']}")
print(f"  Broken cross-links:       {summary['metrics']['broken_cross_links']}")
print(f"  Aspirational cross-links: {summary['metrics']['aspirational_cross_links']}")
print(f"  Root nodes (expected):    {summary['metrics']['root_nodes']}")
print(f"  Learner tracks defined:   {len(tracks_with_counts)}")
print()
print(f"  OVERALL STATUS: {summary['overall_status']}")
print("=" * 60)
