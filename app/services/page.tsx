import React from 'react';

const services = [
  { num: "01", title: "Desarrollo Web", desc: "Sitios y aplicaciones web rápidas, accesibles y elegantes que convierten visitantes en clientes y destacan en cualquier mercado.", tags: ["UI/UX", "React", "Next.js"] },
  { num: "02", title: "Arquitectura de Software", desc: "Diseñamos sistemas robustos y escalables desde la base — microservicios, APIs, bases de datos y más, pensados para crecer.", tags: ["Microservicios", "API REST", "Cloud"] },
  { num: "03", title: "Consultoría Técnica", desc: "Analizamos su infraestructura actual e identificamos oportunidades de mejora en rendimiento, seguridad y escalabilidad.", tags: ["Auditoría", "Optimización", "Seguridad"] },
  { num: "04", title: "Estrategia de Producto", desc: "Desde el descubrimiento hasta el roadmap, ayudamos a los equipos a priorizar con criterio y entregar funcionalidades que los usuarios realmente necesitan.", tags: ["Roadmap", "OKRs", "Sprints"] },
  { num: "05", title: "Integración de Sistemas", desc: "Conectamos plataformas, servicios y datos para que su ecosistema digital funcione como una sola unidad coherente.", tags: ["APIs", "Webhooks", "ETL"] },
  { num: "06", title: "Soporte Continuo", desc: "Un equipo dedicado para empresas que necesitan soporte técnico estratégico y constante mes a mes.", tags: ["Mensual", "Flexible", "Prioritario"] },
];

const stats = [
  { num: "100%", label: "Satisfacción del cliente" },
];

const ServicesPage = () => {
  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen font-sans px-6 py-12 md:px-10">

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end mb-12 pb-6 border-b border-neutral-800">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-blue-700 font-medium mb-3">
            Savegre Soft — Servicios
          </p>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight">
            Soluciones construidas<br />
            <span className="text-neutral-400">para resultados reales.</span>
          </h1>
        </div>
        <p className="text-sm text-neutral-400 max-w-[240px] leading-relaxed mt-4 md:mt-0 md:text-right font-light">
          De la estrategia a la ejecución, trabajamos junto a usted en cada etapa.
        </p>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800 overflow-hidden">
        {services.map((s) => (
          <div key={s.num} className="bg-neutral-900 p-7 flex flex-col gap-4 hover:bg-neutral-900/50 hover:border-blue-900 transition-colors group">
            <p className="text-xs tracking-widest text-blue-800 group-hover:text-blue-700 transition-colors font-medium">{s.num}</p>
            <h3 className="text-xl font-extralight tracking-tight">{s.title}</h3>
            <p className="text-xs leading-relaxed text-neutral-400 flex-1 font-light">{s.desc}</p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="text-[9px] px-2 py-1 bg-blue-950/30 text-blue-700 border border-blue-950">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid my-2 grid-cols-1 lg:grid-cols-[2fr_1fr] gap-px bg-neutral-800 border border-neutral-800 overflow-hidden mt-px">

        {/* CTA Block */}
        <div className="bg-neutral-100 p-8 md:p-10 text-neutral-950">
          <p className="text-xs tracking-[0.25em] uppercase text-blue-700 font-medium">¿Listo para comenzar?</p>
          <h2 className="text-3xl font-extralight tracking-tight my-4">
            Construyamos algo<br />
            <span className="text-neutral-500">que valga la pena.</span>
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed max-w-sm font-light">
            Cuéntenos sobre su proyecto y prepararemos una propuesta personalizada en menos de 48 horas.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-900 text-blue-100 text-xs tracking-[0.2em] uppercase font-medium hover:bg-blue-800 transition-colors">
            Contáctenos ↗
          </button>
        </div>

        {/* Stats Block */}
        <div className="bg-neutral-900 p-8 md:p-10 flex flex-col justify-between gap-8 md:gap-0">
          {stats.map((s, i) => (
            <div key={s.label}>
              <p className="text-4xl font-extralight tracking-tight text-white">{s.num}</p>
              <p className="text-xs uppercase tracking-widest text-blue-700 mt-1 font-medium">{s.label}</p>
              {i < stats.length - 1 && <div className="h-px bg-neutral-800 my-4 lg:my-6" />}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-neutral-600">
          © {new Date().getFullYear()} Savegre Soft. Ingeniería de software.
        </p>
        <div className="flex gap-6">
          {["LinkedIn", "GitHub", "Instagram"].map((social) => (
            <a key={social} href="#" className="text-xs text-blue-800 hover:text-blue-500 transition-colors uppercase tracking-widest">
              {social}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ServicesPage;