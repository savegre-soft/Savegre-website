import type { MetadataRoute } from 'next'
import { site } from './lib/site'

/**
 * Web App Manifest. Next inyecta `<link rel="manifest">` en todas las páginas
 * al detectar este archivo, así que no hace falta declararlo en la metadata.
 *
 * `force-static`, igual que el sitemap y el robots: con `output: 'export'` un
 * Route Handler tiene que declararse estático para que se genere en el build.
 *
 * Sin más iconos que el favicon: referenciar `icon-192.png` / `icon-512.png`
 * inexistentes haría que la instalación como PWA fallara en silencio.
 */
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Desarrollo de Software en Costa Rica`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'browser',
    lang: 'es-CR',
    dir: 'ltr',
    background_color: '#09090b',
    theme_color: '#09090b',
    categories: ['business', 'productivity', 'developer'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
