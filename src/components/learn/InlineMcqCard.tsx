import type { TranscriptMcq } from '@/lib/learn/mcqTranscript'

/**
 * The multiple-choice question, as part of the tutor's message in the Tutor Max transcript (see
 * `src/lib/learn/mcqTranscript.ts` for why and for how it gets here).
 *
 * READ-ONLY on purpose. Answering stays with the Quick Check panel — this card is the RECORD in the conversation:
 * the full question and every option, in the order the tutor served them, above whatever the learner answers next
 * and still there after they have answered. No buttons, no handlers, no state: it can never submit, grade or change
 * what the server holds. Presentation only, using the same tokens, sizes and letter badges as the Quick Check panel
 * so it sits naturally in both themes and at phone width (it wraps; it never sets a minimum width).
 */
export function InlineMcqCard({ question, options, label }: TranscriptMcq & { label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      data-inline-mcq=""
      style={{
        width: '100%',
        boxSizing: 'border-box',
        marginTop: 8,
        padding: '10px 14px 12px',
        borderRadius: 14,
        border: '1px solid var(--border-subtle)',
        borderLeft: '3px solid var(--coral)',
        background: 'var(--bg-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        // A long question or option wraps inside the card instead of widening the page.
        overflowWrap: 'anywhere',
      }}
    >
      <div
        style={{ fontSize: 11.7, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}
      >
        {label}
      </div>
      <div data-inline-mcq-question="" style={{ fontSize: 15.6, fontWeight: 600, lineHeight: 1.4, color: 'var(--text-primary)' }}>
        {question}
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {options.map((option, i) => (
          <li
            key={`${i}-${option}`}
            data-inline-mcq-option={String.fromCharCode(65 + i)}
            style={{ display: 'flex', gap: 8, fontSize: 15, lineHeight: 1.4, color: 'var(--text-primary)' }}
          >
            <span aria-hidden="true" style={{ fontWeight: 800, color: 'var(--coral)', flexShrink: 0 }}>
              {String.fromCharCode(65 + i)}
            </span>
            <span>{option}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
