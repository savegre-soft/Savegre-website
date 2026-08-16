import type { MetadataRoute } from 'next'
import { site } from './lib/site'
import { productos } from './lib/productos'

/**
 * El archivo se llamaba `sidemap.ts` — con «d» — así que Next nunca lo
 * reconocía y `/sitemap.xml` no llegaba a generarse, pese a que robots.txt lo
 * anunciaba a los buscadores. Además solo listaba la portada.
 *
 * `force-static` es obligatorio aquí: el sitemap es un Route Handler y, con
 * `output: 'export'`, Next exige que se declare estático explícitamente.
 */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const rutas: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/portafolio', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    ...productos.map((p) => ({
      path: `/productos/${p.slug}`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),
  ]

  return rutas.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
