const casos = [
  {
    empresa: "Oasis Meals",
    trabajo: "Sitio web para gestión de los pedidos y ordenes de compra",
    tags: ["Supabase", "React", "SQL"],
    enlace: "https://oasis-meals.com/",
  },
]

const productos = [
  {
    nombre: "RH System",
    descripcion: "Sistema Web de Recursos Humanos para pequeñas y medianas empresas",
    estado: "En Desarrollo",
    enlace: "#",
  },
  {
    nombre: "PulpPos",
    descripcion: "Sistema web desarrollado en blazor para la gestión de una pulpería",
    estado: "En Desarrollo",
    enlace: "#",
  },
]

const estadoColor: Record<string, string> = {
  "Disponible": "text-neutral-300 border-neutral-600",
  "Beta": "text-neutral-400 border-neutral-700",
  "En desarrollo": "text-neutral-500 border-neutral-800",
}

const PortafolioPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-8 py-16 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-neutral-800 pb-10">
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
            Savegre Soft — Portafolio
          </span>
          <h1 className="text-5xl font-extralight tracking-tight text-white leading-tight">
            Nuestro Trabajo <br />
            <span className="text-neutral-400">en Producción</span>
          </h1>
          <p className="text-neutral-400 font-light leading-relaxed max-w-xl text-sm">
            Casos de éxito y productos propios que reflejan nuestro estándar de
            ingeniería — fiables, escalables y construidos para durar.
          </p>
        </div>

        {/* Casos de Éxito */}
        <div className="flex flex-col gap-6">
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
            Casos de Éxito
          </span>
          <div className="flex flex-col gap-4">
            {casos.map((c, i) => (
              <div
                key={c.empresa}
                className="bg-neutral-900 border border-neutral-800 p-6 grid grid-cols-1 lg:grid-cols-5 gap-6 items-start"
              >
                {/* Número + empresa */}
                <div className="lg:col-span-1 flex flex-col gap-1">
                  <span className="text-xs text-neutral-600 font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-white font-medium">{c.empresa}</p>
                </div>

                {/* Trabajo */}
                <p className="lg:col-span-3 text-sm text-neutral-400 font-light leading-relaxed">
                  {c.trabajo}
                </p>

                {/* Tags + enlace */}
                <div className="lg:col-span-1 flex flex-col gap-3 items-start lg:items-end">
                  <div className="flex flex-wrap gap-1.5 lg:justify-end">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-neutral-500 border border-neutral-800 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={c.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors"
                  >
                    Ver sitio →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos */}
        <div className="flex flex-col gap-6">
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
            Productos Propios
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {productos.map((p) => (
              <div
                key={p.nombre}
                className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-extralight tracking-tight text-white">
                    {p.nombre}
                  </h3>
                  <span
                    className={`text-xs border px-2 py-0.5 shrink-0 ${estadoColor[p.estado]}`}
                  >
                    {p.estado}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 font-light leading-relaxed flex-1">
                  {p.descripcion}
                </p>
                <a
                  href={p.enlace}
                  className="text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors self-start"
                >
                  Más info →
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PortafolioPage