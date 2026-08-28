import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Instrument_Sans } from 'next/font/google'
import Navbar from './components/Shared/Navbar'
import Footer from './components/Shared/Footer'
import WhatsAppFab from './components/Shared/WhatsAppFab'
import { MotionProvider } from './components/Shared/Motion'
import { fundadores, site } from './lib/site'

/**
 * Tipografía única del sitio: una sans para interfaz y texto, una serif para
 * titulares. `next/font` las auto-aloja en el propio dominio, así que no hay
 * petición a Google, no bloquean el render y no producen salto de maquetación.
 * Antes cada página importaba su propia pareja con `@import` — cinco fuentes
 * distintas, dos de las cuales ni siquiera llegaban a cargar.
 */
const instrument = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

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
    'facturación electrónica Costa Rica',
    'WhatsApp Cloud API',
    'Next.js',
    'React',
    '.NET',
    'aplicaciones empresariales',
    'software a la medida',
    'Costa Rica',
    'Savegre Soft',
  ],

  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  applicationName: site.name,
  category: 'technology',

  // El canonical de cada página se define en su propio `metadata`. Aquí solo
  // queda el de la portada: antes este valor absoluto se heredaba en todas las
  // rutas y le decía a Google que /services y /portafolio eran duplicados.
  alternates: { canonical: '/' },

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

  // Sin `images`: el archivo `app/opengraph-image.tsx` genera la imagen en el
  // build y Next inyecta `og:image` y `twitter:image` solo. Antes esto
  // apuntaba a /og-image.jpg, que no existía.
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: site.url,
    siteName: site.name,
    title: 'Savegre Soft | Desarrollo de Software en Costa Rica',
    description:
      'Startup costarricense especializada en desarrollo de software, soluciones empresariales, aplicaciones web y tecnología cloud.',
  },

  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: 'Desarrollo de software y soluciones tecnológicas en Costa Rica.',
  },
}

/**
 * Datos estructurados de la organización: es de donde Google saca el panel de
 * conocimiento y lo que le permite entender quiénes somos, dónde operamos y
 * qué servicios ofrecemos. `@id` permite que otras páginas se refieran a esta
 * misma entidad en lugar de declarar una nueva.
 */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#organization`,
  name: site.name,
  alternateName: 'Savegre',
  url: site.url,
  email: site.email,
  foundingDate: site.founded,
  description:
    'Startup costarricense de desarrollo de software, automatización de procesos, integración de sistemas y análisis de datos.',
  slogan: 'Construimos software que escala.',
  founder: fundadores.map((f) => ({
    '@type': 'Person',
    name: f.nombre,
    jobTitle: f.rol,
    sameAs: f.linkedin,
  })),
  sameAs: fundadores.map((f) => f.linkedin),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San José',
    addressRegion: 'San José',
    addressCountry: 'CR',
  },
  areaServed: [
    { '@type': 'Country', name: 'Costa Rica' },
    { '@type': 'Place', name: 'América Latina' },
  ],
  knowsLanguage: ['es', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Savegre Soft',
    itemListElement: [
      'Desarrollo web',
      'Arquitectura de software',
      'Consultoría técnica',
      'Integración de sistemas',
      'Automatización de procesos',
      'Análisis de datos y dashboards',
      'Facturación electrónica Costa Rica',
      'Integración con WhatsApp Cloud API',
    ].map((servicio) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: servicio },
    })),
  },
}

/** Declara el sitio como entidad, para que Google asocie el nombre al dominio. */
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: 'es-CR',
  publisher: { '@id': `${site.url}/#organization` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${instrument.variable} ${cormorant.variable}`}>
      {/* Google Tag Manager: el bootstrap se inyecta tras la hidratación
          (`afterInteractive`); de ahí GTM carga GA4 y el resto de etiquetas.
          El `id` es obligatorio para que Next optimice el script inline. */}
      {site.gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');`}
        </Script>
      )}
      <body className="flex min-h-screen flex-col">
        {/* Google Tag Manager (noscript): fallback para navegadores sin JS. */}
        {site.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* Los objetos son constantes del propio código, no entrada de usuario. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <MotionProvider>
          <a
            href="#contenido"
            className="bg-brand-fill sr-only rounded px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60"
          >
            Saltar al contenido
          </a>
          <Navbar />
          {/* Sin `container`: cada sección decide su ancho, así los fondos
              oscuros y los bloques a sangre llegan hasta el borde. */}
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </MotionProvider>
      </body>
    </html>
  )
}
