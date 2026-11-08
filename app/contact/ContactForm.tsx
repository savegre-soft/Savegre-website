'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CheckIcon } from '../components/Shared/icons'

/**
 * Formulario de consulta — asistente por pasos ("pasarela").
 *
 * El sitio se publica como export estático (`output: 'export'`), así que no hay
 * servidor: el envío se manda directamente desde el navegador al formulario
 * público de DANA (el CRM), que aplica su propia configuración —responsable,
 * validaciones y anti-spam— y crea la tarjeta del lead. El endpoint es público
 * (no requiere clave); su configuración vive en DANA, no aquí.
 *
 * Los campos replican la configuración del formulario "Contacto web" en DANA:
 * Nombre (obligatorio), Apellido, Correo, Teléfono, Compañía y Mensaje, con la
 * regla "exigir teléfono o correo" (al menos uno de los dos). El llenado se
 * reparte en tres pasos; cada paso se valida antes de avanzar.
 */

/**
 * Endpoint público del formulario en DANA. Es público a propósito (como el
 * `action` de un `<form>` normal); no es un secreto.
 */
const DANA_FORM_ENDPOINT =
  'https://dana.savegresoft.com/api/public/forms/656586a513'

type Campos = {
  name: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
}

const VACIO: Campos = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
}

const etiquetas: Record<keyof Campos, string> = {
  name: 'Nombre',
  lastName: 'Apellido (opcional)',
  email: 'Correo',
  phone: 'Teléfono',
  company: 'Compañía (opcional)',
  message: 'Mensaje',
}

/** Los campos que agrupa cada paso del asistente, en orden. */
const PASOS: { titulo: string; campos: (keyof Campos)[] }[] = [
  { titulo: 'Tus datos', campos: ['name', 'lastName'] },
  { titulo: '¿Cómo te contactamos?', campos: ['email', 'phone'] },
  { titulo: 'Tu consulta', campos: ['company', 'message'] },
]

const ULTIMO = PASOS.length - 1

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validar(form: Campos): Partial<Record<keyof Campos, string>> {
  const errores: Partial<Record<keyof Campos, string>> = {}

  if (!form.name.trim()) errores.name = 'Escribe tu nombre.'

  // DANA exige al menos un medio de contacto (correo o teléfono). Si falta el
  // correo pero hay teléfono, es válido; si hay correo, debe tener buen formato.
  const email = form.email.trim()
  const phone = form.phone.trim()
  if (!email && !phone) {
    errores.email = 'Déjanos un correo o un teléfono para responderte.'
  } else if (email && !EMAIL_RE.test(email)) {
    errores.email = 'Ese correo no parece válido.'
  }

  if (form.message.trim().length < 20)
    errores.message = 'Cuéntanos un poco más (al menos 20 caracteres).'

  return errores
}

/** Errores de `validar` restringidos a los campos de un paso concreto. */
function erroresDePaso(
  form: Campos,
  campos: (keyof Campos)[]
): Partial<Record<keyof Campos, string>> {
  const todos = validar(form)
  const soloDelPaso: Partial<Record<keyof Campos, string>> = {}
  for (const campo of campos) if (todos[campo]) soloDelPaso[campo] = todos[campo]
  return soloDelPaso
}

const inputBase =
  'w-full border bg-ink px-4 py-3 text-sm text-fg transition-colors placeholder:text-faint ' +
  'focus:border-brand focus-visible:outline-none'

export default function ContactForm() {
  const [form, setForm] = useState<Campos>(VACIO)
  const [errores, setErrores] = useState<Partial<Record<keyof Campos, string>>>({})
  const [paso, setPaso] = useState(0)
  // Dirección del último cambio de paso, para que la animación entre/salga
  // hacia el lado correcto (1 = avanza, -1 = retrocede).
  const [direccion, setDireccion] = useState(1)
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [fallo, setFallo] = useState(false)

  const prefiereReduccion = useReducedMotion()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = e.target.id as keyof Campos
    setForm((prev) => ({ ...prev, [id]: e.target.value }))
    // Limpia el error del campo en cuanto el usuario lo corrige
    if (errores[id]) setErrores((prev) => ({ ...prev, [id]: undefined }))
  }

  /** Enfoca el primer campo de la lista que tenga error (accesibilidad). */
  const enfocarPrimerError = (errs: Partial<Record<keyof Campos, string>>) => {
    const primero = Object.keys(errs)[0]
    if (primero) document.getElementById(primero)?.focus()
  }

  const retroceder = () => {
    setDireccion(-1)
    setErrores({})
    setPaso((p) => Math.max(0, p - 1))
  }

  const avanzar = () => {
    const errs = erroresDePaso(form, PASOS[paso].campos)
    if (Object.keys(errs).length > 0) {
      setErrores(errs)
      enfocarPrimerError(errs)
      return
    }
    setErrores({})
    setDireccion(1)
    setPaso((p) => Math.min(ULTIMO, p + 1))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // En cualquier paso que no sea el último, "enviar" (incluido pulsar Enter)
    // en realidad avanza al siguiente paso.
    if (paso < ULTIMO) {
      avanzar()
      return
    }

    // Último paso: validamos TODO por si volvió atrás y cambió algo.
    const todos = validar(form)
    if (Object.keys(todos).length > 0) {
      setErrores(todos)
      // Salta al primer paso que contenga un error y enfoca el campo.
      const pasoConError = PASOS.findIndex((p) =>
        p.campos.some((c) => todos[c])
      )
      if (pasoConError !== -1 && pasoConError !== paso) {
        setDireccion(pasoConError < paso ? -1 : 1)
        setPaso(pasoConError)
      }
      enfocarPrimerError(todos)
      return
    }

    setEnviando(true)
    setFallo(false)

    // Enviamos solo los campos con valor; `name` y `message` siempre van, el
    // resto (apellido, correo, teléfono, compañía) solo si el usuario los llenó.
    const payload: Partial<Record<keyof Campos, string>> = {
      name: form.name.trim(),
      message: form.message.trim(),
    }
    const lastName = form.lastName.trim()
    if (lastName) payload.lastName = lastName
    const email = form.email.trim()
    if (email) payload.email = email
    const phone = form.phone.trim()
    if (phone) payload.phone = phone
    const company = form.company.trim()
    if (company) payload.company = company

    try {
      const res = await fetch(DANA_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json().catch(() => null)

      setEnviando(false)

      if (!res.ok || !json?.ok) {
        setFallo(true)
        return
      }
    } catch {
      // Error de red (sin conexión, CORS, etc.)
      setEnviando(false)
      setFallo(true)
      return
    }

    setForm(VACIO)
    setEnviado(true)
  }

  // Al enviarse con éxito, el asistente se reemplaza por la confirmación.
  if (enviado) {
    return (
      <div>
        <h2 className="text-fg mb-8 text-lg font-medium">Envía una consulta</h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 border border-green-900 bg-green-950 px-4 py-2.5 text-[13px] text-green-300"
          role="status"
        >
          <CheckIcon size={15} />
          Gracias — recibimos tu consulta y te responderemos pronto.
        </motion.p>
      </div>
    )
  }

  const desplazamiento = prefiereReduccion ? 0 : 28
  const pasoActual = PASOS[paso]

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-fg mb-2 text-lg font-medium">Envía una consulta</h2>

      {/* Indicador de progreso */}
      <div className="mb-8">
        <div className="text-muted mb-2 flex items-center justify-between text-xs tracking-[0.05em] uppercase">
          <span>
            Paso {paso + 1} de {PASOS.length}
          </span>
          <span className="text-faint normal-case">{pasoActual.titulo}</span>
        </div>
        <div className="bg-line h-1 w-full overflow-hidden rounded-full">
          <motion.div
            className="bg-brand-fill h-full rounded-full"
            initial={false}
            animate={{ width: `${((paso + 1) / PASOS.length) * 100}%` }}
            transition={{ duration: prefiereReduccion ? 0 : 0.3 }}
          />
        </div>
      </div>

      {/* Campos del paso actual */}
      <div className="min-h-[9.5rem]">
        <AnimatePresence mode="wait" custom={direccion}>
          <motion.div
            key={paso}
            custom={direccion}
            initial={{ x: direccion * desplazamiento, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direccion * -desplazamiento, opacity: 0 }}
            transition={{ duration: prefiereReduccion ? 0 : 0.25 }}
            className="flex flex-col gap-5"
          >
            {paso === 0 && (
              <div className="flex flex-col gap-5 sm:flex-row">
                <Campo
                  id="name"
                  tipo="text"
                  placeholder="María"
                  autoComplete="given-name"
                  valor={form.name}
                  error={errores.name}
                  onChange={handleChange}
                />
                <Campo
                  id="lastName"
                  tipo="text"
                  placeholder="Rodríguez"
                  autoComplete="family-name"
                  valor={form.lastName}
                  error={errores.lastName}
                  onChange={handleChange}
                />
              </div>
            )}

            {paso === 1 && (
              <div className="flex flex-col gap-5 sm:flex-row">
                <Campo
                  id="email"
                  tipo="email"
                  placeholder="maria@empresa.com"
                  autoComplete="email"
                  valor={form.email}
                  error={errores.email}
                  onChange={handleChange}
                />
                <Campo
                  id="phone"
                  tipo="tel"
                  placeholder="+506 8888-0000"
                  autoComplete="tel"
                  valor={form.phone}
                  error={errores.phone}
                  onChange={handleChange}
                />
              </div>
            )}

            {paso === 2 && (
              <>
                <Campo
                  id="company"
                  tipo="text"
                  placeholder="ACME"
                  autoComplete="organization"
                  valor={form.company}
                  error={errores.company}
                  onChange={handleChange}
                />
                <Campo
                  id="message"
                  tipo="textarea"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  valor={form.message}
                  error={errores.message}
                  onChange={handleChange}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación */}
      <div className="mt-8 flex items-center gap-4">
        {paso > 0 && (
          <button
            type="button"
            onClick={retroceder}
            disabled={enviando}
            className="text-muted hover:text-fg px-2 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            ← Atrás
          </button>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="bg-brand-fill hover:bg-brand-dim active:scale-[0.98] px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-all disabled:cursor-not-allowed disabled:opacity-60"
        >
          {paso < ULTIMO
            ? 'Siguiente →'
            : enviando
              ? 'Enviando…'
              : 'Enviar consulta →'}
        </button>
      </div>

      {/* `aria-live` hace que un lector de pantalla anuncie el fallo */}
      <div aria-live="polite">
        <AnimatePresence>
          {fallo && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 inline-flex items-center gap-2 border border-red-900 bg-red-950 px-4 py-2.5 text-[13px] text-red-300"
            >
              No pudimos enviar tu consulta. Inténtalo de nuevo o escríbenos a
              contacto@savegresoft.com.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function Campo({
  id,
  tipo,
  placeholder,
  autoComplete,
  valor,
  error,
  onChange,
}: {
  id: keyof Campos
  tipo: 'text' | 'email' | 'tel' | 'textarea'
  placeholder: string
  autoComplete?: string
  valor: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) {
  const errorId = `${id}-error`
  const borde = error ? 'border-red-800' : 'border-line'

  return (
    <div className="flex flex-1 flex-col gap-2">
      <label
        htmlFor={id}
        className="text-muted text-xs tracking-[0.05em] uppercase"
      >
        {etiquetas[id]}
      </label>

      {tipo === 'textarea' ? (
        <textarea
          id={id}
          rows={5}
          className={`${inputBase} ${borde} resize-y`}
          placeholder={placeholder}
          value={valor}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={id}
          type={tipo}
          autoComplete={autoComplete}
          className={`${inputBase} ${borde}`}
          placeholder={placeholder}
          value={valor}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}

      {error && (
        <p id={errorId} className="text-[12px] text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
