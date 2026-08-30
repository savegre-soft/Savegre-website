'use client'

import { OPEN_CONSENT_EVENT } from '../../lib/consent'

/**
 * Reabre el banner de consentimiento. Va en el footer para que la decisión
 * sobre cookies sea siempre reversible, como exige el consentimiento informado.
 */
export default function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      Preferencias de cookies
    </button>
  )
}
