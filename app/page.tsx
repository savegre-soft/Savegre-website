import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-zinc-950 text-zinc-100 font-['Epilogue',sans-serif]">
      
      {/* 1. HERO: ENFOQUE TÉCNICO */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden px-6 md:px-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-zinc-700"></span>
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">Performance & Data Engineering</p>
            </div>
            <h1 className="font-['Playfair_Display',serif] text-6xl md:text-8xl leading-[1.05] tracking-tight text-white">
              Sitios de alto impacto, <br />
              <span className="italic text-zinc-400">decisiones por datos.</span>
            </h1>
            <p className="max-w-xl text-lg text-zinc-400 leading-relaxed">
              Desarrollamos ecosistemas digitales rápidos y escalables, integrando capas de analítica avanzada para transformar cada clic en una métrica de negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/contact" className="h-14 px-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-950 text-sm font-bold hover:bg-white transition-all active:scale-95">
                Iniciar Proyecto
              </Link>
              <Link href="/services" className="h-14 px-8 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-900 transition-all">
                Nuestra Metodología
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANALYTICS FOCUS BAR */}
      <section className="py-16 border-y border-zinc-900 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Core Web Vitals", value: "Optimized" },
            { label: "Data Accuracy", value: "99.9%" },
            { label: "Tech Stack", value: "Modern" },
            { label: "Analytics", value: "GA4/GTM" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col border-l border-zinc-800 pl-6">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{stat.label}</span>
              <span className="font-['Playfair_Display',serif] text-2xl text-zinc-200">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE CAPABILITIES (Pivote a Desarrollo y Analítica) */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 mb-4 font-bold">Capabilities</p>
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl text-zinc-100 italic">Donde el código se encuentra con el insight.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="bg-zinc-900 p-12 hover:bg-zinc-900/60 transition-all group">
            <div className="w-10 h-10 border border-zinc-700 rounded flex items-center justify-center mb-8 group-hover:border-zinc-400 transition-colors">
              <span className="text-zinc-500 group-hover:text-white">{"</>"}</span>
            </div>
            <h3 className="font-['Playfair_Display',serif] text-3xl mb-4 text-zinc-100">Desarrollo Web</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Arquitecturas modernas con Next.js y React. Enfocados en velocidad de carga, SEO técnico y una experiencia de usuario que elimina la fricción.
            </p>
            <ul className="text-[11px] text-zinc-600 flex flex-wrap gap-4 uppercase tracking-tighter">
              <li>• Performance First</li>
              <li>• API Integrations</li>
              <li>• Scalable CMS</li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-12 hover:bg-zinc-900/60 transition-all group">
            <div className="w-10 h-10 border border-zinc-700 rounded flex items-center justify-center mb-8 group-hover:border-zinc-400 transition-colors">
              <span className="text-zinc-500 group-hover:text-white">{"Σ"}</span>
            </div>
            <h3 className="font-['Playfair_Display',serif] text-3xl mb-4 text-zinc-100">Analítica Digital</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              No solo desplegamos código, medimos resultados. Implementación de capas de datos (datalayers), tracking de eventos y visualización en Looker Studio.
            </p>
            <ul className="text-[11px] text-zinc-600 flex flex-wrap gap-4 uppercase tracking-tighter">
              <li>• Custom Events</li>
              <li>• Conversion Tracking</li>
              <li>• GA4 / GTM Audit</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. TECH STACK (Nombres de herramientas clave) */}
      <section className="py-20 px-6 md:px-10 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-30 grayscale gap-8">
           <span className="text-[10px] uppercase tracking-[0.3em]">Our Ecosystem:</span>
           <div className="flex flex-wrap justify-center gap-10 font-bold text-xl">
             <span>NEXT.JS</span>
             <span>SUPABASE</span>
             <span>GOOGLE ANALYTICS 4</span>
             <span>TAG MANAGER</span>
             <span>TAILWIND</span>
           </div>
        </div>
      </section>

      {/* 5. CTA TÉCNICO */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="bg-zinc-100 rounded-2xl p-12 md:p-20 flex flex-col items-center text-center">
          <h2 className="font-['Playfair_Display',serif] text-zinc-950 text-4xl md:text-6xl mb-8 leading-tight">
            ¿Tu sitio actual está <br /> <span className="italic opacity-60">midiendo lo que importa?</span>
          </h2>
          <Link href="/contact" className="inline-flex h-16 px-10 items-center justify-center rounded-full bg-zinc-950 text-white text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform">
            Auditar mi plataforma ↗
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-10 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-['Playfair_Display',serif] text-2xl font-bold italic">Savegre.</p>
          <p className="text-[10px] text-zinc-600 tracking-widest uppercase">© 2026 Engineering & Data Studio</p>
        </div>
      </footer>
    </div>
  );
}