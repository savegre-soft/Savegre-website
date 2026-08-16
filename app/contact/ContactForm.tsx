'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '../lib/site'
import { CheckIcon } from '../components/Shared/icons'

/**
 * Formulario de consulta.
 *
 * ⚠️ El sitio se publica como export estático (`output: 'export'` en
 * next.config.ts), así que no hay servidor donde recibir el envío. Antes esto
 * se resolvía marcando "mensaje enviado" sin mandar nada — cada consulta se
 * perdía. Aquí, en su lugar, se compone un correo con los datos y se abre el
 * cliente de correo del usuario, que sí entrega.
 *
 * Para recibir los envíos directamente en el servidor hay dos caminos:
 *   1. Un servicio de formularios (Formspree, Web3Forms): cambiar `enviar` por
 *      un `fetch` POST a su endpoint. Sigue funcionando con export estático.
 *   2. Quitar `output: 'export'` y usar una Server Action con Resend.
 */

type Campos = {
  fullName: string
  email: string
  subject: string
  detail: string
}

const VACIO: Campos = { fullName: '', email: '', subject: '', detail: '' }

const etiquetas: Record<keyof Campos, string> = {
  fullName: 'Nombre completo',
  email: 'Correo electrónico',
  subject: 'Asunto',
  detail: 'Detalle',
}

function validar(form: Campos): Partial<Record<keyof Campos, string>> {
  const errores: Partial<Record<keyof Campos, string>> = {}

  if (!form.fullName.trim()) errores.fullName = 'Escribe tu nombre.'
  if (!form.email.trim()) errores.email = 'Escribe tu correo.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
    errores.email = 'Ese correo no parece válido.'
  if (!form.subject.trim()) errores.subject = 'Indica un asunto.'
  if (form.detail.trim().length < 20)
    errores.detail = 'Cuéntanos un poco más (al menos 20 caracteres).'

  return errores
}

const inputBase =
  'w-full border bg-ink px-4 py-3 text-sm text-fg transition-colors placeholder:text-faint ' +
  'focus:border-brand focus-visible:outline-none'

export default function ContactForm() {
  const [form, setForm] = useState<Campos>(VACIO)
  const [errores, setErrores] = useState<Partial<Record<keyof Campos, string>>>({})
  const [enviado, setEnviado] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = e.target.id as keyof Campos
    setForm((prev) => ({ ...prev, [id]: e.target.value }))
    // Limpia el error del campo en cuanto el usuario lo corrige
    if (errores[id]) setErrores((prev) => ({ ...prev, [id]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nuevos = validar(form)
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) {
      // Lleva el foco al primer campo con error para quien navega con teclado
      const primero = Object.keys(nuevos)[0]
      document.getElementById(primero)?.focus()
      return
    }

    const cuerpo = [
      `Nombre: ${form.fullName}`,
      `Correo: ${form.email}`,
      '',
      form.detail,
    ].join('\n')

    window.location.href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(form.subject)}` +
      `&body=${encodeURIComponent(cuerpo)}`

    setEnviado(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-fg mb-8 text-lg font-medium">Envía una consulta</h2>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 sm:flex-row">
          <Campo
            id="fullName"
            tipo="text"
            placeholder="Ana García"
            autoComplete="name"
            valor={form.fullName}
            error={errores.fullName}
            onChange={handleChange}
          />
          <Campo
            id="email"
            tipo="email"
            placeholder="ana@empresa.com"
            autoComplete="email"
            valor={form.email}
            error={errores.email}
            onChange={handleChange}
          />
        </div>

        <Campo
          id="subject"
          tipo="text"
          placeholder="Desarrollo de software"
          valor={form.subject}
          error={errores.subject}
          onChange={handleChange}
        />

        <Campo
          id="detail"
          tipo="textarea"
          placeholder="Cuéntanos sobre tu proyecto..."
          valor={form.detail}
          error={errores.detail}
          onChange={handleChange}
        />

        <div>
          <button
            type="submit"
            className="bg-brand-fill hover:bg-brand-dim active:scale-[0.98] px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-all"
          >
            Enviar consulta →
          </button>

          {/* `aria-live` hace que un lector de pantalla anuncie la confirmación */}
          <div aria-live="polite">
            <AnimatePresence>
              {enviado && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 inline-flex items-center gap-2 border border-green-900 bg-green-950 px-4 py-2.5 text-[13px] text-green-300"
                >
                  <CheckIcon size={15} />
                  Abrimos tu cliente de correo — envía el mensaje para completar.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
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
  tipo: 'text' | 'email' | 'textarea'
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
