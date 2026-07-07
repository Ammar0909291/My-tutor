import type { MetadataRoute } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

// Only the unauthenticated marketing/auth pages are worth listing — every
// other route requires a session and is excluded from crawling in robots.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: APP_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${APP_URL}/auth/login`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${APP_URL}/auth/signup`, changeFrequency: 'monthly', priority: 0.5 },
  ]
}
