'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
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
  // `/api/settings` is authenticated-only. `LanguageProvider` wraps every page
  // (root layout), including the signed-out login/landing pages, so an
  // unconditional fetch here 401s on every visitor with no stored language
  // preference and no session yet — confirmed live (2026-09-20 QA account,
  // 401 on GET /api/settings during the login-page mount). Gate on session
  // status instead of firing blind.
  const { status } = useSession()

  useEffect(() => {
    const stored = localStorage.getItem('mytutor_lang') as Lang | null
    if (stored && ['ru', 'en', 'hi'].includes(stored)) {
      setLangState(stored)
      setMounted(true)
      return
    }
    if (status === 'loading') return // wait for the session to resolve before deciding
    if (status !== 'authenticated') {
      // Signed out, no stored preference — nothing server-side to fetch;
      // the English default already matches what SSR rendered.
      setMounted(true)
      return
    }
    // No localStorage preference and a real session — fetch the server-stored
    // teachingLanguage so users on a new device (or after clearing storage)
    // immediately see their chosen language instead of the English default.
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        const serverLang = data?.teachingLanguage as Lang | undefined
        if (serverLang && ['ru', 'en', 'hi'].includes(serverLang)) {
          setLangState(serverLang)
          localStorage.setItem('mytutor_lang', serverLang)
        }
      })
      .catch(() => {})
      .finally(() => { setMounted(true) })
  }, [status])

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
