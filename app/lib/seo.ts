/**
 * Ayudas para datos estructurados (JSON-LD).
 *
 * Los bloques grandes de cada página siguen viviendo en su propio archivo;
 * aquí solo van los patrones que se repiten en varias rutas.
 */

import { site } from './site'

type Miga = { name: string; path: string }

/**
 * `BreadcrumbList` de schema.org. Google lo usa para mostrar la ruta
 * ("Inicio › Servicios") en lugar de la URL cruda en los resultados.
 *
 * El primer elemento siempre es Inicio, así que solo se pasan los tramos
 * siguientes: `breadcrumbJsonLd([{ name: 'Servicios', path: '/services' }])`.
 */
export function breadcrumbJsonLd(migas: Miga[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Inicio', path: '' }, ...migas].map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.name,
      item: `${site.url}${m.path}`,
    })),
  }
}

/** Serializa uno o varios bloques JSON-LD a props de `<script>`. */
export function jsonLdScript(data: object) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  }
}
