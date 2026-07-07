#!/usr/bin/env python3
"""
Curriculum Pipeline — Mathematics Subject Manifest Generator
============================================================
Generates docs/mathematics/MATHEMATICS_MANIFEST.json summarizing
every completed domain and the overall subject state.

Reads all existing domain manifests from docs/mathematics/domains/
and assembles a subject-level manifest with:
  - Subject identity and KG metadata
  - Per-domain status, counts, and checksums (pulled from domain manifests)
  - Subject-level checksums (kg_file, assets_file, chapter directory listing)
  - Cumulative statistics
  - Dependency version chain

Usage:
  python3 generate-mathematics-manifest.py \\
    <graphJsonPath> \\
    <assetsJsonPath> \\
    <chaptersDir> \\
    <domainsDir> \\
    <currentCommit> \\
    <outputManifestPath>
"""

import hashlib
import json
import os
import sys
from datetime import datetime


def sha256_file(path):
    if not os.path.exists(path):
        return None
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return 'sha256:' + h.hexdigest()


def sha256_json_stable(obj):
    s = json.dumps(obj, sort_keys=True, ensure_ascii=False, separators=(',', ':'))
    return 'sha256:' + hashlib.sha256(s.encode('utf-8')).hexdigest()


def main():
    if len(sys.argv) != 7:
        print('Usage: python3 generate-mathematics-manifest.py <graphJsonPath> '
              '<assetsJsonPath> <chaptersDir> <domainsDir> <currentCommit> <outputManifestPath>')
        sys.exit(1)

    graph_path, assets_path, chapters_dir, domains_dir, current_commit, output_path = sys.argv[1:]

    with open(graph_path) as f:
        graph = json.load(f)
    with open(assets_path) as f:
        assets_file = json.load(f)

    all_assets = assets_file['assets']
    all_concepts = graph['concepts']
    all_domains = graph.get('domains', [])
    total_concepts = len(all_concepts)
    total_domains = len(all_domains)

    # Load all existing domain manifests
    domain_manifests = {}
    if os.path.exists(domains_dir):
        for fname in os.listdir(domains_dir):
            if fname.endswith('-manifest.json'):
                fpath = os.path.join(domains_dir, fname)
                try:
                    with open(fpath) as f:
                        dm = json.load(f)
                    domain_manifests[dm['domain_prefix']] = dm
                except Exception as e:
                    print(f'Warning: could not read {fpath}: {e}', file=sys.stderr)

    # Build per-domain entries
    domain_entries = []
    total_drafted = 0
    complete_count = 0

    for d in all_domains:
        prefix = d['id_prefix']
        concept_count = d.get('concept_count', 0)
        domain_assets = [a for a in all_assets if a['concept_id'].startswith(prefix + '.')]
        drafted = sum(1 for a in domain_assets if a.get('status') == 'draft')
        total_drafted += drafted

        stem = prefix.split('.')[-1]
        chapter_path = os.path.join(chapters_dir, f'{stem}.md')
        has_chapter = os.path.exists(chapter_path)
        is_complete = (drafted == concept_count and concept_count > 0 and has_chapter)
        if is_complete:
            complete_count += 1

        dm = domain_manifests.get(prefix)
        entry = {
            'domain_id': d['domain_id'],
            'domain_prefix': prefix,
            'domain_name': d['domain_name'],
            'concept_count': concept_count,
            'assets_drafted': drafted,
            'status': 'complete' if is_complete else ('in-progress' if drafted > 0 else 'not-started'),
            'chapter_file': chapter_path if has_chapter else None,
            'manifest_file': os.path.join(domains_dir, f'{prefix}-manifest.json') if dm else None,
            'validation_verdict': dm.get('validation', {}).get('verdict') if dm else None,
            'checksums': dm.get('checksums') if dm else None,
            'creation_commit': dm.get('creation_commit') if dm else None,
            'dependency_versions': dm.get('dependency_versions') if dm else None,
        }
        domain_entries.append(entry)

    # Subject-level checksums
    kg_checksum = sha256_file(graph_path)
    assets_checksum = sha256_file(assets_path)

    # Chapter directory listing checksum (sorted list of chapter filenames)
    chapter_files = sorted(f for f in os.listdir(chapters_dir) if f.endswith('.md')) if os.path.exists(chapters_dir) else []
    chapters_listing_checksum = sha256_json_stable(chapter_files)

    manifest = {
        'manifest_version': '1.0',
        'manifest_type': 'subject',
        'subject': 'mathematics',
        'subject_name': 'Canonical Mathematics Knowledge Graph',
        'kg_version': graph.get('version', '1.0.0'),
        'kg_status': graph.get('status', 'unknown'),
        'kg_build_date': graph.get('build_date', 'unknown'),
        'kg_file': graph_path,
        'total_concepts': total_concepts,
        'total_domains': total_domains,
        'completed_domains': complete_count,
        'drafted_assets': total_drafted,
        'completion_pct': round(total_drafted / total_concepts * 100, 1) if total_concepts else 0,
        'checksums': {
            'kg_sha256': kg_checksum,
            'assets_sha256': assets_checksum,
            'chapters_listing_sha256': chapters_listing_checksum,
        },
        'domains': domain_entries,
        'dependency_versions': {
            'asset_schema_version': '1.0.0',
            'generator_version': 'pipeline-v2',
            'validation_version': '1.1.0',
            'provenance_version': '1.0.0',
        },
        'last_commit': current_commit,
        'last_updated': datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
    }

    os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else '.', exist_ok=True)
    with open(output_path, 'w') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f'Mathematics manifest written to {output_path}')
    print(f'  KG: {graph.get("version")} ({graph.get("status")}), {total_concepts} concepts, {total_domains} domains')
    print(f'  Completed: {complete_count}/{total_domains} domains, {total_drafted}/{total_concepts} assets drafted ({manifest["completion_pct"]}%)')
    print(f'  KG checksum:     {kg_checksum}')
    print(f'  Assets checksum: {assets_checksum}')


if __name__ == '__main__':
    main()
