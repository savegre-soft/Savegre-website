/**
 * Catálogo de productos servido por DANA (el CRM).
 *
 * Se consume en TIEMPO DE BUILD desde el Server Component de `/products`: el
 * sitio es export estático (`output: 'export'`), así que este `fetch` corre en
 * la máquina de build y su resultado queda horneado en el HTML. El token
 * (`DANA_API_TOKEN`) es un secreto y por eso solo existe en el servidor/CI,
 * nunca en el bundle del navegador.
 *
 * Para refrescar el catálogo publicado basta con volver a desplegar.
 */

const ENDPOINT = 'https://dana.savegresoft.com/api/v1/products'

/** Forma de un producto tal como lo devuelve `GET /api/v1/products`. */
export type DanaProduct = {
  id: string
  name: string
  sku: string
  description: string
  category: string | null
  tags: string[]
  unit: string
  price: number
  currency: string
  taxRate: number
  billingModel: string
  setupFee: number
  quoteOnly: boolean
  isActive: boolean
  isPublic: boolean
  isArchived: boolean
  stock: number
}

/**
 * Trae los productos públicos y activos de DANA. Si el token falta o DANA no
 * responde durante el build, devuelve una lista vacía (la página muestra su
 * estado vacío) en lugar de romper el build.
 */
export async function getDanaProducts(): Promise<DanaProduct[]> {
  const token = process.env.DANA_API_TOKEN

  if (!token) {
    console.warn(
      '[products] Falta DANA_API_TOKEN: /products se generará sin catálogo.'
    )
    return []
  }

  try {
    const res = await fetch(`${ENDPOINT}?limit=200&archived=false`, {
      headers: { Authorization: `Bearer ${token}` },
      // Horneado en el build → página estática.
      cache: 'force-cache',
    })

    if (!res.ok) {
      console.warn(
        `[products] DANA respondió ${res.status}: /products se generará vacío.`
      )
      return []
    }

    const json: unknown = await res.json()
    const items =
      json && typeof json === 'object' && Array.isArray((json as { items?: unknown }).items)
        ? ((json as { items: DanaProduct[] }).items)
        : []

    // Solo lo que es apto para mostrarse en público.
    return items.filter((p) => p.isPublic && p.isActive && !p.isArchived)
  } catch (error) {
    console.warn(
      '[products] No se pudo contactar a DANA en el build; /products saldrá vacío.',
      error
    )
    return []
  }
}

/** Importe formateado en la moneda del producto (sin decimales para colones). */
export function formatPrecio(price: number, currency: string): string {
  try {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price)
  } catch {
    // Moneda desconocida: cae a un formato simple.
    return `${price.toLocaleString('es-CR')} ${currency}`
  }
}

/** Etiqueta legible del modelo de cobro que usa DANA. */
export function etiquetaCobro(billingModel: string): string | null {
  const mapa: Record<string, string> = {
    OneTime: 'Pago único',
    Monthly: 'Mensual',
    Yearly: 'Anual',
    Weekly: 'Semanal',
    Subscription: 'Suscripción',
    Usage: 'Por uso',
  }
  return mapa[billingModel] ?? null
}
