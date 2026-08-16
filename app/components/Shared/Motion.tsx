'use client'

import { motion, MotionConfig, type Variants } from 'motion/react'

/* ─────────────────────────────────────────────────────────────
   Capa de animación (Motion).
   Sustituye a las clases `.fade-1 … .fade-4` de CSS, que se disparaban
   siempre al cargar aunque la sección estuviera fuera de pantalla.
   Aquí todo entra cuando el elemento aparece en el viewport y solo una vez.

   Estos son componentes de cliente que reciben `children`, así que el
   contenido que envuelven sigue renderizándose en el servidor.
   ───────────────────────────────────────────────────────────── */

/** Curva de salida suave: rápido al principio, asentamiento largo. */
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * `reducedMotion="user"` hace que Motion anule las animaciones de posición y
 * escala cuando el sistema pide menos movimiento, dejando solo la opacidad.
 * Va en el layout, envolviendo toda la app.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE }}>
      {children}
    </MotionConfig>
  )
}

/** Aparición al entrar en pantalla. `delay` encadena elementos hermanos. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'header'
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/**
 * Contenedor que escalona la entrada de sus hijos. Cada hijo directo debe ser
 * un `<StaggerItem>` — el retardo lo calcula Motion, no hay que pasarlo a mano.
 */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

/**
 * Entrada del hero. A diferencia de `Reveal`, arranca al montar (no al hacer
 * scroll): el hero ya está en pantalla cuando carga la página.
 */
export function HeroReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Realce al pasar el cursor / mantener pulsado. Se usa en tarjetas y en el
 * botón flotante; `motion` interpola en la GPU, así que no provoca reflow.
 */
export function Lift({
  children,
  className,
  amount = -4,
}: {
  children: React.ReactNode
  className?: string
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: amount }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {children}
    </motion.div>
  )
}
