'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

const SUBJECTS = [
  {
    slug: 'c',
    icon: '⚙️',
    name: 'C язык',
    desc: 'Указатели, память, системное программирование',
  },
  {
    slug: 'cpp',
    icon: '🔷',
    name: 'C++',
    desc: 'ООП, STL, современный C++',
  },
  {
    slug: 'python',
    icon: '🐍',
    name: 'Python',
    desc: 'От основ до продвинутых тем',
  },
  {
    slug: 'english',
    icon: '🇬🇧',
    name: 'Английский язык',
    desc: 'Технический английский для разработчиков',
  },
]

const VOICES = [
  {
    key: 'alexei',
    name: 'Алексей',
    gender: 'мужской',
    style: 'строгий',
    emoji: '👨‍🏫',
    desc: 'Академичный, чёткий, требовательный',
  },
  {
    key: 'maria',
    name: 'Мария',
    gender: 'женский',
    style: 'мягкий',
    emoji: '👩‍🏫',
    desc: 'Добрая, терпеливая, поддерживающая',
  },
  {
    key: 'dmitry',
    name: 'Дмитрий',
    gender: 'мужской',
    style: 'дружелюбный',
    emoji: '😊',
    desc: 'Неформальный, с юмором, мотивирующий',
  },
]

const STEP_LABELS = ['Предмет', 'Уровень', 'Голос']

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
      body: JSON.stringify({
        subjectSlug,
        selfDescription: description.trim(),
        voiceChoice: voiceKey,
      }),
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo + title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="font-bold text-lg text-slate-900">My Tutor</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {userName ? `Привет, ${userName}!` : 'Добро пожаловать!'} 👋
          </h1>
          <p className="mt-2 text-slate-500 text-sm">Настроим твоё обучение — займёт 1 минуту</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {STEP_LABELS.map((label, i) => {
            const s = i + 1
            const done = s < step
            const active = s === step
            return (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      done
                        ? 'bg-indigo-600 text-white'
                        : active
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {done ? <CheckCircle size={14} /> : s}
                  </div>
                  <span className={`text-xs font-medium ${active ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </div>
                {s < 3 && (
                  <div className={`w-16 h-0.5 mx-1 mb-4 transition-all ${done ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-fade-in">

          {/* ── Step 1: Subject ── */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Что хочешь изучать?</h2>
              <p className="text-sm text-slate-500 mb-6">
                Выбери один предмет — остальные можно добавить позже
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SUBJECTS.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => setSubjectSlug(s.slug)}
                    className={`p-5 rounded-xl border-2 text-left transition-all hover:-translate-y-0.5 ${
                      subjectSlug === s.slug
                        ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className={`font-bold text-sm ${subjectSlug === s.slug ? 'text-indigo-700' : 'text-slate-900'}`}>
                      {s.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-tight">{s.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!canProceed1}
                className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Далее →
              </button>
            </div>
          )}

          {/* ── Step 2: Level description ── */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Опиши свой уровень</h2>
              <p className="text-sm text-slate-500 mb-6">
                Напиши своими словами — Claude построит программу именно для тебя
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Например: я никогда не программировал, хочу начать с нуля и научиться писать простые программы..."
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none leading-relaxed"
              />
              <div className="flex justify-between items-center mt-2 mb-6">
                <p className="text-xs text-slate-400">Минимум 20 символов</p>
                <p className={`text-xs font-medium ${description.length >= 20 ? 'text-green-500' : 'text-slate-400'}`}>
                  {description.length} символов
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border-2 border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  ← Назад
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceed2}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Далее →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Voice ── */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Выбери голос репетитора</h2>
              <p className="text-sm text-slate-500 mb-6">
                Репетитор будет объяснять по-русски выбранным голосом
              </p>
              <div className="space-y-3">
                {VOICES.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setVoiceKey(v.key)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      voiceKey === v.key
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-2xl w-10 text-center shrink-0">{v.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold text-sm ${voiceKey === v.key ? 'text-indigo-700' : 'text-slate-900'}`}>
                          {v.name}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          voiceKey === v.key ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {v.gender}, {v.style}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{v.desc}</p>
                    </div>
                    {voiceKey === v.key && <CheckCircle size={18} className="text-indigo-500 shrink-0" />}
                  </button>
                ))}
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 border-2 border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  ← Назад
                </button>
                <button
                  onClick={handleFinish}
                  disabled={loading}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Сохраняем...' : 'Начать обучение 🚀'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
