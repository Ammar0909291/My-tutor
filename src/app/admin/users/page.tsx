import { prisma } from '@/lib/db/prisma'
import { UserActions } from '../_components/UserActions'
import Link from 'next/link'
import { CandyPage } from '@/components/ui/candy'

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ q?: string; role?: string; status?: string }> }) {
  const { q = '', role = 'all', status = 'all' } = await searchParams
  const where = {
    ...(q ? { OR: [{ name: { contains: q, mode: 'insensitive' as const } }, { email: { contains: q, mode: 'insensitive' as const } }] } : {}),
    ...(role === 'admin' ? { role: 'ADMIN' as const } : role === 'student' ? { role: 'STUDENT' as const } : {}),
    ...(status === 'active' ? { isDeleted: false } : status === 'disabled' ? { isDeleted: true } : {}),
  }
  const [users, total, admins] = await Promise.all([
    prisma.user.findMany({ where, select: { id: true, name: true, email: true, role: true, xpPoints: true, createdAt: true, isDeleted: true }, orderBy: { createdAt: 'desc' }, take: 200 }),
    prisma.user.count(),
    prisma.user.count({ where: { role: 'ADMIN' } }),
  ])
  const badge = (text: string, color: string) => (
    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide" style={{ background: color + '22', color }}>{text}</span>
  )
  return (
    <CandyPage legacy>
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Users</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>{total} total · {admins} admins</p>
      </div>
      <form className="flex gap-2 mb-5 flex-wrap">
        <input name="q" defaultValue={q} placeholder="Search name or email…" className="input-field text-sm py-1.5 px-3 h-8 w-64" />
        <select name="role" defaultValue={role} className="input-field text-sm py-1.5 px-3 h-8" style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>
          <option value="all">All roles</option><option value="admin">Admin</option><option value="student">Student</option>
        </select>
        <select name="status" defaultValue={status} className="input-field text-sm py-1.5 px-3 h-8" style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>
          <option value="all">All status</option><option value="active">Active</option><option value="disabled">Disabled</option>
        </select>
        <button type="submit" className="btn-primary text-xs px-4 h-8">Filter</button>
      </form>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-default)' }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)' }}>
            {['Name','Email','Role','XP','Created','Status','Actions'].map(h => (
              <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {users.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-dim)' }}>No users found</td></tr>}
            {users.map((u, i) => (
              <tr key={u.id} style={{ borderTop: i > 0 ? '1px solid var(--border-default)' : undefined }}>
                <td className="px-4 py-3 font-medium"><Link href={`/admin/users/${u.id}`} className="hover:underline" style={{ color: 'var(--text-primary)' }}>{u.name ?? '—'}</Link></td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                <td className="px-4 py-3">{badge(u.role, u.role === 'ADMIN' ? 'var(--coral)' : 'var(--text-dim)')}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{u.xpPoints.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-dim)' }}>{u.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-3">{badge(u.isDeleted ? 'Disabled' : 'Active', u.isDeleted ? '#F85149' : 'var(--green)')}</td>
                <td className="px-4 py-3"><UserActions userId={u.id} role={u.role} isDeleted={u.isDeleted} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CandyPage>
  )
}
