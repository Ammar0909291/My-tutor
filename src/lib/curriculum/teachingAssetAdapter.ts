/**
 * Generic Teaching Asset adapter — platform infrastructure, not subject-specific code.
 *
 * createTeachingAssetAdapter(subject) bridges any
 * docs/{subject}/teaching-assets/assets.json to the TeachingAsset[] shape
 * defined in teachingAssetSchema.ts. Mirrors subjectKgAdapter.ts's
 * lazy-load / process-lifetime-cache pattern exactly, but for the independent
 * "HOW to teach" layer rather than the Knowledge Graph itself.
 *
 * Adding a new subject's teaching assets:
 *   1. Add docs/{subject}/teaching-assets/assets.json
 *   2. Add one entry to TEACHING_ASSET_ADAPTERS in teachingAssets.ts
 *   No new adapter code is required.
 */

import fs from 'fs'
import path from 'path'
import type { TeachingAsset } from './teachingAssetSchema'

export interface TeachingAssetAdapter {
  /** All teaching assets for this subject. */
  getAssets(): TeachingAsset[]
  /** Single asset by the concept ID it teaches, or undefined. */
  getAssetForConcept(conceptId: string): TeachingAsset | undefined
}

/**
 * @param subject  The subject directory name under docs/ — e.g. "mathematics",
 *                 "biology". Assets are loaded from
 *                 docs/{subject}/teaching-assets/assets.json on first access.
 *                 Returns an empty list (not a throw) if the file doesn't
 *                 exist yet, so subjects can adopt the asset layer incrementally.
 */
export function createTeachingAssetAdapter(subject: string): TeachingAssetAdapter {
  let cache: TeachingAsset[] | null = null

  function getAll(): TeachingAsset[] {
    if (cache) return cache
    const filePath = path.join(process.cwd(), `docs/${subject}/teaching-assets/assets.json`)
    if (!fs.existsSync(filePath)) {
      cache = []
      return cache
    }
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as { assets: TeachingAsset[] }
    cache = raw.assets
    return cache
  }

  return {
    getAssets(): TeachingAsset[] {
      return getAll()
    },
    getAssetForConcept(conceptId: string): TeachingAsset | undefined {
      return getAll().find(a => a.concept_id === conceptId)
    },
  }
}
