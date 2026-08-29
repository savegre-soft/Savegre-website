import Link from 'next/link'
import { HeroReveal, Reveal, Stagger, StaggerItem, Lift } from './components/Shared/Motion'
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  IconBox,
  SectionHeading,
  Tag,
} from './components/Shared/ui'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChartIcon,
  ChatIcon,
  CheckIcon,
  CodeIcon,
  CompassIcon,
  LayersIcon,
  PlugIcon,
  ReceiptIcon,
  ShieldIcon,
} from './components/Shared/icons'
import { productos, type IconKey } from './lib/productos'
import { whatsappEnabled, whatsappUrl } from './lib/site'

const iconosProducto: Record<IconKey, typeof ChatIcon> = {
  chat: ChatIcon,
  receipt: ReceiptIcon,
}

const capacidades = [
  {
    Icon: CodeIcon,
    title: 'Desarrollo Web',
    desc: 'Arquitecturas modernas con Next.js y React. Velocidad de carga óptima, SEO técnico y experiencias de usuario sin fricción.',
    tags: ['React & Next.js', 'TypeScript'],
  },
  {
    Icon: LayersIcon,
    title: 'Arquitectura de Software',
    desc: 'Sistemas robustos y escalables desde la base: microservicios, APIs, modelos de datos y colas que aguantan el crecimiento.',
    tags: ['Microservicios', 'API REST'],
  },
  {
    Icon: PlugIcon,
    title: 'Integración de Sistemas',
    desc: 'Conectamos plataformas, servicios y datos para que su ecosistema digital funcione como una sola unidad coherente.',
    tags: ['Webhooks', 'ETL'],
  },
  {
    Icon: ChartIcon,
    title: 'Analítica Digital',
    desc: 'No solo desplegamos código, medimos resultados. Datalayers, tracking de eventos y dashboards para decidir con datos.',
    tags: ['Data Layers', 'Dashboards'],
  },
  {
    Icon: CompassIcon,
    title: 'Consultoría Técnica',
    desc: 'Auditamos su infraestructura actual e identificamos oportunidades reales en rendimiento, seguridad y escalabilidad.',
    tags: ['Auditoría', 'Seguridad'],
  },
  {
    Icon: ShieldIcon,
    title: 'Soporte Continuo',
    desc: 'Un equipo dedicado para empresas que necesitan acompañamiento técnico estratégico y constante, mes a mes.',
    tags: ['Mensual', 'Prioritario'],
  },
]

const proceso = [
  {
    paso: '01',
    title: 'Entender',
    desc: 'Antes de proponer, escuchamos la operación real: quién usa el sistema, dónde duele hoy y qué se mide para saber si mejoró.',
  },
  {
    paso: '02',
    title: 'Diseñar',
    desc: 'Definimos arquitectura, modelo de datos y alcance por fases. Lo que no aporta en la primera entrega se pospone.',
  },
  {
    paso: '03',
    title: 'Construir',
    desc: 'Entregas frecuentes y revisables, con pruebas automatizadas desde el inicio y no como un añadido al final.',
  },
  {
    paso: '04',
    title: 'Operar',
    desc: 'Despliegue documentado, observabilidad y acompañamiento. El proyecto termina cuando funciona en producción, no cuando compila.',
  },
]

const pilares = [
  {
    title: 'Pruebas, no promesas',
    desc: 'Nuestros productos suman más de 790 pruebas automatizadas. La fiabilidad se demuestra ejecutándola.',
  },
  {
    title: 'Seguridad desde el diseño',
    desc: 'Aislamiento por cliente, secretos cifrados en reposo con AES-256-GCM y permisos por rol. No es una fase posterior.',
  },
  {
    title: 'Sin dependencia del proveedor',
    desc: 'Contenedores estándar, bases de datos abiertas y documentación de despliegue. Su sistema es suyo.',
  },
  {
    title: 'Contexto local',
    desc: 'Conocemos la normativa costarricense de facturación electrónica y trabajamos en su zona horaria.',
  },
]

const stack = [
  'Next.js',
  'React',
  '.NET',
  'TypeScript',
  'PostgreSQL',
  'Prisma',
  'Fastify',
  'Supabase',
  'Tailwind CSS',
  'Docker',
  'Azure',
  'Looker Studio',
]

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/3 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_65%)]"
        />

        <Container className="relative py-24">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-6 w-px bg-[linear-gradient(to_bottom,transparent_0%,#27272a_25%,#27272a_75%,transparent_100%)] md:left-10 lg:left-16"
          />

          <div className="pl-6 md:pl-12">
            <HeroReveal>
              <Eyebrow>Ingeniería de Excelencia — San José, CR</Eyebrow>
            </HeroReveal>

            <HeroReveal delay={0.12}>
              <h1 className="display text-fg mt-8 text-[clamp(3rem,9vw,7rem)] leading-[1.05]">
                Construimos software
                <br />
                <span className="text-faint italic">que escala.</span>
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.24}>
              <p className="text-muted mt-8 max-w-md text-[15px] leading-[1.75]">
                Soluciones digitales de alta precisión con arquitectura diseñada para el
                rendimiento corporativo y la escalabilidad global.
              </p>
            </HeroReveal>

            <HeroReveal delay={0.36}>
              <div className="mt-12 flex flex-wrap gap-4">
                <ButtonLink href="/contact">Iniciar proyecto</ButtonLink>
                <ButtonLink href="/portafolio" variant="ghost">
                  Ver portafolio
                </ButtonLink>
              </div>
            </HeroReveal>
          </div>
        </Container>
      </section>

      {/* ─── BARRA DE CIFRAS ─── */}
      <section className="border-line border-t" aria-label="Cifras de Savegre Soft">
        <Container>
          <Stagger className="grid grid-cols-2 gap-px lg:grid-cols-4">
            {[
              { valor: '2', etiqueta: 'Productos propios en producción' },
              { valor: '790+', etiqueta: 'Pruebas automatizadas' },
              { valor: '48 h', etiqueta: 'Para una propuesta' },
              { valor: 'CR', etiqueta: 'Base en San José' },
            ].map((s) => (
              <StaggerItem key={s.etiqueta}>
                <div className="py-10">
                  <p className="display text-fg text-[clamp(2.25rem,5vw,3.25rem)] leading-none">
                    {s.valor}
                  </p>
                  <p className="text-faint mt-3 text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {s.etiqueta}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── CAPACIDADES ─── */}
      <section className="border-line border-t py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Capacidades"
              title="Soluciones de"
              accent="ingeniería"
              aside="Sistemas construidos sobre pilares de seguridad, rendimiento y observabilidad desde el día uno."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
            {capacidades.map(({ Icon, title, desc, tags }) => (
              <StaggerItem key={title} className="h-full">
                <Lift className="h-full">
                  <Card className="flex h-full flex-col gap-5 p-8">
                    <IconBox>
                      <Icon size={20} />
                    </IconBox>
                    <h3 className="display text-fg text-2xl">{title}</h3>
                    <p className="text-muted flex-1 text-sm leading-[1.75]">{desc}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </Card>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <ButtonLink href="/services" variant="ghost">
                Ver todos los servicios
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ─── PRODUCTOS PROPIOS ─── */}
      <section className="border-line bg-surface border-t py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Productos propios"
              title="No solo hacemos"
              accent="proyectos"
              aside="Mantenemos nuestro propio software en producción. Lo que aprendemos construyéndolo se lo llevamos a su proyecto."
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

                      <ul className="mt-6 flex flex-col gap-2.5">
                        {p.capacidades.slice(0, 3).map((c) => (
                          <li key={c.title} className="flex items-center gap-3">
                            <span className="text-brand shrink-0">
                              <CheckIcon size={14} />
                            </span>
                            <span className="text-muted text-[13px]">{c.title}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="border-line mt-8 flex items-center justify-between border-t pt-6">
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                          <Link
                            href={`/productos/${p.slug}`}
                            className="text-brand hover:text-fg inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
                          >
                            Más info
                            <ArrowRightIcon size={14} />
                          </Link>
                          {p.sitio && (
                            <a
                              href={p.sitio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-faint hover:text-fg inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
                            >
                              Plataforma
                              <ArrowUpRightIcon size={14} />
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {p.stack.slice(0, 2).map((s) => (
                            <Tag key={s}>{s}</Tag>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Lift>
                </StaggerItem>
              )
            })}
          </Stagger>
        </Container>
      </section>

      {/* ─── PROCESO ─── */}
      <section className="border-line border-t py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Cómo trabajamos"
              title="Cuatro pasos,"
              accent="sin sorpresas"
              aside="El mismo método en un sitio web y en una plataforma multi-tenant. Cambia la escala, no el rigor."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4">
            {proceso.map((p) => (
              <StaggerItem key={p.paso} className="h-full">
                <div className="border-line h-full border-t pt-7">
                  <span className="text-brand text-xs font-semibold tracking-widest">
                    {p.paso}
                  </span>
                  <h3 className="display text-fg mt-4 text-2xl">{p.title}</h3>
                  <p className="text-muted mt-4 text-[13px] leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── STACK ─── */}
      <section
        className="border-line overflow-hidden border-y py-6"
        aria-label="Tecnologías que utilizamos"
      >
        <div className="marquee-track" aria-hidden="true">
          {/* Duplicado: el keyframe desplaza el 50% del ancho, así que la
              segunda copia entra justo cuando la primera sale. */}
          {[...stack, ...stack].map((t, i) => (
            <span
              key={i}
              className="text-faint px-8 text-[11px] font-semibold tracking-[0.2em] uppercase"
            >
              {t}
              <span className="text-line-strong ml-8">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── POR QUÉ NOSOTROS ─── */}
      <section className="py-24 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <Eyebrow>Por qué Savegre</Eyebrow>
              <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.15]">
                Criterio de ingeniería,
                <br />
                <span className="text-faint italic">no de plantilla</span>
              </h2>
              <p className="text-muted mt-6 max-w-sm text-sm leading-[1.8]">
                Trabajamos igual con un sitio corporativo que con una plataforma multi-tenant:
                entendiendo el problema antes de elegir la herramienta.
              </p>
              <div className="mt-8">
                <ButtonLink href="/about" variant="ghost">
                  Conocer al equipo
                </ButtonLink>
              </div>
            </Reveal>

            <Stagger className="grid grid-cols-1 gap-px sm:grid-cols-2">
              {pilares.map((p) => (
                <StaggerItem key={p.title} className="h-full">
                  <Card className="h-full p-7">
                    <h3 className="text-fg text-sm font-semibold">{p.title}</h3>
                    <p className="text-muted mt-3 text-[13px] leading-relaxed">{p.desc}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* ─── CASO DESTACADO ─── */}
      <section className="border-line border-t py-24 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Caso destacado"
              title="Wapi + Factico,"
              accent="trabajando juntos"
              aside="Nuestros dos productos resuelven cosas distintas, pero encajan en una sola operación."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-8 md:p-12">
              <p className="text-muted max-w-3xl text-[15px] leading-[1.8]">
                Se emite una factura electrónica, Hacienda la acepta y el cliente recibe su
                comprobante por WhatsApp en lugar de en una bandeja de spam. Si responde, la
                conversación entra en la cola de atención con todo el historial a la vista.
              </p>

              <ol className="mt-10 grid grid-cols-1 gap-px md:grid-cols-4">
                {[
                  { paso: '01', title: 'Emisión', desc: 'Consecutivo, clave, XML v4.4 y firma XAdES con Factico.' },
                  { paso: '02', title: 'Hacienda', desc: 'Se consulta el estado hasta obtener el veredicto.' },
                  { paso: '03', title: 'Entrega', desc: 'Wapi envía el comprobante por WhatsApp al cliente.' },
                  { paso: '04', title: 'Atención', desc: 'La respuesta entra al flujo y a la cola del equipo.' },
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

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/productos/wapi" variant="ghost">
                  Documentación de Wapi
                </ButtonLink>
                <ButtonLink href="/productos/factico" variant="ghost">
                  Documentación de Factico
                </ButtonLink>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-28">
        <Container>
          <Reveal>
            <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-2xl bg-zinc-100 px-8 py-20 text-center md:px-24">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-2/5 -right-[10%] h-125 w-125 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_65%)]"
              />
              <p className="eyebrow relative text-zinc-500!">Siguiente paso</p>
              <h2 className="display text-ink relative max-w-2xl text-[clamp(2rem,5vw,3.75rem)] leading-[1.1]">
                ¿Tienes una idea en la que quieras <em>trabajar</em>?
              </h2>
              <p className="relative max-w-md text-sm leading-relaxed text-zinc-600">
                Cuéntanos qué necesitas y preparamos una propuesta en menos de 48 horas.
              </p>
              <div className="relative flex flex-wrap justify-center gap-4">
                <ButtonLink
                  href="/contact"
                  variant="light"
                  icon={<ArrowUpRightIcon size={14} />}
                >
                  Realiza tu consulta
                </ButtonLink>
                {whatsappEnabled && (
                  <ButtonLink href={whatsappUrl()} variant="whatsapp" external>
                    Escríbenos por WhatsApp
                  </ButtonLink>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
