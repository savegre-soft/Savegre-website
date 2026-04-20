'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/services' },
    { name: 'Sobre Nosotros', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="font-['Playfair_Display',serif] text-xl font-bold tracking-tight text-white group-hover:text-zinc-400 transition-colors">
            Savegre<span className="text-zinc-500 italic text-sm ml-0.5">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium tracking-wide transition-colors py-1 group ${
                  isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {link.name}
                {/* Underline animation */}
                <span className={`absolute bottom-0 left-0 h-px bg-zinc-400 transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            )
          })}
        </div>

        {/* CTA Opcional - Un botón pequeño para destacar */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="text-[11px] uppercase tracking-[0.15em] border border-zinc-700 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Empezar Proyecto
          </Link>
        </div>
      </div>
    </nav>
  )
}