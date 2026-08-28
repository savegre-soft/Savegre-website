import type { Metadata } from 'next'
import { ButtonLink, Container, Eyebrow } from './components/Shared/ui'

/**
 * 404 propio. Antes salía el de Next por defecto, en blanco, rompiendo la
 * marca justo en el momento en que el usuario ya está perdido.
 */
export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container>
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="display text-fg mt-6 text-[clamp(3rem,8vw,6rem)] leading-none">
          Página no
          <br />
          <span className="text-faint italic">encontrada</span>
        </h1>
        <p className="text-muted mt-8 max-w-md text-[15px] leading-relaxed">
          La dirección que buscas no existe o cambió de sitio. Desde aquí puedes volver al
          inicio o escribirnos si esperabas encontrar algo concreto.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contactarnos
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
