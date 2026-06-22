/**
 * Part 2 FEASIBILITY PROBE — throwaway, disposable. NOT the production generator.
 *
 * Question this answers: can an LLM (Groq, same provider used elsewhere in this
 * codebase) reliably generate a CORRECT SceneSpec from real tutor explanation text?
 * Nothing here is wired into production. No renderer, no Part 1/1.5 integration.
 *
 * IMPORTANT — sandbox limitation: this script needs a live GROQ_API_KEY and outbound
 * network to api.groq.com. In the dev sandbox this was built in, that host is blocked
 * (confirmed 403) and .env has a placeholder key, so it could NOT be run there. Run it
 * locally with a real key and paste the output back — see scripts/test-visualization-
 * tiebreaker.ts for the same constraint on Part 1.5.
 *
 * Input honesty note: this codebase has NO static bank of full tutor-explanation
 * paragraphs — explanations are generated live by the AI per chat session, never
 * stored as curriculum content (confirmed by reading client.ts/route.ts earlier this
 * session). The 4 cases below are realistic explanations matching this codebase's
 * own proven keyword targets (detectVisual.ts's three_projectile_motion,
 * geometry_shape, three_bond_formation rules), plus ONE genuinely real,
 * hand-authored narration pulled verbatim from sceneSpecExamples.ts.
 *
 * Run:  npx tsx scripts/probe-scenespec-generation.ts
 */

import { generateJSON } from '../src/lib/ai/client'
import type { SceneSpec } from '../src/lib/teaching/sceneSpec'

type Case = { id: string; source: 'real (sceneSpecExamples.ts)' | 'realistic (matches detectVisual.ts targets)'; text: string }

const CASES: Case[] = [
  {
    id: 'vector-magnitude (REAL — verbatim narration from sceneSpecExamples.ts)',
    source: 'real (sceneSpecExamples.ts)',
    text: 'Start at the origin — the point every vector is measured from. Draw the vector v as an arrow from the origin to its tip at (2.5, 1.8, 1.2). The magnitude is the length of that arrow, about 3.31. Break the vector into its x, y, and z directional components. Together the components and magnitude fully describe the vector.',
  },
  {
    id: 'projectile-motion (easy physics)',
    source: 'realistic (matches detectVisual.ts targets)',
    text: 'When you throw a ball at a 45-degree angle with an initial speed of 10 meters per second, it follows a parabolic trajectory. It starts at the origin, rises to a peak height, then falls back to the ground. The horizontal velocity stays constant the whole time, while gravity continuously slows the vertical velocity until it reverses.',
  },
  {
    id: 'triangle-angle-sum (easy geometry)',
    source: 'realistic (matches detectVisual.ts targets)',
    text: 'Consider a triangle with vertices at A, B, and C. The three interior angles of any triangle always add up to 180 degrees. If angle A is 60 degrees and angle B is 70 degrees, then angle C must be 50 degrees, since 60 plus 70 plus 50 equals 180.',
  },
  {
    id: 'covalent-bond (easy chemistry)',
    source: 'realistic (matches detectVisual.ts targets)',
    text: 'A covalent bond forms when two atoms share a pair of electrons. Take a water molecule: the oxygen atom shares one electron pair with each of two hydrogen atoms, forming two single covalent bonds. The shared electrons sit between the two nuclei, holding the atoms together.',
  },
]

const SCHEMA_DESCRIPTION = `
Generate a SceneSpec conforming EXACTLY to this TypeScript shape:

type Vec3 = [number, number, number]
type SceneObjectType = 'point'|'particle'|'node'|'vector'|'arrow'|'bond'|'label'|'path'|'trajectory'|'bar'|'surface'
interface SceneObject {
  type: SceneObjectType
  id?: string
  position?: Vec3       // point/node/particle/label/bar
  from?: Vec3            // vector/arrow/bond
  to?: Vec3               // vector/arrow/bond
  points?: Vec3[]        // path/trajectory
  text?: string           // label text or caption
  color?: string          // CSS color
  radius?: number
  thickness?: number
  size?: number
}
interface SceneStep {
  narration?: string
  objects: SceneObject[]
}
type SceneType = 'diagram'|'simulation'|'process'|'comparison'|'plot'
interface SceneSpec {
  id: string
  title: string
  sceneType: SceneType
  teachingGoal?: string
  cameraDistance?: number
  ariaLabel?: string
  steps: SceneStep[]
}

Rules: 3-6 steps, each step's narration matches one beat of the explanation, all
positions/vectors must be numerically sane (small, plausible coordinates, not huge
or zero everywhere). Output ONLY the SceneSpec JSON object, no other fields.`

function buildPrompt(text: string): string {
  return `You are generating a 3D teaching visualization scene from a tutor's spoken explanation.

Explanation text:
"${text}"

${SCHEMA_DESCRIPTION}`
}

async function main() {
  console.log('\n=== Part 2 feasibility probe — SceneSpec generation ===\n')
  for (const c of CASES) {
    console.log(`\n############################################`)
    console.log(`CASE: ${c.id}`)
    console.log(`SOURCE: ${c.source}`)
    console.log(`INPUT TEXT:\n  ${c.text}\n`)

    const raw = await generateJSON(buildPrompt(c.text), 1200)

    if (!raw) {
      console.log('RESULT: generateJSON returned null (AI call failed or budget exhausted).')
      continue
    }

    console.log('RAW OUTPUT:')
    console.log(JSON.stringify(raw, null, 2))

    // Cheap structural validation (NOT semantic — just shape).
    const spec = raw as Partial<SceneSpec>
    const structOk = !!spec.id && !!spec.title && !!spec.sceneType && Array.isArray(spec.steps) && spec.steps.length > 0
    console.log(`\nSTRUCTURAL VALID: ${structOk}`)
    console.log('SEMANTIC ASSESSMENT: <<< FILL IN BY HAND AFTER READING THE RAW OUTPUT ABOVE >>>')
  }
  console.log('\n=== Probe complete. Paste this full output back for the honest semantic read. ===\n')
}

main()
