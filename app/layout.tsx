import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WixAuth - Professional Authentication Platform',
  description: 'Secure OAuth 2.0 authentication platform built with Next.js and Wix Studio Headless. Production-ready authentication for modern web applications.',
  keywords: ['authentication', 'oauth', 'wix', 'nextjs', 'react', 'typescript'],
  authors: [{ name: 'staylegitlonewolf' }],
  creator: 'staylegitlonewolf',
  openGraph: {
    title: 'WixAuth - Professional Authentication Platform',
    description: 'Secure OAuth 2.0 authentication platform built with Next.js and Wix Studio Headless',
    type: 'website',
    url: 'https://staylegitlonewolf.github.io/Template1/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WixAuth - Professional Authentication Platform',
    description: 'Secure OAuth 2.0 authentication platform built with Next.js and Wix Studio Headless',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 