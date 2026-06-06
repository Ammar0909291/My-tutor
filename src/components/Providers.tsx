'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { LanguageProvider } from '@/components/ui/LanguageToggle'
import { ToastProvider } from '@/components/ui/Toast'

// ─── Country context ──────────────────────────────────────────────────────────

export type Country = 'ru' | 'in' | 'global'

interface CountryContextValue {
  country: Country
  setCountry: (c: Country) => void
}

const CountryContext = createContext<CountryContextValue>({
  country: 'global',
  setCountry: () => {},
})

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<Country>('global')

  useEffect(() => {
    const stored = localStorage.getItem('mytutor_country') as Country | null
    if (stored && ['ru', 'in', 'global'].includes(stored)) {
      setCountryState(stored)
    }
  }, [])

  const setCountry = (c: Country) => {
    setCountryState(c)
    localStorage.setItem('mytutor_country', c)
    fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: c }),
    }).catch(() => {})
  }

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  return useContext(CountryContext)
}

// ─── Root providers ───────────────────────────────────────────────────────────

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <CountryProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CountryProvider>
      </LanguageProvider>
    </SessionProvider>
  )
}
