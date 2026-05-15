import './globals.css'
import Navbar from './components/Shared/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://savegresoft.com'),

  title: {
    default: 'Savegre Soft | Desarrollo de Software en Costa Rica',
    template: '%s | Savegre Soft',
  },

  description:
    'Savegre Soft es una startup costarricense especializada en desarrollo de software, aplicaciones web, sistemas empresariales, soluciones cloud y tecnología a la medida.',

  keywords: [
    'desarrollo de software',
    'software en Costa Rica',
    'startup tecnológica',
    'desarrollo web',
    'Next.js',
    'React',
    '.NET',
    'aplicaciones empresariales',
    'software a la medida',
    'Costa Rica',
    'Savegre Soft',
  ],

  authors: [
    {
      name: 'Savegre Soft',
    },
  ],

  creator: 'Savegre Soft',

  publisher: 'Savegre Soft',

  applicationName: 'Savegre Soft',

  category: 'technology',

  alternates: {
    canonical: 'https://savegresoft.com',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://savegresoft.com',
    siteName: 'Savegre Soft',
    title: 'Savegre Soft | Desarrollo de Software en Costa Rica',
    description:
      'Startup costarricense especializada en desarrollo de software, soluciones empresariales, aplicaciones web y tecnología cloud.',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Savegre Soft',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Savegre Soft',
    description:
      'Desarrollo de software y soluciones tecnológicas en Costa Rica.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}