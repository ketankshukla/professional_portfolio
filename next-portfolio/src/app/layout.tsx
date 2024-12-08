import type { Metadata } from 'next'
import './globals.css';
import '@/styles/prism-theme.css';
import { Inter, Poppins, Raleway } from 'next/font/google';
import Layout from '@/components/layout/Layout'

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
const raleway = Raleway({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

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
    <html lang="en" className={`${poppins.variable} ${raleway.variable}`}>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
