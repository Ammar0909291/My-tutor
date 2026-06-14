export default function AdminSettingsPage() {
  const envKeys = [
    { key: 'DATABASE_URL', desc: 'Postgres connection', secret: true },
    { key: 'AUTH_SECRET', desc: 'NextAuth session secret', secret: true },
    { key: 'SMTP_HOST', desc: 'Email SMTP host', secret: false },
    { key: 'SMTP_USER', desc: 'Email SMTP user', secret: false },
    { key: 'SMTP_PASS', desc: 'Email SMTP password', secret: true },
    { key: 'GROQ_API_KEY', desc: 'Groq AI provider', secret: true },
    { key: 'YANDEX_API_KEY', desc: 'YandexGPT provider', secret: true },
    { key: 'NEXT_PUBLIC_APP_URL', desc: 'Public app URL', secret: false },
    { key: 'ADMIN_EMAILS', desc: 'Admin bootstrap allowlist (CSV)', secret: false },
    { key: 'AI_GLOBAL_RPM', desc: 'Global AI rate limit (req/min)', secret: false },
    { key: 'GOOGLE_CLIENT_ID', desc: 'Google OAuth client', secret: false },
    { key: 'STRIPE_SECRET_KEY', desc: 'Stripe payments', secret: true },
  ]

  const flags = [
    { name: 'SCHOOL_MODE_ENABLED', value: 'false', desc: 'School UI visible to students' },
    { name: 'SCHOOL_ONBOARDING_ENABLED', value: 'true', desc: 'Board/grade selection at signup' },
  ]

  const status = (key: string, secret: boolean) => {
    const set = !!(process.env[key])
    return (
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase`}
        style={{ background: set ? 'var(--green)22' : '#F8514922', color: set ? 'var(--green)' : '#F85149' }}>
        {set ? (secret ? 'Set ✓' : process.env[key]!.slice(0, 30) + (process.env[key]!.length > 30 ? '…' : '')) : 'Not set'}
      </span>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>System Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>Environment status and feature flags — read-only</p>
      </div>
      <div className="rounded-xl border p-5 mb-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
        <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: 'var(--text-dim)' }}>Environment Variables</h2>
        {envKeys.map(({ key, desc, secret }) => (
          <div key={key} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border-default)' }}>
            <div>
              <p className="text-xs font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{key}</p>
              <p className="text-[11px]" style={{ color: 'var(--text-dim)' }}>{desc}</p>
            </div>
            {status(key, secret)}
          </div>
        ))}
      </div>
      <div className="rounded-xl border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
        <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: 'var(--text-dim)' }}>Feature Flags</h2>
        {flags.map(({ name, value, desc }) => (
          <div key={name} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border-default)' }}>
            <div>
              <p className="text-xs font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{name}</p>
              <p className="text-[11px]" style={{ color: 'var(--text-dim)' }}>{desc}</p>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase"
              style={{ background: value==='true' ? 'var(--green)22' : 'var(--text-dim)22', color: value==='true' ? 'var(--green)' : 'var(--text-dim)' }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
