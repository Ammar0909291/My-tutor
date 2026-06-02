import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

function createRedisClient() {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  const client = new Redis(url, {
    maxRetriesPerRequest: 1,
    enableReadyCheck: false,
    lazyConnect: true,
    connectTimeout: 2000,
  });

  client.on("error", () => {
    // suppress — Redis is optional
  });

  return client;
}

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis ?? undefined;

// ─── Session State Helpers ────────────────────────────────────────────────────

const SESSION_TTL = 60 * 60 * 24; // 24 hours

export async function getSessionState<T>(sessionId: string): Promise<T | null> {
  try {
    if (!redis) return null;
    const data = await redis.get(`session:${sessionId}`);
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
}

export async function setSessionState<T>(sessionId: string, state: T): Promise<void> {
  try {
    if (!redis) return;
    await redis.setex(`session:${sessionId}`, SESSION_TTL, JSON.stringify(state));
  } catch {
    // Redis unavailable — skip
  }
}

export async function deleteSessionState(sessionId: string): Promise<void> {
  try {
    if (!redis) return;
    await redis.del(`session:${sessionId}`);
  } catch {
    // Redis unavailable — skip
  }
}

export async function getUserActiveSession(userId: string): Promise<string | null> {
  try {
    if (!redis) return null;
    return await redis.get(`user:${userId}:active_session`);
  } catch {
    return null;
  }
}

export async function setUserActiveSession(userId: string, sessionId: string): Promise<void> {
  try {
    if (!redis) return;
    await redis.setex(`user:${userId}:active_session`, SESSION_TTL, sessionId);
  } catch {
    // Redis unavailable — skip
  }
}
