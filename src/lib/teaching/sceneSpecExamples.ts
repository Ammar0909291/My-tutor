/**
 * sceneSpecExamples — Scene Specification Foundation Sprint (Task 5).
 *
 * A SceneSpec re-expression of the EXISTING `VectorVisualization3D` Mathematics Foundation visual,
 * created beside (not replacing) the original to prove an existing teaching animation can be
 * represented purely as data. The original component is untouched and still works exactly as before.
 *
 * Values mirror VectorVisualization3D: ORIGIN [0,0,0], TIP [2.5,1.8,1.2],
 * |v| = sqrt(2.5² + 1.8² + 1.2²) ≈ 3.31. Reveal steps match 1:1:
 *   1 origin · 2 vector arrow · 3 magnitude · 4 direction components · 5 completed.
 */
import type { SceneSpec } from './sceneSpec'

const ORIGIN: [number, number, number] = [0, 0, 0]
const TIP: [number, number, number] = [2.5, 1.8, 1.2]
const MAGNITUDE = Math.sqrt(TIP[0] ** 2 + TIP[1] ** 2 + TIP[2] ** 2)

export const vectorVisualizationSpec: SceneSpec = {
  id: 'vector_visualization',
  title: 'Vector Visualization (SceneSpec)',
  sceneType: 'diagram',
  teachingGoal: 'Show a 3D vector as an arrow with a magnitude and x/y/z components.',
  cameraDistance: 7,
  ariaLabel:
    '3D vector visualization rendered from a SceneSpec: the origin, the vector arrow, its magnitude, its directional components, and the completed visualization',
  steps: [
    {
      narration: 'Start at the origin — the point every vector is measured from.',
      objects: [{ type: 'point', position: ORIGIN, radius: 0.08, color: '#9AA5B8' }],
    },
    {
      narration: 'Draw the vector v as an arrow from the origin to its tip.',
      objects: [{ type: 'vector', from: ORIGIN, to: TIP, color: '#5B8DEF', text: 'v' }],
    },
    {
      narration: 'The magnitude is the length of that arrow.',
      objects: [
        { type: 'label', position: [TIP[0] / 2, TIP[1] / 2 + 0.3, TIP[2] / 2], text: `|v| = ${MAGNITUDE.toFixed(2)}`, color: '#FFB74D' },
      ],
    },
    {
      narration: 'Break the vector into its x, y, and z directional components.',
      objects: [
        { type: 'vector', from: ORIGIN, to: [TIP[0], 0, 0], color: '#FF6B6B', thickness: 0.02, text: 'x' },
        { type: 'vector', from: ORIGIN, to: [0, TIP[1], 0], color: '#81C784', thickness: 0.02, text: 'y' },
        { type: 'vector', from: ORIGIN, to: [0, 0, TIP[2]], color: '#4DD0E1', thickness: 0.02, text: 'z' },
      ],
    },
    {
      narration: 'Together the components and magnitude fully describe the vector.',
      objects: [{ type: 'label', position: [0, -1.4, 0], text: 'Vector v = (x, y, z) components + magnitude', color: '#5B8DEF' }],
    },
  ],
}
