'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import type { Lang } from '@/lib/i18n'
import { translations, t as tFn } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/i18n'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key) => translations.en[key] ?? key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('mytutor_lang') as Lang | null
    if (stored && ['ru', 'en', 'hi'].includes(stored)) setLangState(stored)
    setMounted(true)
  }, [])

  const effectiveLang = mounted ? lang : 'en'

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('mytutor_lang', newLang)
    fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teachingLanguage: newLang }),
    }).catch(() => {})
  }

  const t = (key: TranslationKey): string => {
    return tFn(effectiveLang, key)
  }

  return (
    <LangContext.Provider value={{ lang: effectiveLang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LangContext)
}

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage()
  // Mounted guard: server always renders lang='en'; the active highlight is only
  // applied after hydration so SSR and client markup match (no hydration error).
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const active = mounted ? lang : 'en'
  return (
    <div className={`lang-toggle ${className}`}>
      <button className={`lang-btn ${active === 'ru' ? 'active' : ''}`} onClick={() => setLang('ru')}>RU</button>
      <button className={`lang-btn ${active === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
      <button className={`lang-btn ${active === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>HI</button>
    </div>
  )
}
