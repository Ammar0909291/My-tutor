#!/usr/bin/env python3
"""
Curriculum Pipeline — Domain Summary Generator
===============================================
Generates DOMAIN_SUMMARY.md after a domain is successfully committed.

Usage:
  python3 generate-domain-summary.py <domainPrefix> <graphJsonPath> <assetsJsonPath> <commitHash> <outputPath>
"""

import json
import os
import sys
from datetime import datetime


def main():
    if len(sys.argv) != 6:
        print('Usage: python3 generate-domain-summary.py <domainPrefix> <graphJsonPath> <assetsJsonPath> <commitHash> <outputPath>')
        sys.exit(1)

    domain_prefix, graph_path, assets_path, commit_hash, output_path = sys.argv[1:]

    with open(graph_path) as f:
        graph = json.load(f)
    with open(assets_path) as f:
        assets_file = json.load(f)

    all_concepts = graph['concepts']
    total_kg_concepts = len(all_concepts)

    domain_meta = next((d for d in graph.get('domains', []) if d['id_prefix'] == domain_prefix), None)
    domain_name = domain_meta['domain_name'] if domain_meta else domain_prefix
    domain_concepts = [c for c in all_concepts if c['id'].startswith(domain_prefix + '.')]
    domain_count = len(domain_concepts)

    all_assets = assets_file['assets']
    total_assets = len(all_assets)
    drafted_assets = sum(1 for a in all_assets if a.get('status') == 'draft')
    placeholder_assets = total_assets - drafted_assets

    # Determine which domains are complete (all assets drafted)
    domains = graph.get('domains', [])
    complete_domains = []
    for d in domains:
        prefix = d['id_prefix']
        d_assets = [a for a in all_assets if a['concept_id'].startswith(prefix + '.')]
        if d_assets and all(a.get('status') == 'draft' for a in d_assets):
            complete_domains.append(d)

    domains_complete = len(complete_domains)
    domains_total = len(domains)

    # Campaign totals (Mathematics only for now; expand when other subjects added)
    campaign_total_concepts = total_kg_concepts  # 908 math concepts
    campaign_drafted = drafted_assets
    campaign_pct = (campaign_drafted / campaign_total_concepts * 100) if campaign_total_concepts else 0

    # Estimate remaining: ~170 lines per concept (based on arith.md: 6248 lines / 58 concepts ≈ 108)
    # domains remaining
    remaining_domains = domains_total - domains_complete
    remaining_concepts = total_kg_concepts - drafted_assets

    # Avg concepts per remaining domain (rough)
    remaining_domain_concepts = [
        d for d in domains
        if not any(d['id_prefix'] == cd['id_prefix'] for cd in complete_domains)
    ]
    avg_remaining = (sum(d.get('concept_count', 0) for d in remaining_domain_concepts) / len(remaining_domain_concepts)) if remaining_domain_concepts else 0

    today = datetime.utcnow().strftime('%Y-%m-%d')

    lines = []
    lines.append(f'# Domain Summary — {domain_name} (`{domain_prefix}`)')
    lines.append('')
    lines.append(f'*Generated: {today} · Commit: `{commit_hash}`*')
    lines.append('')
    lines.append('## This Domain')
    lines.append('')
    lines.append(f'| Item | Value |')
    lines.append(f'|------|-------|')
    lines.append(f'| Domain | {domain_name} |')
    lines.append(f'| Prefix | `{domain_prefix}` |')
    lines.append(f'| Concepts authored | {domain_count} |')
    lines.append(f'| New assets created | {domain_count} (placeholder → draft) |')
    lines.append(f'| Commit | `{commit_hash}` |')
    lines.append('')
    lines.append('## Cumulative Mathematics Progress')
    lines.append('')
    lines.append(f'| Metric | Value |')
    lines.append(f'|--------|-------|')
    lines.append(f'| Domains complete | {domains_complete} / {domains_total} |')
    lines.append(f'| Concepts authored | {drafted_assets} / {total_kg_concepts} |')
    lines.append(f'| Concepts remaining | {remaining_concepts} |')
    lines.append(f'| Completion | {campaign_pct:.1f}% |')
    lines.append('')
    lines.append('## Completed Domains')
    lines.append('')
    for d in complete_domains:
        lines.append(f'- {d["domain_name"]} (`{d["id_prefix"]}`) — {d.get("concept_count", "?")} concepts')
    lines.append('')
    lines.append('## Remaining Domains')
    lines.append('')
    for d in remaining_domain_concepts:
        lines.append(f'- {d["domain_name"]} (`{d["id_prefix"]}`) — {d.get("concept_count", "?")} concepts')
    lines.append('')
    lines.append('## Estimated Remaining Work')
    lines.append('')
    lines.append(f'| Item | Estimate |')
    lines.append(f'|------|----------|')
    lines.append(f'| Remaining domains | {remaining_domains} |')
    lines.append(f'| Remaining concepts | {remaining_concepts} |')
    lines.append(f'| Avg concepts/domain (remaining) | {avg_remaining:.0f} |')
    lines.append(f'| Estimated sessions at current pace | ~{remaining_domains} (1 domain/session) |')
    lines.append('')
    lines.append('## Campaign Context')
    lines.append('')
    lines.append('Long-term objective: Canonical Knowledge Graph → Canonical Teaching Assets → Canonical Subject Freeze (v1.0) → Curriculum Views (CBSE, ICSE, IB, Cambridge, University) → Educational Brain intelligence layers.')
    lines.append('')
    lines.append(f'Mathematics is subject 1 of 5 (Mathematics, Physics, Chemistry, Biology, Computer Science).')
    lines.append('')

    os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else '.', exist_ok=True)
    with open(output_path, 'w') as f:
        f.write('\n'.join(lines) + '\n')

    print(f'Domain summary written to {output_path}')


if __name__ == '__main__':
    main()
