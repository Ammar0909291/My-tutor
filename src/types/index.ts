import type { SubjectType, SessionStatus, MessageRole } from "@prisma/client";

// Re-export Prisma enums for convenience
export { SubjectType, SessionStatus, MessageRole };

// Plan type (replaces removed SubscriptionStatus enum)
export type SubscriptionStatus = 'free' | 'basic' | 'pro' | 'annual';

// ─── Session State (Redis) ────────────────────────────────────────────────────

export type RedisSessionState = {
  userId: string;
  subjectId: string;
  subjectSlug: string;
  learningPathId?: string;
  currentStep?: number;
  messageCount: number;
  lastActivity: string; // ISO date
  moodAnalysis?: {
    engagement: string;
    confusion: string;
    suggestedAction: string;
  };
};

// ─── Curriculum ───────────────────────────────────────────────────────────────

export type CurriculumStep = {
  order: number;
  title: string;
  description: string;
  topics: string[];
  exercises: string[];
  estimatedHours: number;
};

export type Curriculum = {
  title: string;
  estimatedWeeks: number;
  steps: CurriculumStep[];
};

// ─── API Response shapes ──────────────────────────────────────────────────────

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: string;
  code?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── NextAuth session extension ───────────────────────────────────────────────

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}
