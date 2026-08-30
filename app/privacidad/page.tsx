import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageHeader } from '../components/Shared/ui'
import { breadcrumbJsonLd, jsonLdScript } from '../lib/seo'
import { openGraphBase, site } from '../lib/site'

/**
 * Política de Privacidad.
 *
 * Redactada para el tratamiento real que hace el sitio hoy: formulario de
 * contacto guardado en Supabase, registros de Cloudflare y —solo con
 * consentimiento— Google Analytics 4 y el Meta Pixel. Marco legal: Ley N.º
 * 8968 de Costa Rica y su reglamento, y el RGPD cuando aplica.
 *
 * PENDIENTE: incluir razón social y cédula jurídica del responsable cuando la
 * sociedad esté constituida o se aporten los datos. Mientras tanto se
 * identifica como «Savegre Soft» con el correo de contacto.
 */

const ACTUALIZADA = '30 de agosto de 2026'

const DESCRIPCION =
  'Cómo trata Savegre Soft los datos personales de quienes visitan savegresoft.com o nos escriben: qué recopilamos, con qué fin, con quién y qué derechos tienes.'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: DESCRIPCION,
  alternates: { canonical: '/privacidad' },
  openGraph: {
    ...openGraphBase,
    url: '/privacidad',
    title: 'Política de Privacidad | Savegre Soft',
    description: DESCRIPCION,
  },
}

export default function PrivacidadPage() {
  return (
    <section className="pt-16 pb-24">
      <script
        {...jsonLdScript(
          breadcrumbJsonLd([{ name: 'Política de Privacidad', path: '/privacidad' }])
        )}
      />

      <Container>
        <PageHeader
          eyebrow="Savegre Soft — Legal"
          title="Política de"
          accent="privacidad"
          lead="Tratamos los datos personales que nos confías con el mismo cuidado con el que construimos software. Aquí explicamos qué recopilamos, para qué, con quién lo compartimos y cómo puedes controlarlo."
        />

        <div className="legal-prose mt-12">
          <p className="text-faint text-[13px] tracking-[0.05em] uppercase">
            Última actualización: {ACTUALIZADA}
          </p>

          <p>
            Esta política explica cómo <strong>Savegre Soft</strong> («nosotros») trata los
            datos personales de quienes visitan <strong>{site.url.replace('https://', '')}</strong>{' '}
            o se ponen en contacto con nosotros, conforme a la{' '}
            <strong>
              Ley N.º 8968 de Protección de la Persona frente al tratamiento de sus Datos
              Personales
            </strong>{' '}
            de Costa Rica y su reglamento y, cuando resulte aplicable, al Reglamento (UE)
            2016/679 (RGPD).
          </p>

          <h2>1. Responsable del tratamiento</h2>
          <ul>
            <li>
              <strong>Savegre Soft</strong>, con operación en {site.location}.
            </li>
            <li>
              Correo para asuntos de privacidad y protección de datos:{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </li>
          </ul>

          <h2>2. Qué datos tratamos</h2>
          <h3>Datos que nos facilitas</h3>
          <ul>
            <li>
              <strong>Formulario de contacto:</strong> nombre completo, correo electrónico,
              asunto y el detalle de tu mensaje.
            </li>
            <li>
              <strong>Comunicaciones:</strong> si nos escribes por correo o WhatsApp, el
              contenido de esos mensajes y los datos de contacto que incluyas en ellos.
            </li>
          </ul>
          <h3>Datos que se recogen automáticamente</h3>
          <ul>
            <li>
              <strong>Datos técnicos y de navegación:</strong> dirección IP, tipo de
              dispositivo y navegador, páginas visitadas, fecha y hora y procedencia. Se
              obtienen de los registros del servidor (Cloudflare) y, únicamente si das tu
              consentimiento, mediante cookies de analítica y de marketing.
            </li>
          </ul>
          <p>
            No solicitamos datos sensibles ni categorías especiales de datos, y te pedimos
            que no los incluyas en el formulario.
          </p>

          <h2>3. Para qué los usamos y con qué legitimación</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Finalidad</th>
                  <th>Base de legitimación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Atender tu consulta y darle seguimiento comercial</td>
                  <td>
                    Aplicación de medidas precontractuales a petición tuya y tu
                    consentimiento al enviar el formulario
                  </td>
                </tr>
                <tr>
                  <td>Mantener el sitio seguro, operativo y libre de abuso</td>
                  <td>Interés legítimo en la seguridad del servicio</td>
                </tr>
                <tr>
                  <td>Medir el uso del sitio con Google Analytics 4</td>
                  <td>Tu consentimiento</td>
                </tr>
                <tr>
                  <td>Medir campañas y crear públicos con el Meta Pixel</td>
                  <td>Tu consentimiento</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Puedes retirar tu consentimiento en cualquier momento desde el enlace
            «Preferencias de cookies» al pie de cualquier página o escribiéndonos. Retirarlo
            no afecta a la licitud del tratamiento previo.
          </p>

          <h2>4. Con quién los compartimos</h2>
          <p>
            No vendemos tus datos. Solo acceden a ellos los proveedores que nos prestan
            servicios y que los tratan siguiendo nuestras instrucciones:
          </p>
          <ul>
            <li>
              <strong>Supabase</strong> (Supabase, Inc., EE. UU.): base de datos donde se
              almacenan los mensajes del formulario.
            </li>
            <li>
              <strong>Cloudflare</strong> (Cloudflare, Inc., EE. UU.): alojamiento, red de
              distribución y seguridad del sitio.
            </li>
            <li>
              <strong>Google</strong> (Google Ireland Ltd. / Google LLC): Google Tag Manager
              y Google Analytics 4 — solo con tu consentimiento.
            </li>
            <li>
              <strong>Meta</strong> (Meta Platforms Ireland Ltd. / Meta Platforms, Inc.):
              Meta Pixel — solo con tu consentimiento.
            </li>
          </ul>
          <p>
            También podríamos revelar datos si nos lo exige una autoridad competente o para
            ejercer o defender nuestros derechos.
          </p>

          <h2>5. Transferencias internacionales</h2>
          <p>
            Varios de estos proveedores están situados en Estados Unidos u otros países
            fuera de Costa Rica y del Espacio Económico Europeo. En esos casos la
            transferencia se ampara en las cláusulas contractuales y garantías que cada
            proveedor incorpora en sus condiciones de tratamiento de datos.
          </p>

          <h2>6. Cuánto tiempo los conservamos</h2>
          <ul>
            <li>
              <strong>Mensajes del formulario y comunicaciones:</strong> mientras dure la
              relación y hasta 24 meses después del último contacto, salvo que la ley exija
              un plazo mayor o solicites antes su eliminación.
            </li>
            <li>
              <strong>Datos de analítica:</strong> según la retención configurada en Google
              Analytics (14 meses por defecto).
            </li>
            <li>
              <strong>Registros del servidor:</strong> los periodos breves de retención que
              define Cloudflare.
            </li>
          </ul>

          <h2>7. Tus derechos</h2>
          <p>
            Conforme a la Ley 8968 puedes <strong>acceder</strong> a tus datos,{' '}
            <strong>rectificarlos</strong>, solicitar su <strong>eliminación</strong> cuando
            ya no sean necesarios o hayas revocado el consentimiento, y{' '}
            <strong>oponerte</strong> a determinados tratamientos. Para ejercerlos, escribe a{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> indicando tu solicitud;
            podemos pedirte que acredites tu identidad y responderemos dentro de los plazos
            legales.
          </p>
          <p>
            Si consideras que no atendimos correctamente tu solicitud, puedes acudir a la{' '}
            <strong>Agencia de Protección de Datos de los Habitantes (PRODHAB)</strong> —{' '}
            <a href="https://www.prodhab.go.cr" target="_blank" rel="noopener noreferrer">
              prodhab.go.cr
            </a>
            . Si te encuentras en la Unión Europea, también puedes reclamar ante la
            autoridad de control de tu país.
          </p>

          <h2>8. Seguridad</h2>
          <p>
            Servimos el sitio siempre sobre HTTPS, aplicamos cabeceras de seguridad y una
            política de seguridad de contenidos, y restringimos el acceso a la base de datos
            mediante políticas por fila (RLS): solo el personal autorizado puede leer los
            mensajes recibidos. Aun así, ningún sistema es completamente infalible.
          </p>

          <h2>9. Menores de edad</h2>
          <p>
            El sitio se dirige a empresas y profesionales. No está pensado para menores de
            edad y no recopilamos conscientemente sus datos.
          </p>

          <h2>10. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política para reflejar cambios legales o en el
            funcionamiento del sitio. Publicaremos siempre la versión vigente en esta
            página, con su fecha de última actualización.
          </p>

          <h2>11. Contacto</h2>
          <p>
            Para cualquier duda sobre esta política o sobre el tratamiento de tus datos,
            escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a>. Consulta también
            nuestra <Link href="/cookies">Política de Cookies</Link>.
          </p>
        </div>
      </Container>
    </section>
  )
}
