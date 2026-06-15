import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import { prisma } from '@/lib/db/prisma'
import { redis } from '@/lib/redis/client'
import { getFailureCounters } from '@/lib/monitoring'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const adminOk = await isAdmin(session.user.id)
  if (!adminOk) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // DB health
  let dbHealthy = false
  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DB timeout')), 3000)
      ),
    ])
    dbHealthy = true
  } catch {
    dbHealthy = false
  }

  // Redis health
  const redisUrl = process.env.REDIS_URL
  let redisStatus: string = redisUrl ? 'configured' : 'not-configured'
  if (redis) {
    try {
      await Promise.race([
        redis.ping(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Redis timeout')), 2000)
        ),
      ])
      redisStatus = 'configured'
    } catch {
      redisStatus = 'error'
    }
  }

  const failureCounters = getFailureCounters()

  return NextResponse.json({
    health: {
      db: dbHealthy,
      redis: redisStatus,
      uptime: process.uptime(),
    },
    failureCounters,
    env: {
      smtp: !!process.env.SMTP_HOST,
      monitoring: !!process.env.MONITORING_WEBHOOK_URL,
      groq: !!process.env.GROQ_API_KEY,
      yandex: !!process.env.YANDEX_API_KEY,
      openrouter: !!process.env.OPENROUTER_API_KEY,
      adminEmails: !!process.env.ADMIN_EMAILS,
    },
    timestamp: new Date().toISOString(),
  })
}
