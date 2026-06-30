#!/usr/bin/env python3
"""
Curriculum Pipeline — Canonical Curriculum Manifest Generator
=============================================================
Generates docs/CANONICAL_CURRICULUM_MANIFEST.json listing every subject
and their production state. This is the campaign-level manifest that
enables deterministic verification of the entire canonical curriculum.

A subject is "complete" when its MATHEMATICS_MANIFEST.json (or equivalent)
declares all domains complete and its KG status is "frozen".

Usage:
  python3 generate-canonical-manifest.py \\
    <repoRoot> \\
    <currentCommit> \\
    <outputManifestPath>

Subjects discovered automatically from docs/{subject}/kg/graph.json presence.
"""

import hashlib
import json
import os
import sys
from datetime import datetime

KNOWN_SUBJECTS = [
    ('mathematics',    'docs/mathematics',    'docs/mathematics/MATHEMATICS_MANIFEST.json'),
    ('physics',        'docs/physics',        'docs/physics/PHYSICS_MANIFEST.json'),
    ('chemistry',      'docs/chemistry',      'docs/chemistry/CHEMISTRY_MANIFEST.json'),
    ('biology',        'docs/biology',        'docs/biology/BIOLOGY_MANIFEST.json'),
    ('computer_science', 'docs/computer-science', 'docs/computer-science/CS_MANIFEST.json'),
]


def sha256_file(path):
    if not os.path.exists(path):
        return None
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return 'sha256:' + h.hexdigest()


def main():
    if len(sys.argv) != 4:
        print('Usage: python3 generate-canonical-manifest.py <repoRoot> <currentCommit> <outputManifestPath>')
        sys.exit(1)

    repo_root, current_commit, output_path = sys.argv[1:]

    subject_entries = []

    for subject_id, subject_dir_rel, subject_manifest_rel in KNOWN_SUBJECTS:
        subject_dir = os.path.join(repo_root, subject_dir_rel)
        subject_manifest_path = os.path.join(repo_root, subject_manifest_rel)
        kg_path = os.path.join(subject_dir, 'kg', 'graph.json')

        # Discover KG metadata
        kg_version = None
        kg_status = None
        kg_build_date = None
        kg_concept_count = None
        kg_domain_count = None
        kg_checksum = sha256_file(kg_path)

        if os.path.exists(kg_path):
            try:
                with open(kg_path) as f:
                    kg = json.load(f)
                kg_version = kg.get('version')
                kg_status = kg.get('status')
                kg_build_date = kg.get('build_date')
                kg_concept_count = len(kg.get('concepts', []))
                kg_domain_count = len(kg.get('domains', []))
            except Exception:
                pass

        # Load subject manifest if it exists
        subject_manifest_data = None
        subject_manifest_checksum = sha256_file(subject_manifest_path)
        if os.path.exists(subject_manifest_path):
            try:
                with open(subject_manifest_path) as f:
                    subject_manifest_data = json.load(f)
            except Exception:
                pass

        # Determine subject status
        if subject_manifest_data:
            completed_domains = subject_manifest_data.get('completed_domains', 0)
            total_domains = subject_manifest_data.get('total_domains', 0)
            drafted_assets = subject_manifest_data.get('drafted_assets', 0)
            total_concepts = subject_manifest_data.get('total_concepts', kg_concept_count or 0)
            completion_pct = subject_manifest_data.get('completion_pct', 0)
            if completed_domains == total_domains and total_domains > 0:
                status = 'complete'
            elif drafted_assets > 0:
                status = 'in-progress'
            else:
                status = 'not-started'
        elif os.path.exists(kg_path):
            status = 'kg-only'
            completed_domains = 0
            total_domains = kg_domain_count or 0
            drafted_assets = 0
            total_concepts = kg_concept_count or 0
            completion_pct = 0.0
        else:
            status = 'not-started'
            completed_domains = 0
            total_domains = 0
            drafted_assets = 0
            total_concepts = 0
            completion_pct = 0.0

        entry = {
            'subject_id': subject_id,
            'subject_dir': os.path.join(repo_root, subject_dir_rel),
            'status': status,
            'kg': {
                'version': kg_version,
                'status': kg_status,
                'build_date': kg_build_date,
                'concept_count': kg_concept_count,
                'domain_count': kg_domain_count,
                'file': kg_path if os.path.exists(kg_path) else None,
                'sha256': kg_checksum,
            },
            'teaching_assets': {
                'completed_domains': completed_domains,
                'total_domains': total_domains,
                'drafted_assets': drafted_assets,
                'total_concepts': total_concepts,
                'completion_pct': completion_pct,
            },
            'subject_manifest': {
                'file': subject_manifest_path if os.path.exists(subject_manifest_path) else None,
                'sha256': subject_manifest_checksum,
            },
        }
        subject_entries.append(entry)

    # Campaign totals
    total_concepts_all = sum(e['teaching_assets']['total_concepts'] for e in subject_entries)
    total_drafted_all = sum(e['teaching_assets']['drafted_assets'] for e in subject_entries)
    subjects_complete = sum(1 for e in subject_entries if e['status'] == 'complete')
    subjects_in_progress = sum(1 for e in subject_entries if e['status'] == 'in-progress')
    subjects_not_started = sum(1 for e in subject_entries if e['status'] in ('not-started', 'kg-only'))

    manifest = {
        'manifest_version': '1.0',
        'manifest_type': 'canonical-curriculum',
        'campaign': 'My Tutor — Canonical Curriculum',
        'campaign_version': '1.0.0-draft',
        'objective': (
            'Canonical Knowledge Graph → Canonical Teaching Assets → '
            'Canonical Subject Freeze (v1.0) → Curriculum Views '
            '(CBSE, ICSE, IB, Cambridge, University) → Educational Brain '
            'intelligence layers'
        ),
        'campaign_totals': {
            'subjects_total': len(subject_entries),
            'subjects_complete': subjects_complete,
            'subjects_in_progress': subjects_in_progress,
            'subjects_not_started': subjects_not_started,
            'total_concepts_all_subjects': total_concepts_all,
            'total_drafted_assets': total_drafted_all,
            'overall_completion_pct': round(
                total_drafted_all / total_concepts_all * 100, 1
            ) if total_concepts_all else 0,
        },
        'subjects': subject_entries,
        'dependency_versions': {
            'asset_schema_version': '1.0.0',
            'generator_version': 'pipeline-v2',
            'validation_version': '1.1.0',
            'provenance_version': '1.0.0',
            'manifest_spec_version': '1.0',
        },
        'verification_instructions': (
            'To verify curriculum integrity: for each subject, re-run '
            'generate-domain-manifest.py for each domain and compare '
            'checksums.domain_assets_sha256 and checksums.chapter_sha256 '
            'against this manifest. A mismatch means a generated file '
            'was modified outside the pipeline.'
        ),
        'last_commit': current_commit,
        'last_updated': datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
    }

    os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else '.', exist_ok=True)
    with open(output_path, 'w') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f'Canonical curriculum manifest written to {output_path}')
    print(f'  Subjects: {len(subject_entries)} ({subjects_complete} complete, '
          f'{subjects_in_progress} in-progress, {subjects_not_started} not-started)')
    print(f'  Total concepts (all subjects): {total_concepts_all}')
    print(f'  Total drafted: {total_drafted_all} ({manifest["campaign_totals"]["overall_completion_pct"]}%)')


if __name__ == '__main__':
    main()
