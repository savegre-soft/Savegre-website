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
  ArrowUpRightIcon,
  ChartIcon,
  ChatIcon,
  CheckIcon,
  CodeIcon,
  CompassIcon,
  LayersIcon,
  LifeBuoyIcon,
  PlugIcon,
  ReceiptIcon,
  ShieldIcon,
} from '../components/Shared/icons'
import { openGraphBase, site, whatsappEnabled, whatsappUrl } from '../lib/site'
import { productos, type IconKey, type Producto } from '../lib/productos'
import { breadcrumbJsonLd, jsonLdScript } from '../lib/seo'

const DESCRIPCION =
  'Desarrollo web, arquitectura de software, consultoría e integración de sistemas. Conoce Wapi, nuestro middleware para la WhatsApp Cloud API, y Factico, nuestra API de facturación electrónica v4.4 para Hacienda Costa Rica.'

export const metadata: Metadata = {
  title: 'Servicios y Productos',
  description: DESCRIPCION,
  alternates: { canonical: '/services' },
  openGraph: {
    ...openGraphBase,
    url: '/services',
    title: 'Servicios y Productos | Savegre Soft',
    description: DESCRIPCION,
  },
}

const serviciosJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Servicios de Savegre Soft',
  url: `${site.url}/services`,
  provider: { '@id': `${site.url}/#organization` },
  itemListElement: [
    'Desarrollo web con Next.js y React',
    'Arquitectura de software escalable',
    'Consultoría técnica y auditoría',
    'Estrategia de producto',
    'Integración de sistemas',
    'Soporte técnico continuo',
    'Wapi — middleware para la WhatsApp Cloud API',
    'Factico — facturación electrónica v4.4 para Hacienda Costa Rica',
  ].map((nombre) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: nombre },
  })),
}

const iconosProducto: Record<IconKey, typeof ChatIcon> = {
  chat: ChatIcon,
  receipt: ReceiptIcon,
}

const servicios = [
  {
    num: '01',
    Icon: CodeIcon,
    title: 'Desarrollo Web',
    desc: 'Sitios y aplicaciones web rápidas, accesibles y elegantes que convierten visitantes en clientes y destacan en cualquier mercado.',
    tags: ['UI/UX', 'React', 'Next.js'],
  },
  {
    num: '02',
    Icon: LayersIcon,
    title: 'Arquitectura de Software',
    desc: 'Diseñamos sistemas robustos y escalables desde la base — microservicios, APIs, bases de datos y más, pensados para crecer.',
    tags: ['Microservicios', 'API REST', 'Cloud'],
  },
  {
    num: '03',
    Icon: CompassIcon,
    title: 'Consultoría Técnica',
    desc: 'Analizamos su infraestructura actual e identificamos oportunidades de mejora en rendimiento, seguridad y escalabilidad.',
    tags: ['Auditoría', 'Optimización', 'Seguridad'],
  },
  {
    num: '04',
    Icon: ChartIcon,
    title: 'Estrategia de Producto',
    desc: 'Desde el descubrimiento hasta el roadmap, ayudamos a los equipos a priorizar con criterio y entregar funcionalidades que los usuarios realmente necesitan.',
    tags: ['Roadmap', 'OKRs', 'Sprints'],
  },
  {
    num: '05',
    Icon: PlugIcon,
    title: 'Integración de Sistemas',
    desc: 'Conectamos plataformas, servicios y datos para que su ecosistema digital funcione como una sola unidad coherente.',
    tags: ['APIs', 'Webhooks', 'ETL'],
  },
  {
    num: '06',
    Icon: LifeBuoyIcon,
    title: 'Soporte Continuo',
    desc: 'Un equipo dedicado para empresas que necesitan soporte técnico estratégico y constante mes a mes.',
    tags: ['Mensual', 'Flexible', 'Prioritario'],
  },
]

/** Resumen de un producto. La ficha completa vive en /productos/[slug]. */
function ProductoSection({ producto, invertido }: { producto: Producto; invertido: boolean }) {
  const Icon = iconosProducto[producto.iconKey]

  return (
    <section
      id={producto.slug}
      className={`border-line scroll-mt-24 border-t py-24 md:py-28 ${
        invertido ? 'bg-surface' : ''
      }`}
      aria-labelledby={`${producto.slug}-titulo`}
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Producto propio</Eyebrow>
              <div className="mt-6 flex items-center gap-4">
                <IconBox>
                  <Icon size={22} />
                </IconBox>
                <h2
                  id={`${producto.slug}-titulo`}
                  className="display text-fg text-[clamp(2.5rem,6vw,4rem)]"
                >
                  {producto.nombre}
                </h2>
              </div>
              <p className="text-brand mt-5 text-lg leading-snug">{producto.claim}</p>
              <p className="text-muted mt-6 text-[15px] leading-[1.8]">{producto.descripcion}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {producto.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>

            <div className="border-line flex shrink-0 gap-8 border-t pt-6 lg:flex-col lg:gap-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              {producto.metricas.map((m) => (
                <div key={m.etiqueta}>
                  <p className="display text-fg text-4xl">{m.valor}</p>
                  <p className="text-faint mt-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {m.etiqueta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Capacidades */}
        <div className="mt-16">
          <h3 className="eyebrow mb-6">Qué hace</h3>
          <Stagger className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
            {producto.capacidades.map((c) => (
              <StaggerItem key={c.title} className="h-full">
                <Card className="h-full p-6">
                  <h4 className="text-fg text-sm font-semibold">{c.title}</h4>
                  <p className="text-muted mt-3 text-[13px] leading-relaxed">{c.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Casos de uso */}
        <div className="mt-16">
          <h3 className="eyebrow mb-6">Casos de uso</h3>
          <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {producto.casos.map((c, i) => (
              <StaggerItem key={c.title}>
                <Lift>
                  <Card className="flex h-full gap-5 p-7">
                    <span className="text-brand text-xs font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-fg text-base font-medium">{c.title}</h4>
                      <p className="text-muted mt-2.5 text-[13px] leading-relaxed">{c.desc}</p>
                    </div>
                  </Card>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Integración */}
        <Reveal>
          <div className="border-line mt-16 border-t pt-10">
            <h3 className="eyebrow mb-6">Cómo se integra en su entorno</h3>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
              {producto.integracion.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brand mt-0.5 shrink-0">
                    <CheckIcon size={16} />
                  </span>
                  <span className="text-muted text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={`/productos/${producto.slug}`}>
                Documentación de {producto.nombre}
              </ButtonLink>
              {producto.sitio && (
                <ButtonLink
                  href={producto.sitio}
                  variant="ghost"
                  external
                  icon={<ArrowUpRightIcon size={14} />}
                >
                  Abrir {producto.nombre}
                </ButtonLink>
              )}
              {whatsappEnabled && (
                <ButtonLink
                  href={whatsappUrl(`Hola, me interesa ${producto.nombre}. ¿Podemos conversar?`)}
                  variant="whatsapp"
                  external
                >
                  Consultar por WhatsApp
                </ButtonLink>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <script {...jsonLdScript(serviciosJsonLd)} />
      <script
        {...jsonLdScript(breadcrumbJsonLd([{ name: 'Servicios', path: '/services' }]))}
      />

      <section className="pt-16 pb-20">
        <Container>
          <PageHeader
            eyebrow="Savegre Soft — Servicios"
            title="Soluciones construidas"
            accent="para resultados reales."
            lead="De la estrategia a la ejecución, trabajamos junto a usted en cada etapa — con servicios a la medida y con productos propios ya probados en producción."
          />

          <Reveal>
            <div className="mt-10 flex flex-wrap gap-4">
              {productos.map((p) => (
                <ButtonLink key={p.slug} href={`#${p.slug}`} variant="ghost">
                  Conocer {p.nombre}
                </ButtonLink>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ─── Servicios ─── */}
      <section className="border-line border-t py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Servicios"
              title="Lo que hacemos"
              accent="por su equipo"
              aside="Cada proyecto arranca por entender la operación real antes de escribir una línea de código."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
            {servicios.map(({ num, Icon, title, desc, tags }) => (
              <StaggerItem key={num} className="h-full">
                <Lift className="h-full">
                  <Card className="flex h-full flex-col gap-4 p-7">
                    <div className="flex items-center justify-between">
                      <IconBox>
                        <Icon size={18} />
                      </IconBox>
                      <span className="text-faint text-xs font-semibold tracking-widest">
                        {num}
                      </span>
                    </div>
                    <h3 className="display text-fg text-xl">{title}</h3>
                    <p className="text-muted flex-1 text-[13px] leading-relaxed">{desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </Card>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── Productos propios ─── */}
      <section className="border-line border-t py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Productos propios"
              title="Software nuestro,"
              accent="en producción"
              aside="No son demos. Son productos que mantenemos, con pruebas automatizadas y despliegue documentado."
            />
          </Reveal>
        </Container>
      </section>

      {productos.map((p, i) => (
        <ProductoSection key={p.slug} producto={p} invertido={i % 2 === 0} />
      ))}

      {/* ─── Los dos juntos ─── */}
      <section className="border-line border-t py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Wapi + Factico"
              title="Los dos productos,"
              accent="una sola operación"
              aside="Están diseñados para hablarse entre sí, pero cada uno funciona por separado."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-8 md:p-12">
              <p className="text-muted max-w-3xl text-[15px] leading-[1.8]">
                Factico emite eventos de negocio cuando algo ocurre con un comprobante, y uno de
                sus canales de notificación es WhatsApp. Conectado a Wapi, ese evento deja de ser
                un correo que nadie abre y se convierte en una conversación real:
              </p>

              <ol className="mt-10 grid grid-cols-1 gap-px md:grid-cols-4">
                {[
                  {
                    paso: '01',
                    title: 'Se emite el comprobante',
                    desc: 'Su sistema llama a Factico. Consecutivo, clave, XML v4.4 y firma XAdES.',
                  },
                  {
                    paso: '02',
                    title: 'Hacienda responde',
                    desc: 'Factico consulta el estado y dispara el evento comprobante.aceptado.',
                  },
                  {
                    paso: '03',
                    title: 'Wapi lo entrega',
                    desc: 'El cliente recibe su factura por WhatsApp, no en una bandeja de spam.',
                  },
                  {
                    paso: '04',
                    title: 'La respuesta se atiende',
                    desc: 'Si el cliente contesta, entra al flujo y a la cola de atención, con todo el historial en el CRM.',
                  },
                ].map((s) => (
                  <li key={s.paso} className="bg-raised p-6">
                    <span className="text-brand text-xs font-semibold tracking-widest">
                      {s.paso}
                    </span>
                    <h3 className="text-fg mt-3 text-sm font-medium">{s.title}</h3>
                    <p className="text-muted mt-2 text-[13px] leading-relaxed">{s.desc}</p>
                  </li>
                ))}
              </ol>

              <div className="border-line text-brand mt-10 flex flex-wrap items-center gap-3 border-t pt-8">
                <ShieldIcon size={18} />
                <p className="text-muted text-[13px]">
                  Un solo número de WhatsApp, un solo historial por cliente y los secretos de
                  ambos sistemas cifrados en reposo.
                </p>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="relative flex flex-col items-start gap-8 overflow-hidden rounded-2xl bg-zinc-100 px-8 py-16 md:px-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-1/3 -right-[5%] h-105 w-105 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_65%)]"
              />
              <p className="eyebrow relative text-zinc-500!">¿Listo para comenzar?</p>
              <h2 className="display text-ink relative max-w-xl text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
                Construyamos algo <em className="text-zinc-500">que valga la pena.</em>
              </h2>
              <p className="relative max-w-md text-sm leading-relaxed text-zinc-600">
                Cuéntenos sobre su proyecto y prepararemos una propuesta personalizada en menos
                de 48 horas.
              </p>
              <div className="relative flex flex-wrap gap-4">
                <ButtonLink href="/contact" variant="light" icon={<ArrowUpRightIcon size={14} />}>
                  Contáctenos
                </ButtonLink>
                <Link
                  href="/portafolio"
                  className="text-ink inline-flex items-center gap-2 self-center border-b border-zinc-400 pb-1 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors hover:border-zinc-900"
                >
                  Ver portafolio
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
