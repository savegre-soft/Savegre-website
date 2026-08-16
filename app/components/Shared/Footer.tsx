import Link from 'next/link'
import { navLinks, site, socials, whatsapp, whatsappEnabled, whatsappUrl } from '../../lib/site'
import { MailIcon, MapPinIcon, WhatsAppIcon } from './icons'

/**
 * Footer único del sitio. Antes existían dos versiones distintas (una en la
 * home con el año escrito a mano, otra en servicios) y tres páginas sin footer.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-line mt-24 border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <p className="display text-fg text-2xl italic">Savegre.</p>
            <p className="text-muted mt-4 max-w-xs text-sm leading-relaxed">
              Desarrollo de software y análisis de datos. Sistemas construidos para
              durar, desde {site.location}.
            </p>
            <div className="text-faint mt-6 flex items-center gap-2 text-xs">
              <MapPinIcon size={15} />
              {site.location}
            </div>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <p className="eyebrow">Navegación</p>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-fg text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className="eyebrow">Contacto</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted hover:text-brand flex items-center gap-2 text-sm transition-colors"
                >
                  <MailIcon size={15} />
                  {site.email}
                </a>
              </li>
              {whatsappEnabled && (
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-whatsapp flex items-center gap-2 text-sm transition-colors"
                  >
                    <WhatsAppIcon size={15} />
                    {whatsapp.display}
                  </a>
                </li>
              )}
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-fg text-sm transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-line text-faint mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-[11px] tracking-[0.15em] uppercase md:flex-row">
          <p>© {year} {site.name}</p>
          <p>Desarrollo de Software &amp; Análisis de Datos</p>
        </div>
      </div>
    </footer>
  )
}
