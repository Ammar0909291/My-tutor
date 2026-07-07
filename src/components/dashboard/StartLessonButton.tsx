'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'

export function StartLessonButton() {
  const { t } = useLanguage()
  return (
    <Link
      href="/learn"
      className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-accent-600/30 hover:scale-[1.02] active:scale-[0.98]"
      style={{ background: 'var(--accent-primary)', textDecoration: 'none' }}
    >
      {t('dash_start_lesson')}
      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}
