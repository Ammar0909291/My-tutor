#!/usr/bin/env python3
"""
Curriculum Pipeline — Domain Completion Checker
================================================
Exits 0 if the domain is already complete (all assets drafted + chapter exists).
Exits 1 if the domain needs work.

Usage:
  python3 check-domain-complete.py <domainPrefix> <assetsJsonPath> <chaptersDir>
"""

import json
import os
import sys


def main():
    if len(sys.argv) != 4:
        print('Usage: python3 check-domain-complete.py <domainPrefix> <assetsJsonPath> <chaptersDir>')
        sys.exit(1)

    domain_prefix, assets_path, chapters_dir = sys.argv[1:]

    with open(assets_path) as f:
        assets_file = json.load(f)

    domain_assets = [a for a in assets_file['assets'] if a['concept_id'].startswith(domain_prefix + '.')]
    if not domain_assets:
        print(f'INCOMPLETE: no assets found for prefix {domain_prefix}')
        sys.exit(1)

    all_drafted = all(a.get('status') == 'draft' for a in domain_assets)
    if not all_drafted:
        placeholder_count = sum(1 for a in domain_assets if a.get('status') != 'draft')
        print(f'INCOMPLETE: {placeholder_count}/{len(domain_assets)} assets still placeholder')
        sys.exit(1)

    # Check chapter file — prefix after last "." is the chapter filename stem
    stem = domain_prefix.split('.')[-1]
    chapter_path = os.path.join(chapters_dir, f'{stem}.md')
    if not os.path.exists(chapter_path):
        print(f'INCOMPLETE: chapter file missing: {chapter_path}')
        sys.exit(1)

    print(f'COMPLETE: {domain_prefix} — {len(domain_assets)} assets all drafted, chapter exists at {chapter_path}')
    sys.exit(0)


if __name__ == '__main__':
    main()
