import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono, Nunito, Baloo_2 } from 'next/font/google'
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

// Sprint: Dashboard v2 — gamified dashboard fonts (additive, used only by
// src/components/dashboard/v2/**; existing pages keep Jakarta/Inter).
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-baloo2',
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'My Tutor — Personal AI Tutor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Tutor — Personal AI Tutor',
    description:
      'Learn programming, mathematics, physics, chemistry, biology, languages and AI with a personalized AI tutor.',
    images: ['/og-image.png'],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${body.variable} ${mono.variable} ${nunito.variable} ${baloo2.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="My Tutor" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* Blocking script: apply saved theme before first paint to prevent flash */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('mytutor_theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){}})();`
        }} />
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
