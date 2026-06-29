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

# ── 4. Learner Tracks (per-concept difficulty assignment) ────────────────────
# Assignment uses each concept's difficulty field, not domain membership.
# Domains intentionally span multiple tiers (e.g., math.nt covers L2–L6).

DIFF_TO_TRACK = {
    "foundational": "T0",
    "developing":   "T1",
    "proficient":   "T1",
    "advanced":     "T2",
    "expert":       "T3",
    "research":     "T4",
}

TRACK_META = {
    "T0": {
        "track_id":   "T0",
        "name":       "Absolute Foundations",
        "level_range":[0, 2],
        "difficulty": ["foundational"],
        "assignment": "difficulty ∈ {foundational}",
        "description": "Entry-level mathematics. No prerequisites assumed. "
                        "Covers logic, sets, number sense, and basic arithmetic.",
    },
    "T1": {
        "track_id":   "T1",
        "name":       "Pre-University / Early Undergraduate",
        "level_range":[1, 4],
        "difficulty": ["developing", "proficient"],
        "assignment": "difficulty ∈ {developing, proficient}",
        "description": "Pre-university to first-year university. Algebra, geometry, "
                        "trigonometry, functions, sequences, introductory number theory.",
    },
    "T2": {
        "track_id":   "T2",
        "name":       "Undergraduate Core",
        "level_range":[3, 5],
        "difficulty": ["advanced"],
        "assignment": "difficulty ∈ {advanced}",
        "description": "Standard second/third-year university. Calculus, differential "
                        "equations, linear algebra, probability, statistics.",
    },
    "T3": {
        "track_id":   "T3",
        "name":       "Upper Undergraduate / Early Graduate",
        "level_range":[5, 6],
        "difficulty": ["expert"],
        "assignment": "difficulty ∈ {expert}",
        "description": "Third/fourth-year and early MSc. Abstract algebra, real/complex "
                        "analysis, topology, numerical methods, optimization.",
    },
    "T4": {
        "track_id":   "T4",
        "name":       "Graduate / Research Mathematics",
        "level_range":[6, 7],
        "difficulty": ["research"],
        "assignment": "difficulty ∈ {research}",
        "description": "MSc/PhD level. Measure theory, functional analysis, category "
                        "theory, research-frontier topics.",
    },
}

track_buckets = {t: [] for t in TRACK_META}
for c in concepts:
    tid = DIFF_TO_TRACK.get(c.get("difficulty", "foundational"), "T0")
    track_buckets[tid].append(c["id"])

tracks_with_counts = []
for tid, meta in TRACK_META.items():
    members      = track_buckets[tid]
    entry_points = [cid for cid in members if not concept_by_id[cid].get("requires")]
    tracks_with_counts.append({
        **meta,
        "concept_count":     len(members),
        "entry_point_count": len(entry_points),
        "entry_points":      entry_points[:20],
    })

learner_tracks = {
    "model":  "Five-tier progressive track model (T0–T4) — per-concept difficulty assignment",
    "status": "DEFINED",
    "note":   "Each concept is assigned to a track by its own difficulty field. "
               "A domain may contribute concepts to multiple tracks (e.g., math.nt spans T1–T4). "
               "Learner progression: T0 → T1 → T2 → T3 → T4.",
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
