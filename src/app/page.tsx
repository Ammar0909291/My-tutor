import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="font-semibold text-slate-900">My Tutor</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Войти
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Начать бесплатно
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8 border border-indigo-100">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            Первый урок — бесплатно
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            My Tutor — твой личный
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              AI-репетитор
            </span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Учи C, C++, Python и английский язык с персональным AI-репетитором.
            Доступно 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5"
            >
              Начать бесплатно →
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all hover:-translate-y-0.5"
            >
              Войти
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">
            Почему My Tutor?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧠',
                title: 'Персональный подход',
                desc: 'Claude анализирует твои ответы и адаптирует стиль объяснений под тебя',
              },
              {
                icon: '🎙️',
                title: 'Голосовое общение',
                desc: 'Говори с репетитором голосом, получай ответы на русском языке',
              },
              {
                icon: '💻',
                title: 'Редактор кода',
                desc: 'Пиши код прямо в уроке — Monaco Editor как в VS Code',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Что ты можешь изучать
          </h2>
          <p className="text-slate-500 mb-12">
            Выбери предмет — репетитор подстроится под твой уровень с первого сообщения
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '⚙️', name: 'C', desc: 'Системное программирование' },
              { icon: '🔷', name: 'C++', desc: 'ООП и современный C++' },
              { icon: '🐍', name: 'Python', desc: 'От основ до продвинутого' },
              { icon: '🇬🇧', name: 'English', desc: 'Технический английский' },
            ].map((s) => (
              <div
                key={s.name}
                className="p-6 border-2 border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/40 transition-all group"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {s.name}
                </div>
                <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-indigo-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Начни учиться прямо сейчас
          </h2>
          <p className="text-indigo-200 mb-8">
            Первый урок бесплатно. Без кредитной карты.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 text-base font-semibold text-indigo-600 bg-white rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Создать аккаунт бесплатно →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">MT</span>
            </div>
            <span className="text-sm font-medium text-slate-600">My Tutor</span>
          </div>
          <p className="text-xs text-slate-400">© 2025 My Tutor. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
