import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { MOCK_DASHBOARD_DATA } from '@/components/dashboard/v2/mockData'

/**
 * Phase 1 preview route — presentational only, mock data.
 * Phase 2 will wire this to GET /api/dashboard.
 */
export default function DashboardV2Page() {
  return <DashboardV2 data={MOCK_DASHBOARD_DATA} />
}
