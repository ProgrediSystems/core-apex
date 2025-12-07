import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

export const metadata: Metadata = {
  title: 'Core APEX - AI-Powered Testing for Navy Systems',
  description: 'Automated Performance & Evaluation eXpert - Transform manual testing with AI agents that generate, execute, and maintain test suites for PEO MLB.',
  keywords: ['AI testing', 'Navy', 'DoD', 'automated testing', 'test automation', 'PEO MLB', 'defense'],
  authors: [{ name: 'Progredi AI' }],
  creator: 'Progredi AI',
  publisher: 'Progredi AI',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coreapex.progrediai.com',
    siteName: 'Core APEX',
    title: 'Core APEX - AI-Powered Testing for Navy Systems',
    description: 'Transform manual testing with AI agents that generate, execute, and maintain test suites.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Core APEX - AI-Powered Testing',
    description: 'AI-powered testing automation for Navy systems',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://progrediai.atlassian.net" />
        <link rel="dns-prefetch" href="https://corevault.progrediai.com" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}