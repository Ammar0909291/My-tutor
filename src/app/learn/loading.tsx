'use client'

import { PageLoadingSkeleton } from '@/components/ui/candy'
import { useLanguage } from '@/components/ui/LanguageToggle'

export default function Loading() {
  const { t } = useLanguage()
  return <PageLoadingSkeleton label={t('learn_loading_lesson')} />
}
