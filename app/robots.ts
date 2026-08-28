import type { MetadataRoute } from 'next'
import { site } from './lib/site'

/**
 * Sustituye al `public/robots.txt` estático, que tenía la URL del sitemap
 * escrita a mano — y apuntaba a un `/sitemap.xml` que no llegaba a generarse.
 * Aquí la URL sale de la configuración, así que no puede quedar desfasada.
 */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Área interna (mini-CRM). También lleva `robots: noindex` en su
        // metadata y cabecera `X-Robots-Tag` en public/_headers.
        disallow: ['/login', '/crm'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
