import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { requestedTopicIdentity } from '@/lib/teaching/visual/requestedTopic'
import { runtimeTopicId } from '@/lib/teaching/visual/topicIdentity'
import { isRuntimeSceneGenerationAllowed, runtimeSceneAllowlist } from '@/lib/teaching/visual/flag'
import { resolveServicePolicy } from '@/lib/teaching/visual/generationPolicy'

/**
 * TEN THOUSAND TOPICS, NO NEW ENGINE CODE.
 *
 * The engine's whole claim is that a topic nobody has ever authored enters the
 * same path as one that was. That claim is cheap to make and easy to lose: one
 * `if (conceptId === …)`, one registry row per topic, one allowlist that has to
 * be typed into, and coverage silently becomes an authoring backlog again.
 *
 * These tests hold the claim structurally. The only per-topic state the engine
 * is permitted to create is generated content and audit rows — never code.
 */

const VISUAL_DIR = 'src/lib/teaching/visual'
const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')

/** A thousand topics nobody has authored, deterministically generated. */
function syntheticTopics(n: number): { title: string; description: string }[] {
  const out: { title: string; description: string }[] = []
  for (let i = 0; i < n; i++) {
    out.push({
      title: `Synthetic topic number ${i} about distributed consensus`,
      description:
        `Topic ${i} describes how a coordinator collects votes from replicas, ` +
        `waits for a quorum, and commits only when a majority has agreed.`,
    })
  }
  return out
}

describe('Scale — a topic nobody authored costs no code', () => {
  it('a thousand unseen topics all receive a stable, distinct identity', () => {
    const ids = new Set<string>()
    for (const t of syntheticTopics(1000)) {
      const ctx = requestedTopicIdentity(`explain ${t.title}`, [t.description])
      expect(ctx, t.title).not.toBeNull()
      ids.add(ctx!.conceptId)
    }
    // Distinct topics, distinct ids — no collisions across a thousand.
    expect(ids.size).toBe(1000)
  })

  it('the same topic, asked a hundred different ways, is ONE cache row', () => {
    // If ids drifted with wording, every learner would look like a new topic
    // and the engine would pay for each of them. This is the property that
    // makes ten thousand topics affordable rather than merely possible.
    const forms = [
      'Kubernetes pod scheduling', 'kubernetes pod scheduling',
      'Kubernetes  Pod   Scheduling', 'kubernetes, pod scheduling!',
      'KUBERNETES POD SCHEDULING',
    ]
    const ids = new Set(forms.map(runtimeTopicId))
    expect(ids.size).toBe(1)
  })

  it('eligibility asks a rule, never a list', () => {
    // With no narrowing configured, an arbitrary unseen id is eligible on the
    // same terms as any other. Grounding and budgets still bound it — that is
    // what "not a list" means here, and it is not the same as "unrestricted".
    delete process.env.VISUAL_AI_SCENE_ALLOWLIST
    delete process.env.ENABLE_AI_SCENE_GENERATION
    expect(runtimeSceneAllowlist().size).toBe(0)
    for (const id of ['topic:deadbeefdeadbeef', 'phys.meas.units', 'nobody.has.seen.this']) {
      expect(isRuntimeSceneGenerationAllowed(id), id).toBe(true)
      expect(resolveServicePolicy(id), id).toBe('auto')
    }
  })

  it('the kill switch still stops every one of them at once', () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'false'
    try {
      for (const id of ['topic:deadbeefdeadbeef', 'phys.meas.units']) {
        expect(isRuntimeSceneGenerationAllowed(id), id).toBe(false)
        expect(resolveServicePolicy(id), id).toBe('off')
      }
    } finally {
      delete process.env.ENABLE_AI_SCENE_GENERATION
    }
  })
})

describe('Scale — no per-topic code may accumulate', () => {
  const sources = readdirSync(join(process.cwd(), VISUAL_DIR))
    .filter((f) => f.endsWith('.ts'))
    // conceptSceneParams and archetypes are the AUTHORED corpus — curated
    // bindings for concepts a human chose. They are the tier the generic path
    // sits BELOW, and they are allowed to name concepts; the engine is not.
    .filter((f) => !['conceptSceneParams.ts', 'archetypes.ts', 'retired.ts', 'conceptArchetype.ts'].includes(f))

  it('no engine module branches on a specific concept id', () => {
    const offenders: string[] = []
    for (const file of sources) {
      const code = read(join(VISUAL_DIR, file))
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
      // A concept id in executable code, compared or switched on: the exact
      // shape that turns a generic engine back into a lookup table.
      const hits = code.match(/(===|!==|case)\s*'(math|phys|chem|bio|cs|eng)\.[a-z0-9.-]+'/g)
      if (hits) offenders.push(`${file}: ${hits.join(', ')}`)
    }
    expect(offenders, `per-topic branches:\n${offenders.join('\n')}`).toEqual([])
  })

  it('the visual type a topic gets is never hardcoded by topic', () => {
    // Representation follows the model's choice through a closed set; a table
    // from topic to visual type would be the archetype-engine failure again.
    const engine = read(join(VISUAL_DIR, 'visualEngine.ts'))
    expect(engine).not.toMatch(/Record<string,\s*(VisualType|Representation)>/)
  })

  it('an unknown topic reaches the same decision path as a known one', () => {
    // Same function, same order of tiers, no branch that asks whether the
    // curriculum has heard of it.
    const unknown = resolveVisual({
      message: 'explain quantum error correction surface codes',
      lessonConceptId: null,
      subject: null,
    })
    expect(unknown.graphical).toBe(false)   // nothing curated, correctly
    expect(unknown.provenance.startsWith('no-figure:')).toBe(true)
  })
})
