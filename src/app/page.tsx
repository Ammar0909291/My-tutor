import Link from 'next/link'
import { ArrowRight, Brain, Code2, Mic, Sparkles } from 'lucide-react'

const FEATURES = [
  { icon: Brain,  title: 'Персональный подход', desc: 'AI анализирует твои ответы и адаптирует стиль объяснений именно под тебя.' },
  { icon: Mic,    title: 'Голосовое общение',   desc: 'Говори с репетитором голосом прямо в браузере — он отвечает на русском.' },
  { icon: Code2,  title: 'Редактор кода',        desc: 'Пиши и разбирай код прямо в уроке — встроенный редактор как в VS Code.' },
]

const SUBJECTS = [
  { icon: '⚙️', name: 'C',       desc: 'Системное программирование' },
  { icon: '🔷', name: 'C++',     desc: 'ООП и современный C++' },
  { icon: '🐍', name: 'Python',  desc: 'От основ до продвинутого' },
  { icon: '🇬🇧', name: 'English', desc: 'Технический английский' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Ambient gradient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-600/20 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-[60%] -right-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-700 rounded-lg flex items-center justify-center shadow-lg shadow-accent-600/30">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="font-semibold text-white">My Tutor</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Войти
            </Link>
            <Link href="/auth/signup" className="px-4 py-2 text-sm font-semibold text-white bg-accent-600 rounded-xl hover:bg-accent-500 transition-all shadow-lg shadow-accent-600/30 hover:scale-[1.02] active:scale-[0.98]">
              Начать бесплатно
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-accent-300 text-sm font-medium mb-8">
            <Sparkles size={14} className="text-accent-400" />
            Первый урок — бесплатно
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
            Твой личный
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-blue-400 to-accent-300 bg-[length:200%_auto] animate-gradient">
              AI-репетитор
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Учи C, C++, Python и английский язык с персональным AI-репетитором,
            который помнит твой прогресс. Доступно 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-accent-600 rounded-2xl hover:bg-accent-500 transition-all shadow-xl shadow-accent-600/30 hover:scale-[1.02] active:scale-[0.98]">
              Начать бесплатно
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/auth/login" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-200 glass rounded-2xl hover:bg-white/5 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Войти
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-14">Почему My Tutor?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="group glass rounded-2xl p-7 hover:bg-white/5 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-accent-600/15 border border-accent-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon size={22} className="text-accent-400" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Что ты можешь изучать</h2>
          <p className="text-slate-400 mb-14">Выбери предмет — репетитор подстроится под твой уровень с первого сообщения.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUBJECTS.map((s) => (
              <div key={s.name} className="group glass rounded-2xl p-7 hover:border-accent-500/40 hover:bg-accent-600/5 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="font-bold text-white text-lg group-hover:text-accent-300 transition-colors">{s.name}</div>
                <div className="text-xs text-slate-400 mt-1.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 overflow-hidden relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-600/20 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Начни учиться прямо сейчас</h2>
            <p className="text-slate-300 mb-8">Первый урок бесплатно. Без кредитной карты.</p>
            <Link href="/auth/signup" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-accent-600 rounded-2xl hover:bg-accent-500 transition-all shadow-xl shadow-accent-600/30 hover:scale-[1.02] active:scale-[0.98]">
              Создать аккаунт бесплатно
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-accent-500 to-accent-700 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">MT</span>
            </div>
            <span className="text-sm font-medium text-slate-300">My Tutor</span>
          </div>
          <p className="text-xs text-slate-500">© 2026 My Tutor. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
