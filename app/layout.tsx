import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Manrope } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

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
    { media: '(prefers-color-scheme: light)', color: '#f7faf8' },
    { media: '(prefers-color-scheme: dark)', color: '#102024' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${manrope.variable} ${lora.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
