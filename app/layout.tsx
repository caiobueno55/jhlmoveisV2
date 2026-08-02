import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _fraunces = Fraunces({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JHL Móveis | Qualidade e Confiança',
  description:
    'Sofás, mesas, cadeiras e móveis para todos os ambientes direto da fábrica, com entrega combinada e montagem no local.',
  generator: 'v0.app',
  keywords: [
    'móveis',
    'sofá',
    'mesa de jantar',
    'cadeiras',
    'móveis direto da fábrica',
    'JHL Móveis',
  ],
  openGraph: {
    title: 'JHL Móveis | Qualidade e Confiança',
    description:
      'Móveis da fábrica para sua casa, com entrega combinada e montagem no local.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#231d18' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
