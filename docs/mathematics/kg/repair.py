#!/usr/bin/env python3
"""
Repair broken edges in the Mathematics Knowledge Graph.
Fixes 42 broken requires, 34 broken unlocks, 78 broken cross-links.
Edits individual domain JSON files in-place, then rebuilds graph.json.
"""

import json, glob, os

DOMAIN_DIR = "docs/mathematics/kg/domains"
GRAPH_PATH = "docs/mathematics/kg/graph.json"

# ── Repair maps ───────────────────────────────────────────────────────────────
# Format: broken_id → correct_id  (or None = remove the edge)

REQUIRES_MAP = {
    "math.abst.field-extensions":        "math.abst.field-extension",
    "math.cx.complex-analysis":          "math.cx.complex-numbers-analysis",
    "math.linalg.determinants":          "math.linalg.determinant",
    "math.calc.derivative":              "math.calc.derivative-intro",
    "math.calc.antiderivative":          "math.calc.antiderivatives",
    "math.calc.integration-techniques":  "math.calc.u-substitution",
    "math.calc.partial-derivative":      "math.calc.partial-derivatives",
    "math.alg.partial-fractions":        "math.calc.partial-fractions",
    "math.seq.convergence":              "math.seq.series-convergence",
    "math.arith.real-numbers":           "math.found.real-numbers",
    "math.geom.coordinates":             "math.geom.x-y-coordinates",
    "math.alg.systems-linear-equations": "math.alg.system-linear-equations",
    "math.found.field":                  "math.abst.field",
    "math.seq.power-series":             "math.calc.power-series",
    "math.arith.factorial":              "math.arith.multiplication",
    "math.seq.sequences":                "math.seq.sequence",
    "math.alg.polynomials":              "math.alg.polynomial",
    "math.calc.logarithms":              "math.alg.logarithm",
    "math.found.propositions":           "math.found.proposition",
    "math.nt.prime-numbers":             "math.nt.prime-number",
    "math.found.ordered-set":            "math.found.total-order",
    "math.trig.polar-complex":           "math.trig.polar-form-complex",
    "math.found.axiom-of-choice":        "math.found.set-theory-axiomatic",
    "math.calc.second-derivative-test":  "math.calc.concavity",
    "math.calc.hessian":                 "math.calc.multivariable-extrema",
    # variation-of-parameters specifically needs integration-by-parts
}

# Special-case overrides for specific (source, broken_target) pairs
REQUIRES_SPECIAL = {
    ("math.de.variation-of-parameters", "math.calc.integration-techniques"): "math.calc.integration-by-parts",
    ("math.stats.mle",                  "math.calc.derivative"):              "math.calc.derivative-rules",
    ("math.real.differentiability-rigorous", "math.calc.derivative"):        "math.calc.derivative-definition",
    ("math.cx.cauchy-riemann",          "math.calc.partial-derivative"):     "math.calc.partial-derivatives",
    ("math.fnal.distributions",         "math.calc.derivative"):             "math.calc.derivative-definition",
    ("math.num.newtons-method",         "math.calc.derivative"):             "math.calc.derivative-definition",
    ("math.num.numerical-differentiation", "math.calc.derivative"):          "math.calc.derivative-definition",
}

UNLOCKS_MAP = {
    "math.de.modeling-with-odes":    None,   # remove
    "math.found.equation":           None,   # remove
    "math.disc.boolean-algebra":     "math.disc.boolean-circuits",
    "math.abst.formal-systems":      None,   # remove
    "math.abst.lattice":             None,   # remove
    "math.real.completeness-axiom":  "math.real.completeness",
    "math.cx.complex-plane":         "math.cx.complex-numbers-analysis",
    "math.stats.relative-frequency": None,   # remove
    "math.linalg.linear-systems":    "math.linalg.linear-system",
    "math.linalg.gaussian-elimination": "math.linalg.row-reduction",
    "math.prob.binomial-distribution": "math.prob.discrete-distributions",
    "math.cx.complex-polar":         "math.cx.complex-numbers-analysis",
    "math.linalg.linear-transformations": "math.linalg.linear-map",
    "math.linalg.rotation-matrix":   None,   # remove
    "math.linalg.vectors":           "math.linalg.vector",
    "math.linalg.inner-product-spaces": "math.linalg.inner-product-space",
    "math.top.riemannian-geometry":  None,   # remove
    "math.cx.roots-of-unity":        "math.cx.complex-numbers-analysis",
    "math.cx.exponential-map":       "math.cx.analytic-functions",
    "math.disc.recurrence-relations": "math.disc.recurrence-relation",
    "math.real.sequences-convergence": "math.real.convergence-sequences",
    "math.num.bisection-method":     "math.num.root-finding",
    "math.real.mean-value-theorem":  "math.real.mvt",
    "math.opt.calculus-optimization": "math.opt.unconstrained-optimization",
    "math.opt.gradient-descent":     "math.opt.gradient-methods",
    "math.pde.heat-equation":        "math.de.heat-equation",
}

CROSS_MAP = {
    "math.abst.abstract-structure":  "math.abst.algebraic-structure",
    "math.de.modeling-with-odes":    None,
    "math.opt.formulation":          None,
    "math.disc.boolean-algebra":     "math.disc.boolean-circuits",
    "math.abst.formal-systems":      None,
    "math.abst.model-theory":        None,
    "math.disc.recurrence-relations": "math.disc.recurrence-relation",
    "math.abst.groups":              "math.abst.group-theory",
    "math.linalg.vector-spaces":     "math.linalg.vector-space",
    "math.abst.partial-order":       None,
    "math.graph.directed-graph":     "math.graph.graph",
    "math.abst.lattice":             None,
    "math.real.real-numbers-uncountable": None,
    "math.real.completeness-axiom":  "math.real.completeness",
    "math.cx.complex-plane":         "math.cx.complex-numbers-analysis",
    "math.geom.coordinate-line":     "math.geom.coordinate-plane",
    "math.real.metric-space-rn":     "math.real.metric-space",
    "math.abst.ring-multiplication": "math.abst.ring-theory",
    "math.abst.field-inverse":       "math.abst.field",
    "math.stats.relative-frequency": None,
    "math.linalg.linear-systems":    "math.linalg.linear-system",
    "math.linalg.gaussian-elimination": "math.linalg.row-reduction",
    "math.cx.complex-numbers-roots": "math.cx.complex-numbers-analysis",
    "math.prob.binomial-distribution": "math.prob.discrete-distributions",
    "math.linalg.vector-norm":       "math.linalg.norm",
    "math.cx.complex-polar":         "math.cx.complex-numbers-analysis",
    "math.linalg.linear-transformations": "math.linalg.linear-map",
    "math.abst.group-symmetry":      "math.abst.group-action",
    "math.linalg.rotation-matrix":   None,
    "math.linalg.vectors":           "math.linalg.vector",
    "math.linalg.inner-product-spaces": "math.linalg.inner-product-space",
    "math.top.riemannian-geometry":  None,
    "math.cx.roots-of-unity":        "math.cx.complex-numbers-analysis",
    "math.cx.exponential-map":       "math.cx.analytic-functions",
    "math.real.sequences-convergence": "math.real.convergence-sequences",
    "math.real.limit-rigorous":      None,
    "math.top.continuous-map":       "math.top.continuity-top",
    "math.num.bisection-method":     "math.num.root-finding",
    "math.real.mean-value-theorem":  "math.real.mvt",
    "math.opt.calculus-optimization": "math.opt.unconstrained-optimization",
    "math.opt.gradient-descent":     "math.opt.gradient-methods",
    "math.top.differential-forms":   None,
    "math.pde.heat-equation":        "math.de.heat-equation",
    "math.fnal.hilbert-spaces":      "math.fnal.hilbert-space",
    "math.calc.potential-function":  None,
    "math.geom.2d-vector":           "math.geom.vectors-2d",
    "math.geom.3d-vector":           "math.geom.vectors-3d",
    "math.alg.systems-linear-equations": "math.alg.system-linear-equations",
    "math.calc.tensor-calculus":     None,
    "math.found.truth-tables":       "math.found.truth-table",
    "math.alg.polynomials":          "math.alg.polynomial",
    "math.seq.convergence":          "math.seq.series-convergence",
    "math.seq.convergence-tests":    "math.seq.comparison-test",
    "math.calc.derivative":          "math.calc.derivative-definition",
    "math.calc.mvt":                 "math.calc.mean-value-theorem",
    "math.calc.ftc":                 "math.calc.ftc-part1",
    "math.trig.euler-formula":       "math.trig.eulers-formula",
    "math.geom.differential-geometry": "math.geom.differential-geometry-curves",
    "math.calc.lagrange-multipliers": None,
}

# ── Repair helper ─────────────────────────────────────────────────────────────

def repair_list(lst, fix_map, special=None, source_id=None):
    result = []
    for item in (lst or []):
        key = (source_id, item) if special else None
        if special and key in special:
            replacement = special[key]
        elif item in fix_map:
            replacement = fix_map[item]
        else:
            replacement = item   # unchanged
        if replacement is not None:
            result.append(replacement)
    # deduplicate while preserving order
    seen = set()
    out = []
    for x in result:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out

# ── Process each domain file ──────────────────────────────────────────────────

files = sorted(glob.glob(f"{DOMAIN_DIR}/*.json"))
total_fixed = 0

for fpath in files:
    with open(fpath) as f:
        domain = json.load(f)

    changed = False
    for c in domain["concepts"]:
        cid = c["id"]

        old_req = list(c.get("requires") or [])
        old_unl = list(c.get("unlocks") or [])
        old_cl  = list(c.get("cross_links") or [])

        new_req = repair_list(old_req, REQUIRES_MAP, REQUIRES_SPECIAL, cid)
        new_unl = repair_list(old_unl, UNLOCKS_MAP)
        new_cl  = repair_list(old_cl,  CROSS_MAP)

        if new_req != old_req or new_unl != old_unl or new_cl != old_cl:
            c["requires"]    = new_req
            c["unlocks"]     = new_unl
            c["cross_links"] = new_cl
            changed = True
            total_fixed += (
                sum(1 for a, b in zip(old_req, new_req) if a != b) +
                abs(len(old_req) - len(new_req)) +
                sum(1 for a, b in zip(old_unl, new_unl) if a != b) +
                abs(len(old_unl) - len(new_unl)) +
                sum(1 for a, b in zip(old_cl, new_cl) if a != b) +
                abs(len(old_cl) - len(new_cl))
            )

    if changed:
        with open(fpath, "w") as f:
            json.dump(domain, f, indent=2)
        print(f"Repaired: {os.path.basename(fpath)}")
    else:
        print(f"Clean:    {os.path.basename(fpath)}")

print(f"\nTotal edge fixes applied: {total_fixed}")

# ── Rebuild graph.json ────────────────────────────────────────────────────────

all_concepts = []
domains_summary = []

for fpath in sorted(glob.glob(f"{DOMAIN_DIR}/*.json")):
    with open(fpath) as f:
        data = json.load(f)
    all_concepts.extend(data["concepts"])
    domains_summary.append({
        "domain_id":     data["domain_id"],
        "domain_name":   data["domain_name"],
        "id_prefix":     data["id_prefix"],
        "level_range":   data["level_range"],
        "concept_count": len(data["concepts"]),
    })

total_req   = sum(len(c.get("requires", []) or [])    for c in all_concepts)
total_unl   = sum(len(c.get("unlocks", []) or [])     for c in all_concepts)
total_cross = sum(len(c.get("cross_links", []) or []) for c in all_concepts)

graph = {
    "name":       "Canonical Mathematics Knowledge Graph",
    "version":    "1.0.1",
    "status":     "frozen",
    "build_date": "2026-06-29",
    "statistics": {
        "total_concepts":       len(all_concepts),
        "total_domains":        len(domains_summary),
        "total_requires_edges": total_req,
        "total_unlocks_edges":  total_unl,
        "total_cross_links":    total_cross,
    },
    "domains":  domains_summary,
    "concepts": all_concepts,
}

with open(GRAPH_PATH, "w") as f:
    json.dump(graph, f, indent=2)

print(f"\nRebuilt graph.json v1.0.1")
print(f"  Concepts: {len(all_concepts)}")
print(f"  Requires: {total_req}")
print(f"  Unlocks:  {total_unl}")
print(f"  Cross:    {total_cross}")
