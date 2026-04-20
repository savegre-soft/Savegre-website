import React from 'react';

const services = [
  { num: "01", title: "Brand Strategy", desc: "We define your positioning, voice, and visual identity so your brand resonates with the right audience from day one.", tags: ["Identity", "Messaging", "Research"] },
  { num: "02", title: "Web Design & Dev", desc: "Crafting fast, accessible, and beautiful websites that convert visitors into customers and stand out in any market.", tags: ["UI/UX", "React", "CMS"] },
  { num: "03", title: "Growth Marketing", desc: "Data-driven campaigns across paid, organic, and social channels. We focus on metrics that matter — not vanity numbers.", tags: ["SEO", "Paid Ads", "Analytics"] },
  { num: "04", title: "Product Strategy", desc: "From discovery to roadmap, we help product teams prioritize ruthlessly and ship features users actually want.", tags: ["Roadmap", "OKRs", "Sprints"] },
  { num: "05", title: "Content & Copywriting", desc: "Words that work. We write for humans first and algorithms second — blogs, landing pages, emails, and more.", tags: ["Copy", "Editorial", "Email"] },
  { num: "06", title: "Ongoing Retainers", desc: "A dedicated team extension for companies that need consistent creative and strategic support month to month.", tags: ["Monthly", "Flexible", "Priority"] },
];

const stats = [
  { num: "120+", label: "Projects delivered" },
  { num: "8 yrs", label: "In the industry" },
  { num: "98%",  label: "Client satisfaction" },
];

const ServicesPage = () => {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-['Epilogue',sans-serif] px-6 py-12 md:px-10">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end mb-12 pb-6 border-b border-zinc-800">
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 mb-3">What we do</p>
          <h1 className="font-['Playfair_Display',serif] text-4xl md:text-5xl leading-tight">
            Services built for<br /><span className="italic text-zinc-400">real outcomes.</span>
          </h1>
        </div>
        <p className="text-sm text-zinc-400 max-w-[240px] leading-relaxed mt-4 md:mt-0 md:text-right">
          From strategy to execution, we work alongside you at every stage.
        </p>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
        {services.map((s) => (
          <div key={s.num} className="bg-zinc-900 p-7 flex flex-col gap-4 hover:bg-zinc-900/50 transition-colors group">
            <p className="text-[10px] tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">{s.num}</p>
            <h3 className="font-['Playfair_Display',serif] text-xl leading-tight">{s.title}</h3>
            <p className="text-xs leading-relaxed text-zinc-400 flex-1">{s.desc}</p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="text-[9px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700/50">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid my-2 grid-cols-1 lg:grid-cols-[2fr_1fr] gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden mt-px">
        {/* CTA Block */}
        <div className="bg-zinc-100 p-8 md:p-10 text-zinc-950">
          <p className="text-[10px] tracking-[0.15em] uppercase opacity-60 font-bold">Ready to start?</p>
          <h2 className="font-['Playfair_Display',serif] text-3xl my-4">
            Let's build something<br /><span className="italic opacity-70">worth remembering.</span>
          </h2>
          <p className="text-sm opacity-80 leading-relaxed max-w-sm">
            Tell us about your project and we'll put together a tailored proposal within 48 hours.
          </p>
          <button className="mt-8 px-6 py-3 bg-zinc-950 text-white rounded-lg text-xs hover:bg-zinc-800 transition-all">
            Get in touch ↗
          </button>
        </div>

        {/* Stats Block */}
        <div className="bg-zinc-900 p-8 md:p-10 flex flex-col justify-between gap-8 md:gap-0">
          {stats.map((s, i) => (
            <div key={s.label}>
              <p className="font-['Playfair_Display',serif] text-4xl text-zinc-100">{s.num}</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{s.label}</p>
              {i < stats.length - 1 && <div className="h-px bg-zinc-800 my-4 lg:my-6" />}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-zinc-600">
          © {new Date().getFullYear()} Studio Name. Digital craftsmanship.
        </p>
        <div className="flex gap-6">
          {["LinkedIn", "Twitter", "Instagram"].map((social) => (
            <a key={social} href="#" className="text-[10px] text-zinc-500 hover:text-zinc-200 transition-colors uppercase tracking-widest">
              {social}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;