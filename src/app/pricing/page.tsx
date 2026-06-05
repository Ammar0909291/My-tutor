'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PLANS, type PlanKey } from '@/lib/payments/plans'
import { useRouter } from 'next/navigation'

const PLAN_ORDER: PlanKey[] = ['free', 'basic', 'pro', 'annual']

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<PlanKey | null>(null)

  async function handleSelect(planKey: PlanKey) {
    if (planKey === 'free') { router.push('/dashboard'); return }
    setLoading(planKey)
    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey }),
      })
      const data = await res.json() as { success?: boolean; confirmationUrl?: string; error?: string }
      if (data.success && data.confirmationUrl) {
        window.location.href = data.confirmationUrl
      } else if (data.error === 'Unauthorized') {
        router.push('/auth/login?next=/pricing')
      } else {
        alert(data.error ?? 'Ошибка оплаты')
      }
    } catch {
      alert('Ошибка соединения')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="text-sm" style={{ color: 'var(--text-secondary)' }}>← Назад</Link>
          <h1 className="text-2xl font-bold flex-1 text-center">Выберите план</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLAN_ORDER.map((key) => {
            const plan = PLANS[key]
            const isPro = key === 'pro'
            const isAnnual = key === 'annual'

            return (
              <div
                key={key}
                className="rounded-2xl p-5 flex flex-col relative"
                style={{
                  background: isPro ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  border: isPro ? 'none' : '1px solid var(--border-default)',
                  color: isPro ? '#fff' : 'var(--text-primary)',
                }}>

                {isPro && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    Популярный
                  </span>
                )}
                {isAnnual && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Скидка 33%
                  </span>
                )}

                <div className="mb-4">
                  <h2 className="text-lg font-bold">{plan.name}</h2>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">
                      {plan.price === 0 ? '0' : plan.price.toLocaleString('ru')}
                    </span>
                    <span className="text-sm opacity-70">
                      {plan.price === 0 ? '' : ` ₽/${plan.period === 'year' ? 'год' : 'мес'}`}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-xs mt-1 opacity-70">= 658 ₽/мес</p>
                  )}
                </div>

                <ul className="flex-1 space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className={isPro ? 'text-white' : ''} style={{ color: isPro ? '#fff' : 'var(--accent-primary)' }}>✓</span>
                      <span className="opacity-90">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(key)}
                  disabled={loading !== null}
                  className="w-full py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
                  style={{
                    background: isPro ? 'rgba(255,255,255,0.25)' : key === 'free' ? 'transparent' : 'var(--accent-primary)',
                    color: isPro ? '#fff' : key === 'free' ? 'var(--text-secondary)' : '#fff',
                    border: key === 'free' ? '1px solid var(--border-default)' : 'none',
                  }}>
                  {loading === key ? '...' : key === 'free' ? 'Начать бесплатно' : 'Выбрать'}
                </button>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-dim)' }}>
          Оплата через YooKassa. Автопродление отсутствует — разовый платёж на период.
        </p>
      </div>
    </div>
  )
}
