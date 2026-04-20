"use client"
import { useState } from "react"

const ContactPage = () => {
  const [sent, setSent] = useState(false)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] font-['Epilogue',sans-serif] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden mt-10 max-w-6xl mx-auto mb-20">
      
      {/* Left panel */}
      <div className="p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950">
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 mb-6">Contact</p>
          <h1 className="font-['Playfair_Display',serif] text-4xl md:text-5xl leading-tight mb-4 text-zinc-100">
            Let's talk<br />about <span className="italic text-zinc-400">your</span><br />project.
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400 max-w-[280px]">
            We're a small team that cares about the details. Reach out and we'll get back to you within one business day.
          </p>
        </div>

        <div className="flex flex-col mt-12">
          {[
            { label: "Email", value: "hello@savegre.co" },
            { label: "Phone", value: "+1 (555) 000-1234" },
            { label: "Office", value: "San Francisco, CA" },
          ].map((c) => (
            <div key={c.label} className="py-4 border-b border-zinc-900 last:border-0">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">{c.label}</p>
              <p className="text-sm font-medium text-zinc-300">{c.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="p-8 md:p-12 bg-zinc-900/50">
        <p className="font-['Playfair_Display',serif] text-2xl mb-8 text-zinc-100">Send a message</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First name" placeholder="Maya" />
          <Field label="Last name" placeholder="Rodriguez" />
        </div>
        
        <Field label="Email" placeholder="maya@company.com" type="email" />
        <Field label="Subject" placeholder="What's this about?" />
        
        <div className="mb-5">
          <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-2">Message</label>
          <textarea 
            rows={5} 
            placeholder="Tell us about your project…" 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all resize-none"
          />
        </div>

        <button
          onClick={() => setSent(true)}
          disabled={sent}
          className={`w-full py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
            sent 
              ? "bg-zinc-800 text-zinc-500 cursor-default" 
              : "bg-zinc-100 text-zinc-950 hover:bg-white active:scale-[0.98]"
          }`}
        >
          {sent ? "Message sent ✓" : "Send message"}
        </button>
        
        <p className="text-[10px] text-zinc-600 text-center mt-4 tracking-wide">
          We typically reply within 24 hours.
        </p>
      </div>
    </div>
  )
}

const Field = ({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) => (
  <div className="mb-5">
    <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-2">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
    />
  </div>
)

export default ContactPage