'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { site } from '../../lib/site'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Envía un `PageView` del Meta Pixel en cada navegación del lado del cliente.
 *
 * El snippet del pixel solo dispara `PageView` en la carga inicial del
 * documento. Con el enrutado de Next, moverse entre páginas no recarga nada,
 * así que sin esto Meta solo contaría la primera página de cada visita.
 *
 * - Se salta el primer render: ese `PageView` ya lo manda `fbq('init')` en
 *   `CookieConsent` cuando hay consentimiento.
 * - Si no hay consentimiento, `window.fbq` no existe y no ocurre nada.
 * - Solo se fija en el `pathname`; los cambios de query string no cuentan como
 *   página nueva en este sitio.
 */
export default function PixelPageViews() {
  const pathname = usePathname()
  const primeraCarga = useRef(true)

  useEffect(() => {
    if (!site.metaPixelId) return
    if (primeraCarga.current) {
      primeraCarga.current = false
      return
    }
    window.fbq?.('track', 'PageView')
  }, [pathname])

  return null
}
