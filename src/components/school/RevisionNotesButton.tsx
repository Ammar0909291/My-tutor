'use client'

import { useState } from 'react'
import { BookOpen, X } from 'lucide-react'
import { REVISION_NOTE_META, type RevisionNoteType, type RevisionNotes } from '@/lib/school/revision/revisionNotesTypes'

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
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-xl transition-transform hover:scale-[1.02]"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
      >
        <BookOpen size={15} /> Generate Revision Notes
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-5"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={close}
        >
          <div
            className="w-full sm:max-w-lg max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between px-5 py-4 z-10"
              style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)' }}>
              <h2 className="font-black text-base" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {activeType ? REVISION_NOTE_META[activeType].label : 'Revision Notes'}
              </h2>
              <button onClick={close} className="p-1 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              {/* Type chooser */}
              {!activeType && (
                <div className="space-y-3">
                  {types.map((type) => {
                    const meta = REVISION_NOTE_META[type]
                    return (
                      <button
                        key={type}
                        onClick={() => loadNotes(type)}
                        className="w-full rounded-xl p-4 text-left flex items-start gap-3 transition-all hover:scale-[1.01]"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
                      >
                        <span className="text-2xl shrink-0">{meta.icon}</span>
                        <div>
                          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{meta.label}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{meta.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Loading */}
              {activeType && loading && (
                <div className="py-12 text-center">
                  <div className="w-9 h-9 rounded-full border-2 animate-spin mx-auto mb-3"
                    style={{ borderColor: 'var(--coral)', borderTopColor: 'transparent' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Generating your revision sheet…</p>
                </div>
              )}

              {/* Error */}
              {activeType && error && !loading && (
                <div className="py-8 text-center">
                  <p className="text-sm mb-4" style={{ color: 'var(--coral)' }}>{error}</p>
                  <button onClick={() => loadNotes(activeType)} className="text-sm font-bold px-4 py-2 rounded-xl text-white" style={{ background: 'var(--coral)' }}>
                    Try again
                  </button>
                </div>
              )}

              {/* Notes content */}
              {activeType && notes && !loading && (
                <div className="space-y-5">
                  <NotesBody notes={notes} />
                  <button
                    onClick={() => { setActiveType(null); setNotes(null) }}
                    className="w-full text-xs font-bold py-2.5 rounded-xl"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
                  >
                    ← Choose another type
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--coral)' }}>{title}</h3>
      {children}
    </div>
  )
}

function NotesBody({ notes }: { notes: RevisionNotes }) {
  if (notes.type === 'quick') {
    return (
      <>
        <Section title="Chapter Summary">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{notes.summary}</p>
        </Section>
        {notes.keyConcepts.length > 0 && (
          <Section title="Key Concepts">
            <ul className="space-y-1.5">
              {notes.keyConcepts.map((c, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--coral)' }}>•</span> {c}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {notes.importantTerms.length > 0 && (
          <Section title="Important Terms">
            <dl className="space-y-2">
              {notes.importantTerms.map((t, i) => (
                <div key={i}>
                  <dt className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.term}</dt>
                  <dd className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.definition}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}
        {notes.commonMistakes.length > 0 && (
          <Section title="Common Mistakes">
            <ul className="space-y-1.5">
              {notes.commonMistakes.map((m, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--yellow)' }}>⚠</span> {m}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {notes.recallQuestions.length > 0 && (
          <Section title="Quick Recall Questions">
            <ol className="space-y-2.5">
              {notes.recallQuestions.map((q, i) => (
                <li key={i}>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{i + 1}. {q.question}</p>
                  <p className="text-xs mt-0.5 pl-4" style={{ color: 'var(--text-dim)' }}>{q.answer}</p>
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
            <ul className="space-y-1.5">
              {notes.highWeightTopics.map((t, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--coral)' }}>★</span> {t}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {notes.definitions.length > 0 && (
          <Section title="Important Definitions">
            <dl className="space-y-2">
              {notes.definitions.map((t, i) => (
                <div key={i}>
                  <dt className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.term}</dt>
                  <dd className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.definition}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}
        {notes.likelyMistakes.length > 0 && (
          <Section title="Likely Mistakes">
            <ul className="space-y-1.5">
              {notes.likelyMistakes.map((m, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--yellow)' }}>⚠</span> {m}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {notes.fastRevisionPoints.length > 0 && (
          <Section title="Fast Revision Points">
            <ul className="space-y-1.5">
              {notes.fastRevisionPoints.map((p, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--green)' }}>✓</span> {p}
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
    return <p className="text-sm py-6 text-center" style={{ color: 'var(--text-secondary)' }}>This chapter has no formulas to list.</p>
  }
  return (
    <Section title="Formula Sheet">
      <div className="space-y-3">
        {notes.formulas.map((f, i) => (
          <div key={i} className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
            <p className="text-sm font-bold font-mono mb-1" style={{ color: 'var(--coral)' }}>{f.formula}</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{f.meaning}</p>
            {f.example && <p className="text-xs mt-1 italic" style={{ color: 'var(--text-dim)' }}>e.g. {f.example}</p>}
          </div>
        ))}
      </div>
    </Section>
  )
}
