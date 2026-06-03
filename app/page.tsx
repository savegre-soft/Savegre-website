import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      className="bg-zinc-950 text-zinc-100 overflow-x-hidden"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Instrument+Sans:wght@400;500;600&display=swap');

        :root {
          --serif: 'Cormorant Garamond', serif;
          --blue: #2563eb;
          --blue-dim: #1d4ed8;
        }

        .display { font-family: var(--serif); }

        /* Fade-up on load */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-1 { animation: fadeUp 0.9s ease both; }
        .fade-2 { animation: fadeUp 0.9s 0.15s ease both; }
        .fade-3 { animation: fadeUp 0.9s 0.3s ease both; }
        .fade-4 { animation: fadeUp 0.9s 0.45s ease both; }

        /* Hover line underline */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: white;
          background: var(--blue); padding: 14px 32px;
          transition: background 0.25s, gap 0.2s;
        }
        .btn-primary:hover { background: var(--blue-dim); gap: 16px; }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: #a1a1aa;
          border: 1px solid #3f3f46; padding: 14px 32px;
          transition: color 0.2s, border-color 0.2s, gap 0.2s;
        }
        .btn-ghost:hover { color: white; border-color: #71717a; gap: 16px; }

        /* Capability cards */
        .cap-card {
          background: #0c0c0e; border: 1px solid #1c1c1f;
          padding: 48px; display: flex; flex-direction: column; gap: 20px;
          transition: border-color 0.3s;
          position: relative; overflow: hidden;
        }
        .cap-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0.04) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.4s;
        }
        .cap-card:hover { border-color: #2f2f38; }
        .cap-card:hover::before { opacity: 1; }

        .icon-box {
          width: 40px; height: 40px; border: 1px solid #2a2a2f;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.3s;
        }
        .cap-card:hover .icon-box { border-color: #3f3f46; }

        /* Tech pills */
        .tech-pill {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #52525b;
          padding: 6px 14px; border: 1px solid #1c1c1f;
          transition: color 0.2s, border-color 0.2s;
        }
        .tech-pill:hover { color: #a1a1aa; border-color: #3f3f46; }

        /* Stat items */
        .stat-item { display: flex; flex-direction: column; gap: 4px; }
        .stat-num {
          font-family: var(--serif); font-size: 52px; font-weight: 300;
          color: white; line-height: 1; letter-spacing: -0.02em;
        }
        .stat-label {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #52525b; font-weight: 500;
        }

        /* Marquee */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex; white-space: nowrap; width: max-content;
          animation: marquee 18s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        /* CTA block */
        .cta-block {
          background: #f4f4f5; position: relative; overflow: hidden;
        }
        .cta-block::before {
          content: ''; position: absolute; top: -40%; right: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #09090b; color: white;
          font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 18px 40px;
          border-radius: 100px; transition: transform 0.2s, gap 0.2s;
        }
        .cta-btn:hover { transform: scale(1.03); gap: 16px; }

        .divider { border: none; border-top: 1px solid #18181b; margin: 0; }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        {/* Decorative vertical line */}
        <div
          className="absolute left-6 md:left-16 lg:left-24 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, #27272a 30%, #27272a 70%, transparent 100%)' }}
        />

        <div className="max-w-5xl ml-auto mr-0 w-full pl-8 md:pl-16 py-32">
          <div className="flex items-center gap-4 mb-10 fade-1">
            <span className="h-px w-8 bg-blue-700" />
            <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#52525b', fontWeight: 600 }}>
              Ingeniería de Excelencia — San José, CR
            </p>
          </div>

          <h1
            className="display fade-2 text-white"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '32px' }}
          >
            Construimos software<br />
            <em style={{ color: '#71717a', fontWeight: 300 }}>que escala.</em>
          </h1>

          <p
            className="fade-3"
            style={{ maxWidth: '480px', fontSize: '15px', color: '#71717a', lineHeight: 1.75, marginBottom: '48px' }}
          >
            Soluciones digitales de alta precisión con arquitectura diseñada para
            el rendimiento corporativo y la escalabilidad global.
          </p>

          <div className="flex flex-wrap gap-4 fade-4">
            <Link href="/contact" className="btn-primary">
              Iniciar proyecto <span>→</span>
            </Link>
            <Link href="/services" className="btn-ghost">
              Ver portafolio <span>→</span>
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="fade-4 flex flex-wrap gap-12 mt-20 pt-12"
            style={{ borderTop: '1px solid #18181b' }}
          >
            {[
              { n: '50+', l: 'Proyectos entregados' },
              { n: '8+', l: 'Años de experiencia' },
              { n: '100%', l: 'Enfoque en resultados' },
            ].map(({ n, l }) => (
              <div key={l} className="stat-item">
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ─── CAPACIDADES ─── */}
      <section className="py-28 px-6 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#52525b', fontWeight: 600, marginBottom: '16px' }}>
              Capacidades
            </p>
            <h2
              className="display text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, lineHeight: 1.15 }}
            >
              Soluciones de<br /><em>ingeniería</em>
            </h2>
          </div>
          <p style={{ maxWidth: '320px', fontSize: '13px', color: '#52525b', lineHeight: 1.7 }}>
            Sistemas construidos sobre pilares de seguridad,
            rendimiento y observabilidad desde el día uno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#18181b' }}>
          {[
            {
              icon: '</>',
              title: 'Desarrollo Web',
              desc: 'Arquitecturas modernas con Next.js y React. Velocidad de carga óptima, SEO técnico y experiencias de usuario sin fricción para equipos de cualquier escala.',
              tags: ['React & Next.js', 'Grado empresarial', 'TypeScript'],
            },
            {
              icon: 'Σ',
              title: 'Analítica Digital',
              desc: 'No solo desplegamos código, medimos resultados. Datalayers, tracking de eventos y dashboards en Looker Studio para decisiones basadas en datos reales.',
              tags: ['Data Layers', 'Dashboards', 'Asesoría'],
            },
          ].map(({ icon, title, desc, tags }) => (
            <div key={title} className="cap-card">
              <div className="icon-box">
                <span style={{ fontSize: '13px', color: '#52525b', fontFamily: 'monospace' }}>{icon}</span>
              </div>
              <h3
                className="display text-white"
                style={{ fontSize: '2rem', fontWeight: 300, lineHeight: 1.2 }}
              >
                {title}
              </h3>
              <p style={{ fontSize: '14px', color: '#71717a', lineHeight: 1.75 }}>{desc}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(t => (
                  <span key={t} style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3f3f46', padding: '4px 10px', border: '1px solid #27272a' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TECH MARQUEE ─── */}
      <section style={{ borderTop: '1px solid #18181b', borderBottom: '1px solid #18181b', padding: '20px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {['Next.js', 'React', 'Supabase', 'TypeScript', 'Tailwind CSS', '.NET', 'Vite', 'Looker Studio', 'Vercel', 'Next.js', 'React', 'Supabase', 'TypeScript', 'Tailwind CSS', '.NET', 'Vite', 'Looker Studio', 'Vercel'].map((t, i) => (
            <span
              key={i}
              style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3f3f46', padding: '0 32px' }}
            >
              {t}
              <span style={{ marginLeft: '32px', color: '#27272a' }}>·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 px-6 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <div className="cta-block rounded-2xl px-12 py-24 md:px-24 flex flex-col items-center text-center gap-10">
          <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#71717a', fontWeight: 600 }}>
            Siguiente paso
          </p>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#09090b', lineHeight: 1.1, maxWidth: '640px' }}
          >
            ¿Tienes una idea en la que quieras <em>trabajar</em>?
          </h2>
          <Link href="/contact" className="cta-btn">
            Realiza tu consulta <span>↗</span>
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid #18181b', padding: '40px 0' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6">
          <p
            className="display"
            style={{ fontSize: '1.5rem', fontWeight: 300, fontStyle: 'italic', color: 'white' }}
          >
            Savegre.
          </p>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3f3f46', fontWeight: 500 }}>
            © 2026 Desarrollo de Software & Análisis de Datos
          </p>
        </div>
      </footer>
    </div>
  );
}