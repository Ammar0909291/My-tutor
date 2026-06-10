import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const inter = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'My Tutor — Personal AI Tutor',
    template: '%s | My Tutor',
  },
  description:
    'Learn programming, mathematics, physics, chemistry, biology, languages and AI with a personalized AI tutor.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'My Tutor',
  },
  openGraph: {
    type: 'website',
    siteName: 'My Tutor',
    title: 'My Tutor — Personal AI Tutor',
    description:
      'Learn programming, mathematics, physics, chemistry, biology, languages and AI with a personalized AI tutor.',
  },
  twitter: {
    card: 'summary',
    title: 'My Tutor — Personal AI Tutor',
    description:
      'Learn programming, mathematics, physics, chemistry, biology, languages and AI with a personalized AI tutor.',
  },
}

export const viewport: Viewport = {
  themeColor: '#F78166',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="My Tutor" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script dangerouslySetInnerHTML={{
          __html: `if('serviceWorker'in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}`
        }} />
      </head>
      <body suppressHydrationWarning className={body.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
