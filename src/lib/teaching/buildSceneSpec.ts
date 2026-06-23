/**
 * buildSceneSpec — deterministic, rule-based SceneSpec detection for the live tutor.
 *
 * Mirrors the existing planVisualTeaching/buildVisualSpec pattern (route.ts) for the
 * 2D VisualSpec pipeline: no AI call, no extra latency/budget cost, non-fatal on any
 * error. Looks at the tutor's final response text for keywords that genuinely warrant
 * a 3D scene (vectors, atoms/molecules, 3D coordinate geometry) and produces a small,
 * illustrative SceneSpec for them. Conservative on purpose — returns null far more
 * often than it returns a scene, since a wrong/irrelevant 3D scene is worse than none.
 */
import type { SceneSpec } from './sceneSpec'

const VECTOR_RE = /\b(vector|force|velocity|displacement|acceleration)\b/i
// Deliberately NOT matching electron/proton/neutron/orbital here: those are
// already handled correctly, with real per-concept visuals (atomic structure,
// electron shells), by the 2D pipeline's phrase-based rules in detectVisual.ts
// (e.g. 'protons and neutrons', 'electron shell', '3d orbital'), which runs
// BEFORE this and gates it off. Matching those bare words here would only
// catch mentions detectVisual.ts's phrases missed, and incorrectly render
// this generic 2-atom-1-bond template instead of no scene — worse than
// showing nothing, per this file's own conservative-by-design philosophy.
const MOLECULE_RE = /\b(atom|molecule|bond)\b/i
const COORD_3D_RE = /\b(3d|three[- ]dimensional|x[- ]axis.*y[- ]axis.*z[- ]axis|coordinate space)\b/i

function vectorScene(): SceneSpec {
  return {
    id: 'auto-vector',
    title: 'Vector',
    sceneType: 'diagram',
    teachingGoal: 'Show a vector as a directed arrow in 3D space',
    cameraDistance: 6,
    steps: [
      {
        narration: 'A vector has both magnitude and direction.',
        objects: [
          { type: 'point', position: [0, 0, 0], radius: 0.08, color: '#5B8DEF', text: 'origin' },
          { type: 'vector', from: [0, 0, 0], to: [2, 1.5, 0], color: '#F78166', thickness: 0.06, text: 'v' },
        ],
      },
    ],
  }
}

function moleculeScene(): SceneSpec {
  return {
    id: 'auto-molecule',
    title: 'Molecule',
    sceneType: 'diagram',
    teachingGoal: 'Show atoms connected by bonds in 3D space',
    cameraDistance: 6,
    steps: [
      {
        narration: 'Atoms bond together to form a molecule.',
        objects: [
          { type: 'node', position: [-1, 0, 0], radius: 0.35, color: '#5B8DEF', text: 'A' },
          { type: 'node', position: [1, 0, 0], radius: 0.25, color: '#FFD166', text: 'B' },
          { type: 'bond', from: [-1, 0, 0], to: [1, 0, 0], color: '#9aa4b2', thickness: 0.04 },
        ],
      },
    ],
  }
}

function coordSpaceScene(): SceneSpec {
  return {
    id: 'auto-coord-space',
    title: '3D Coordinate Space',
    sceneType: 'diagram',
    teachingGoal: 'Orient the student to the x/y/z axes',
    cameraDistance: 7,
    steps: [
      {
        narration: 'Three perpendicular axes define a point in 3D space.',
        objects: [
          { type: 'point', position: [0, 0, 0], radius: 0.08, color: '#ffffff', text: 'origin' },
          { type: 'vector', from: [0, 0, 0], to: [2, 0, 0], color: '#F78166', text: 'x' },
          { type: 'vector', from: [0, 0, 0], to: [0, 2, 0], color: '#5B8DEF', text: 'y' },
          { type: 'vector', from: [0, 0, 0], to: [0, 0, 2], color: '#7ED957', text: 'z' },
        ],
      },
    ],
  }
}

/** Returns a small illustrative SceneSpec for clearly-3D-flavored text, or null. */
export function buildSceneSpec(text: string): SceneSpec | null {
  if (!text) return null
  if (MOLECULE_RE.test(text)) return moleculeScene()
  if (VECTOR_RE.test(text)) return vectorScene()
  if (COORD_3D_RE.test(text)) return coordSpaceScene()
  return null
}
