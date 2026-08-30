import './globals.css'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Instrument_Sans } from 'next/font/google'
import Navbar from './components/Shared/Navbar'
import Footer from './components/Shared/Footer'
import WhatsAppFab from './components/Shared/WhatsAppFab'
import { MotionProvider } from './components/Shared/Motion'
import CookieConsent from './components/Shared/CookieConsent'
import PixelPageViews from './components/Shared/PixelPageViews'
import { fundadores, keywords, openGraphBase, site, socials } from './lib/site'
import { CONSENT_KEY } from './lib/consent'

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

const TITLE_DEFAULT = 'Savegre Soft | Desarrollo de Software en Costa Rica'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: TITLE_DEFAULT,
    template: '%s | Savegre Soft',
  },

  description: site.description,
  keywords: [...keywords],

  authors: fundadores.map((f) => ({ name: f.nombre, url: f.linkedin })),
  creator: site.name,
  publisher: site.name,
  applicationName: site.name,
  generator: 'Next.js',
  category: 'technology',

  // Cómo se referencian los enlaces que salen del sitio.
  referrer: 'origin-when-cross-origin',

  // El sitio es solo en español; iOS y algunos navegadores autoenlazan
  // números y direcciones dentro del texto y rompen la maquetación.
  formatDetection: { telephone: false, address: false, email: false },

  // El canonical de cada página se define en su propio `metadata`. Aquí solo
  // queda el de la portada: antes este valor absoluto se heredaba en todas las
  // rutas y le decía a Google que /services y /portafolio eran duplicados.
  // `languages` con `x-default` le dice a Google que no hay más idiomas y que
  // esta es la versión a servir en cualquier región.
  alternates: {
    canonical: '/',
    languages: { 'es-CR': '/', 'x-default': '/' },
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

  // Solo se emite si hay código configurado en `site.ts`; `undefined` no
  // genera etiqueta. Sin esto Next sacaba un `google-site-verification` vacío.
  verification: site.googleSiteVerification
    ? { google: site.googleSiteVerification }
    : undefined,

  appleWebApp: { capable: true, title: site.name, statusBarStyle: 'black-translucent' },

  // Sin `images`: el archivo `app/opengraph-image.tsx` genera la imagen en el
  // build y Next inyecta `og:image` y `twitter:image` solo. Antes esto
  // apuntaba a /og-image.jpg, que no existía.
  openGraph: {
    ...openGraphBase,
    url: '/',
    title: TITLE_DEFAULT,
    description:
      'Startup costarricense especializada en desarrollo de software, soluciones empresariales, aplicaciones web y tecnología cloud.',
    countryName: 'Costa Rica',
  },

  twitter: {
    card: 'summary_large_image',
    title: TITLE_DEFAULT,
    description:
      'Startup costarricense especializada en desarrollo de software, soluciones empresariales, aplicaciones web y tecnología cloud.',
  },
}

/**
 * `viewport` es un export aparte desde Next 14 (antes vivía dentro de
 * `metadata`). De aquí salen `theme-color` —el color de la barra del
 * navegador en móvil— y `color-scheme`, que le dice al navegador que pinte
 * los controles nativos en oscuro y evita el flash blanco al cargar.
 */
export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
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
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/opengraph-image`,
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
  // Perfiles oficiales de la organización más los de los fundadores: Google
  // los usa para vincular la entidad con sus redes.
  sameAs: [
    ...socials.filter((s) => s.org).map((s) => s.href),
    ...fundadores.map((f) => f.linkedin),
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San José',
    addressRegion: 'San José',
    addressCountry: 'CR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: site.email,
    availableLanguage: ['es', 'en'],
    areaServed: 'CR',
  },
  areaServed: [
    { '@type': 'Country', name: 'Costa Rica' },
    { '@type': 'Place', name: 'América Latina' },
  ],
  knowsLanguage: ['es', 'en'],
  knowsAbout: [
    'Desarrollo de software',
    'Desarrollo web',
    'Arquitectura de software',
    'Integración de sistemas',
    'Automatización de procesos',
    'Análisis de datos',
    'Facturación electrónica de Costa Rica',
    'WhatsApp Cloud API',
    'Next.js',
    'React',
    '.NET',
  ],
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
  description: site.description,
  inLanguage: 'es-CR',
  publisher: { '@id': `${site.url}/#organization` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${instrument.variable} ${cormorant.variable}`}>
      {/* Consent Mode v2: por defecto TODO denegado. GTM —y, a través suyo,
          GA4— respeta estas señales y funciona sin cookies hasta que el banner
          (CookieConsent) las sube a `granted`; el Meta Pixel ni se descarga
          hasta entonces. `beforeInteractive` garantiza que corre antes que GTM. */}
      {(site.gtmId || site.metaPixelId) && (
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'})}}catch(e){}`}
        </Script>
      )}
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
          <CookieConsent />
          <PixelPageViews />
        </MotionProvider>
      </body>
    </html>
  )
}
