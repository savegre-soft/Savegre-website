'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide hover:text-gray-300 transition-colors"
        >
          MiSitio
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-gray-300 transition-colors"
          >
            Inicio
          </Link>

          <Link
            href="/about"
            className="hover:text-gray-300 transition-colors"
          >
            Sobre Nosotros
          </Link>

          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  )
}