'use client'
import { SessionProvider } from 'next-auth/react'
import { LanguageProvider } from '@/components/ui/LanguageToggle'
import { ToastProvider } from '@/components/ui/Toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </LanguageProvider>
    </SessionProvider>
  )
}
