import { site, whatsapp, whatsappEnabled, whatsappUrl } from '../lib/site'
import { ClockIcon, MailIcon, MapPinIcon, WhatsAppIcon } from '../components/Shared/icons'

/**
 * Canales de contacto. WhatsApp va primero y con tratamiento destacado por ser
 * el canal de respuesta inmediata; el resto son tarjetas normales.
 *
 * La tarjeta de WhatsApp solo aparece cuando hay un número real configurado
 * en `app/lib/site.ts` (ver `whatsappEnabled`).
 */
export default function ContactChannels() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-fg mb-2 text-lg font-medium">Información de contacto</h2>

      {/* Se muestra siempre, pero solo enlaza cuando hay un número real. Sin
          configurar, no se inventa un número: se indica que está pendiente. */}
      {whatsappEnabled ? (
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="border-whatsapp/40 bg-whatsapp/10 hover:bg-whatsapp/15 hover:border-whatsapp block border p-6 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-whatsapp">
              <WhatsAppIcon size={20} />
            </span>
            <h3 className="text-fg text-sm font-medium">WhatsApp</h3>
            <span className="bg-whatsapp/15 text-whatsapp ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
              Más rápido
            </span>
          </div>
          <p className="text-fg mt-3 text-sm">{whatsapp.display}</p>
          <p className="text-muted mt-1 text-xs">
            Escríbenos y te respondemos en horario laboral
          </p>
        </a>
      ) : (
        <div className="border-whatsapp/30 bg-whatsapp/5 border p-6">
          <div className="flex items-center gap-3">
            <span className="text-whatsapp">
              <WhatsAppIcon size={20} />
            </span>
            <h3 className="text-fg text-sm font-medium">WhatsApp</h3>
          </div>
          <p className="text-muted mt-3 text-sm">Número por configurar</p>
          <p className="text-faint mt-1 text-xs">
            Mientras tanto, escríbenos por correo o con el formulario
          </p>
        </div>
      )}

      <div className="border-line hover:border-line-strong border p-6 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-brand">
            <MailIcon size={18} />
          </span>
          <h3 className="text-fg text-sm font-medium">Correo</h3>
        </div>
        <a
          href={`mailto:${site.email}`}
          className="text-brand hover:text-fg mt-3 block text-sm transition-colors"
        >
          {site.email}
        </a>
        <p className="text-muted mt-1 text-xs">Respondemos en 24–48 horas hábiles</p>
      </div>

      <div className="border-line hover:border-line-strong border p-6 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-brand">
            <MapPinIcon size={18} />
          </span>
          <h3 className="text-fg text-sm font-medium">Ubicación</h3>
        </div>
        <p className="text-muted mt-3 text-sm">{site.location}</p>
        <p className="text-faint mt-1 text-xs">Zona horaria: {site.timezone}</p>
      </div>

      <div className="border-line hover:border-line-strong border p-6 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-brand">
            <ClockIcon size={18} />
          </span>
          <h3 className="text-fg text-sm font-medium">Horario</h3>
        </div>
        <p className="text-muted mt-3 text-sm">{site.schedule.weekdays}</p>
        <p className="text-faint mt-1 text-xs">{site.schedule.weekend}</p>
      </div>
    </div>
  )
}
