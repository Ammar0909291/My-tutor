'use client'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

interface AuthBackLinkProps {
  href: string
  label: string
  icon?: 'home' | 'arrow'
}

export function AuthBackLink({ href, label, icon = 'arrow' }: AuthBackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:brightness-110"
      style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
    >
      <ArrowLeft size={14} />
      {icon === 'home' && <Home size={14} />}
      {label}
    </Link>
  )
}
