import { describe, it, expect } from 'vitest'
import {
  isDecorativeVisual,
  detectMisconceptionRiskVisual,
  detectNarrationPhantoms,
  getEducationalLabels,
  buildVisualCapabilityBlock,
  scoreVisualQuality,
  buildQuantumNumbersConstraints,
  runVisualQualityGuard,
} from '@/lib/teaching/visualQualityGuard'

// ── B.11: Decorative visual detection ──────────────────────────────────────

describe('isDecorativeVisual', () => {
  it('flags a force_diagram when response never mentions forces', () => {
    expect(isDecorativeVisual(
      'The speed of light is approximately 3 × 10^8 m/s.',
      'force_diagram',
    )).toBe(true)
  })

  it('allows a force_diagram when response discusses forces', () => {
    expect(isDecorativeVisual(
      'The net force on the object is 10 N to the right, shown by the arrow.',
      'force_diagram',
    )).toBe(false)
  })

  it('flags a circuit_diagram when response discusses optics', () => {
    expect(isDecorativeVisual(
      'Light reflects off a mirror at the angle of incidence.',
      'circuit_diagram',
    )).toBe(true)
  })

  it('allows a circuit_diagram when response discusses circuits', () => {
    expect(isDecorativeVisual(
      'The current flows through the resistor from the battery.',
      'circuit_diagram',
    )).toBe(false)
  })

  it('returns false for null visualType', () => {
    expect(isDecorativeVisual('Any text', null)).toBe(false)
  })

  it('returns false for unknown visual types', () => {
    expect(isDecorativeVisual('Any text', 'unknown_type')).toBe(false)
  })

  it('flags electron shells when teaching about chemical bonding only', () => {
    expect(isDecorativeVisual(
      'Ionic bonds form when one atom transfers electrons to another.',
      'three_electron_shells',
    )).toBe(false) // mentions 'electron'
  })
})

// ── B.10: Misconception risk detection ─────────────────────────────────────

describe('detectMisconceptionRiskVisual', () => {
  it('detects Bohr model risk for quantum numbers concept', () => {
    const risk = detectMisconceptionRiskVisual('chem.atomic.quantum-numbers', 'three_atomic_structure')
    expect(risk).not.toBeNull()
    expect(risk).toContain('Bohr model')
  })

  it('detects shell diagram risk for quantum numbers', () => {
    const risk = detectMisconceptionRiskVisual('chem.atomic.quantum-numbers', 'three_electron_shells')
    expect(risk).not.toBeNull()
    expect(risk).toContain('Shell diagram')
  })

  it('detects force diagram risk for energy concepts', () => {
    const risk = detectMisconceptionRiskVisual('phys.mech.kinetic-energy', 'force_diagram')
    expect(risk).not.toBeNull()
    expect(risk).toContain('energy')
  })

  it('returns null for safe combinations', () => {
    expect(detectMisconceptionRiskVisual('phys.mech.force', 'force_diagram')).toBeNull()
  })

  it('returns null for null inputs', () => {
    expect(detectMisconceptionRiskVisual(null, null)).toBeNull()
    expect(detectMisconceptionRiskVisual('phys.mech.force', null)).toBeNull()
    expect(detectMisconceptionRiskVisual(null, 'force_diagram')).toBeNull()
  })
})

// ── C.17-18: Narration phantom detection ───────────────────────────────────

describe('detectNarrationPhantoms', () => {
  it('detects reference to orbital shape in shell diagram', () => {
    const phantoms = detectNarrationPhantoms(
      'Notice the orbital shape in the diagram — see the dumbbell form.',
      'three_electron_shells',
    )
    expect(phantoms.length).toBeGreaterThan(0)
  })

  it('detects reference to probability cloud in atomic structure', () => {
    const phantoms = detectNarrationPhantoms(
      'Look at the probability cloud shown in the diagram.',
      'three_atomic_structure',
    )
    expect(phantoms.length).toBeGreaterThan(0)
  })

  it('allows valid references for shell diagram', () => {
    const phantoms = detectNarrationPhantoms(
      'Notice the electrons on the second shell. The nucleus is at the center.',
      'three_electron_shells',
    )
    expect(phantoms).toHaveLength(0)
  })

  it('returns empty for null visual type', () => {
    expect(detectNarrationPhantoms('Any text', null)).toHaveLength(0)
  })

  it('returns empty when no reference patterns match', () => {
    expect(detectNarrationPhantoms(
      'Quantum numbers describe the state of an electron.',
      'three_electron_shells',
    )).toHaveLength(0)
  })
})

// ── C.20: Educational labels ───────────────────────────────────────────────

describe('getEducationalLabels', () => {
  it('returns quantum number labels', () => {
    const labels = getEducationalLabels('chem.atomic.quantum-numbers')
    expect(labels).not.toBeNull()
    expect(labels).toContain('n (principal)')
    expect(labels).toContain('mₗ')
    expect(labels).toContain('mₛ')
  })

  it('returns Ohms law labels', () => {
    const labels = getEducationalLabels('phys.em.ohms-law')
    expect(labels).not.toBeNull()
    expect(labels).toContain('V = IR')
  })

  it('returns DNA structure labels', () => {
    const labels = getEducationalLabels('bio.mol.dna-structure')
    expect(labels).not.toBeNull()
    expect(labels).toContain('A-T')
    expect(labels).toContain('G-C')
  })

  it('returns null for unknown concept', () => {
    expect(getEducationalLabels('unknown.concept')).toBeNull()
  })

  it('returns null for null', () => {
    expect(getEducationalLabels(null)).toBeNull()
  })
})

// ── C.21: Visual capability awareness ──────────────────────────────────────

describe('buildVisualCapabilityBlock', () => {
  it('returns empty for null visual', () => {
    expect(buildVisualCapabilityBlock(null, null)).toBe('')
  })

  it('describes what electron_shells can and cannot show', () => {
    const block = buildVisualCapabilityBlock('three_electron_shells', null)
    expect(block).toContain('CAN show')
    expect(block).toContain('CANNOT show')
    expect(block).toContain('concentric shells')
    expect(block).toContain('orbital shapes')
  })

  it('includes educational labels when concept has them', () => {
    const block = buildVisualCapabilityBlock('three_electron_shells', 'chem.atomic.quantum-numbers')
    expect(block).toContain('EDUCATIONAL LABELS')
    expect(block).toContain('n (principal)')
  })

  it('omits labels when concept has none', () => {
    const block = buildVisualCapabilityBlock('force_diagram', 'phys.mech.force')
    expect(block).not.toContain('EDUCATIONAL LABELS')
  })
})

// ── D.26: Visual quality scoring ───────────────────────────────────────────

describe('scoreVisualQuality', () => {
  it('gives low score for decorative visual', () => {
    const result = scoreVisualQuality(
      'force_diagram',
      'phys.mech.force',
      'The speed of light is approximately 3 × 10^8 m/s. Electromagnetic radiation travels through a vacuum at this constant speed.',
      false,
    )
    expect(result.score).toBeLessThan(30)
    expect(result.reasons).toContain('response text never references what the visual shows')
  })

  it('gives high score for relevant visual', () => {
    const result = scoreVisualQuality(
      'force_diagram',
      'phys.mech.force',
      'The net force on the block is 10 N to the right, as shown by the arrow in the force diagram. The friction force opposes the motion.',
      false,
    )
    expect(result.score).toBeGreaterThan(40)
    expect(result.shouldSuppress).toBe(false)
  })

  it('penalizes misconception risk heavily', () => {
    const result = scoreVisualQuality(
      'three_atomic_structure',
      'chem.atomic.quantum-numbers',
      'Look at how the electron orbits the nucleus in this atom model.',
      false,
    )
    expect(result.score).toBeLessThan(20)
    expect(result.shouldSuppress).toBe(true)
  })

  it('penalizes repeats', () => {
    const noRepeat = scoreVisualQuality('force_diagram', 'phys.mech.force', 'The force arrow shows 10N.', false)
    const repeat = scoreVisualQuality('force_diagram', 'phys.mech.force', 'The force arrow shows 10N.', true)
    expect(repeat.score).toBeLessThan(noRepeat.score)
  })

  it('penalizes very short responses', () => {
    const result = scoreVisualQuality('force_diagram', 'phys.mech.force', 'Yes, correct!', false)
    expect(result.reasons).toContain('response too short for visual to add value')
  })

  it('returns 0 score for null visual', () => {
    const result = scoreVisualQuality(null, null, 'Any text here', false)
    expect(result.score).toBe(0)
    expect(result.shouldSuppress).toBe(true)
  })
})

// ── E.31: Quantum numbers constraints ──────────────────────────────────────

describe('buildQuantumNumbersConstraints', () => {
  it('returns constraints for quantum numbers concept', () => {
    const block = buildQuantumNumbersConstraints('chem.atomic.quantum-numbers')
    expect(block).toContain('QUANTUM NUMBERS LESSON CONSTRAINTS')
    expect(block).toContain('HYDROGEN CONTEXT')
    expect(block).toContain('BOHR→QUANTUM TRANSITION')
    expect(block).toContain('VISUAL HONESTY')
    expect(block).toContain('NUCLEUS')
    expect(block).toContain('PROGRESSION')
    expect(block).toContain('n = principal')
    expect(block).toContain('l = azimuthal')
    expect(block).toContain('mₗ = magnetic')
    expect(block).toContain('mₛ = spin')
  })

  it('returns empty for non-quantum concept', () => {
    expect(buildQuantumNumbersConstraints('phys.mech.force')).toBe('')
  })

  it('returns empty for null', () => {
    expect(buildQuantumNumbersConstraints(null)).toBe('')
  })
})

// ── Combined guard ─────────────────────────────────────────────────────────

describe('runVisualQualityGuard', () => {
  it('passes a relevant visual with good narration', () => {
    const result = runVisualQualityGuard({
      responseText: 'The net force on the block is 10 N, shown by the arrow in the force diagram. Friction opposes the motion.',
      visualType: 'force_diagram',
      conceptId: 'phys.mech.force',
      isRepeat: false,
    })
    expect(result.suppressVisual).toBe(false)
    expect(result.phantomReferences).toHaveLength(0)
  })

  it('suppresses a misconception-risk visual', () => {
    const result = runVisualQualityGuard({
      responseText: 'The Bohr model shows electrons in circular orbits around the nucleus.',
      visualType: 'three_atomic_structure',
      conceptId: 'chem.atomic.quantum-numbers',
      isRepeat: false,
    })
    expect(result.suppressVisual).toBe(true)
    expect(result.suppressReason).toContain('Bohr model')
  })

  it('includes quantum constraints for quantum numbers concept', () => {
    const result = runVisualQualityGuard({
      responseText: 'Let us learn about quantum numbers.',
      visualType: 'three_electron_shells',
      conceptId: 'chem.atomic.quantum-numbers',
      isRepeat: false,
    })
    expect(result.systemPromptAdditions).toContain('QUANTUM NUMBERS')
  })

  it('includes capability block for known visual types', () => {
    const result = runVisualQualityGuard({
      responseText: 'The circuit has a resistor and battery connected in series.',
      visualType: 'circuit_diagram',
      conceptId: 'phys.em.ohms-law',
      isRepeat: false,
    })
    expect(result.systemPromptAdditions).toContain('VISUAL CAPABILITY AWARENESS')
  })

  it('handles null visual gracefully', () => {
    const result = runVisualQualityGuard({
      responseText: 'Pure text explanation.',
      visualType: null,
      conceptId: null,
      isRepeat: false,
    })
    expect(result.suppressVisual).toBe(true)
    expect(result.phantomReferences).toHaveLength(0)
  })
})
