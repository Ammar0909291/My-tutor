#!/usr/bin/env python3
"""
Curriculum Pipeline — Asset Provenance Stamper
===============================================
Adds or updates a `provenance` field on every DRAFT asset in assets.json.
PLACEHOLDER assets get a lightweight provenance stub only.

Provenance fields per asset:
  kg_version          KG file version (from graph.json top-level `version`)
  kg_commit           Last git commit that touched graph.json
  domain_version      Domain-level version (currently "1.0.0")
  asset_schema_version  Version of TeachingAssetSchema (from assets file `version`)
  generator_version   Which pipeline script version authored this asset
  validation_version  Version of validate-domain-assets.py at validation time
  generated_at        ISO date of authoring
  generation_commit   git commit hash of the commit that authored this asset
  validation_commit   git commit hash when validation last ran (PASS)
  source_references   Canonical references from graph.json concept.references[]

This script is ADDITIVE ONLY:
- Does NOT modify any content field (learning_objective, concept_summary, etc.)
- Does NOT modify kg/graph.json or chapter .md files
- Only writes to the `provenance` key on each asset entry

Usage:
  python3 stamp-asset-provenance.py \\
    <domainPrefix> \\
    <graphJsonPath> \\
    <assetsJsonPath> \\
    <generationCommit> \\
    <validationCommit> \\
    <kgCommit> \\
    [--generator-version pipeline-v2] \\
    [--validation-version 1.1.0] \\
    [--domain-version 1.0.0] \\
    [--generated-at YYYY-MM-DD]

Exit code: 0 = success
"""

import argparse
import json
import os
import sys
from datetime import datetime

ASSET_SCHEMA_VERSION = '1.0.0'   # mirrors TeachingAssetSchema version


def main():
    parser = argparse.ArgumentParser(description='Stamp provenance on domain assets')
    parser.add_argument('domain_prefix')
    parser.add_argument('graph_path')
    parser.add_argument('assets_path')
    parser.add_argument('generation_commit')
    parser.add_argument('validation_commit')
    parser.add_argument('kg_commit')
    parser.add_argument('--generator-version', default='pipeline-v2')
    parser.add_argument('--validation-version', default='1.1.0')
    parser.add_argument('--domain-version', default='1.0.0')
    parser.add_argument('--generated-at', default=datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'))
    args = parser.parse_args()

    with open(args.graph_path) as f:
        graph = json.load(f)
    with open(args.assets_path) as f:
        assets_file = json.load(f)

    kg_version = graph.get('version', '1.0.0')
    kg_build_date = graph.get('build_date', 'unknown')

    # Build concept_id → references map from graph
    references_by_id = {c['id']: c.get('references', []) for c in graph['concepts']}

    stamped_count = 0
    stub_count = 0

    for asset in assets_file['assets']:
        cid = asset['concept_id']
        if not cid.startswith(args.domain_prefix + '.'):
            continue

        status = asset.get('status', 'placeholder')
        refs = references_by_id.get(cid, [])

        if status == 'draft':
            asset['provenance'] = {
                'kg_version': kg_version,
                'kg_commit': args.kg_commit,
                'kg_build_date': kg_build_date,
                'domain_version': args.domain_version,
                'asset_schema_version': ASSET_SCHEMA_VERSION,
                'generator_version': args.generator_version,
                'validation_version': args.validation_version,
                'generated_at': args.generated_at,
                'generation_commit': args.generation_commit,
                'validation_commit': args.validation_commit,
                'source_references': refs,
            }
            stamped_count += 1
        else:
            # Lightweight stub for placeholder assets
            if 'provenance' not in asset:
                asset['provenance'] = {
                    'kg_version': kg_version,
                    'kg_commit': args.kg_commit,
                    'asset_schema_version': ASSET_SCHEMA_VERSION,
                    'status': 'pending-authoring',
                    'source_references': refs,
                }
                stub_count += 1

    # Update file-level build_date
    assets_file['build_date'] = datetime.utcnow().strftime('%Y-%m-%d')

    with open(args.assets_path, 'w') as f:
        json.dump(assets_file, f, indent=2, ensure_ascii=False)

    print(f'Provenance stamped: {stamped_count} draft assets, {stub_count} placeholder stubs added')
    print(f'Domain: {args.domain_prefix}')


if __name__ == '__main__':
    main()
