/**
 * Consentimiento de cookies.
 *
 * El sitio carga Google Tag Manager (→ GA4) y el Meta Pixel, que instalan
 * cookies de analítica y de marketing. La Ley N.º 8968 de Costa Rica y el RGPD
 * exigen consentimiento previo e informado para esas categorías, así que por
 * defecto van denegadas: GTM arranca con Google Consent Mode en `denied` y el
 * Meta Pixel ni siquiera se descarga hasta que la persona acepta en el banner.
 *
 * Aquí viven las constantes compartidas. La lógica de interfaz está en
 * `components/Shared/CookieConsent.tsx`; el arranque de Consent Mode, en un
 * `<script>` en línea dentro de `app/layout.tsx` (tiene que ejecutarse antes
 * que GTM).
 */

/** Clave de `localStorage` donde se guarda la decisión de la persona. */
export const CONSENT_KEY = 'savegre-consent'

export type ConsentValue = 'granted' | 'denied'

/**
 * Evento de `window` que reabre el banner. Lo dispara el enlace
 * «Preferencias de cookies» del footer y lo escucha `CookieConsent`.
 */
export const OPEN_CONSENT_EVENT = 'savegre:open-consent'

/**
 * Evento de `window` que avisa de que la decisión guardada cambió en esta
 * misma pestaña. `CookieConsent` lo usa para releer `localStorage` (los
 * eventos `storage` nativos solo llegan a las OTRAS pestañas).
 */
export const CONSENT_CHANGED_EVENT = 'savegre:consent-changed'

/**
 * Señales de Google Consent Mode v2 que gobernamos con el banner. Todas
 * empiezan en `denied` y pasan juntas a `granted` cuando se acepta.
 */
export const CONSENT_SIGNALS = [
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
  'analytics_storage',
] as const
