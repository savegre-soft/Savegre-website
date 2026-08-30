import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageHeader } from '../components/Shared/ui'
import { breadcrumbJsonLd, jsonLdScript } from '../lib/seo'
import { openGraphBase, site } from '../lib/site'

/**
 * Política de Cookies.
 *
 * Describe lo que realmente instala el sitio: el almacenamiento local propio
 * de la decisión de consentimiento y —solo si se acepta— las cookies de
 * Google Analytics 4 y del Meta Pixel. El detalle del mecanismo (Consent
 * Mode + carga condicional del pixel) vive en `components/Shared/CookieConsent.tsx`.
 */

const ACTUALIZADA = '30 de agosto de 2026'

const DESCRIPCION =
  'Qué cookies y tecnologías similares usa savegresoft.com, para qué sirven y cómo aceptarlas, rechazarlas o cambiar tu decisión.'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: DESCRIPCION,
  alternates: { canonical: '/cookies' },
  openGraph: {
    ...openGraphBase,
    url: '/cookies',
    title: 'Política de Cookies | Savegre Soft',
    description: DESCRIPCION,
  },
}

export default function CookiesPage() {
  return (
    <section className="pt-16 pb-24">
      <script
        {...jsonLdScript(breadcrumbJsonLd([{ name: 'Política de Cookies', path: '/cookies' }]))}
      />

      <Container>
        <PageHeader
          eyebrow="Savegre Soft — Legal"
          title="Política de"
          accent="cookies"
          lead="Solo usamos las cookies imprescindibles para que el sitio funcione. Las de analítica y marketing no se cargan hasta que las aceptas, y puedes cambiar de opinión en cualquier momento."
        />

        <div className="legal-prose mt-12">
          <p className="text-faint text-[13px] tracking-[0.05em] uppercase">
            Última actualización: {ACTUALIZADA}
          </p>

          <h2>1. Qué son las cookies</h2>
          <p>
            Una cookie es un pequeño archivo que un sitio guarda en tu dispositivo para
            recordar información entre páginas o visitas. En esta política incluimos también
            tecnologías equivalentes, como el <strong>almacenamiento local</strong> del
            navegador. Pueden ser propias (las pone este sitio) o de terceros (las pone otro
            dominio), y de sesión (se borran al cerrar el navegador) o persistentes.
          </p>

          <h2>2. Cómo pedimos tu consentimiento</h2>
          <p>
            Al entrar por primera vez verás un aviso. Hasta que decidas,{' '}
            <strong>no se cargan cookies de analítica ni de marketing</strong>: Google
            Analytics queda en modo restringido mediante Google Consent Mode y el Meta Pixel
            ni siquiera se descarga. Puedes cambiar tu decisión cuando quieras desde el
            enlace <strong>«Preferencias de cookies»</strong> al pie de cualquier página, o
            borrando las cookies desde tu navegador.
          </p>

          <h2>3. Cookies y tecnologías que usamos</h2>

          <h3>Necesarias — siempre activas</h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Responsable</th>
                  <th>Finalidad</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>savegre-consent</td>
                  <td>Almacenamiento local</td>
                  <td>Savegre Soft (propia)</td>
                  <td>Recordar si aceptaste o rechazaste las cookies</td>
                  <td>Persistente, hasta que la borres</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            El área interna del sitio (<code>/crm</code>) usa además almacenamiento local
            para mantener la sesión del personal autorizado; no afecta a las visitas
            normales.
          </p>

          <h3>Analíticas — solo con tu consentimiento</h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Responsable</th>
                  <th>Finalidad</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>Google</td>
                  <td>Distinguir usuarios para las estadísticas de uso</td>
                  <td>2 años</td>
                </tr>
                <tr>
                  <td>_ga_&lt;ID&gt;</td>
                  <td>Google</td>
                  <td>Mantener el estado de la sesión en Google Analytics 4</td>
                  <td>2 años</td>
                </tr>
                <tr>
                  <td>_gid</td>
                  <td>Google</td>
                  <td>Distinguir usuarios</td>
                  <td>24 horas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Marketing — solo con tu consentimiento</h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Responsable</th>
                  <th>Finalidad</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_fbp</td>
                  <td>Meta</td>
                  <td>Identificar el navegador para medir anuncios y crear públicos</td>
                  <td>90 días</td>
                </tr>
                <tr>
                  <td>_fbc</td>
                  <td>Meta</td>
                  <td>Guardar el identificador de clic de un anuncio de Meta, si llegas desde uno</td>
                  <td>90 días</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Los nombres y las duraciones exactos pueden variar cuando Google o Meta
            actualizan sus productos.
          </p>

          <h2>4. Cookies de terceros</h2>
          <p>
            Las cookies de Google Analytics 4 y del Meta Pixel las gestionan esas empresas
            según sus propias políticas:
          </p>
          <ul>
            <li>
              Google —{' '}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                política de cookies de Google
              </a>
              .
            </li>
            <li>
              Meta —{' '}
              <a
                href="https://www.facebook.com/policy/cookies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                política de cookies de Meta
              </a>
              .
            </li>
          </ul>

          <h2>5. Cómo desactivarlas o borrarlas</h2>
          <p>
            Además del enlace «Preferencias de cookies», puedes bloquear o eliminar cookies
            desde la configuración de tu navegador (Chrome, Firefox, Safari o Edge). Ten en
            cuenta que las cookies necesarias no pueden desactivarse sin afectar al
            funcionamiento básico del sitio.
          </p>

          <h2>6. Más información</h2>
          <p>
            Sobre el resto de datos personales que tratamos, consulta nuestra{' '}
            <Link href="/privacidad">Política de Privacidad</Link>. Para cualquier duda,
            escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </Container>
    </section>
  )
}
