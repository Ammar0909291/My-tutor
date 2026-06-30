#!/usr/bin/env python3
"""
Curriculum Pipeline — CURRICULUM_PROGRESS.md Updater
=====================================================
Regenerates CURRICULUM_PROGRESS.md entirely from the repository state.
Reads assets.json and graph.json — no reliance on conversation memory.

Usage:
  python3 update-curriculum-progress.py <graphJsonPath> <assetsJsonPath> <chaptersDir> <commitHash> <outputPath>
"""

import json
import os
import sys
from datetime import datetime


def main():
    if len(sys.argv) != 6:
        print('Usage: python3 update-curriculum-progress.py <graphJsonPath> <assetsJsonPath> <chaptersDir> <commitHash> <outputPath>')
        sys.exit(1)

    graph_path, assets_path, chapters_dir, commit_hash, output_path = sys.argv[1:]

    with open(graph_path) as f:
        graph = json.load(f)
    with open(assets_path) as f:
        assets_file = json.load(f)

    all_assets = assets_file['assets']
    all_concepts = graph['concepts']
    domains = graph.get('domains', [])

    asset_status = {a['concept_id']: a.get('status', 'placeholder') for a in all_assets}

    today = datetime.utcnow().strftime('%Y-%m-%d')

    # ── Determine domain status ───────────────────────────────────────────────
    domain_rows = []
    complete_count = 0
    drafted_total = 0
    next_domain_set = False

    for i, d in enumerate(domains):
        prefix = d['id_prefix']
        num = i + 1
        name = d['domain_name']
        count = d.get('concept_count', '?')
        d_asset_statuses = [asset_status.get(c['id'], 'placeholder')
                            for c in all_concepts if c['id'].startswith(prefix + '.')]
        all_drafted = bool(d_asset_statuses) and all(s == 'draft' for s in d_asset_statuses)
        any_drafted = any(s == 'draft' for s in d_asset_statuses)
        drafted_in_domain = sum(1 for s in d_asset_statuses if s == 'draft')
        drafted_total += drafted_in_domain

        # Check chapter file
        chapter_file = os.path.join(chapters_dir, f'{prefix.split(".")[-1]}.md')
        chapter_exists = os.path.exists(chapter_file)

        if all_drafted and chapter_exists:
            status_col = 'draft ✓'
            chapter_col = f'chapters/{prefix.split(".")[-1]}.md ✓'
            notes_col = 'Complete'
            complete_count += 1
        elif any_drafted:
            status_col = f'partial ({drafted_in_domain}/{count})'
            chapter_col = f'chapters/{prefix.split(".")[-1]}.md ✓' if chapter_exists else '—'
            notes_col = 'In Progress'
        else:
            status_col = 'placeholder'
            chapter_col = '—'
            if not next_domain_set:
                notes_col = '**NEXT**'
                next_domain_set = True
            else:
                notes_col = 'Pending'

        domain_rows.append((num, name, prefix, count, status_col, chapter_col, notes_col))

    remaining_assets = len(all_assets) - drafted_total
    total_assets = len(all_assets)
    total_domains = len(domains)

    # Find next domain
    next_domain = None
    for d in domains:
        prefix = d['id_prefix']
        d_assets = [asset_status.get(c['id'], 'placeholder')
                    for c in all_concepts if c['id'].startswith(prefix + '.')]
        if not d_assets or not all(s == 'draft' for s in d_assets):
            next_domain = d
            break

    # ── Build concept lists per completed domain ───────────────────────────────
    concept_sections = []
    for d in domains:
        prefix = d['id_prefix']
        name = d['domain_name']
        d_concepts = [c for c in all_concepts if c['id'].startswith(prefix + '.')]
        d_statuses = [asset_status.get(c['id'], 'placeholder') for c in d_concepts]
        all_done = bool(d_statuses) and all(s == 'draft' for s in d_statuses)
        any_done = any(s == 'draft' for s in d_statuses)
        count = len(d_concepts)
        short_ids = [c['id'].replace(prefix + '.', '') for c in d_concepts]

        if all_done:
            header = f'### {prefix} ({count} concepts) — COMPLETE'
            body = ', '.join(short_ids)
            concept_sections.append((header, body, False))
        elif any_done:
            done_ids = [c['id'].replace(prefix + '.', '') for c in d_concepts if asset_status.get(c['id']) == 'draft']
            pending_ids = [c['id'].replace(prefix + '.', '') for c in d_concepts if asset_status.get(c['id']) != 'draft']
            header = f'### {prefix} ({count} concepts) — IN PROGRESS'
            body = f'{len(done_ids)}/{count} authored.\nDone: {", ".join(done_ids)}\nPending: {", ".join(pending_ids)}'
            concept_sections.append((header, body, False))
        else:
            header = f'### {prefix} ({count} concepts) — IN PROGRESS' if prefix == (next_domain['id_prefix'] if next_domain else '') else f'### {prefix} ({count} concepts) — PENDING'
            body = f'0/{count} authored. Concepts:\n{", ".join(short_ids)}'
            concept_sections.append((header, body, prefix == (next_domain['id_prefix'] if next_domain else '')))

    lines = []
    lines.append('# Mathematics Curriculum Production — Progress Tracker')
    lines.append('')
    lines.append('*Source of truth for all sessions. Do not rely on conversation memory.*')
    lines.append(f'*Last updated: {today} · Commit: `{commit_hash}`*')
    lines.append('')
    lines.append('## Branch')
    lines.append('`claude/my-tutor-foundation-KDSUO`')
    lines.append('')
    lines.append('## Latest Commit')
    lines.append(f'`{commit_hash}`')
    lines.append('')
    lines.append('## Knowledge Graph')
    lines.append('')
    lines.append('| File | Concepts | Domains | Status |')
    lines.append('|------|----------|---------|--------|')
    lines.append(f'| `docs/mathematics/kg/graph.json` | {len(all_concepts)} | {total_domains} | FROZEN v1.0.0 (FULL_PRODUCTION_APPROVAL, 97.25/100) |')
    lines.append('')
    lines.append('**Do not modify `graph.json` or any `kg/domains/*.json` file.**')
    lines.append('')
    lines.append('## Teaching-Asset Production Status')
    lines.append('')
    lines.append('| # | Domain | ID Prefix | Concepts | Asset Status | Chapter File | Notes |')
    lines.append('|---|--------|-----------|----------|--------------|--------------|-------|')
    for num, name, prefix, count, status_col, chapter_col, notes_col in domain_rows:
        lines.append(f'| {num:02d} | {name} | {prefix} | {count} | {status_col} | {chapter_col} | {notes_col} |')
    lines.append('')
    lines.append(f'**Summary:** {complete_count}/{total_domains} domains complete · {drafted_total}/{total_assets} assets drafted · {remaining_assets}/{total_assets} remaining')
    lines.append('')

    lines.append('## Completed Concepts Per Domain')
    lines.append('')
    for header, body, is_next in concept_sections:
        lines.append(header)
        lines.append('')
        lines.append(body)
        lines.append('')

    lines.append('## Workflow Optimizations in Use')
    lines.append('')
    lines.append('1. **Pre-sliced chunk inputs** — domain concepts split into chunks of 9 before agent authoring; each agent reads only its slice.')
    lines.append('2. **Skip-completed-chunks logic** — pipeline checks for existing output files; only missing chunks run.')
    lines.append('3. **Parallel authoring** — 4 agents author their chunks simultaneously.')
    lines.append('4. **Deterministic merge** — `merge-and-assemble.py` merges all chunk outputs in a single read-modify-write pass.')
    lines.append('5. **Deterministic assembly** — chapter markdown rendered from chunk files + KG data; no LLM call, pure templating.')
    lines.append('6. **Domain validation** — `validate-domain-assets.py` runs before every commit; domain blocked on FAIL.')
    lines.append('7. **Resume from repo** — completed domains detected from `status: draft` in assets.json + chapter file presence.')
    lines.append('8. **One domain at a time** — next domain only starts after: validation PASS + merge + assemble + commit + progress update.')
    lines.append('')

    lines.append('## Build Verification Notes')
    lines.append('')
    lines.append('- `npm run build` requires `node_modules` (not present in cloud container; `npm install` blocked')
    lines.append('  by network policy). All `tsc --noEmit` errors are missing-module errors, not code issues.')
    lines.append('- Python KG validator (`docs/mathematics/kg/validate.py`) runs cleanly; KG score 97.25/100.')
    lines.append('- Build must be re-verified locally after pulling `claude/my-tutor-foundation-KDSUO`.')
    lines.append('')

    lines.append('## Session Resumption Checklist')
    lines.append('')
    lines.append('1. `git fetch && git pull origin claude/my-tutor-foundation-KDSUO`')
    lines.append('2. Read this file to determine current domain and next unfinished chunk')
    lines.append('3. Check `docs/mathematics/teaching-assets/assets.json` — domains with all `status: draft` are complete')
    lines.append('4. Check `docs/mathematics/chapters/` — present `.md` files are assembled and committed')
    lines.append('5. Resume at the first domain where assets are still `placeholder`')
    lines.append('6. **Do NOT regenerate already-drafted assets**')
    lines.append('7. **Do NOT modify `docs/mathematics/kg/` files**')
    lines.append('8. Run `scripts/pipeline/validate-domain-assets.py` before committing any domain')
    lines.append('')

    if next_domain:
        lines.append('## Next Planned Domain')
        lines.append('')
        lines.append(f'**{next_domain["domain_name"]}** (`{next_domain["id_prefix"]}`) · {next_domain.get("concept_count", "?")} concepts')
    lines.append('')

    with open(output_path, 'w') as f:
        f.write('\n'.join(lines) + '\n')

    print(f'CURRICULUM_PROGRESS.md written to {output_path}')
    print(f'Status: {complete_count}/{total_domains} domains complete, {drafted_total}/{total_assets} assets drafted')


if __name__ == '__main__':
    main()
