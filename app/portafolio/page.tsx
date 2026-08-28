import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem, Lift } from '../components/Shared/Motion'
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  IconBox,
  PageHeader,
  SectionHeading,
  Tag,
} from '../components/Shared/ui'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChatIcon,
  ReceiptIcon,
} from '../components/Shared/icons'
import { productos, type IconKey } from '../lib/productos'
import { openGraphBase } from '../lib/site'
import { breadcrumbJsonLd, jsonLdScript } from '../lib/seo'

const DESCRIPCION =
  'Casos de éxito y productos propios de Savegre Soft: Wapi, middleware para la WhatsApp Cloud API, y Factu, API de facturación electrónica v4.4 para Hacienda Costa Rica.'

export const metadata: Metadata = {
  title: 'Portafolio',
  description: DESCRIPCION,
  alternates: { canonical: '/portafolio' },
  openGraph: {
    ...openGraphBase,
    url: '/portafolio',
    title: 'Portafolio | Savegre Soft',
    description: DESCRIPCION,
  },
}

const iconosProducto: Record<IconKey, typeof ChatIcon> = {
  chat: ChatIcon,
  receipt: ReceiptIcon,
}

const casos = [
  {
    empresa: 'Oasis Meals',
    trabajo: 'Sitio web para la gestión de pedidos y órdenes de compra.',
    tags: ['Supabase', 'React', 'SQL'],
    enlace: 'https://oasis-meals.com/',
  },
]

const enDesarrollo = [
  {
    nombre: 'RH System',
    descripcion:
      'Sistema web de Recursos Humanos para pequeñas y medianas empresas.',
    estado: 'En desarrollo',
  },
  {
    nombre: 'PulpPos',
    descripcion:
      'Sistema web desarrollado en Blazor para la gestión de una pulpería.',
    estado: 'En desarrollo',
  },
]

export default function PortafolioPage() {
  return (
    <>
      <script
        {...jsonLdScript(breadcrumbJsonLd([{ name: 'Portafolio', path: '/portafolio' }]))}
      />

      <section className="pt-16 pb-20">
        <Container>
          <PageHeader
            eyebrow="Savegre Soft — Portafolio"
            title="Nuestro trabajo"
            accent="en producción"
            lead="Casos de éxito y productos propios que reflejan nuestro estándar de ingeniería — fiables, escalables y construidos para durar."
          />
        </Container>
      </section>

      {/* ─── Productos propios ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Productos propios"
              title="Software que"
              accent="mantenemos"
              aside="Dos productos en producción, con pruebas automatizadas y documentación completa."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {productos.map((p) => {
              const Icon = iconosProducto[p.iconKey]
              return (
                <StaggerItem key={p.slug} className="h-full">
                  <Lift className="h-full">
                    <Card className="flex h-full flex-col p-8 md:p-10">
                      <div className="flex items-start justify-between gap-4">
                        <IconBox>
                          <Icon size={22} />
                        </IconBox>
                        <span className="border-brand/40 text-brand shrink-0 border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase">
                          {p.estado}
                        </span>
                      </div>

                      <h3 className="display text-fg mt-6 text-3xl">{p.nombre}</h3>
                      <p className="text-brand mt-2 text-sm">{p.claim}</p>
                      <p className="text-muted mt-5 flex-1 text-sm leading-relaxed">
                        {p.resumen}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.stack.slice(0, 3).map((s) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </div>

                      {/* Métricas rápidas */}
                      <div className="border-line mt-7 flex gap-8 border-t pt-6">
                        {p.metricas.map((m) => (
                          <div key={m.etiqueta}>
                            <p className="display text-fg text-2xl">{m.valor}</p>
                            <p className="text-faint mt-1 text-[9px] font-semibold tracking-[0.12em] uppercase">
                              {m.etiqueta}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <Link
                          href={`/productos/${p.slug}`}
                          className="text-brand hover:text-fg inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
                        >
                          Más info
                          <ArrowRightIcon size={14} />
                        </Link>
                      </div>
                    </Card>
                  </Lift>
                </StaggerItem>
              )
            })}
          </Stagger>
        </Container>
      </section>

      {/* ─── Casos de éxito ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Casos de éxito"
              title="Proyectos para"
              accent="clientes"
              aside="Trabajo entregado y funcionando, con el cliente operando sobre él."
            />
          </Reveal>

          <Stagger className="flex flex-col gap-4">
            {casos.map((c, i) => (
              <StaggerItem key={c.empresa}>
                <Card className="grid grid-cols-1 items-start gap-6 p-8 lg:grid-cols-5">
                  <div className="lg:col-span-1">
                    <span className="text-brand text-xs font-semibold tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-fg mt-2 text-base font-medium">{c.empresa}</p>
                  </div>

                  <p className="text-muted text-sm leading-relaxed lg:col-span-3">
                    {c.trabajo}
                  </p>

                  <div className="flex flex-col items-start gap-4 lg:col-span-1 lg:items-end">
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      {c.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <a
                      href={c.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:text-fg inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
                    >
                      Ver sitio
                      <ArrowUpRightIcon size={14} />
                    </a>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── En desarrollo ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>En el taller</Eyebrow>
            <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">
              Lo que viene <span className="text-faint italic">después</span>
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-px md:grid-cols-2">
            {enDesarrollo.map((p) => (
              <StaggerItem key={p.nombre} className="h-full">
                <Card className="flex h-full flex-col gap-4 p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="display text-fg text-xl">{p.nombre}</h3>
                    <span className="border-line text-faint shrink-0 border px-2 py-0.5 text-[10px] tracking-wider uppercase">
                      {p.estado}
                    </span>
                  </div>
                  <p className="text-muted text-[13px] leading-relaxed">{p.descripcion}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="border-line flex flex-col items-start justify-between gap-8 border p-10 md:flex-row md:items-center md:p-14">
              <div>
                <h2 className="display text-fg text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight">
                  ¿Su proyecto es el <span className="text-faint italic">siguiente</span>?
                </h2>
                <p className="text-muted mt-4 max-w-md text-sm leading-relaxed">
                  Cuéntenos qué necesita y le decimos con franqueza cómo lo abordaríamos.
                </p>
              </div>
              <ButtonLink href="/contact">Hablemos</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
