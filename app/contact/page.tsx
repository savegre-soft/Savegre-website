"use client"
import { useState } from "react"

const ContactPage = () => {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-8 py-16 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-neutral-800 pb-10">
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
            Contacte con Nuestro Equipo
          </span>
          <h1 className="text-5xl font-extralight tracking-tight text-white leading-tight">
            Ingeniería de <br />
            <span className="text-neutral-400">Excelencia</span>
          </h1>
          <p className="text-neutral-400 font-light leading-relaxed max-w-xl text-sm">
            Tanto si está diseñando un nuevo sistema como si está optimizando la infraestructura
            existente, nuestro equipo está preparado para ofrecerle soluciones codificadas con precisión.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Formulario — 3/5 */}
          <div className="lg:col-span-3 bg-neutral-900 border border-neutral-800 p-8 flex flex-col gap-6">
            <h3 className="text-2xl font-extralight tracking-tight text-white">
              Envía tu consulta
            </h3>

            {sent ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="w-12 h-12 rounded-full border border-neutral-600 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-neutral-300 font-light text-lg">Mensaje enviado</p>
                <p className="text-neutral-500 text-sm">Nos pondremos en contacto a la brevedad posible.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }) }}
                  className="mt-4 text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  Enviar otro →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Row: Nombre + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Nombre", name: "name", type: "text", placeholder: "Su nombre completo" },
                    { label: "Correo electrónico", name: "email", type: "email", placeholder: "email@empresa.com" },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-widest uppercase text-neutral-500">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                        placeholder={field.placeholder}
                        className={`bg-neutral-950 border text-sm text-neutral-200 placeholder-neutral-700 px-4 py-3 outline-none transition-colors ${
                          focused === field.name ? "border-neutral-500" : "border-neutral-800"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Asunto */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-neutral-500">
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    placeholder="Descripción breve del proyecto"
                    className={`bg-neutral-950 border text-sm text-neutral-200 placeholder-neutral-700 px-4 py-3 outline-none transition-colors ${
                      focused === "subject" ? "border-neutral-500" : "border-neutral-800"
                    }`}
                  />
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-neutral-500">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Describa su proyecto o consulta en detalle..."
                    rows={5}
                    className={`bg-neutral-950 border text-sm text-neutral-200 placeholder-neutral-700 px-4 py-3 outline-none resize-none transition-colors ${
                      focused === "message" ? "border-neutral-500" : "border-neutral-800"
                    }`}
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="mt-2 self-start bg-white text-neutral-950 text-xs tracking-[0.2em] uppercase font-medium px-8 py-3 hover:bg-neutral-200 transition-colors"
                >
                  Enviar consulta
                </button>
              </div>
            )}
          </div>

          {/* Datos de contacto — 2/5 */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Ubicación */}
            <div className="border border-neutral-800 p-6 flex flex-col gap-3 bg-neutral-900 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs tracking-widest uppercase text-neutral-500">Ubicación</span>
              </div>
              <div className="pl-9">
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                San Carlos, Costa Rica
                </p>
              </div>
            </div>

            {/* Contacto */}
            <div className="border border-neutral-800 p-6 flex flex-col gap-3 bg-neutral-900 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs tracking-widest uppercase text-neutral-500">Contacto</span>
              </div>
              <div className="pl-9 flex flex-col gap-2">
                <a href="mailto:savegre.soft@gmail.com" className="text-sm text-neutral-300 font-light hover:text-white transition-colors">
                  savegre.soft@gmail.com
                </a>
                <a href="tel:+525512345678" className="text-sm text-neutral-300 font-light hover:text-white transition-colors">
                  +506 86279806
                </a>
                <p className="text-xs text-neutral-600 mt-1">Lun–Vie · 09:00–18:00 CST</p>
              </div>
            </div>

            {/* Redes */}
            <div className="border border-neutral-800 p-6 flex flex-col gap-3 bg-neutral-900 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <span className="text-xs tracking-widest uppercase text-neutral-500">Redes</span>
              </div>
              <div className="pl-9 flex flex-col gap-2">
               
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage