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
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-medium">Ingeniería de Excelencia</p>
            </div>
            <h1 className="font-['Playfair_Display',serif] text-6xl md:text-8xl leading-[1.05] tracking-tight text-white">
              Excelencia en <br />
              <span className="italic text-zinc-400">ingeniería de Software</span>
            </h1>
            <p className="max-w-xl text-lg text-zinc-400 leading-relaxed">
              Desarrollamos soluciones digitales de alta precisión de alta precisión con un enfoque corporativo y formal.
              <br />
              Nuestra arquitectura esta diseñada para la escalabidad global.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4 mt-4">
              <Link href="/contact" className="h-12 px-8 bg-blue-700 flex justify-center items-center hover:bg-blue-900 transition duration-500 ">
                INICIAR PROYECTO
              </Link>
              <Link href="/services" className="h-12 px-8 border border-gray-500 flex justify-center items-center hover:bg-gray-800 transition duration-500">
                EXPLORAR PORTAFOLIO
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-2 border border-primary opacity-75" style={{ borderWidth: '1px' }} />
      {/* 3. CORE CAPABILITIES (Pivote a Desarrollo y Analítica) */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 mb-4 font-bold">Capacidades</p>
          <div className='flex flex-col gap-4'>
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl text-zinc-100 italic">
              Soluciones de Ingeniería
            </h2>
            <hr className="border border-zinc-400 opacity-50" />
            <p className="text-zinc-300 text-sm md:text-base">
              SISTEMAS CONSTRUIDOS SOBRE PILARES DE SEGURIDAD Y RENDIMIENTO
            </p>
          </div>
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
              <li>• REACT & NEXT.JS ECOSYSTEM</li>
              <li>• DESARROLLO GRADO EMPRESARIAL</li>
      
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
              <li>• ANALISIS DE DATOS</li>
              <li>• ASERORÍA</li>
              <li>• DASHBOARDS</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. TECH STACK (Nombres de herramientas clave) */}
      <section className="py-20 px-6 md:px-10 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-30 grayscale gap-8">
          <span className="text-[10px] uppercase tracking-[0.3em]">NUESTRO ECOSISTEMA:</span>
          <div className="flex flex-wrap justify-center gap-10 font-bold text-xl">
            <span>NEXT.JS</span>
            <span>SUPABASE</span>
            <span>GOOGLE DATA DATA STUDIO</span>
            <span>VITE</span>
            <span>.NET</span>
            <span>TAILWIND</span>
          </div>
        </div>
      </section>

      {/* 5. CTA TÉCNICO */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="bg-zinc-100 rounded-2xl p-12 md:p-20 flex flex-col items-center text-center">
          <h2 className="font-['Playfair_Display',serif] text-zinc-950 text-4xl md:text-6xl mb-8 leading-tight">
            ¿Pensando en alguna idea<br /> <span className="italic opacity-60"> en la que quieras trabajar?</span>
          </h2>
          <Link href="/contact" className="inline-flex h-16 px-10 items-center justify-center rounded-full bg-zinc-950 text-white text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform">
            Realiza tu consulta ↗
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-10 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-['Playfair_Display',serif] text-2xl font-bold italic">Savegre.</p>
          <p className="text-[10px] text-zinc-600 tracking-widest uppercase">© 2026 Desarrollo de Software & Analisis de Datos</p>
        </div>
      </footer>
    </div>
  );
}