import React from 'react';

export default function AboutPage() {
  const values = [
    { title: "Detail Obsessed", desc: "We believe the last 5% is what separates the good from the unforgettable." },
    { title: "User Centric", desc: "We don't build for ego; we build for the humans on the other side of the screen." },
    { title: "Radical Candor", desc: "Direct, honest communication is the only way to move fast and ship excellence." }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-['Epilogue',sans-serif] px-6 py-12 md:px-10 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 mb-6">Our Story</p>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl leading-[1.1] text-zinc-100">
            Design that <br />
            <span className="italic text-zinc-400">commands</span> attention.
          </h1>
        </div>
        <div className="md:mt-16">
          <p className="text-lg text-zinc-400 leading-relaxed">
            Founded in 2018, Savegre was born out of a desire to simplify the digital landscape. 
            We are a boutique studio focusing on quality over quantity, working with a handful of 
            ambitious partners each year to create digital products that last.
          </p>
          <p className="mt-6 text-zinc-500 leading-relaxed text-sm">
            We don't just "build websites"—we engineer visual experiences that align with 
            your business goals and resonate with your audience's emotions.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden mb-24">
        {values.map((v) => (
          <div key={v.title} className="bg-zinc-900 p-8 flex flex-col gap-4">
            <h3 className="font-['Playfair_Display',serif] text-xl text-zinc-200 italic">{v.title}</h3>
            <p className="text-xs leading-relaxed text-zinc-500">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Philosophy / Statement Block */}
      <div className="border-t border-zinc-800 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-[10px] tracking-[0.15em] uppercase text-zinc-600">
            Our Philosophy
          </div>
          <div className="md:col-span-8">
            <h2 className="text-2xl md:text-3xl font-light leading-snug text-zinc-300">
              "We believe that the best work happens when <span className="text-white">trust and craft</span> meet. 
              Our process is collaborative, iterative, and intensely focused on the outcome."
            </h2>
          </div>
        </div>
      </div>

      {/* Final Image or Visual Break (Placeholder) */}
      <div className="mt-24 h-[400px] w-full rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale group-hover:scale-105 transition-transform duration-700" />
        <div className="relative z-10 text-center">
          <p className="font-['Playfair_Display',serif] text-2xl italic">Digital craftsmanship at its finest.</p>
        </div>
      </div>
    </div>
  );
}


