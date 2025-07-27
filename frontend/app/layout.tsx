import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ABSSS - Al Biruni Society of Scientific Studies',
  description: 'University-based scientific society promoting research, innovation, and scientific collaboration.',
  keywords: 'scientific society, university, research, innovation, ABSSS, Al Biruni',
  authors: [{ name: 'ABSSS Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
} 