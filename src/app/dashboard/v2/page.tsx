import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { getDashboardV2Data } from '@/lib/dashboard/getDashboardV2Data'

export default async function DashboardV2Page() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const data = await getDashboardV2Data(session.user.id)
  return <DashboardV2 data={data} />
}
