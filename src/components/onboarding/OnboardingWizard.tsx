'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

const SUBJECTS = [
  { slug: 'c',       icon: '⚙️', name: 'C язык',          desc: 'Указатели, память, системное программирование' },
  { slug: 'cpp',     icon: '🔷', name: 'C++',              desc: 'ООП, STL, современный C++' },
  { slug: 'python',  icon: '🐍', name: 'Python',           desc: 'От основ до продвинутых тем' },
  { slug: 'english', icon: '🇬🇧', name: 'Английский язык', desc: 'Технический английский для разработчиков' },
]

const VOICES = [
  {
    key: 'alexei',
    name: 'Алексей',
    tag: 'строгий · мужской',
    desc: 'Академичный, чёткий, требовательный',
    emoji: '👨‍🏫',
    gradient: 'from-blue-600/25 to-indigo-600/10',
    border: 'border-blue-500/40',
    active: 'border-blue-400/70',
    dot: 'bg-blue-400',
  },
  {
    key: 'maria',
    name: 'Мария',
    tag: 'мягкий · женский',
    desc: 'Добрая, терпеливая, поддерживающая',
    emoji: '👩‍🏫',
    gradient: 'from-violet-600/25 to-purple-600/10',
    border: 'border-violet-500/40',
    active: 'border-violet-400/70',
    dot: 'bg-violet-400',
  },
  {
    key: 'dmitry',
    name: 'Дмитрий',
    tag: 'дружелюбный · мужской',
    desc: 'Неформальный, с юмором, мотивирующий',
    emoji: '😊',
    gradient: 'from-emerald-600/25 to-teal-600/10',
    border: 'border-emerald-500/40',
    active: 'border-emerald-400/70',
    dot: 'bg-emerald-400',
  },
]

const STEPS = ['Предмет', 'Уровень', 'Голос']

export function OnboardingWizard({ userName }: { userName: string | null | undefined }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [subjectSlug, setSubjectSlug] = useState('')
  const [description, setDescription] = useState('')
  const [voiceKey, setVoiceKey] = useState(VOICES[0].key)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canProceed1 = subjectSlug !== ''
  const canProceed2 = description.trim().length >= 20

  async function handleFinish() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectSlug, selfDescription: description.trim(), voiceChoice: voiceKey }),
    })
    const data = await res.json()
    if (!data.success) {
      setError(data.error ?? 'Не удалось сохранить. Попробуй ещё раз.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.7) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 justify-center mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              <span className="text-white font-black text-sm">MT</span>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">My Tutor</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {userName ? `Привет, ${userName}!` : 'Добро пожаловать!'}
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#71717A' }}>Настроим твоё обучение за 1 минуту</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {STEPS.map((label, i) => {
            const s = i + 1
            const done = s < step
            const active = s === step
            return (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{
                      background: done || active ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'rgba(255,255,255,0.06)',
                      color: done || active ? '#fff' : '#52525B',
                      boxShadow: active ? '0 0 20px rgba(99,102,241,0.5)' : 'none',
                    }}>
                    {done ? <Check size={13} strokeWidth={3} /> : s}
                  </div>
                  <span className="text-xs font-medium" style={{ color: active ? '#818CF8' : '#3F3F46' }}>{label}</span>
                </div>
                {s < 3 && (
                  <div className="w-14 h-px mx-1 mb-5 transition-all duration-300"
                    style={{ background: done ? 'linear-gradient(90deg, #6366F1, #8B5CF6)' : 'rgba(255,255,255,0.07)' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Card */}
        <div className="gradient-border">
          <div className="p-7 rounded-[1.25rem]" style={{ background: '#0F0F18' }}>

            {/* Step 1 */}
            {step === 1 && (
              <div className="animate-scale-in">
                <h2 className="text-lg font-black text-white tracking-tight mb-1">Что хочешь изучать?</h2>
                <p className="text-sm mb-6" style={{ color: '#71717A' }}>Выбери один предмет — остальные добавишь позже</p>
                <div className="grid grid-cols-2 gap-3">
                  {SUBJECTS.map((s) => {
                    const selected = subjectSlug === s.slug
                    return (
                      <button key={s.slug} onClick={() => setSubjectSlug(s.slug)}
                        className="p-5 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5 relative"
                        style={{
                          background: selected ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${selected ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.07)'}`,
                          boxShadow: selected ? '0 0 20px rgba(99,102,241,0.2)' : 'none',
                        }}>
                        {selected && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
                            <Check size={11} strokeWidth={3} className="text-white" />
                          </div>
                        )}
                        <div className="text-2xl mb-3">{s.icon}</div>
                        <div className="font-bold text-sm" style={{ color: selected ? '#818CF8' : '#FAFAFA' }}>{s.name}</div>
                        <div className="text-xs mt-1 leading-tight" style={{ color: '#52525B' }}>{s.desc}</div>
                      </button>
                    )
                  })}
                </div>
                <button onClick={() => setStep(2)} disabled={!canProceed1}
                  className="btn-gradient w-full mt-6 py-3.5 rounded-xl text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                  Далее →
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="animate-scale-in">
                <h2 className="text-lg font-black text-white tracking-tight mb-1">Опиши свой уровень</h2>
                <p className="text-sm mb-6" style={{ color: '#71717A' }}>Напиши своими словами — репетитор подстроится именно под тебя</p>
                <div className="gradient-border">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Например: я никогда не программировал, хочу начать с нуля и научиться писать простые программы..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-[1.25rem] text-sm text-white placeholder-zinc-600 focus:outline-none resize-none leading-relaxed"
                    style={{ background: '#0F0F18' }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 mb-6">
                  <p className="text-xs" style={{ color: '#3F3F46' }}>Минимум 20 символов</p>
                  <p className="text-xs font-semibold" style={{ color: description.length >= 20 ? '#6366F1' : '#3F3F46' }}>
                    {description.length} / 500
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-ghost flex-1 py-3 rounded-xl text-sm font-semibold text-zinc-300">
                    ← Назад
                  </button>
                  <button onClick={() => setStep(3)} disabled={!canProceed2}
                    className="btn-gradient flex-1 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                    Далее →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="animate-scale-in">
                <h2 className="text-lg font-black text-white tracking-tight mb-1">Выбери голос репетитора</h2>
                <p className="text-sm mb-6" style={{ color: '#71717A' }}>Репетитор будет объяснять по-русски выбранным голосом</p>
                <div className="space-y-3">
                  {VOICES.map((v) => {
                    const selected = voiceKey === v.key
                    return (
                      <button key={v.key} onClick={() => setVoiceKey(v.key)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 bg-gradient-to-br ${v.gradient} ${selected ? v.active : v.border} hover:-translate-y-0.5`}
                        style={{ boxShadow: selected ? '0 0 20px rgba(99,102,241,0.15)' : 'none' }}>
                        <div className="text-2xl w-10 text-center shrink-0">{v.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="font-bold text-sm text-white">{v.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium text-zinc-400" style={{ background: 'rgba(255,255,255,0.06)' }}>
                              {v.tag}
                            </span>
                          </div>
                          <p className="text-xs" style={{ color: '#71717A' }}>{v.desc}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-200 ${selected ? 'border-transparent' : 'border-white/20'}`}
                          style={selected ? { background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' } : {}}>
                          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {error && (
                  <div className="mt-4 p-3.5 rounded-xl border border-red-500/20 text-red-400 text-sm"
                    style={{ background: 'rgba(239,68,68,0.08)' }}>
                    {error}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="btn-ghost flex-1 py-3 rounded-xl text-sm font-semibold text-zinc-300">
                    ← Назад
                  </button>
                  <button onClick={handleFinish} disabled={loading}
                    className="btn-gradient flex-1 py-3.5 rounded-xl text-sm font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                    {loading ? 'Сохраняем...' : 'Начать обучение →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
