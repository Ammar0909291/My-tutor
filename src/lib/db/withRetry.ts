import { captureError } from '@/lib/monitoring'

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation()
    } catch (error: any) {
      const isConnectionError =
        error.code === 'P1001' ||
        error.code === 'P1002' ||
        error.code === 'P1008' ||
        error.code === 'P1017' ||
        error.message?.includes("Can't reach database") ||
        error.message?.includes('Connection reset') ||
        error.message?.includes('terminating connection') ||
        error.message?.includes('connection terminated') ||
        error.message?.includes('connection closed')

      if (isConnectionError && i < retries - 1) {
        console.log(`DB connection failed, retry ${i + 1}/${retries}...`)
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)))
        continue
      }
      // Connection errors that survive all retries are the signal that the
      // database itself is in trouble — report before propagating.
      if (isConnectionError) {
        captureError(error, { route: 'db/withRetry', tags: { kind: 'db-connection' }, extra: { retries } })
      }
      throw error
    }
  }
  throw new Error('Max retries exceeded')
}
