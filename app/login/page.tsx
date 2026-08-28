import type { Metadata } from 'next'
import { Container } from '../components/Shared/ui'
import LoginClient from './LoginClient'

/**
 * Acceso al mini-CRM. `robots: noindex/nofollow` mantiene la página fuera de
 * Google; `app/robots.ts` además la bloquea en el robots.txt y
 * `public/_headers` añade la cabecera `X-Robots-Tag`.
 */
export const metadata: Metadata = {
  title: 'Acceso',
  robots: { index: false, follow: false, nocache: true },
}

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container className="max-w-md">
        <LoginClient />
      </Container>
    </section>
  )
}
