import type { MetadataRoute } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/auth/login', '/auth/signup'],
      // Everything past the landing/auth pages requires a session and has
      // no public-facing content worth indexing.
      disallow: ['/dashboard', '/learn', '/school', '/library', '/quiz', '/flashcards', '/coach', '/modes', '/progress', '/certificates', '/settings', '/leaderboard', '/onboarding', '/admin', '/api'],
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  }
}
