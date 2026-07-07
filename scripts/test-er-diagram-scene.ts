/**
 * Test harness for the deterministic entity-relationship (ER) diagram scene
 * generator (src/lib/teaching/sceneGenerators/erDiagram.ts). Pure layout
 * math — no Groq.
 *
 * Verifies by independent recomputation: every entity's position/attributes
 * and every relationship's endpoints/cardinality label match the re-derived
 * layout — across a 2-entity, a 3-entity-with-relationships, and a
 * relationship-free schema. Also confirms the scene-router keyword routing.
 *
 * extractERDiagramParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-er-diagram-scene.ts
 */

import {
  buildERDiagramScene,
  checkERDiagramConsistency,
  validateERDiagramParams,
  type ERDiagramParams,
} from '../src/lib/teaching/sceneGenerators/erDiagram'
import { routeSceneGenerator } from '../src/lib/teaching/sceneGenerators/sceneRouter'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== er-diagram deterministic scene harness ===\n')

// ── 2-entity schema with a one-to-many relationship ───────────────────────────
const studentCourse: ERDiagramParams = {
  entities: [
    { name: 'Student', attributes: ['student_id', 'name'] },
    { name: 'Enrollment', attributes: ['enrollment_id', 'student_id', 'course_id'] },
  ],
  relationships: [{ from: 'Student', to: 'Enrollment', cardinality: 'one-to-many' }],
}
const specStudentCourse = buildERDiagramScene(studentCourse)

check('2-entity — structurally valid SceneSpec', validateSceneSpec(specStudentCourse).valid, JSON.stringify(validateSceneSpec(specStudentCourse).errors))
check('2-entity — passes independent consistency check', checkERDiagramConsistency(specStudentCourse, studentCourse).ok,
  checkERDiagramConsistency(specStudentCourse, studentCourse).errors.join('; '))
check('2-entity — has 2 steps (entities + relationships)', specStudentCourse.steps.length === 2)
check('2-entity — relationship label reads 1:N', (() => {
  const obj = specStudentCourse.steps.flatMap((s) => s.objects).find((o) => o.id === 'rel-label-0')
  return obj?.text === '1:N'
})())
check('2-entity — entity-0 carries the Student name', (() => {
  const obj = specStudentCourse.steps.flatMap((s) => s.objects).find((o) => o.id === 'entity-0')
  return obj?.text === 'Student'
})())

// ── 3-entity schema with two relationships of different cardinalities ────────
const blogSchema: ERDiagramParams = {
  entities: [
    { name: 'Author', attributes: ['author_id', 'name'] },
    { name: 'Post', attributes: ['post_id', 'title'] },
    { name: 'Tag', attributes: ['tag_id', 'label'] },
  ],
  relationships: [
    { from: 'Author', to: 'Post', cardinality: 'one-to-many' },
    { from: 'Post', to: 'Tag', cardinality: 'many-to-many' },
  ],
}
const specBlog = buildERDiagramScene(blogSchema)
check('3-entity — passes independent consistency check', checkERDiagramConsistency(specBlog, blogSchema).ok,
  checkERDiagramConsistency(specBlog, blogSchema).errors.join('; '))
check('3-entity — second relationship label reads N:N', (() => {
  const obj = specBlog.steps.flatMap((s) => s.objects).find((o) => o.id === 'rel-label-1')
  return obj?.text === 'N:N'
})())
check('3-entity — Post attributes are listed under entity-1', (() => {
  const objs = specBlog.steps.flatMap((s) => s.objects)
  return objs.find((o) => o.id === 'attr-1-0')?.text === 'post_id' && objs.find((o) => o.id === 'attr-1-1')?.text === 'title'
})())

// ── Relationship-free schema (entities only) ──────────────────────────────────
const standaloneSchema: ERDiagramParams = {
  entities: [
    { name: 'Product', attributes: ['sku', 'price'] },
    { name: 'Warehouse', attributes: ['warehouse_id'] },
  ],
  relationships: [],
}
const specStandalone = buildERDiagramScene(standaloneSchema)
check('relationship-free — passes independent consistency check', checkERDiagramConsistency(specStandalone, standaloneSchema).ok)
check('relationship-free — has only 1 step (entities, no relationship step)', specStandalone.steps.length === 1)

// ── Tampered scene fails the consistency check ────────────────────────────────
const tampered = buildERDiagramScene(studentCourse)
const label = tampered.steps.flatMap((s) => s.objects).find((o) => o.id === 'rel-label-0')
if (label) label.text = '1:1'
check('tampered cardinality label fails the consistency check', !checkERDiagramConsistency(tampered, studentCourse).ok)

// ── Parameter validation ──────────────────────────────────────────────────────
check('reject fewer than 2 entities', validateERDiagramParams({ entities: [{ name: 'Solo', attributes: ['id'] }], relationships: [] }) === null)
check('reject more than 6 entities', validateERDiagramParams({
  entities: Array.from({ length: 7 }, (_, i) => ({ name: `E${i}`, attributes: ['id'] })),
  relationships: [],
}) === null)
check('reject entity with no attributes', validateERDiagramParams({
  entities: [{ name: 'A', attributes: [] }, { name: 'B', attributes: ['id'] }], relationships: [],
}) === null)
check('reject duplicate entity names', validateERDiagramParams({
  entities: [{ name: 'A', attributes: ['id'] }, { name: 'A', attributes: ['id'] }], relationships: [],
}) === null)
check('reject relationship referencing an unknown entity', validateERDiagramParams({
  entities: [{ name: 'A', attributes: ['id'] }, { name: 'B', attributes: ['id'] }],
  relationships: [{ from: 'A', to: 'C', cardinality: 'one-to-one' }],
}) === null)
check('reject invalid cardinality string', validateERDiagramParams({
  entities: [{ name: 'A', attributes: ['id'] }, { name: 'B', attributes: ['id'] }],
  relationships: [{ from: 'A', to: 'B', cardinality: 'many-to-one' }],
}) === null)
check('accept a valid scenario', validateERDiagramParams(studentCourse)?.entities.length === 2)

// ── Scene-router keyword routing ──────────────────────────────────────────────
console.log('\n=== scene-router routing for er_diagram ===\n')

check('"ER diagram" prose → er_diagram',
  routeSceneGenerator('Draw the ER diagram for a blog database schema.') === 'er_diagram')
check('"primary key" prose → er_diagram',
  routeSceneGenerator('Explain the primary key and foreign key relationship between these tables.') === 'er_diagram')
check('"one-to-many relationship" prose → er_diagram',
  routeSceneGenerator('Model the one-to-many relationship between Author and Post.') === 'er_diagram')
check('unrelated logic-circuit prose does NOT route to er_diagram',
  routeSceneGenerator('What is the output of an AND gate with inputs 1 and 0?') !== 'er_diagram')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
