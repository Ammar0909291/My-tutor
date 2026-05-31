import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

function createRedisClient() {
  const client = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: true,
  });

  client.on("error", (err) => {
    console.error("[Redis] Connection error:", err);
  });

  return client;
}

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

// ─── Session State Helpers ────────────────────────────────────────────────────

const SESSION_TTL = 60 * 60 * 24; // 24 hours

export async function getSessionState<T>(sessionId: string): Promise<T | null> {
  const data = await redis.get(`session:${sessionId}`);
  return data ? (JSON.parse(data) as T) : null;
}

export async function setSessionState<T>(sessionId: string, state: T): Promise<void> {
  await redis.setex(`session:${sessionId}`, SESSION_TTL, JSON.stringify(state));
}

export async function deleteSessionState(sessionId: string): Promise<void> {
  await redis.del(`session:${sessionId}`);
}

export async function getUserActiveSession(userId: string): Promise<string | null> {
  return redis.get(`user:${userId}:active_session`);
}

export async function setUserActiveSession(userId: string, sessionId: string): Promise<void> {
  await redis.setex(`user:${userId}:active_session`, SESSION_TTL, sessionId);
}
