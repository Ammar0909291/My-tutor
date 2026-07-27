'use server'
import { prisma } from '@/lib/db/prisma'
import { requireAdmin } from '@/lib/auth/admin'
import { reviewExplanationAsset } from '@/lib/teaching/assets/explanationMemory'
import { reviewProbeAsset } from '@/lib/teaching/assets/teachingActionRepository'
import { AssetStatus, AssetFamily } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function approveAsset(assetId: string, family: 'explanation' | 'probe') {
  await requireAdmin()
  if (family === 'probe') {
    await reviewProbeAsset(assetId, 'approve')
  } else {
    await reviewExplanationAsset(assetId, 'approve')
  }
  revalidatePath('/admin/knowledge-assets')
  revalidatePath('/admin')
}

export async function rejectAsset(assetId: string, family: 'explanation' | 'probe') {
  await requireAdmin()
  if (family === 'probe') {
    await reviewProbeAsset(assetId, 'reject')
  } else {
    await reviewExplanationAsset(assetId, 'reject')
  }
  revalidatePath('/admin/knowledge-assets')
  revalidatePath('/admin')
}

export async function deprecateAsset(assetId: string) {
  await requireAdmin()
  await prisma.assetIdentity.update({
    where: { assetId },
    data: { status: AssetStatus.DEPRECATED, deprecationReason: 'Manually deprecated by admin' },
  })
  revalidatePath('/admin/knowledge-assets')
  revalidatePath('/admin')
}

// Bulk: approve all DRAFT assets for a given subject prefix (e.g. 'chem', 'math')
export async function approveAllDraftForSubject(subjectPrefix: string) {
  await requireAdmin()
  const drafts = await prisma.assetIdentity.findMany({
    where: {
      status: AssetStatus.DRAFT,
      conceptId: { startsWith: subjectPrefix + '.' },
    },
    select: { assetId: true, family: true },
  })

  for (const d of drafts) {
    if (d.family === AssetFamily.PROBE) {
      await reviewProbeAsset(d.assetId, 'approve')
    } else {
      await reviewExplanationAsset(d.assetId, 'approve')
    }
  }
  revalidatePath('/admin/knowledge-assets')
  revalidatePath('/admin')
  return { approved: drafts.length }
}
