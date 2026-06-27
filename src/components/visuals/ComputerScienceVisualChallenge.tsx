'use client'
/**
 * ComputerScienceVisualChallenge — Computer Science Subject Library sprint.
 * Pairs an existing production CS VisualCard (three_computer_architecture,
 * three_memory_storage, three_network_packet_flow, three_data_structure,
 * three_algorithm_visualization — unmodified) with a multiple-choice mastery
 * challenge, using the existing Visual Mastery emission contract
 * (createMasteryEmitter, visualType: 'computer_science_interactive').
 * Mirrors ClassicalMechanicsVisualChallenge.tsx. No new challenge framework,
 * no new renderer base for the diagram itself.
 */
import { useState } from 'react'
import { VisualCard } from '@/components/school/visuals/VisualCard'
import { createMasteryEmitter, type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import type { ComputerScienceMasteryChallenge } from '@/lib/visuals/computerScienceMasteryChallenges'

interface Props {
  challenge: ComputerScienceMasteryChallenge
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function ComputerScienceVisualChallenge({ challenge, onMasteryEvent, masteryContext }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [attempted, setAttempted] = useState(false)

  const emit = createMasteryEmitter({
    visualType: 'computer_science_interactive',
    defaultConcept: challenge.concept,
    context: masteryContext,
    onMasteryEvent,
  })

  const isCorrect = selected !== null && selected === challenge.correctIndex

  const choose = (i: number) => {
    setSelected(i)
    setAttempted(true)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: i === challenge.correctIndex })
  }

  return (
    <div role="group" aria-label={`Computer science visual challenge: ${challenge.question}`} style={{ maxWidth: 360 }}>
      <VisualCard type={challenge.visual} autoPlay={false} speed={1} />
      <p style={{ fontSize: 12, fontWeight: 600, margin: '10px 0 6px', color: 'var(--text-primary)' }}>
        {challenge.question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {challenge.options.map((opt, i) => {
          const isChosen = selected === i
          const showCorrect = attempted && i === challenge.correctIndex
          const showWrong = attempted && isChosen && i !== challenge.correctIndex
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={attempted}
              style={{
                textAlign: 'left',
                padding: '8px 10px',
                borderRadius: 8,
                fontSize: 12,
                cursor: attempted ? 'default' : 'pointer',
                border: `1px solid ${showCorrect ? 'var(--green, #22A06B)' : showWrong ? 'var(--coral)' : 'var(--border-subtle)'}`,
                background: showCorrect ? 'var(--green-muted, #E6F6EE)' : showWrong ? 'var(--coral-muted)' : 'var(--bg-surface)',
                color: 'var(--text-primary)',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {attempted && (
        <p style={{ fontSize: 11, marginTop: 8, color: isCorrect ? 'var(--green, #22A06B)' : 'var(--coral)' }}>
          {isCorrect ? 'Correct.' : `Not quite — the correct answer is: "${challenge.options[challenge.correctIndex]}"`}
        </p>
      )}
    </div>
  )
}
