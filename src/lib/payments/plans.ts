export type PlanKey = 'free' | 'basic' | 'pro' | 'annual'

export const PLANS = {
  free: {
    key: 'free' as PlanKey,
    name: 'Бесплатно',
    price: 0,
    currency: 'RUB',
    period: null,
    lessonLimit: 3,       // total across all time
    monthlyLimit: null,
    features: [
      '3 пробных урока',
      'Все предметы',
      'Голосовой репетитор',
      'Флэшкарты',
    ],
  },
  basic: {
    key: 'basic' as PlanKey,
    name: 'Basic',
    price: 490,
    currency: 'RUB',
    period: 'month' as const,
    lessonLimit: null,
    monthlyLimit: 30,
    features: [
      '30 уроков в месяц',
      'История сессий',
      'Флэшкарты',
      'Прогресс по темам',
    ],
  },
  pro: {
    key: 'pro' as PlanKey,
    name: 'Pro',
    price: 990,
    currency: 'RUB',
    period: 'month' as const,
    lessonLimit: null,
    monthlyLimit: null,
    features: [
      'Безлимитные уроки',
      'Все функции Basic',
      'Приоритетная поддержка',
      'Ранний доступ к новым функциям',
    ],
  },
  annual: {
    key: 'annual' as PlanKey,
    name: 'Pro Годовой',
    price: 7900,
    currency: 'RUB',
    period: 'year' as const,
    lessonLimit: null,
    monthlyLimit: null,
    features: [
      'Безлимитные уроки',
      'Все функции Pro',
      'Скидка 33% vs месячный',
      'Приоритетная поддержка',
    ],
  },
} as const
