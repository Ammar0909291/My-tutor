'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PLANS, type PlanKey } from '@/lib/payments/plans'

function SuccessContent() {
  const searchParams = useSearchParams()
  const planKey = (searchParams.get('plan') ?? 'pro') as PlanKey
  const plan = PLANS[planKey] ?? PLANS.pro
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? '.' : d + '.')), 500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="text-center max-w-sm">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        Оплата прошла!
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Подписка <strong>{plan.name}</strong> активирована.{' '}
        {planKey === 'annual' ? 'Доступна на 1 год.' : 'Доступна на 1 месяц.'}
      </p>
      <Link
        href="/dashboard"
        className="inline-block px-6 py-3 rounded-xl font-bold text-sm text-white"
        style={{ background: 'var(--accent-primary)' }}>
        Начать учиться →
      </Link>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-base)' }}>
      <Suspense fallback={<div className="text-center" style={{ color: 'var(--text-secondary)' }}>Загрузка...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
