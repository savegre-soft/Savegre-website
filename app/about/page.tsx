const values = [
  {
    title: "Precisión",
    description: "Cada decisión técnica está fundamentada en matemática y lógica formal.",
  },
  {
    title: "Integridad",
    description: "Código limpio, compromisos reales, resultados verificables.",
  },
  {
    title: "Escalabilidad",
    description: "Arquitecturas que crecen con su negocio sin fricciones.",
  },
]

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-8 py-16 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-neutral-800 pb-10">
          <span className="text-xs tracking-[0.25em] uppercase text-blue-700 font-medium">
            Savegre Soft — Quiénes Somos
          </span>
          <h1 className="text-5xl font-extralight tracking-tight text-white leading-tight">
            Arquitectura de <br />
            <span className="text-neutral-400">Compromiso</span>
          </h1>
          <p className="text-neutral-400 font-light leading-relaxed max-w-xl text-sm">
            En Savegre Soft no solo escribimos código; diseñamos ecosistemas digitales
            robustos basados en la precisión matemática y la excelencia técnica.
          </p>
        </div>

        {/* Misión & Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            {
              label: "Misión",
              text: "Desarrollar soluciones tecnológicas de alta gama que superen los estándares convencionales de fiabilidad, escalabilidad y rendimiento — permitiendo a nuestros clientes operar con confianza.",
            },
            {
              label: "Visión",
              text: "Ser reconocidos como el estándar de oro en ingeniería de software, donde cada línea de código sea sinónimo de integridad.",
            },
          ].map(({ label, text }) => (
            <div key={label} className="bg-neutral-900 border border-neutral-800 hover:border-blue-900 transition-colors p-6 flex flex-col gap-3">
              <span className="text-xs tracking-widest uppercase text-blue-700">{label}</span>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Valores */}
        <div className="flex flex-col gap-6">
          <span className="text-xs tracking-[0.25em] uppercase text-blue-700 font-medium">
            Valores
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <div key={v.title} className="bg-neutral-900 border border-neutral-800 hover:border-blue-900 transition-colors p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-blue-800 font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs tracking-widest uppercase text-blue-700">{v.title}</span>
                </div>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Historia */}
        <div className="flex flex-col gap-4 border-t border-neutral-800 pt-10">
          <span className="text-xs tracking-[0.25em] uppercase text-blue-700 font-medium">
            Historia
          </span>
          <p className="text-sm text-neutral-600 font-light italic">Próximamente...</p>
        </div>

      </div>
    </div>
  )
}

export default AboutPage