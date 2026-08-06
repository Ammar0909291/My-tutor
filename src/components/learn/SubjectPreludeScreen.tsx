'use client'
/**
 * SubjectPreludeScreen — renders a SubjectPrelude record.
 *
 * Deliberately dumb: it takes a prelude and two callbacks and renders every
 * section generically. It knows nothing about which subjects exist, so adding
 * a subject means adding a content entry in subjectPrelude.ts and nothing here
 * changes. It also knows nothing about lessons, mastery or progression — the
 * caller owns the transition into Lesson 1.
 */

import { Play, Square } from 'lucide-react'
import type { SubjectPrelude } from '@/lib/curriculum/subjectPrelude'
import { buildPreludeNarration } from '@/lib/curriculum/preludeNarration'

const UI = { indigo: '#6366f1' }

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <h3 style={{
        fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase',
        color: 'var(--text-dim)', margin: 0,
      }}>{label}</h3>
      {children}
    </section>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-primary)' }}>{children}</p>
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5 }}>
      {items.map((item) => (
        <li key={item} style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)' }}>{item}</li>
      ))}
    </ul>
  )
}

export interface SubjectPreludeScreenProps {
  prelude: SubjectPrelude
  /** Subject display name — resolved by the caller, which owns localization. */
  subjectName: string
  /** Continue into Lesson 1 (or back to the roadmap on a replay). */
  onContinue: () => void
  /** Label for the primary button, so replay can say something different. */
  continueLabel: string
  /** True when this is a replay from Subject Overview rather than first entry. */
  isReplay?: boolean
  busy?: boolean
  /**
   * Narrate the introduction. The caller owns the voice pipeline entirely —
   * this screen never touches speechSynthesis, /api/tts, the playback manager
   * or the learner's voice/speed settings, so there is exactly one TTS
   * implementation in the app and this is a caller of it, not a second one.
   * Omitted (school mode, tests) simply hides the button.
   */
  onSpeak?: (text: string) => void
  onStopSpeak?: () => void
  isSpeaking?: boolean
  playLabel?: string
  stopLabel?: string
}

export default function SubjectPreludeScreen({
  prelude, subjectName, onContinue, continueLabel, isReplay = false, busy = false,
  onSpeak, onStopSpeak, isSpeaking = false, playLabel = 'Listen', stopLabel = 'Stop',
}: SubjectPreludeScreenProps) {
  return (
    <div
      data-testid="subject-prelude"
      style={{
        display: 'flex', flexDirection: 'column', gap: 22, padding: '28px 22px 40px',
        maxWidth: 720, margin: '0 auto', overflowY: 'auto', flex: 1,
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: UI.indigo }}>
            {subjectName}
          </span>
          {onSpeak && (
            <button
              type="button"
              data-testid="subject-prelude-listen"
              aria-label={isSpeaking ? stopLabel : playLabel}
              onClick={() => (isSpeaking ? onStopSpeak?.() : onSpeak(buildPreludeNarration(prelude, subjectName)))}
              style={{
                display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
                padding: '5px 12px', borderRadius: 999, cursor: 'pointer',
                fontSize: 11.5, fontWeight: 700,
                border: `1px solid ${isSpeaking ? 'var(--coral, #f97362)' : 'var(--border-subtle)'}`,
                background: isSpeaking ? 'var(--coral, #f97362)' : 'var(--bg-elevated, transparent)',
                color: isSpeaking ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {isSpeaking
                ? <><Square size={9} fill="currentColor" strokeWidth={0} />{stopLabel}</>
                : <><Play size={9} fill="currentColor" strokeWidth={0} />{playLabel}</>}
            </button>
          )}
        </div>
        <Paragraph>{prelude.welcome}</Paragraph>
      </header>

      {/* The Big Question — the spine of the whole prelude, so it leads. */}
      <div style={{
        borderLeft: `3px solid ${UI.indigo}`, paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <h3 style={{
          fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase',
          color: 'var(--text-dim)', margin: 0,
        }}>The big question</h3>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.45, fontWeight: 700, color: 'var(--text-primary)' }}>
          {prelude.bigQuestion}
        </p>
      </div>

      <Section label="Why this subject exists"><Paragraph>{prelude.whyItExists}</Paragraph></Section>
      <Section label="Why it matters"><Paragraph>{prelude.whyItMatters}</Paragraph></Section>

      <Section label="What you will learn">
        <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {prelude.roadmap.map((stage) => (
            <li key={stage.title} style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)' }}>
              <strong>{stage.title}</strong> — {stage.detail}
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Why it is worth learning"><Paragraph>{prelude.worthLearning}</Paragraph></Section>

      <Section label="What to expect"><Bullets items={prelude.expectations} /></Section>

      <Section label="The journey"><Paragraph>{prelude.estimatedJourney}</Paragraph></Section>

      <Section label="Prerequisites">
        {prelude.prerequisites.length > 0
          ? <Bullets items={prelude.prerequisites} />
          : <Paragraph>None. This starts from the beginning.</Paragraph>}
      </Section>

      <Section label="Where you will see this"><Bullets items={prelude.realWorldApplications} /></Section>
      <Section label="Where it leads"><Bullets items={prelude.careerRelevance} /></Section>
      <Section label="Connects to"><Bullets items={prelude.connectedSubjects} /></Section>

      <Section label="Before you start"><Paragraph>{prelude.motivation}</Paragraph></Section>

      <div style={{
        borderTop: '1px solid var(--border-subtle)', paddingTop: 18,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {!isReplay && <Paragraph>{prelude.transition}</Paragraph>}
        <button
          type="button"
          onClick={onContinue}
          disabled={busy}
          data-testid="subject-prelude-continue"
          style={{
            alignSelf: 'flex-start', padding: '11px 22px', borderRadius: 12,
            fontSize: 13.5, fontWeight: 700, cursor: busy ? 'default' : 'pointer',
            background: UI.indigo, color: '#fff', border: 'none', opacity: busy ? 0.6 : 1,
          }}
        >
          {continueLabel}
        </button>
      </div>
    </div>
  )
}
