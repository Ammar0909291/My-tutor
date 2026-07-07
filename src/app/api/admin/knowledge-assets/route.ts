import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import {
  listExplanationsForReview, reviewExplanationAsset,
  listProbesForReview, reviewProbeAsset,
} from '@/lib/teaching/assets'
import { AssetStatus } from '@prisma/client'

// Admin-only review queue for Explanation Memory / Teaching Action Repository
// DRAFT assets (ADR 14 Phase 2/3, approved exception — see
// WAVE_0_APPROVAL_CHECKLIST.md W1-4/W4-1/W4-3). Only ACTIVE assets are ever
// served to learners; this is the sole way a DRAFT becomes ACTIVE.

export const dynamic = 'force-dynamic'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) return { ok: false as const, res: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  if (!(await isAdmin(session.user.id))) return { ok: false as const, res: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  return { ok: true as const, userId: session.user.id }
}

const querySchema = z.object({
  family: z.enum(['explanation', 'probe']).default('explanation'),
  status: z.enum(['DRAFT', 'REVIEW', 'ACTIVE', 'DEPRECATED', 'RETIRED']).default('DRAFT'),
})

export async function GET(req: Request) {
  const admin = await requireAdmin()
  if (!admin.ok) return admin.res

  const { searchParams } = new URL(req.url)
  const parsed = querySchema.safeParse({
    family: searchParams.get('family') ?? undefined,
    status: searchParams.get('status') ?? undefined,
  })
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })

  const status = AssetStatus[parsed.data.status]
  const assets = parsed.data.family === 'probe'
    ? await listProbesForReview(status)
    : await listExplanationsForReview(status)

  return NextResponse.json({ success: true, family: parsed.data.family, assets })
}

const reviewSchema = z.object({
  family: z.enum(['explanation', 'probe']),
  assetId: z.string(),
  action: z.enum(['approve', 'reject']),
})

export async function PATCH(req: Request) {
  const admin = await requireAdmin()
  if (!admin.ok) return admin.res

  try {
    const body = await req.json()
    const { family, assetId, action } = reviewSchema.parse(body)

    const asset = family === 'probe'
      ? await reviewProbeAsset(assetId, action)
      : await reviewExplanationAsset(assetId, action)

    return NextResponse.json({ success: true, asset })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
