#!/usr/bin/env python3
"""
Curriculum Pipeline — Domain Manifest Generator
================================================
Generates docs/mathematics/domains/{prefix}-manifest.json for one completed domain.

The manifest captures:
  - Domain identity and counts
  - SHA-256 checksums of every generated file (for future tamper detection)
  - Dependency version chain (KG, schema, generator, validator)
  - Validation verdict and commit reference
  - Full list of generated files

Checksums are computed from final file contents AFTER provenance stamping,
so the manifest reflects the stable, committed state.

Deterministic asset checksum: SHA-256 of the JSON-serialized domain asset
slice (sorted by concept_id, keys sorted within each object) — independent
of ordering in the full assets.json file.

Deterministic graph checksum: SHA-256 of JSON-serialized domain concepts
(sorted by id, keys sorted).

Usage:
  python3 generate-domain-manifest.py \\
    <domainPrefix> \\
    <graphJsonPath> \\
    <assetsJsonPath> \\
    <chapterMdPath> \\
    <validationReportPath> \\
    <creationCommit> \\
    <validationCommit> \\
    <kgCommit> \\
    <outputManifestPath>

Exit code: 0 = success
"""

import hashlib
import json
import os
import sys
from datetime import datetime


def sha256_file(path):
    """SHA-256 of raw file bytes."""
    if not os.path.exists(path):
        return None
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return 'sha256:' + h.hexdigest()


def sha256_json_stable(obj):
    """SHA-256 of a deterministically serialized JSON object (sorted keys)."""
    serialized = json.dumps(obj, sort_keys=True, ensure_ascii=False, separators=(',', ':'))
    return 'sha256:' + hashlib.sha256(serialized.encode('utf-8')).hexdigest()


def main():
    if len(sys.argv) != 11:
        print('Usage: python3 generate-domain-manifest.py <domainPrefix> <graphJsonPath> '
              '<assetsJsonPath> <chapterMdPath> <validationReportPath> '
              '<creationCommit> <validationCommit> <kgCommit> '
              '<generatorVersion> <outputManifestPath>')
        sys.exit(1)

    (domain_prefix, graph_path, assets_path, chapter_md_path,
     validation_report_path, creation_commit, validation_commit,
     kg_commit, generator_version, output_path) = sys.argv[1:]

    with open(graph_path) as f:
        graph = json.load(f)
    with open(assets_path) as f:
        assets_file = json.load(f)

    # Domain metadata from graph
    domain_meta = next((d for d in graph.get('domains', [])
                        if d['id_prefix'] == domain_prefix), None)
    if not domain_meta:
        print(f'ERROR: domain {domain_prefix} not found in graph', file=sys.stderr)
        sys.exit(1)

    domain_id = domain_meta['domain_id']
    domain_name = domain_meta['domain_name']
    declared_count = domain_meta.get('concept_count', 0)

    # Collect domain assets (sorted by concept_id for stable checksum)
    domain_assets = sorted(
        [a for a in assets_file['assets'] if a['concept_id'].startswith(domain_prefix + '.')],
        key=lambda a: a['concept_id']
    )
    asset_count = len(domain_assets)

    # Collect domain concepts (sorted by id for stable checksum)
    domain_concepts = sorted(
        [c for c in graph['concepts'] if c['id'].startswith(domain_prefix + '.')],
        key=lambda c: c['id']
    )

    # Validation verdict from report file
    verdict = 'UNKNOWN'
    if os.path.exists(validation_report_path):
        with open(validation_report_path) as f:
            report_text = f.read()
        if 'Verdict: **PASS**' in report_text:
            verdict = 'PASS'
        elif 'Verdict: **FAIL**' in report_text:
            verdict = 'FAIL'

    # File list
    stem = domain_prefix.split('.')[-1]
    repo_root = os.path.commonpath([graph_path, assets_path])
    # Compute relative paths for generated files
    chapters_dir = os.path.join(os.path.dirname(os.path.dirname(graph_path)), 'chapters')
    domains_dir = os.path.dirname(validation_report_path)

    generated_files = [
        chapter_md_path,
        validation_report_path,
        os.path.join(domains_dir, f'{domain_prefix}-summary.md'),
        output_path,  # this manifest itself
    ]

    # Checksums
    checksums = {
        'chapter_sha256': sha256_file(chapter_md_path),
        'domain_assets_sha256': sha256_json_stable(domain_assets),
        'graph_domain_sha256': sha256_json_stable(domain_concepts),
        'validation_report_sha256': sha256_file(validation_report_path),
    }

    manifest = {
        'manifest_version': '1.0',
        'manifest_type': 'domain',
        'domain_id': domain_id,
        'domain_prefix': domain_prefix,
        'domain_name': domain_name,
        'subject': 'mathematics',
        'concept_count': declared_count,
        'asset_count': asset_count,
        'validation': {
            'verdict': verdict,
            'validation_script_version': '1.1.0',
            'validated_at': datetime.utcnow().strftime('%Y-%m-%d'),
            'validation_commit': validation_commit,
        },
        'checksums': checksums,
        'generated_files': generated_files,
        'dependency_versions': {
            'kg_name': graph.get('name', 'Canonical Mathematics Knowledge Graph'),
            'kg_version': graph.get('version', '1.0.0'),
            'kg_status': graph.get('status', 'unknown'),
            'kg_build_date': graph.get('build_date', 'unknown'),
            'kg_commit': kg_commit,
            'asset_schema_version': '1.0.0',
            'generator_version': generator_version,
            'validation_version': '1.1.0',
        },
        'creation_commit': creation_commit,
        'created_at': datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
    }

    os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else '.', exist_ok=True)
    with open(output_path, 'w') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f'Domain manifest written to {output_path}')
    print(f'  Verdict: {verdict}')
    print(f'  Assets: {asset_count} / {declared_count} concepts')
    print(f'  Chapter checksum: {checksums["chapter_sha256"]}')
    print(f'  Assets checksum:  {checksums["domain_assets_sha256"]}')
    print(f'  Graph checksum:   {checksums["graph_domain_sha256"]}')


if __name__ == '__main__':
    main()
