'use client'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'

export function SignOutButton() {
  const { t } = useLanguage()
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
    >
      <LogOut size={15} />
      <span className="hidden sm:inline">{t('dash_signout')}</span>
    </button>
  )
}
