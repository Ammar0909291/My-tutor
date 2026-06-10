export interface JobReadinessResult {
  profileId: string
  score: number
  updatedAt: Date
}

export async function refreshJobReadiness(_profileId: string): Promise<JobReadinessResult | null> {
  return null
}
