'use client'
import { useTransition } from 'react'
import { promoteUser, demoteUser, disableUser, enableUser } from '../_actions/users'

export function UserActions({ userId, role, isDeleted }: { userId: string; role: string; isDeleted: boolean }) {
  const [pending, start] = useTransition()
  const btn = (label: string, action: () => Promise<void>, color = 'var(--text-secondary)') => (
    <button disabled={pending}
      onClick={() => start(() => action())}
      className="text-xs px-2 py-1 rounded border transition-colors hover:bg-white/5 disabled:opacity-40"
      style={{ borderColor: 'var(--border-default)', color }}>
      {label}
    </button>
  )
  return (
    <div className="flex gap-1.5 flex-wrap">
      {role === 'STUDENT' && btn('Promote', () => promoteUser(userId), 'var(--coral)')}
      {role === 'ADMIN'   && btn('Demote',  () => demoteUser(userId))}
      {!isDeleted && btn('Disable', () => disableUser(userId), '#F85149')}
      {isDeleted  && btn('Enable',  () => enableUser(userId),  'var(--green)')}
    </div>
  )
}
