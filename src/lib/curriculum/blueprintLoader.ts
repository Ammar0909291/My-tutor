/**
 * Blueprint Loader — Phase 1C.
 *
 * Resolves a canonical concept ID (e.g. "phys.meas.units") to its
 * Teaching Blueprint file (docs/curriculum/blueprints/{id}.md), loads it,
 * and extracts the lightweight structural metadata from the blueprint header
 * and Section 0 Concept Profile.
 *
 * What this module intentionally does NOT parse or expose:
 *   • Explanation Library        (Section 4)
 *   • Misconception Library      (Section 5)
 *   • Analogy Library            (Section 6)
 *   • Demonstration Library      (Section 7)
 *   • Assessment items           (Section 9)
 *   • Voice Teaching scripts     (Section 11)
 *   • Teaching Actions           (Section 12)
 *   • Any other educational content
 *
 * Only structural/identity metadata is returned. Content injection into
 * LLM prompts is a later phase (Phase 1D+).
 *
 * Caching: parsed Blueprint objects are stored in a module-level Map keyed
 * by conceptId so that repeated calls within the same server process pay the
 * file-read cost at most once. The cache is intentionally unbounded (total
 * blueprint corpus is small — ~200 concepts for any single subject).
 */

import fs from 'fs'
import path from 'path'

// ── Public types ──────────────────────────────────────────────────────────────

/** Structural metadata only — no educational content. */
export interface Blueprint {
  /** Canonical concept identifier, e.g. "phys.meas.units". */
  conceptId: string
  /** Human-readable concept name from blueprint header. */
  name: string
  /** Blueprint package status from header — typically "PACKAGE_READY". */
  status: string
  /** Authoring date string from header, e.g. "2026-07-11". */
  date: string
  /** Framework version string, e.g. "Educational Brain v1.0". */
  frameworkVersion: string
  /** Difficulty label from Section 0 Concept Profile, e.g. "foundational". */
  difficulty: string
  /** Bloom level from Section 0 Concept Profile, e.g. "remember". */
  bloom: string
  /** Mastery threshold from Section 0 (0–1 float), e.g. 0.70. */
  masteryThreshold: number
  /** Estimated teaching hours from Section 0. */
  estimatedHours: number
  /** Session cap string from Section 0, e.g. "7 TAs". May be null if absent. */
  sessionCap: string | null
  /** Absolute path to the blueprint file on disk. */
  filePath: string
}

export type BlueprintResult =
  | { found: true; blueprint: Blueprint }
  | { found: false; reason: string }

// ── Internal cache ────────────────────────────────────────────────────────────

const cache = new Map<string, Blueprint>()

// ── Path resolution ───────────────────────────────────────────────────────────

/** Maps a conceptId to the expected blueprint file path. */
export function blueprintFilePath(conceptId: string): string {
  return path.join(process.cwd(), 'docs', 'curriculum', 'blueprints', `${conceptId}.md`)
}

// ── Metadata extractors ───────────────────────────────────────────────────────

function extractHeader(content: string): {
  name: string; status: string; date: string; frameworkVersion: string
} {
  const name = /^# Teaching Blueprint:\s*(.+)$/m.exec(content)?.[1]?.trim() ?? ''
  const status = /\*\*Status:\*\*\s*(.+)$/m.exec(content)?.[1]?.trim() ?? ''
  const date = /\*\*Date:\*\*\s*(.+)$/m.exec(content)?.[1]?.trim() ?? ''
  const frameworkVersion = /\*\*Framework Version:\*\*\s*(.+)$/m.exec(content)?.[1]?.trim() ?? ''
  return { name, status, date, frameworkVersion }
}

function extractConceptProfile(content: string): {
  difficulty: string; bloom: string; masteryThreshold: number
  estimatedHours: number; sessionCap: string | null
} {
  // Section 0 is a fenced code block containing key: value lines.
  const profileBlock = /## 0\. Concept Profile[\s\S]*?```([\s\S]*?)```/.exec(content)?.[1] ?? ''

  const field = (key: string): string =>
    new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(profileBlock)?.[1]?.trim() ?? ''

  const difficultyRaw = field('difficulty')
  // Strip parenthetical numeric suffix: "foundational (1)" → "foundational"
  const difficulty = difficultyRaw.replace(/\s*\(\d+\)$/, '').trim()

  const bloom = field('bloom')
  const masteryThreshold = parseFloat(field('mastery_threshold')) || 0
  const estimatedHours = parseFloat(field('estimated_hours')) || 0
  const sessionCapRaw = field('session_cap').trim()
  const sessionCap = sessionCapRaw || null

  return { difficulty, bloom, masteryThreshold, estimatedHours, sessionCap }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Loads and returns the Blueprint for the given conceptId.
 *
 * Returns `{ found: false }` when the blueprint file does not exist (the
 * concept may be authored in the KG but not yet have a blueprint) or when
 * parsing fails. Never throws — all errors are surfaced via `found: false`.
 */
export function loadBlueprint(conceptId: string): BlueprintResult {
  if (cache.has(conceptId)) {
    return { found: true, blueprint: cache.get(conceptId)! }
  }

  const filePath = blueprintFilePath(conceptId)

  if (!fs.existsSync(filePath)) {
    return { found: false, reason: `No blueprint file for concept "${conceptId}" at ${filePath}` }
  }

  let content: string
  try {
    content = fs.readFileSync(filePath, 'utf-8')
  } catch (err) {
    return { found: false, reason: `Failed to read blueprint: ${String(err)}` }
  }

  try {
    const header = extractHeader(content)
    const profile = extractConceptProfile(content)

    const blueprint: Blueprint = {
      conceptId,
      filePath,
      ...header,
      ...profile,
    }

    cache.set(conceptId, blueprint)
    return { found: true, blueprint }
  } catch (err) {
    return { found: false, reason: `Failed to parse blueprint metadata: ${String(err)}` }
  }
}

/**
 * Returns the cached Blueprint for `conceptId`, or null if it has not been
 * loaded yet. Useful for code that only needs a reference when already loaded.
 */
export function getCachedBlueprint(conceptId: string): Blueprint | null {
  return cache.get(conceptId) ?? null
}

/**
 * Clears the in-process cache. Intended for tests only.
 */
export function clearBlueprintCache(): void {
  cache.clear()
}
