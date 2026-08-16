import type { Metadata } from 'next'
import { Reveal } from '../components/Shared/Motion'
import { Container, PageHeader } from '../components/Shared/ui'
import ContactForm from './ContactForm'
import ContactChannels from './ContactChannels'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Hablemos de su proyecto. Escríbanos por WhatsApp o correo — respondemos en 24 a 48 horas hábiles desde San José, Costa Rica.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section className="pt-16 pb-24">
      <Container>
        <PageHeader
          eyebrow="Ingeniería de Software — Contacto"
          title="Contacta con"
          accent="nuestro equipo"
          lead="Si tienes un proyecto en mente o simplemente quieres saber más sobre cómo podemos ayudarte, no dudes en ponerte en contacto. Estamos aquí para escuchar tus ideas y convertirlas en realidad."
        />

        <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:gap-20">
          <Reveal className="flex-1">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12} className="lg:w-80 lg:shrink-0">
            <ContactChannels />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
