'use client'
import { useEffect, useRef, useState } from 'react'
import { Check, Play } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { speakText } from '@/lib/tts'
import type { TeachingLang, VoiceType } from '@/lib/tts'
import { useCountry } from '@/components/Providers'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { SKILL_LEVELS, type SkillLevel } from '@/lib/curriculum/levels'

const FALLBACK_SUBJECTS = [
  { id: 'c',          slug: 'c',          name: 'C',          icon: 'C',   accent: '#F78166', subAccent: 'rgba(247,129,102,0.1)' },
  { id: 'cpp',        slug: 'cpp',        name: 'C++',        icon: 'C++', accent: '#79C0FF', subAccent: 'rgba(121,192,255,0.08)' },
  { id: 'python',     slug: 'python',     name: 'Python',     icon: '🐍',  accent: '#56D364', subAccent: 'rgba(86,211,100,0.08)' },
  { id: 'english',    slug: 'english',    name: 'English',    icon: '🇬🇧', accent: '#E3B341', subAccent: 'rgba(227,179,65,0.08)' },
  { id: 'javascript', slug: 'javascript', name: 'JavaScript', icon: 'JS',  accent: '#F7DF1E', subAccent: 'rgba(247,223,30,0.08)' },
  { id: 'typescript', slug: 'typescript', name: 'TypeScript', icon: 'TS',  accent: '#3178C6', subAccent: 'rgba(49,120,198,0.08)' },
  { id: 'russian',    slug: 'russian',    name: 'Russian',    icon: 'Рус', accent: '#A371F7', subAccent: 'rgba(163,113,247,0.08)' },
  { id: 'java',   slug: 'java',   name: 'Java',   icon: '☕',  accent: '#E76F00', subAccent: 'rgba(231,111,0,0.08)' },
  { id: 'csharp', slug: 'csharp', name: 'C#',     icon: 'C#',  accent: '#9B4993', subAccent: 'rgba(155,73,147,0.08)' },
  { id: 'go',     slug: 'go',     name: 'Go',     icon: 'Go',  accent: '#00ACD7', subAccent: 'rgba(0,172,215,0.08)' },
  { id: 'rust',   slug: 'rust',   name: 'Rust',   icon: '⚙',  accent: '#CE422B', subAccent: 'rgba(206,66,43,0.08)' },
  { id: 'ai',     slug: 'ai',     name: 'AI',     icon: '🤖', accent: '#7C3AED', subAccent: 'rgba(124,58,237,0.08)' },
]

const VOICES = [
  { key: 'male',   labelKey: 'voice_male'   as const, icon: '👨‍🏫' },
  { key: 'female', labelKey: 'voice_female' as const, icon: '👩‍🏫' },
  { key: 'warm',   labelKey: 'voice_warm'   as const, icon: '😊'  },
]

const PREVIEW_TEXT: Record<TeachingLang, string> = {
  ru: 'Привет! Я твой репетитор. Сегодня мы начнём с основ.',
  en: 'Hi! I am your tutor. Today we will start with the basics.',
  hi: 'नमस्ते! मैं आपका ट्यूटर हूँ। आज हम बुनियादी बातों से शुरू करेंगे।',
}

const PLACEHOLDER_CYCLE = [
  'I have never programmed before, want to start from scratch...',
  'I know basic Python, want to move to C...',
  'Studied C at university but forgot a lot...',
]

const STEPS_COUNT = 4

export function OnboardingWizard({ userName }: { userName: string | null | undefined }) {
  const { t } = useLanguage()
  const { country } = useCountry()
  const [step, setStep] = useState(1)
  const [subjects, setSubjects] = useState<{ id: string; slug: string; name: string; icon?: string }[]>(FALLBACK_SUBJECTS)
  const [subjectSlugs, setSubjectSlugs] = useState<string[]>([])
  const [skillLevel, setSkillLevel] = useState<SkillLevel | ''>('')
  const [description, setDescription] = useState('')
  const [voiceKey, setVoiceKey] = useState('female')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Derive teaching language from country selection
  const teachingLang: TeachingLang = country === 'ru' ? 'ru' : country === 'in' ? 'hi' : 'en'

  useEffect(() => {
    // Fetch the full Subject Library (not just the legacy 4-subject /api/subjects)
    // so every catalog entry — languages, programming, mathematics, sciences — is
    // selectable at onboarding and resolves correctly against /api/onboarding.
    fetch('/api/subjects/library').then(r => r.json()).then((data: { success?: boolean; categories?: { subjects: { slug: string; name: string; icon?: string }[] }[] }) => {
      if (data?.success && Array.isArray(data.categories)) {
        const flat = data.categories.flatMap((c) => c.subjects.map((s) => ({ id: s.slug, slug: s.slug, name: s.name, icon: s.icon })))
        if (flat.length > 0) setSubjects(flat)
      }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    const id = setInterval(() => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_CYCLE.length), 3000)
    return () => clearInterval(id)
  }, [])

  const canProceed1 = subjectSlugs.length > 0

  function toggleSubject(slug: string) {
    setSubjectSlugs((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])
  }
  const canProceed2 = skillLevel !== ''
  const canProceed3 = description.trim().length >= 20

  async function handleFinish() {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectSlugs,
          currentLevel: skillLevel || 'beginner',
          selfDescription: description.trim(),
          voiceChoice: voiceKey,
          teachingLanguage: teachingLang,
        }),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.error ?? t('ob_error_generic'))
        setLoading(false); return
      }
      window.location.href = '/dashboard'
    } catch {
      setError(t('ob_error_network'))
      setLoading(false)
    }
  }

  function handleVoicePreview(v: typeof VOICES[0]) {
    speakText(PREVIEW_TEXT[teachingLang], teachingLang, v.key as VoiceType, undefined, country)
  }

  const progressPct = ((step - 1) / (STEPS_COUNT - 1)) * 100

  const SUBJ_ICON: Record<string, string> = { c: 'C', cpp: 'C++', python: '🐍', english: '🇬🇧' }
  const SUBJ_ACCENT: Record<string, string> = { c: '#F78166', cpp: '#79C0FF', python: '#56D364', english: '#E3B341' }
  const SUBJ_SUB: Record<string, string> = {
    c: 'rgba(247,129,102,0.1)', cpp: 'rgba(121,192,255,0.08)',
    python: 'rgba(86,211,100,0.08)', english: 'rgba(227,179,65,0.08)',
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-2">
          <span>🔥</span>
          <span className="font-bold text-sm" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            {t('ob_step')} {step} {t('ob_of')} {STEPS_COUNT}
          </span>
          <ThemeToggle />
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[3px]" style={{ background: 'var(--bg-elevated)' }}>
        <div className="h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPct + 100 / STEPS_COUNT}%`, background: 'var(--accent-primary)' }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">

          {/* Step 1 — Subject */}
          {step === 1 && (
            <div className="animate-scale-in">
              <h1 className="text-2xl md:text-3xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{t('ob_s1_title')}</h1>
              <p className={subjectSlugs.length > 0 ? 'text-sm mb-2' : 'text-sm mb-8'} style={{ color: 'var(--text-secondary)' }}>{t('ob_s1_sub')}</p>
              {subjectSlugs.length > 0 && (
                <p className="text-xs mb-6 font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  {teachingLang === 'ru'
                    ? `Выбрано: ${subjectSlugs.length}`
                    : teachingLang === 'hi'
                    ? `${subjectSlugs.length} चुने गए`
                    : `${subjectSlugs.length} selected`}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {subjects.map((s) => {
                  const selected = subjectSlugs.includes(s.slug)
                  const accent = SUBJ_ACCENT[s.slug] ?? '#F78166'
                  const subAccent = SUBJ_SUB[s.slug] ?? 'rgba(247,129,102,0.1)'
                  const icon = s.icon ?? SUBJ_ICON[s.slug] ?? s.name
                  return (
                    <button key={s.slug} onClick={() => toggleSubject(s.slug)}
                      className="p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 relative"
                      style={{
                        background: selected ? subAccent : 'var(--bg-surface)',
                        border: `1px solid ${selected ? accent : 'var(--border-default)'}`,
                        boxShadow: selected ? `0 0 20px ${accent}20` : 'none',
                        minHeight: 120,
                      }}>
                      {selected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: accent }}>
                          <Check size={11} strokeWidth={3} color="#fff" />
                        </div>
                      )}
                      <div className="text-2xl mb-3 font-black" style={{ color: (s.slug === 'c' || s.slug === 'cpp') ? accent : undefined }}>{icon}</div>
                      <div className="font-bold text-sm mb-1" style={{ color: selected ? accent : 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                        {s.name}
                      </div>
                    </button>
                  )
                })}
              </div>
              <button onClick={() => setStep(2)} disabled={!canProceed1} className="btn-primary w-full py-3.5 font-bold disabled:opacity-40 disabled:cursor-not-allowed">
                {t('ob_next')}
              </button>
            </div>
          )}

          {/* Step 2 — Current skill level (drives curriculum generation) */}
          {step === 2 && (
            <div className="animate-scale-in">
              <h1 className="text-2xl md:text-3xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {teachingLang === 'ru' ? 'Какой у вас текущий уровень?' : 'What is your current level?'}
              </h1>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                {teachingLang === 'ru' ? 'Это поможет построить персональную программу обучения.' : 'This helps us build your personalized learning roadmap.'}
              </p>
              <div className="space-y-2.5 mb-6">
                {SKILL_LEVELS.map((lvl) => {
                  const selected = skillLevel === lvl.key
                  return (
                    <button key={lvl.key} onClick={() => setSkillLevel(lvl.key)}
                      className="w-full flex flex-col items-start gap-0.5 p-4 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: selected ? 'var(--coral-muted)' : 'var(--bg-surface)',
                        border: `1px solid ${selected ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                        boxShadow: selected ? 'var(--coral-glow)' : 'none',
                      }}>
                      <span className="font-bold text-sm" style={{ color: selected ? 'var(--accent-primary)' : 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                        {lvl.label}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{lvl.description}</span>
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost flex-1 py-3">{t('ob_back')}</button>
                <button onClick={() => setStep(3)} disabled={!canProceed2} className="btn-primary flex-1 py-3 font-bold disabled:opacity-40 disabled:cursor-not-allowed">
                  {t('ob_next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Self description */}
          {step === 3 && (
            <div className="animate-scale-in">
              <h1 className="text-2xl md:text-3xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{t('ob_s2_title')}</h1>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{t('ob_s2_sub')}</p>
              <textarea
                ref={textareaRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={PLACEHOLDER_CYCLE[placeholderIdx]}
                rows={6}
                className="w-full px-4 py-3.5 rounded-xl text-sm leading-relaxed resize-none outline-none transition-all duration-200"
                style={{
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${description.length >= 20 ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: description.length >= 20 ? '0 0 0 3px rgba(247,129,102,0.12)' : 'none',
                }}
              />
              <div className="flex justify-between items-center mt-2 mb-6">
                <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{t('ob_s2_hint')}</p>
                <p className="text-xs font-semibold font-mono" style={{ color: description.length >= 20 ? 'var(--accent-primary)' : 'var(--text-dim)' }}>
                  {description.length} / 500
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-ghost flex-1 py-3">{t('ob_back')}</button>
                <button onClick={() => setStep(4)} disabled={!canProceed3} className="btn-primary flex-1 py-3 font-bold disabled:opacity-40 disabled:cursor-not-allowed">
                  {t('ob_next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Voice */}
          {step === 4 && (
            <div className="animate-scale-in">
              <h1 className="text-2xl md:text-3xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{t('ob_s3_title')}</h1>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{t('ob_s3_sub')}</p>
              <div className="space-y-3 mb-5">
                {VOICES.map((v) => {
                  const selected = voiceKey === v.key
                  return (
                    <button key={v.key} onClick={() => setVoiceKey(v.key)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: selected ? 'var(--coral-muted)' : 'var(--bg-surface)',
                        border: `1px solid ${selected ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                        boxShadow: selected ? 'var(--coral-glow)' : 'none',
                      }}>
                      <span className="text-2xl w-10 text-center shrink-0">{v.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm" style={{ color: selected ? 'var(--accent-primary)' : 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{t(v.labelKey)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleVoicePreview(v) }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                          style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}
                          title={t('ob_s3_preview')}>
                          <Play size={10} fill="currentColor" strokeWidth={0} /> ▶
                        </button>
                        <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                          style={{ borderColor: selected ? 'var(--accent-primary)' : 'var(--text-dim)', background: selected ? 'var(--accent-primary)' : 'transparent' }}>
                          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {error && (
                <div className="mb-4 p-3.5 rounded-xl text-sm"
                  style={{ background: 'var(--red-muted)', border: '1px solid var(--coral-border)', color: 'var(--red)' }}>
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="btn-ghost flex-1 py-3">{t('ob_back')}</button>
                <button onClick={handleFinish} disabled={loading} className="btn-primary flex-1 py-3.5 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? t('ob_saving') : t('ob_finish')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
