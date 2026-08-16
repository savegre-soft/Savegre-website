'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navLinks } from '../../lib/site'
import { CloseIcon, MenuIcon } from './icons'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // El panel se cierra desde el propio enlace (`cerrar` más abajo) en lugar de
  // con un efecto sobre `pathname`: llamar a setState dentro de un efecto
  // provoca un render en cascada innecesario.
  const cerrar = () => setOpen(false)

  // Evita que el fondo haga scroll mientras el panel está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav className="border-line bg-ink/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Marca */}
        <Link href="/" className="group shrink-0">
          <span className="display text-fg group-hover:text-muted text-xl transition-colors">
            Savegre<span className="text-brand">.</span>
          </span>
        </Link>

        {/* Enlaces — escritorio */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-1 text-[13px] font-medium tracking-wide transition-colors ${
                  isActive ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {link.name}
                <span
                  aria-hidden="true"
                  className={`bg-brand absolute bottom-0 left-0 h-px transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        {/* CTA — escritorio */}
        <Link
          href="/contact"
          className="bg-brand-fill hover:bg-brand-dim hidden px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors md:block"
        >
          Empezar proyecto
        </Link>

        {/* Botón del menú — móvil */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="text-muted hover:text-fg -mr-2 p-2 transition-colors md:hidden"
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Panel — móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            key="menu-movil"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-line bg-ink absolute inset-x-0 top-16 overflow-hidden border-b md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {navLinks.map((link, i) => {
                const isActive =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={cerrar}
                      aria-current={isActive ? 'page' : undefined}
                      className={`border-line block border-b py-4 text-sm font-medium transition-colors ${
                        isActive ? 'text-brand' : 'text-muted hover:text-fg'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              })}
              <Link
                href="/contact"
                onClick={cerrar}
                className="bg-brand-fill hover:bg-brand-dim mt-5 mb-2 px-5 py-3.5 text-center text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors"
              >
                Empezar proyecto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
