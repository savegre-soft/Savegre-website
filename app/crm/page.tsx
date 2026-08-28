import type { Metadata } from 'next'
import { Container } from '../components/Shared/ui'
import CrmClient from './CrmClient'

/**
 * Mini-CRM: gestión de las consultas del formulario de contacto.
 *
 * Todo ocurre en el cliente contra Supabase (el sitio es export estático).
 * El acceso lo controla RLS: solo los correos de `website.crm_members` pueden
 * leer o modificar registros. `robots: noindex` + `app/robots.ts` +
 * `public/_headers` la mantienen fuera de los buscadores.
 */
export const metadata: Metadata = {
  title: 'CRM',
  robots: { index: false, follow: false, nocache: true },
}

export default function CrmPage() {
  return (
    <section className="py-16">
      <Container>
        <CrmClient />
      </Container>
    </section>
  )
}
