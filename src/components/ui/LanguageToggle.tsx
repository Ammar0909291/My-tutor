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
  const [lang, setLangState] = useState<Lang>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('mytutor_lang') as Lang | null
    if (stored && ['ru', 'en', 'hi'].includes(stored)) {
      setLangState(stored)
    }
    setMounted(true)
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('mytutor_lang', newLang)
    fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teachingLanguage: newLang })
    }).catch(() => {})
  }

  // During SSR and the hydration pass, always use 'en' so server and client HTML match.
  // After mount, switch to the language stored in localStorage.
  const effectiveLang = mounted ? lang : 'en'

  const t = (key: TranslationKey): string => {
    const uiLang = effectiveLang === 'ru' ? 'ru' : 'en'
    return tFn(uiLang, key)
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
  return (
    <div className={`lang-toggle ${className}`}>
      <button className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => setLang('ru')}>RU</button>
      <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
      <button className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>HI</button>
    </div>
  )
}
