import type { Metadata } from 'next'
import './globals.css'
import Layout from '@/components/layout/Layout'

export const metadata: Metadata = {
  title: 'ML Portfolio',
  description: 'Ketan Shukla - ML Engineer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Raleway:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
