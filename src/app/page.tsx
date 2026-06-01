import Link from 'next/link'
import { ArrowRight, Mic, Code2, Brain, Zap, Star } from 'lucide-react'

const FEATURES = [
  {
    icon: Mic,
    title: 'Живой голос',
    desc: 'Репетитор говорит, объясняет и отвечает голосом — как настоящий преподаватель рядом с тобой.',
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/15',
  },
  {
    icon: Code2,
    title: 'Код на экране',
    desc: 'Видишь как пишется код — строка за строкой, с объяснениями каждого шага в реальном времени.',
    gradient: 'from-indigo-500/20 to-blue-500/10',
    border: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/15',
  },
  {
    icon: Brain,
    title: 'Помнит тебя',
    desc: 'Знает где ты остановился, что уже понял, и продолжает обучение именно с этого места.',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
  },
]

const SUBJECTS = [
  { icon: '⚙️', name: 'C',       desc: 'Системное программирование' },
  { icon: '🔷', name: 'C++',     desc: 'Объектно-ориентированный подход' },
  { icon: '🐍', name: 'Python',  desc: 'Быстрый старт в разработке' },
  { icon: '🇬🇧', name: 'English', desc: 'Деловой и технический английский' },
]

const TICKER_ITEMS = [
  '⚙️ C язык', '🔷 C++', '🐍 Python', '🇬🇧 Английский',
  '⚙️ C язык', '🔷 C++', '🐍 Python', '🇬🇧 Английский',
]

export default function HomePage() {
  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ background: '#0A0A0F' }}>

      {/* ── Mesh gradient background ── */}
      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
      </div>

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              <span className="text-white font-black text-sm">MT</span>
            </div>
            <span className="font-bold text-white text-sm tracking-tight">My Tutor</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">
              Войти
            </Link>
            <Link href="/auth/signup" className="btn-gradient px-5 py-2 rounded-lg text-sm font-semibold text-white">
              Начать бесплатно
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-28 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-slide-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm font-medium mb-10 text-zinc-300"
            style={{ background: 'rgba(99,102,241,0.1)' }}>
            <span className="text-accent-400">✦</span>
            Первый урок бесплатно — без кредитной карты
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[1.02] mb-7 tracking-tighter"
            style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}>
            Твой личный
            <br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 40%, #60A5FA 100%)' }}>
              AI‑репетитор
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: '#71717A' }}>
            Учи C, C++ и Python как с живым преподавателем.
            <br className="hidden md:block" />
            Голос. Код. Объяснения на русском — доступно 24/7.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup"
              className="btn-gradient group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white">
              Начать бесплатно
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link href="/auth/login"
              className="btn-ghost inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-zinc-200">
              Войти в аккаунт
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-12 text-xs text-zinc-600">
            {['Без кредитной карты', 'Отмена в любое время', 'Поддержка 24/7'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Star size={10} className="text-accent-500" fill="currentColor" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof ticker ── */}
      <div className="relative z-10 border-y border-white/[0.06] py-4 overflow-hidden" style={{ background: 'rgba(99,102,241,0.04)' }}>
        <div className="flex gap-0 whitespace-nowrap" style={{ animation: 'ticker 20s linear infinite' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-8 text-sm font-medium text-zinc-400">
              {item}
              <span className="text-accent-600 opacity-50">•</span>
            </span>
          ))}
        </div>
        <p className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-zinc-600 hidden sm:block">Учат прямо сейчас</p>
      </div>

      {/* ── Features ── */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-400 mb-4"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
              Возможности
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">Почему My Tutor?</h2>
            <p className="mt-3 text-zinc-500 max-w-xl mx-auto">Не просто чат с AI — полноценный репетитор с голосом, кодом и памятью.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title}
                className={`group relative rounded-2xl p-7 border ${f.border} bg-gradient-to-br ${f.gradient} backdrop-blur-sm hover:-translate-y-1 transition-all duration-300`}
                style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))` }}>
                <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-5 border ${f.border}`}>
                  <f.icon size={22} className={f.iconColor} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2.5">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white tracking-tight">Что можно изучать</h2>
            <p className="mt-3 text-zinc-500">Репетитор подстроится под твой уровень с первого сообщения.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUBJECTS.map((s) => (
              <div key={s.name}
                className="group relative rounded-2xl p-6 border border-white/[0.07] hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="font-bold text-white text-lg group-hover:text-accent-300 transition-colors">{s.name}</div>
                <div className="text-xs text-zinc-600 mt-1.5 leading-tight">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="gradient-border p-[1px] rounded-3xl">
            <div className="relative rounded-3xl p-14 text-center overflow-hidden" style={{ background: '#0F0F18' }}>
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
              <div className="relative">
                <div className="inline-flex items-center gap-2 mb-6">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={16} className="text-accent-400" fill="currentColor" />)}
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight mb-4">Начни учиться прямо сейчас</h2>
                <p className="text-zinc-500 mb-10 text-lg">Первый урок бесплатно. Без кредитной карты. Без обязательств.</p>
                <Link href="/auth/signup"
                  className="btn-gradient inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-white">
                  Создать аккаунт бесплатно
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              <span className="text-white font-black text-xs">MT</span>
            </div>
            <span className="text-sm font-semibold text-zinc-400">My Tutor</span>
          </div>
          <p className="text-xs text-zinc-700">© 2026 My Tutor. Все права защищены.</p>
          <div className="flex gap-5 text-xs text-zinc-600">
            <Link href="/auth/login" className="hover:text-zinc-400 transition-colors">Войти</Link>
            <Link href="/auth/signup" className="hover:text-zinc-400 transition-colors">Регистрация</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
