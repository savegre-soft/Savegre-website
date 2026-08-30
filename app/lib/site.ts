/**
 * Configuración central del sitio.
 * Todo dato de contacto vive aquí — cambiarlo en un solo lugar lo actualiza
 * en el navbar, el footer, la página de contacto y el botón flotante.
 */

export const site = {
  name: 'Savegre Soft',
  /**
   * Dominio público del despliegue. De aquí salen los canonical de cada
   * página, las URLs del sitemap, el robots.txt y los datos estructurados,
   * así que tiene que coincidir exactamente con el dominio servido — si no,
   * los buscadores indexan un dominio y el canonical les señala otro.
   */
  url: 'https://savegresoft.com',
  founded: '2025',
  location: 'San José, Costa Rica',
  /**
   * Contenedor de Google Tag Manager. De aquí cuelga la analítica (GA4) y
   * cualquier otra etiqueta, que se configuran en el panel de GTM sin tocar
   * el código. Cadena vacía = desactivado (no se inyecta nada).
   * El dominio `googletagmanager.com` está permitido en la CSP de
   * `public/_headers`; si se quita esto, conviene cerrar también la CSP.
   */
  gtmId: 'GTM-WFXTHXTW',
  /**
   * Meta Pixel (antes Facebook Pixel). Rastrea `PageView` en cada carga y
   * permite medir campañas y construir públicos en Meta Ads. Cadena vacía =
   * desactivado (no se inyecta nada).
   * Los dominios `connect.facebook.net` y `www.facebook.com` están permitidos
   * en la CSP de `public/_headers`; si se quita esto, conviene cerrarlos.
   * Alternativa sin código: añadirlo como etiqueta dentro de GTM.
   */
  metaPixelId: '1713782843033243',
  timezone: 'CST (UTC−6)',
  email: 'contacto@savegresoft.com',
  schedule: {
    weekdays: 'Lun – Vie · 8:00 am – 6:00 pm',
    weekend: 'Fines de semana: cerrado',
  },
  /**
   * Locale en formato Open Graph (`idioma_PAÍS`). El `<html lang>` usa el
   * formato BCP-47 (`es`); Open Graph quiere guion bajo.
   */
  ogLocale: 'es_CR',
  /**
   * Descripción canónica del negocio, en una sola frase. Se reutiliza como
   * `description` por defecto, en Open Graph y en los datos estructurados,
   * para que las tres digan exactamente lo mismo.
   */
  description:
    'Savegre Soft es una startup costarricense de desarrollo de software: aplicaciones web, arquitectura de sistemas, integración, facturación electrónica y WhatsApp Cloud API.',
  /**
   * Código de Google Search Console (`content` de la etiqueta
   * `google-site-verification`). Vacío = no se emite la etiqueta. Se obtiene
   * en Search Console › Configuración › Verificación de la propiedad ›
   * Etiqueta HTML.
   */
  googleSiteVerification: '',
} as const

/**
 * Palabras clave del sitio. Google ya no usa `<meta keywords>` para
 * posicionar, pero otros buscadores (Bing) y agregadores sí lo leen, así que
 * se mantiene. Vive aquí para no repetirlo en cada `metadata`.
 */
export const keywords = [
  'desarrollo de software',
  'software en Costa Rica',
  'desarrollo de software Costa Rica',
  'startup tecnológica Costa Rica',
  'desarrollo web',
  'aplicaciones web a la medida',
  'arquitectura de software',
  'integración de sistemas',
  'automatización de procesos',
  'análisis de datos',
  'facturación electrónica Costa Rica',
  'facturación electrónica v4.4',
  'Hacienda Costa Rica',
  'WhatsApp Cloud API',
  'middleware WhatsApp',
  'Next.js',
  'React',
  '.NET',
  'software empresarial',
  'Savegre Soft',
] as const

/**
 * Campos de Open Graph comunes a todo el sitio. Cada página los expande con
 * `...openGraphBase` y añade su propio `title`, `description` y `url`.
 *
 * Hace falta repetirlos porque Next fusiona `openGraph` de forma superficial:
 * en cuanto una página declara su objeto `openGraph`, **reemplaza** el del
 * layout entero — sin esto, las fichas de producto perdían `siteName`,
 * `locale` y `type`.
 */
export const openGraphBase = {
  type: 'website',
  siteName: site.name,
  locale: site.ogLocale,
} as const

/** Fundadores. Se usan en /about y en los datos estructurados de la portada. */
export const fundadores = [
  {
    nombre: 'Steven Gazo',
    rol: 'Cofundador',
    linkedin: 'https://www.linkedin.com/in/stevengazo/',
  },
  {
    nombre: 'Daniel Hidalgo',
    rol: 'Cofundador',
    linkedin: 'https://www.linkedin.com/in/daniehidalgomora/',
  },
] as const

/**
 * WhatsApp de contacto.
 *
 * ⚠️ PENDIENTE DE CONFIGURAR: sustituir `number` por el número real en formato
 * internacional, solo dígitos, sin `+`, sin espacios y sin guiones.
 * Ejemplo para Costa Rica: '50688887777'.
 *
 * `display` es lo que ve el usuario; `number` es lo que se usa en el enlace.
 * Mientras `number` siga siendo el valor de ejemplo, `whatsappEnabled` es
 * `false` y la interfaz oculta los enlaces de WhatsApp en lugar de mostrar
 * un enlace roto.
 */
export const whatsapp = {
  number: '50688089479',
  display: '+506 8808-9479',
  greeting: 'Hola, me gustaría conversar sobre un proyecto con Savegre Soft.',
} as const

const PLACEHOLDER_NUMBER = '50600000000'

/** `false` mientras el número siga siendo el de ejemplo. */
export const whatsappEnabled: boolean = (whatsapp.number as string) !== PLACEHOLDER_NUMBER

/**
 * Construye el enlace wa.me. `message` permite un saludo distinto según el
 * contexto (p. ej. desde la ficha de un producto).
 */
export function whatsappUrl(message: string = whatsapp.greeting): string {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`
}

export const socials = [
  { name: 'LinkedIn · Steven Gazo', href: 'https://www.linkedin.com/in/stevengazo/' },
  { name: 'LinkedIn · Daniel Hidalgo', href: 'https://www.linkedin.com/in/daniehidalgomora/' },
] as const

export const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/services' },
  { name: 'Portafolio', href: '/portafolio' },
  { name: 'Nosotros', href: '/about' },
  { name: 'Contacto', href: '/contact' },
] as const
