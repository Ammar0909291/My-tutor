'use client'
/**
 * ThreeDEngineStub — 3D Educational Engine Foundation Sprint 1.
 * Minimal placeholder scene for the 3D engine types registered this sprint
 * but not yet built out as full production demos (wave simulation, field
 * visualization, structure visualization). Confirms each VisualType renders
 * through the shared ThreeDVisual host and revealStep contract; a future
 * sprint replaces each stub with its real renderer, following the
 * ParticleSystem3D pattern. No subject-specific content.
 */
import { ThreeDVisual } from './ThreeDVisual'

function StubMesh({ revealStep, color }: { revealStep: number; color: string }) {
  const visible = revealStep >= 1
  if (!visible) return null
  return (
    <mesh>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color={color} wireframe={revealStep < 3} />
    </mesh>
  )
}

export function WaveSimulation3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual revealStep={revealStep} ariaLabel="3D wave simulation engine placeholder">
      <StubMesh revealStep={revealStep} color="#5B8DEF" />
    </ThreeDVisual>
  )
}

export function FieldVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual revealStep={revealStep} ariaLabel="3D field visualization engine placeholder">
      <StubMesh revealStep={revealStep} color="#22A06B" />
    </ThreeDVisual>
  )
}

export function StructureVisualization3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual revealStep={revealStep} ariaLabel="3D structure visualization engine placeholder">
      <StubMesh revealStep={revealStep} color="#B388FF" />
    </ThreeDVisual>
  )
}
