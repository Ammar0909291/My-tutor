'use client'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function StartLessonButton() {
  return (
    <Link
      href="/learn"
      className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-900/40 hover:shadow-lg hover:-translate-y-0.5"
    >
      Начать урок
      <ChevronRight size={16} />
    </Link>
  )
}
