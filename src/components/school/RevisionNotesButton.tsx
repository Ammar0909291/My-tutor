'use client'

import { useState } from 'react'
import { BookOpen, X } from 'lucide-react'
import { REVISION_NOTE_META, type RevisionNoteType, type RevisionNotes } from '@/lib/school/revision/revisionNotesTypes'
import { Card, CandyButton } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

interface RevisionNotesButtonProps {
  subjectSlug: string
  chapterId: string
  formulaAvailable: boolean
}

export function RevisionNotesButton({ subjectSlug, chapterId, formulaAvailable }: RevisionNotesButtonProps) {
  const [open, setOpen] = useState(false)
  const [activeType, setActiveType] = useState<RevisionNoteType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notes, setNotes] = useState<RevisionNotes | null>(null)

  const types: RevisionNoteType[] = formulaAvailable ? ['quick', 'exam', 'formula'] : ['quick', 'exam']

  async function loadNotes(type: RevisionNoteType) {
    setActiveType(type)
    setLoading(true)
    setError(null)
    setNotes(null)
    try {
      const r = await fetch('/api/school/revision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug, chapterId, noteType: type }),
      })
      const data = await r.json()
      if (data.error) { setError(data.error); return }
      setNotes(data.notes)
    } catch {
      setError('Could not generate notes. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function close() {
    setOpen(false)
    setActiveType(null)
    setNotes(null)
    setError(null)
  }

  return (
    <div className={tokenStyles.candyTheme}>
      <CandyButton
        onClick={() => setOpen(true)}
        style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', fontSize: 14, fontWeight: 800, borderRadius: 14, background: 'var(--candy-card)', border: '1px solid var(--candy-shadow)', color: 'var(--candy-ink)' }}
      >
        <BookOpen size={15} /> Generate Revision Notes
      </CandyButton>

      {open && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.55)' }}
          onClick={close}
        >
          <Card
            style={{ width: '100%', maxWidth: 512, maxHeight: '88vh', overflowY: 'auto', borderRadius: 20, padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', zIndex: 10, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)', borderRadius: '20px 20px 0 0' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>
                {activeType ? REVISION_NOTE_META[activeType].label : 'Revision Notes'}
              </h2>
              <button onClick={close} style={{ padding: 4, borderRadius: 8, color: 'var(--candy-ink-soft)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: 20 }}>
              {/* Type chooser */}
              {!activeType && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {types.map((type) => {
                    const meta = REVISION_NOTE_META[type]
                    return (
                      <CandyButton
                        key={type}
                        onClick={() => loadNotes(type)}
                        style={{ width: '100%', borderRadius: 14, padding: 16, textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 12, background: 'var(--candy-bg)', border: '1px solid var(--candy-shadow)' }}
                      >
                        <span style={{ fontSize: 24, flexShrink: 0 }}>{meta.icon}</span>
                        <span>
                          <span style={{ display: 'block', fontSize: 14, fontWeight: 800, color: 'var(--candy-ink)' }}>{meta.label}</span>
                          <span style={{ display: 'block', fontSize: 12, marginTop: 2, color: 'var(--candy-ink-soft)' }}>{meta.description}</span>
                        </span>
                      </CandyButton>
                    )
                  })}
                </div>
              )}

              {/* Loading */}
              {activeType && loading && (
                <div style={{ padding: '48px 0', textAlign: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--candy-red)', borderTopColor: 'transparent', margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }} />
                  <p style={{ fontSize: 14, color: 'var(--candy-ink-soft)' }}>Generating your revision sheet…</p>
                </div>
              )}

              {/* Error */}
              {activeType && error && !loading && (
                <div style={{ padding: '32px 0', textAlign: 'center' }}>
                  <p style={{ fontSize: 14, marginBottom: 16, color: 'var(--candy-red)' }}>{error}</p>
                  <CandyButton onClick={() => loadNotes(activeType)} style={{ fontSize: 14, fontWeight: 800, padding: '8px 16px', borderRadius: 14, background: 'var(--candy-red)', color: '#fff' }} shadowColor="#C73A3A">
                    Try again
                  </CandyButton>
                </div>
              )}

              {/* Notes content */}
              {activeType && notes && !loading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <NotesBody notes={notes} />
                  <CandyButton
                    onClick={() => { setActiveType(null); setNotes(null) }}
                    style={{ width: '100%', fontSize: 12, fontWeight: 800, padding: '10px 0', borderRadius: 14, background: 'var(--candy-bg)', border: '1px solid var(--candy-shadow)', color: 'var(--candy-ink-soft)' }}
                  >
                    ← Choose another type
                  </CandyButton>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, color: 'var(--candy-red)' }}>{title}</h3>
      {children}
    </div>
  )
}

function NotesBody({ notes }: { notes: RevisionNotes }) {
  if (notes.type === 'quick') {
    return (
      <>
        <Section title="Chapter Summary">
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--candy-ink-soft)' }}>{notes.summary}</p>
        </Section>
        {notes.keyConcepts.length > 0 && (
          <Section title="Key Concepts">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notes.keyConcepts.map((c, i) => (
                <li key={i} style={{ fontSize: 14, display: 'flex', gap: 8, color: 'var(--candy-ink)' }}>
                  <span style={{ color: 'var(--candy-red)' }}>•</span> {c}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {notes.importantTerms.length > 0 && (
          <Section title="Important Terms">
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 0 }}>
              {notes.importantTerms.map((t, i) => (
                <div key={i}>
                  <dt style={{ fontSize: 14, fontWeight: 800, color: 'var(--candy-ink)' }}>{t.term}</dt>
                  <dd style={{ fontSize: 12, margin: 0, color: 'var(--candy-ink-soft)' }}>{t.definition}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}
        {notes.commonMistakes.length > 0 && (
          <Section title="Common Mistakes">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notes.commonMistakes.map((m, i) => (
                <li key={i} style={{ fontSize: 14, display: 'flex', gap: 8, color: 'var(--candy-ink-soft)' }}>
                  <span style={{ color: 'var(--candy-yellow-d)' }}>⚠</span> {m}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {notes.recallQuestions.length > 0 && (
          <Section title="Quick Recall Questions">
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {notes.recallQuestions.map((q, i) => (
                <li key={i}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--candy-ink)' }}>{i + 1}. {q.question}</p>
                  <p style={{ fontSize: 12, marginTop: 2, paddingLeft: 16, color: 'var(--candy-ink-soft)' }}>{q.answer}</p>
                </li>
              ))}
            </ol>
          </Section>
        )}
      </>
    )
  }

  if (notes.type === 'exam') {
    return (
      <>
        {notes.highWeightTopics.length > 0 && (
          <Section title="High-Weight Topics">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notes.highWeightTopics.map((t, i) => (
                <li key={i} style={{ fontSize: 14, display: 'flex', gap: 8, color: 'var(--candy-ink)' }}>
                  <span style={{ color: 'var(--candy-red)' }}>★</span> {t}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {notes.definitions.length > 0 && (
          <Section title="Important Definitions">
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 0 }}>
              {notes.definitions.map((t, i) => (
                <div key={i}>
                  <dt style={{ fontSize: 14, fontWeight: 800, color: 'var(--candy-ink)' }}>{t.term}</dt>
                  <dd style={{ fontSize: 12, margin: 0, color: 'var(--candy-ink-soft)' }}>{t.definition}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}
        {notes.likelyMistakes.length > 0 && (
          <Section title="Likely Mistakes">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notes.likelyMistakes.map((m, i) => (
                <li key={i} style={{ fontSize: 14, display: 'flex', gap: 8, color: 'var(--candy-ink-soft)' }}>
                  <span style={{ color: 'var(--candy-yellow-d)' }}>⚠</span> {m}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {notes.fastRevisionPoints.length > 0 && (
          <Section title="Fast Revision Points">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notes.fastRevisionPoints.map((p, i) => (
                <li key={i} style={{ fontSize: 14, display: 'flex', gap: 8, color: 'var(--candy-ink)' }}>
                  <span style={{ color: 'var(--candy-green-d)' }}>✓</span> {p}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </>
    )
  }

  // formula
  if (notes.formulas.length === 0) {
    return <p style={{ fontSize: 14, padding: '24px 0', textAlign: 'center', color: 'var(--candy-ink-soft)' }}>This chapter has no formulas to list.</p>
  }
  return (
    <Section title="Formula Sheet">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notes.formulas.map((f, i) => (
          <div key={i} style={{ borderRadius: 14, padding: 12, background: 'var(--candy-bg)', border: '1px solid var(--candy-shadow)' }}>
            <p style={{ fontSize: 14, fontWeight: 800, fontFamily: 'monospace', marginBottom: 4, color: 'var(--candy-red)' }}>{f.formula}</p>
            <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>{f.meaning}</p>
            {f.example && <p style={{ fontSize: 12, marginTop: 4, fontStyle: 'italic', color: 'var(--candy-ink-soft)' }}>e.g. {f.example}</p>}
          </div>
        ))}
      </div>
    </Section>
  )
}
