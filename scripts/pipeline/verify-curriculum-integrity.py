#!/usr/bin/env python3
"""
Curriculum Pipeline — Integrity Verifier
=========================================
Verifies that no generated curriculum file has been modified unexpectedly
by recomputing SHA-256 checksums and comparing against the stored manifests.

Reads every domain manifest in docs/mathematics/domains/*-manifest.json,
recomputes the checksums for each chapter file and asset slice, and reports
any mismatch. Also verifies the KG file checksum from MATHEMATICS_MANIFEST.json.

Usage:
  python3 verify-curriculum-integrity.py \\
    <repoRoot> \\
    [--subject mathematics] \\
    [--verbose]

Exit code:
  0 = all checksums match (INTEGRITY_PASS)
  1 = one or more mismatches detected (INTEGRITY_FAIL)
  2 = no manifests found (INTEGRITY_UNKNOWN)
"""

import argparse
import hashlib
import json
import os
import sys


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


def verify_subject(repo_root, subject, verbose):
    subject_dir = os.path.join(repo_root, 'docs', subject.replace('_', '-'))
    domains_dir = os.path.join(subject_dir, 'domains')
    graph_path = os.path.join(subject_dir, 'kg', 'graph.json')
    assets_path = os.path.join(subject_dir, 'teaching-assets', 'assets.json')
    subject_manifest_path = os.path.join(subject_dir, f'{subject.upper()}_MANIFEST.json')
    # Alternate naming
    if not os.path.exists(subject_manifest_path):
        subject_manifest_path = os.path.join(subject_dir, 'MATHEMATICS_MANIFEST.json')

    if not os.path.exists(domains_dir):
        print(f'  No domains directory found at {domains_dir} — skipping {subject}')
        return 0, 0, 0  # passes, fails, skips

    passes = 0
    fails = 0
    skips = 0

    # Load KG and assets for domain-slice checksums
    graph = None
    assets_file = None
    try:
        if os.path.exists(graph_path):
            with open(graph_path) as f:
                graph = json.load(f)
        if os.path.exists(assets_path):
            with open(assets_path) as f:
                assets_file = json.load(f)
    except Exception as e:
        print(f'  ERROR loading {subject} data files: {e}', file=sys.stderr)
        return 0, 1, 0

    # Read all domain manifests
    manifest_files = sorted(f for f in os.listdir(domains_dir) if f.endswith('-manifest.json'))
    if not manifest_files:
        print(f'  No domain manifests in {domains_dir}')
        return 0, 0, 1

    for mf in manifest_files:
        mf_path = os.path.join(domains_dir, mf)
        try:
            with open(mf_path) as f:
                dm = json.load(f)
        except Exception as e:
            print(f'  ERROR reading {mf}: {e}')
            fails += 1
            continue

        domain_prefix = dm.get('domain_prefix', '')
        stored = dm.get('checksums', {})

        # Verify chapter
        chapter_path = dm.get('generated_files', [None])[0]
        if chapter_path and os.path.exists(chapter_path):
            actual_chapter = sha256_file(chapter_path)
            stored_chapter = stored.get('chapter_sha256')
            if actual_chapter == stored_chapter:
                if verbose:
                    print(f'  ✓ {domain_prefix} chapter checksum OK')
                passes += 1
            else:
                print(f'  ✗ MISMATCH: {domain_prefix} chapter')
                print(f'    stored:  {stored_chapter}')
                print(f'    actual:  {actual_chapter}')
                fails += 1
        else:
            if verbose:
                print(f'  ⚠ {domain_prefix}: chapter file not found, skipping')
            skips += 1

        # Verify domain asset slice
        if assets_file and domain_prefix:
            domain_assets = sorted(
                [a for a in assets_file['assets'] if a['concept_id'].startswith(domain_prefix + '.')],
                key=lambda a: a['concept_id']
            )
            actual_assets = sha256_json_stable(domain_assets)
            stored_assets = stored.get('domain_assets_sha256')
            if actual_assets == stored_assets:
                if verbose:
                    print(f'  ✓ {domain_prefix} assets checksum OK')
                passes += 1
            else:
                print(f'  ✗ MISMATCH: {domain_prefix} domain assets')
                print(f'    stored:  {stored_assets}')
                print(f'    actual:  {actual_assets}')
                fails += 1

        # Verify graph domain slice
        if graph and domain_prefix:
            domain_concepts = sorted(
                [c for c in graph['concepts'] if c['id'].startswith(domain_prefix + '.')],
                key=lambda c: c['id']
            )
            actual_graph = sha256_json_stable(domain_concepts)
            stored_graph = stored.get('graph_domain_sha256')
            if actual_graph == stored_graph:
                if verbose:
                    print(f'  ✓ {domain_prefix} KG domain checksum OK')
                passes += 1
            else:
                print(f'  ✗ MISMATCH: {domain_prefix} KG domain slice — graph.json may have changed')
                print(f'    stored:  {stored_graph}')
                print(f'    actual:  {actual_graph}')
                fails += 1

    # Verify KG file checksum from subject manifest
    if os.path.exists(subject_manifest_path):
        with open(subject_manifest_path) as f:
            sm = json.load(f)
        stored_kg = sm.get('checksums', {}).get('kg_sha256')
        actual_kg = sha256_file(graph_path)
        if stored_kg and actual_kg == stored_kg:
            if verbose:
                print(f'  ✓ {subject} KG file checksum OK')
            passes += 1
        elif stored_kg:
            print(f'  ✗ MISMATCH: {subject} KG file — graph.json modified outside pipeline')
            print(f'    stored:  {stored_kg}')
            print(f'    actual:  {actual_kg}')
            fails += 1

    return passes, fails, skips


def main():
    parser = argparse.ArgumentParser(description='Verify curriculum integrity via stored checksums')
    parser.add_argument('repo_root', help='Path to repository root')
    parser.add_argument('--subject', default='mathematics', help='Subject to verify (default: mathematics)')
    parser.add_argument('--all-subjects', action='store_true', help='Verify all known subjects')
    parser.add_argument('--verbose', action='store_true', help='Print passing checks too')
    args = parser.parse_args()

    subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'computer_science'] if args.all_subjects else [args.subject]

    total_passes = 0
    total_fails = 0
    total_skips = 0

    for subject in subjects:
        print(f'\nVerifying {subject}...')
        p, f, s = verify_subject(args.repo_root, subject, args.verbose)
        total_passes += p
        total_fails += f
        total_skips += s
        if f == 0:
            print(f'  {subject}: INTEGRITY_PASS ({p} checks passed, {s} skipped)')
        else:
            print(f'  {subject}: INTEGRITY_FAIL ({f} mismatches, {p} passed, {s} skipped)')

    print()
    if total_fails == 0 and total_passes == 0 and total_skips > 0:
        print('INTEGRITY_UNKNOWN — no manifests found to verify against')
        sys.exit(2)
    elif total_fails == 0:
        print(f'INTEGRITY_PASS — {total_passes} checksums verified, {total_skips} skipped')
        sys.exit(0)
    else:
        print(f'INTEGRITY_FAIL — {total_fails} mismatch(es) detected, {total_passes} passed')
        print('Run the pipeline to regenerate manifests if changes were intentional.')
        sys.exit(1)


if __name__ == '__main__':
    main()
