import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import FlashcardsClient from './FlashcardsClient'

export default async function FlashcardsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  return <FlashcardsClient />
}
