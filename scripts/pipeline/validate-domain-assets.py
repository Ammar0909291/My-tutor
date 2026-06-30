#!/usr/bin/env python3
"""
Curriculum Pipeline — Domain Asset Validator
============================================
Generates DOMAIN_VALIDATION_REPORT.md for one completed domain.

Checks:
  1. Concept count matches KG declaration
  2. Prerequisite integrity (all requires/unlocks/cross_links reference existing IDs)
  3. Duplicate detection (no duplicate concept_ids in assets)
  4. Orphan detection (every KG concept has an asset; every asset matches a KG concept)
  5. Broken cross-links (all cross_links targets exist in graph.json)
  6. Asset completeness (all 10 fields non-empty, no placeholder text, status=draft)
  7. Curriculum completeness (chapter .md exists, contains all concept headings)
  8. Internal quality checks (non-trivial content heuristics)

Usage:
  python3 validate-domain-assets.py <domainPrefix> <graphJsonPath> <assetsJsonPath> <chapterMdPath> <outputReportPath>

Exit code: 0 = PASS, 1 = FAIL
"""

import json
import os
import re
import sys
from datetime import datetime

PLACEHOLDER_PATTERNS = [
    r'\[TEMPLATE\]',
    r'pending authoring',
    r'placeholder',
    r'TBD',
    r'TODO',
    r'\[placeholder\]',
]

ASSET_REQUIRED_FIELDS = [
    'learning_objective',
    'concept_summary',
    'key_ideas',
    'common_misconceptions',
    'visual_teaching_suggestions',
    'worked_example_blueprint',
    'practice_blueprint',
    'assessment_blueprint',
    'real_world_applications',
    'prerequisite_review_triggers',
]

AUTHORABLE_MIN_LENGTHS = {
    'learning_objective': 40,
    'concept_summary': 100,
}


def has_placeholder(value) -> bool:
    text = json.dumps(value) if not isinstance(value, str) else value
    return any(re.search(p, text, re.IGNORECASE) for p in PLACEHOLDER_PATTERNS)


def check_min_length(value, min_len) -> bool:
    if isinstance(value, str):
        return len(value.strip()) >= min_len
    return True


def validate(domain_prefix, graph_path, assets_path, chapter_md_path, report_path):
    issues = []
    warnings = []

    # ── Load inputs ──────────────────────────────────────────────────────────
    with open(graph_path) as f:
        graph = json.load(f)
    with open(assets_path) as f:
        assets_file = json.load(f)

    all_kg_ids = {c['id'] for c in graph['concepts']}
    domain_concepts = [c for c in graph['concepts'] if c['id'].startswith(domain_prefix + '.')]
    domain_meta = next((d for d in graph.get('domains', []) if d['id_prefix'] == domain_prefix), None)
    declared_count = domain_meta['concept_count'] if domain_meta else None
    domain_name = domain_meta['domain_name'] if domain_meta else domain_prefix

    domain_assets = [a for a in assets_file['assets'] if a['concept_id'].startswith(domain_prefix + '.')]
    asset_by_id = {a['concept_id']: a for a in domain_assets}

    checks = {}

    # ── Check 1: Concept count ───────────────────────────────────────────────
    actual_count = len(domain_concepts)
    if declared_count is not None and actual_count != declared_count:
        issues.append(f'Concept count mismatch: KG declares {declared_count}, found {actual_count} concepts with prefix "{domain_prefix}."')
        checks['concept_count'] = f'FAIL ({actual_count} ≠ {declared_count})'
    else:
        checks['concept_count'] = f'PASS ({actual_count} concepts)'

    # ── Check 2: Prerequisite integrity ──────────────────────────────────────
    broken_requires = []
    for c in domain_concepts:
        for ref in c.get('requires', []):
            if ref not in all_kg_ids:
                broken_requires.append(f'{c["id"]}.requires → {ref}')
        for ref in c.get('unlocks', []):
            if ref not in all_kg_ids:
                broken_requires.append(f'{c["id"]}.unlocks → {ref}')
    if broken_requires:
        for b in broken_requires:
            issues.append(f'Broken prerequisite edge: {b}')
        checks['prerequisite_integrity'] = f'FAIL ({len(broken_requires)} broken edges)'
    else:
        checks['prerequisite_integrity'] = f'PASS (0 broken edges)'

    # ── Check 3: Duplicate detection ─────────────────────────────────────────
    seen_ids = {}
    dupes = []
    for a in domain_assets:
        cid = a['concept_id']
        if cid in seen_ids:
            dupes.append(cid)
        seen_ids[cid] = True
    if dupes:
        for d in dupes:
            issues.append(f'Duplicate asset for concept_id: {d}')
        checks['duplicate_detection'] = f'FAIL ({len(dupes)} duplicates)'
    else:
        checks['duplicate_detection'] = f'PASS (0 duplicates)'

    # ── Check 4: Orphan detection ─────────────────────────────────────────────
    kg_ids_set = {c['id'] for c in domain_concepts}
    asset_ids_set = set(asset_by_id.keys())
    orphan_kg = kg_ids_set - asset_ids_set      # KG concept has no asset
    orphan_asset = asset_ids_set - kg_ids_set   # Asset has no KG concept
    orphan_issues = []
    for o in sorted(orphan_kg):
        orphan_issues.append(f'KG concept has no asset: {o}')
        issues.append(f'Orphan (no asset): {o}')
    for o in sorted(orphan_asset):
        orphan_issues.append(f'Asset has no KG concept: {o}')
        issues.append(f'Stray asset (no KG entry): {o}')
    if orphan_issues:
        checks['orphan_detection'] = f'FAIL ({len(orphan_issues)} orphans)'
    else:
        checks['orphan_detection'] = f'PASS (0 orphans)'

    # ── Check 5: Broken cross-links ───────────────────────────────────────────
    broken_xlinks = []
    for c in domain_concepts:
        for ref in c.get('cross_links', []):
            # Allow aspirational cross-links to future namespaces (math.phys.*)
            if ref not in all_kg_ids and not ref.startswith('math.phys.'):
                broken_xlinks.append(f'{c["id"]}.cross_links → {ref}')
    if broken_xlinks:
        for b in broken_xlinks:
            issues.append(f'Broken cross-link: {b}')
        checks['broken_cross_links'] = f'FAIL ({len(broken_xlinks)} broken cross-links)'
    else:
        checks['broken_cross_links'] = f'PASS (0 broken cross-links)'

    # ── Check 6: Asset completeness ───────────────────────────────────────────
    incomplete_assets = []
    placeholder_assets = []
    wrong_status = []
    for c in domain_concepts:
        cid = c['id']
        if cid not in asset_by_id:
            continue  # already caught by orphan check
        a = asset_by_id[cid]

        # Status must be draft
        if a.get('status') != 'draft':
            wrong_status.append(f'{cid}: status={a.get("status")} (expected draft)')
            issues.append(f'Asset not in draft status: {cid} (status={a.get("status")})')

        # All 10 fields must be present and non-empty
        for field in ASSET_REQUIRED_FIELDS:
            if field not in a:
                incomplete_assets.append(f'{cid}: missing field {field}')
                issues.append(f'Missing field {field} in asset: {cid}')
            elif not a[field] and a[field] != 0:
                incomplete_assets.append(f'{cid}: empty field {field}')
                issues.append(f'Empty field {field} in asset: {cid}')

        # No placeholder text
        for field in ASSET_REQUIRED_FIELDS:
            if field in a and has_placeholder(a[field]):
                placeholder_assets.append(f'{cid}.{field}')
                issues.append(f'Placeholder text in {cid}.{field}')

        # Minimum length checks
        for field, min_len in AUTHORABLE_MIN_LENGTHS.items():
            if field in a and not check_min_length(a[field], min_len):
                warnings.append(f'{cid}.{field} is suspiciously short (<{min_len} chars)')

        # Worked example has steps
        if 'worked_example_blueprint' in a:
            wb = a['worked_example_blueprint']
            if not wb.get('steps') or len(wb['steps']) < 2:
                issues.append(f'Worked example has <2 steps: {cid}')
                incomplete_assets.append(f'{cid}: worked_example_blueprint.steps too short')

        # At least 2 misconceptions
        if 'common_misconceptions' in a:
            if len(a['common_misconceptions']) < 2:
                warnings.append(f'{cid}: only {len(a["common_misconceptions"])} misconception(s) (expected ≥2)')

        # At least 3 key ideas
        if 'key_ideas' in a:
            if len(a['key_ideas']) < 3:
                issues.append(f'{cid}: only {len(a["key_ideas"])} key idea(s) (expected ≥3)')

    all_complete = not incomplete_assets and not placeholder_assets and not wrong_status
    if not all_complete:
        checks['asset_completeness'] = f'FAIL ({len(incomplete_assets)} incomplete, {len(placeholder_assets)} with placeholders, {len(wrong_status)} wrong status)'
    else:
        checks['asset_completeness'] = f'PASS ({len(domain_assets)} assets complete, all status=draft)'

    # ── Check 7: Curriculum completeness (chapter .md) ────────────────────────
    if not os.path.exists(chapter_md_path):
        issues.append(f'Chapter markdown not found: {chapter_md_path}')
        checks['curriculum_completeness'] = f'FAIL (chapter .md missing)'
    else:
        with open(chapter_md_path) as f:
            chapter_text = f.read()
        chapter_lines = chapter_text.count('\n')
        # Check that each concept name appears as a heading
        missing_headings = []
        for c in domain_concepts:
            # heading may have minor formatting differences — check concept ID in the file
            if c['id'] not in chapter_text:
                missing_headings.append(c['id'])
        if missing_headings:
            for m in missing_headings[:5]:
                issues.append(f'Chapter missing section for concept: {m}')
            checks['curriculum_completeness'] = f'FAIL ({len(missing_headings)} concepts missing from chapter)'
        else:
            checks['curriculum_completeness'] = f'PASS ({chapter_lines} lines, all {len(domain_concepts)} concept IDs present)'

    # ── Check 8: Internal quality heuristics ──────────────────────────────────
    quality_issues = []
    for c in domain_concepts:
        cid = c['id']
        if cid not in asset_by_id:
            continue
        a = asset_by_id[cid]
        # Learning objective must not start with a generic verb pattern only
        lo = a.get('learning_objective', '')
        if lo and len(lo.split()) < 8:
            quality_issues.append(f'{cid}: learning_objective too brief ({len(lo.split())} words)')
        # Concept summary must have paragraph depth (at least 80 chars)
        cs = a.get('concept_summary', '')
        if cs and len(cs) < 80:
            quality_issues.append(f'{cid}: concept_summary too brief ({len(cs)} chars)')
        # Real-world applications must have ≥2 items
        rwa = a.get('real_world_applications', [])
        if rwa and len(rwa) < 2:
            quality_issues.append(f'{cid}: only {len(rwa)} real_world_application(s)')

    for qi in quality_issues:
        warnings.append(qi)

    if quality_issues:
        checks['quality_audit'] = f'WARN ({len(quality_issues)} quality hints — review recommended)'
    else:
        checks['quality_audit'] = f'PASS (no quality issues detected)'

    # ── Verdict ───────────────────────────────────────────────────────────────
    verdict = 'PASS' if not issues else 'FAIL'

    # ── Write report ─────────────────────────────────────────────────────────
    today = datetime.utcnow().strftime('%Y-%m-%d')
    lines = []
    lines.append(f'# Domain Validation Report — {domain_name} (`{domain_prefix}`)')
    lines.append('')
    lines.append(f'Date: {today}')
    lines.append(f'Verdict: **{verdict}**')
    lines.append('')
    lines.append('## Check Results')
    lines.append('')
    lines.append('| Check | Result |')
    lines.append('|-------|--------|')
    for check_name, result in checks.items():
        icon = '✓' if result.startswith('PASS') else ('⚠' if result.startswith('WARN') else '✗')
        lines.append(f'| {check_name.replace("_", " ").title()} | {icon} {result} |')
    lines.append('')

    lines.append('## Statistics')
    lines.append('')
    lines.append(f'| Metric | Value |')
    lines.append(f'|--------|-------|')
    lines.append(f'| Domain | {domain_name} (`{domain_prefix}`) |')
    lines.append(f'| Concepts (KG) | {len(domain_concepts)} |')
    lines.append(f'| Concepts (declared) | {declared_count or "unknown"} |')
    lines.append(f'| Assets authored | {len(domain_assets)} |')
    lines.append(f'| Assets status=draft | {sum(1 for a in domain_assets if a.get("status") == "draft")} |')
    lines.append(f'| Assets status=placeholder | {sum(1 for a in domain_assets if a.get("status") == "placeholder")} |')
    lines.append(f'| Broken prerequisite edges | {len(broken_requires)} |')
    lines.append(f'| Broken cross-links | {len(broken_xlinks)} |')
    lines.append(f'| Orphan KG concepts | {len(orphan_kg)} |')
    lines.append(f'| Stray assets | {len(orphan_asset)} |')
    lines.append(f'| Placeholder content found | {len(placeholder_assets)} |')
    lines.append('')

    if issues:
        lines.append('## Issues (must fix before commit)')
        lines.append('')
        for issue in issues:
            lines.append(f'- ✗ {issue}')
        lines.append('')

    if warnings:
        lines.append('## Warnings (review recommended)')
        lines.append('')
        for w in warnings:
            lines.append(f'- ⚠ {w}')
        lines.append('')

    if not issues and not warnings:
        lines.append('## Issues')
        lines.append('')
        lines.append('None — all checks passed.')
        lines.append('')

    lines.append('## Verdict')
    lines.append('')
    if verdict == 'PASS':
        lines.append(f'**PASS** — Domain `{domain_prefix}` is validated and ready to commit.')
    else:
        lines.append(f'**FAIL** — Domain `{domain_prefix}` has {len(issues)} issue(s) that must be resolved before committing.')
        lines.append('')
        lines.append('Do not commit this domain until all issues above are resolved.')
    lines.append('')

    os.makedirs(os.path.dirname(report_path) if os.path.dirname(report_path) else '.', exist_ok=True)
    with open(report_path, 'w') as f:
        f.write('\n'.join(lines) + '\n')

    print(f'Validation report written to {report_path}')
    print(f'Verdict: {verdict}')
    if issues:
        print(f'Issues ({len(issues)}):')
        for i in issues[:10]:
            print(f'  ✗ {i}')
    if warnings:
        print(f'Warnings ({len(warnings)}):')
        for w in warnings[:5]:
            print(f'  ⚠ {w}')

    return 0 if verdict == 'PASS' else 1


if __name__ == '__main__':
    if len(sys.argv) != 6:
        print('Usage: python3 validate-domain-assets.py <domainPrefix> <graphJsonPath> <assetsJsonPath> <chapterMdPath> <outputReportPath>')
        sys.exit(1)
    domain_prefix, graph_path, assets_path, chapter_md_path, report_path = sys.argv[1:]
    sys.exit(validate(domain_prefix, graph_path, assets_path, chapter_md_path, report_path))
