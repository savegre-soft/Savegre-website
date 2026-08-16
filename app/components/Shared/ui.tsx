import Link from 'next/link'
import { ArrowRightIcon } from './icons'

/* ─────────────────────────────────────────────────────────────
   Primitivas de UI compartidas.
   Antes cada página repetía estos estilos a mano con `style={{}}`,
   así que ninguna se veía igual que la otra ni respondía al ancho.
   ───────────────────────────────────────────────────────────── */

/** Ancho máximo y respiración horizontal — igual en todas las páginas. */
export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  )
}

/** Etiqueta en versalitas que precede a un titular. */
export function Eyebrow({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={`eyebrow flex items-start gap-3 ${className}`}>
      <span className="bg-brand mt-1.5 h-px w-6 shrink-0" aria-hidden="true" />
      {/* `text-balance` reparte las líneas en móvil, donde si no parte
          expresiones como "San José" por la mitad. */}
      <span className="text-balance">{children}</span>
    </p>
  )
}

/**
 * Cabecera de página. `lead` es el párrafo de entrada; `accent` es la segunda
 * línea del titular, en gris, para el contraste tipográfico de la marca.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  lead,
}: {
  eyebrow: string
  title: string
  accent?: string
  lead?: string
}) {
  return (
    <header className="border-line border-b pb-10">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="display text-fg mt-6 text-[clamp(2.5rem,6vw,4rem)] leading-[1.08]">
        {title}
        {accent && (
          <>
            <br />
            <span className="text-faint italic">{accent}</span>
          </>
        )}
      </h1>
      {lead && (
        <p className="text-muted mt-6 max-w-xl text-[15px] leading-relaxed">{lead}</p>
      )}
    </header>
  )
}

/** Encabezado de sección dentro de una página. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  aside,
  id,
}: {
  eyebrow: string
  title: string
  accent?: string
  aside?: string
  id?: string
}) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className="display text-fg mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.15]"
        >
          {title}
          {accent && (
            <>
              <br />
              <span className="text-faint italic">{accent}</span>
            </>
          )}
        </h2>
      </div>
      {aside && (
        <p className="text-muted max-w-xs text-[13px] leading-relaxed">{aside}</p>
      )}
    </div>
  )
}

const buttonBase =
  'inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] ' +
  'transition-[background-color,color,border-color,gap] duration-200 hover:gap-4'

const buttonVariants = {
  primary: 'bg-brand-fill hover:bg-brand-dim px-8 py-3.5 text-white',
  ghost:
    'border-line-strong text-muted hover:border-faint hover:text-fg border px-8 py-3.5',
  light: 'bg-ink hover:bg-raised rounded-full px-9 py-4 text-white',
  whatsapp: 'bg-whatsapp px-8 py-3.5 text-ink hover:brightness-110',
} as const

export type ButtonVariant = keyof typeof buttonVariants

/** Botón-enlace. Usa `next/link` para rutas internas y `<a>` para externas. */
export function ButtonLink({
  href,
  variant = 'primary',
  children,
  icon,
  external = false,
  className = '',
}: {
  href: string
  variant?: ButtonVariant
  children: React.ReactNode
  icon?: React.ReactNode
  external?: boolean
  className?: string
}) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`
  const content = (
    <>
      {children}
      {icon ?? <ArrowRightIcon size={14} />}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

/** Etiqueta de tecnología / categoría. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-line text-faint border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase">
      {children}
    </span>
  )
}

/** Tarjeta con el degradado azul sutil que aparece al pasar el cursor. */
export function Card({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`group bg-surface border-line hover:border-line-strong relative overflow-hidden border transition-colors duration-300 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.06)_0%,transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  )
}

/** Recuadro del icono en las tarjetas de capacidad. */
export function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-line-strong text-brand group-hover:border-brand/50 flex size-11 shrink-0 items-center justify-center border transition-colors duration-300">
      {children}
    </div>
  )
}
