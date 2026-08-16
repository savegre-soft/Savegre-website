/**
 * Configuración central del sitio.
 * Todo dato de contacto vive aquí — cambiarlo en un solo lugar lo actualiza
 * en el navbar, el footer, la página de contacto y el botón flotante.
 */

export const site = {
  name: 'Savegre Soft',
  url: 'https://savegresoft.com',
  founded: '2025',
  location: 'San José, Costa Rica',
  timezone: 'CST (UTC−6)',
  email: 'contacto@savegresoft.com',
  schedule: {
    weekdays: 'Lun – Vie · 8:00 am – 6:00 pm',
    weekend: 'Fines de semana: cerrado',
  },
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
  number: '50600000000',
  display: '+506 0000-0000',
  greeting: 'Hola, me gustaría conversar sobre un proyecto con Savegre Soft.',
} as const

const PLACEHOLDER_NUMBER = '50600000000'

/** `false` mientras el número siga siendo el de ejemplo. */
export const whatsappEnabled: boolean = whatsapp.number !== PLACEHOLDER_NUMBER

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
