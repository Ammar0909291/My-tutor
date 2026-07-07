import type { BoardSubjectCatalog, Chapter } from './educationTypes'
import { CBSE_SCIENCE_CATALOG } from './cbseScienceCatalog'
import { CBSE_SOCIAL_SCIENCE_CATALOG } from './cbseSocialScienceCatalog'
import { UP_SCIENCE_CATALOG } from './upScienceCatalog'
import { UP_SOCIAL_SCIENCE_CATALOG } from './upSocialScienceCatalog'

/**
 * Grade 11–12 Stream Separation (Sprint DC — Option B from Sprint DA/DB).
 *
 * Converts the bundled senior-secondary "Science" and "Social Science"
 * catalogs into seven first-class standalone subjects WITHOUT duplicating,
 * renaming, or mutating any chapter. Each stream catalog is *derived* by
 * slicing the existing grade 11–12 chapter arrays on the chapter-ID suffix
 * that already encodes the stream:
 *
 *   .phy → Physics    .chem → Chemistry   .bio → Biology
 *   .hist → History   .geo → Geography    .pol → Political Science
 *   .eco → Economics
 *
 * Chapter `id`, `order`, `title`, and `kgNodeIds` are preserved byte-for-byte
 * (same object references), so all chapter-keyed progress, assessment, mock,
 * and revision history remains valid — no migration, no content authoring.
 *
 * Verified by Sprint DB: 364/364 chapters map deterministically to exactly
 * one stream with zero orphans and zero contamination.
 *
 * NOTE (Sprint DB): UP Board Grade 12 Economics has no chapters (catalog gap).
 * The derived UP Economics catalog therefore omits Grade 12 entirely and
 * exposes only Grade 11 — the subject still renders; the empty grade is simply
 * absent rather than shown as a broken/empty list. Backfill tracked separately.
 */

// Suffix → canonical stream subject slug + display name.
type StreamSpec = { slug: string; name: string; suffixes: RegExp }

const STREAM_SPECS: StreamSpec[] = [
  { slug: 'physics',           name: 'Physics',           suffixes: /\.phy\d/ },
  { slug: 'chemistry',         name: 'Chemistry',         suffixes: /\.chem\d/ },
  { slug: 'biology',           name: 'Biology',           suffixes: /\.bio\d/ },
  { slug: 'history',           name: 'History',           suffixes: /\.hist\d/ },
  { slug: 'geography',         name: 'Geography',         suffixes: /\.geo\d/ },
  { slug: 'political_science', name: 'Political Science', suffixes: /\.(pol|civ)\d/ },
  { slug: 'economics',         name: 'Economics',         suffixes: /\.eco\d/ },
]

const STREAM_GRADES = [11, 12]

/**
 * Build a derived stream catalog by slicing a source (Science/SST) catalog's
 * grade 11–12 chapters on the ID-suffix pattern. Grades with no matching
 * chapters are omitted so the subject never exposes an empty grade.
 */
function deriveStreamCatalog(
  source: BoardSubjectCatalog,
  spec: StreamSpec,
): BoardSubjectCatalog {
  const grades = STREAM_GRADES
    .map((grade) => {
      const sourceGrade = source.grades.find((g) => g.grade === grade)
      const chapters: Chapter[] = sourceGrade
        ? sourceGrade.chapters.filter((ch) => spec.suffixes.test(ch.id))
        : []
      return { grade, chapters }
    })
    .filter((g) => g.chapters.length > 0) // omit empty grades (e.g. UP G12 Economics)

  return {
    boardId: source.boardId,
    subjectSlug: spec.slug,
    subjectName: spec.name,
    grades,
  }
}

/**
 * Return a copy of a source catalog containing only grades 5–10 — the
 * senior-secondary grades now live in the standalone stream catalogs.
 * The original imported catalog object is left untouched.
 */
function trimToLowerGrades(source: BoardSubjectCatalog): BoardSubjectCatalog {
  return {
    ...source,
    grades: source.grades.filter((g) => g.grade <= 10),
  }
}

// ── Science streams ─────────────────────────────────────────────────────────
const SCIENCE_STREAMS = STREAM_SPECS.slice(0, 3)   // physics, chemistry, biology
const SST_STREAMS = STREAM_SPECS.slice(3)          // history, geography, political_science, economics

export const CBSE_PHYSICS_CATALOG   = deriveStreamCatalog(CBSE_SCIENCE_CATALOG, SCIENCE_STREAMS[0])
export const CBSE_CHEMISTRY_CATALOG = deriveStreamCatalog(CBSE_SCIENCE_CATALOG, SCIENCE_STREAMS[1])
export const CBSE_BIOLOGY_CATALOG   = deriveStreamCatalog(CBSE_SCIENCE_CATALOG, SCIENCE_STREAMS[2])
export const UP_PHYSICS_CATALOG     = deriveStreamCatalog(UP_SCIENCE_CATALOG, SCIENCE_STREAMS[0])
export const UP_CHEMISTRY_CATALOG   = deriveStreamCatalog(UP_SCIENCE_CATALOG, SCIENCE_STREAMS[1])
export const UP_BIOLOGY_CATALOG     = deriveStreamCatalog(UP_SCIENCE_CATALOG, SCIENCE_STREAMS[2])

// ── Social Science streams ──────────────────────────────────────────────────
export const CBSE_HISTORY_CATALOG           = deriveStreamCatalog(CBSE_SOCIAL_SCIENCE_CATALOG, SST_STREAMS[0])
export const CBSE_GEOGRAPHY_CATALOG         = deriveStreamCatalog(CBSE_SOCIAL_SCIENCE_CATALOG, SST_STREAMS[1])
export const CBSE_POLITICAL_SCIENCE_CATALOG = deriveStreamCatalog(CBSE_SOCIAL_SCIENCE_CATALOG, SST_STREAMS[2])
export const CBSE_ECONOMICS_CATALOG         = deriveStreamCatalog(CBSE_SOCIAL_SCIENCE_CATALOG, SST_STREAMS[3])
export const UP_HISTORY_CATALOG             = deriveStreamCatalog(UP_SOCIAL_SCIENCE_CATALOG, SST_STREAMS[0])
export const UP_GEOGRAPHY_CATALOG           = deriveStreamCatalog(UP_SOCIAL_SCIENCE_CATALOG, SST_STREAMS[1])
export const UP_POLITICAL_SCIENCE_CATALOG   = deriveStreamCatalog(UP_SOCIAL_SCIENCE_CATALOG, SST_STREAMS[2])
export const UP_ECONOMICS_CATALOG           = deriveStreamCatalog(UP_SOCIAL_SCIENCE_CATALOG, SST_STREAMS[3])

// ── Trimmed bundled catalogs (grades 5–10 only) ─────────────────────────────
// These replace the full Science/SST catalogs in BOARD_CATALOGS so senior
// secondary is owned exclusively by the stream subjects above.
export const CBSE_SCIENCE_CATALOG_5_10        = trimToLowerGrades(CBSE_SCIENCE_CATALOG)
export const CBSE_SOCIAL_SCIENCE_CATALOG_5_10 = trimToLowerGrades(CBSE_SOCIAL_SCIENCE_CATALOG)
export const UP_SCIENCE_CATALOG_5_10          = trimToLowerGrades(UP_SCIENCE_CATALOG)
export const UP_SOCIAL_SCIENCE_CATALOG_5_10   = trimToLowerGrades(UP_SOCIAL_SCIENCE_CATALOG)

/** All seven stream slugs, in canonical display order. */
export const STREAM_SUBJECT_SLUGS = STREAM_SPECS.map((s) => s.slug)

/** Stream catalogs grouped for board-catalog registration. */
export const CBSE_STREAM_CATALOGS: BoardSubjectCatalog[] = [
  CBSE_PHYSICS_CATALOG, CBSE_CHEMISTRY_CATALOG, CBSE_BIOLOGY_CATALOG,
  CBSE_HISTORY_CATALOG, CBSE_GEOGRAPHY_CATALOG, CBSE_POLITICAL_SCIENCE_CATALOG, CBSE_ECONOMICS_CATALOG,
]
export const UP_STREAM_CATALOGS: BoardSubjectCatalog[] = [
  UP_PHYSICS_CATALOG, UP_CHEMISTRY_CATALOG, UP_BIOLOGY_CATALOG,
  UP_HISTORY_CATALOG, UP_GEOGRAPHY_CATALOG, UP_POLITICAL_SCIENCE_CATALOG, UP_ECONOMICS_CATALOG,
]
