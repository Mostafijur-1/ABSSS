import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ABSSS | Al Biruni Society of Scientific Studies',
    template: '%s | ABSSS',
  },
  description: 'University-based scientific society promoting research, innovation, and scientific collaboration.',
  keywords: 'scientific society, university, research, innovation, ABSSS, Al Biruni',
  authors: [{ name: 'ABSSS Team' }],
  applicationName: 'ABSSS',
  category: 'education',
  openGraph: {
    title: 'ABSSS | Al Biruni Society of Scientific Studies',
    description: 'A community advancing scientific research, innovation, and collaboration.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'ABSSS | Al Biruni Society of Scientific Studies',
    description: 'A community advancing scientific research, innovation, and collaboration.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#15265c',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
