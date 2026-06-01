'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function StartLessonButton() {
  return (
    <Link
      href="/learn"
      className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-accent-600/30 hover:scale-[1.02] active:scale-[0.98]"
    >
      Начать урок
      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}
