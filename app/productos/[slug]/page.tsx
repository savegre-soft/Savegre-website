import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProducto, productos, type IconKey, type Producto } from '../../lib/productos'
import { openGraphBase, site, whatsappEnabled, whatsappUrl } from '../../lib/site'
import { Reveal, Stagger, StaggerItem, Lift } from '../../components/Shared/Motion'
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  IconBox,
  Tag,
} from '../../components/Shared/ui'
import {
  ArrowUpRightIcon,
  ChatIcon,
  CheckIcon,
  PlugIcon,
  ReceiptIcon,
  ShieldIcon,
} from '../../components/Shared/icons'

const iconos: Record<IconKey, typeof ChatIcon> = {
  chat: ChatIcon,
  receipt: ReceiptIcon,
}

/** Con `output: 'export'` esto es lo que decide qué HTML se genera. */
export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const producto = getProducto(slug)
  if (!producto) return {}

  const descripcion = producto.descripcion.slice(0, 300)

  return {
    title: `${producto.nombre} — ${producto.claim}`,
    description: descripcion,
    // Palabras clave por producto, además de las globales del sitio.
    keywords: [producto.nombre, producto.claim, ...producto.stack, 'Savegre Soft'],
    alternates: { canonical: `/productos/${producto.slug}` },
    // Al declarar `openGraph` aquí se reemplaza por completo el del layout, así
    // que hay que reponer `siteName`, `locale` y `type` vía `openGraphBase`.
    openGraph: {
      ...openGraphBase,
      title: `${producto.nombre} | Savegre Soft`,
      description: producto.claim,
      url: `/productos/${producto.slug}`,
    },
  }
}

/**
 * Datos estructurados de la ficha. Tres bloques con propósitos distintos:
 * `SoftwareApplication` describe el producto, `FAQPage` habilita el desplegable
 * de preguntas en los resultados de Google, y `BreadcrumbList` muestra la ruta
 * "Portafolio › Wapi" en lugar de la URL cruda.
 */
function jsonLdProducto(producto: Producto) {
  const url = `${site.url}/productos/${producto.slug}`

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: producto.nombre,
      url,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Docker',
      description: producto.descripcion,
      inLanguage: 'es',
      image: `${site.url}/opengraph-image`,
      author: { '@id': `${site.url}/#organization` },
      publisher: { '@id': `${site.url}/#organization` },
      provider: { '@id': `${site.url}/#organization` },
      featureList: producto.capacidades.map((c) => c.title),
      keywords: producto.stack.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: producto.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: site.url },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Portafolio',
          item: `${site.url}/portafolio`,
        },
        { '@type': 'ListItem', position: 3, name: producto.nombre, item: url },
      ],
    },
  ]
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const producto = getProducto(slug)
  if (!producto) notFound()

  const Icon = iconos[producto.iconKey]
  const otro = productos.find((p) => p.slug !== producto.slug)

  return (
    <>
      {jsonLdProducto(producto).map((bloque, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bloque) }}
        />
      ))}

      {/* ─── Portada ─── */}
      <section className="relative overflow-hidden pt-16 pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-130 w-130 translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_65%)]"
        />
        <Container className="relative">
          <nav aria-label="Ruta" className="text-faint mb-10 flex items-center gap-2 text-xs">
            <Link href="/portafolio" className="hover:text-fg transition-colors">
              Portafolio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-muted">{producto.nombre}</span>
          </nav>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Producto propio · {producto.estado}</Eyebrow>

              <div className="mt-7 flex items-center gap-5">
                <IconBox>
                  <Icon size={24} />
                </IconBox>
                <h1 className="display text-fg text-[clamp(3rem,8vw,5.5rem)] leading-none">
                  {producto.nombre}
                </h1>
              </div>

              <p className="text-brand mt-6 text-xl leading-snug">{producto.claim}</p>
              <p className="text-muted mt-6 text-[15px] leading-[1.8]">{producto.descripcion}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {producto.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/contact">Solicitar una demo</ButtonLink>
                {whatsappEnabled && (
                  <ButtonLink
                    href={whatsappUrl(
                      `Hola, me interesa ${producto.nombre}. ¿Podemos conversar?`
                    )}
                    variant="whatsapp"
                    external
                  >
                    Consultar por WhatsApp
                  </ButtonLink>
                )}
              </div>
            </div>

            <div className="border-line flex shrink-0 gap-8 border-t pt-6 lg:flex-col lg:gap-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
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
        </Container>
      </section>

      {/* ─── El problema ─── */}
      <section className="border-line bg-surface border-t py-20">
        <Container>
          <Reveal>
            <h2 className="eyebrow mb-8">Por qué existe</h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {producto.problema.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="border-line border-t pt-6">
                  <span className="text-brand text-xs font-semibold tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-fg mt-3 text-base font-medium">{p.title}</h3>
                  <p className="text-muted mt-3 text-[13px] leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── Capacidades ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="display text-fg text-[clamp(1.9rem,4vw,2.75rem)]">
              Qué hace <span className="text-faint italic">{producto.nombre}</span>
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
            {producto.capacidades.map((c) => (
              <StaggerItem key={c.title} className="h-full">
                <Card className="h-full p-6">
                  <h3 className="text-fg text-sm font-semibold">{c.title}</h3>
                  <p className="text-muted mt-3 text-[13px] leading-relaxed">{c.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── Documentación por módulo ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Documentación</Eyebrow>
            <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">
              Módulo por <span className="text-faint italic">módulo</span>
            </h2>
          </Reveal>

          <div className="mt-14 flex flex-col gap-px">
            {producto.modulos.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.04}>
                <article className="bg-ink border-line grid grid-cols-1 gap-8 border p-8 md:grid-cols-[1fr_1.4fr] md:p-10">
                  <div>
                    <span className="text-brand text-xs font-semibold tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="display text-fg mt-3 text-2xl">{m.title}</h3>
                    <p className="text-muted mt-4 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="text-brand mt-0.5 shrink-0">
                          <CheckIcon size={15} />
                        </span>
                        <span className="text-muted text-[13px] leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Casos de uso ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Casos de uso</Eyebrow>
            <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">
              Dónde <span className="text-faint italic">encaja</span>
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {producto.casos.map((c, i) => (
              <StaggerItem key={c.title}>
                <Lift>
                  <Card className="flex h-full gap-5 p-7">
                    <span className="text-brand text-xs font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-fg text-base font-medium">{c.title}</h3>
                      <p className="text-muted mt-2.5 text-[13px] leading-relaxed">{c.desc}</p>
                    </div>
                  </Card>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── Integración + Seguridad ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="text-brand mb-5">
                <PlugIcon size={22} />
              </div>
              <h2 className="display text-fg text-2xl">Cómo se integra en su entorno</h2>
              <ul className="mt-7 flex flex-col gap-4">
                {producto.integracion.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand mt-0.5 shrink-0">
                      <CheckIcon size={15} />
                    </span>
                    <span className="text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-brand mb-5">
                <ShieldIcon size={22} />
              </div>
              <h2 className="display text-fg text-2xl">Seguridad y aislamiento</h2>
              <ul className="mt-7 flex flex-col gap-4">
                {producto.seguridad.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand mt-0.5 shrink-0">
                      <CheckIcon size={15} />
                    </span>
                    <span className="text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── Despliegue ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Despliegue</Eyebrow>
            <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">
              Dónde puede <span className="text-faint italic">vivir</span>
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4">
            {producto.despliegue.map((d) => (
              <StaggerItem key={d.title} className="h-full">
                <Card className="h-full p-6">
                  <h3 className="text-fg text-sm font-semibold">{d.title}</h3>
                  <p className="text-muted mt-3 text-[13px] leading-relaxed">{d.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── Preguntas frecuentes ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">
              Lo que suelen <span className="text-faint italic">preguntarnos</span>
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col">
            {producto.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                {/* `<details>` es plegable de forma nativa: sin JavaScript y
                    accesible con teclado por defecto. */}
                <details className="border-line group border-b">
                  <summary className="text-fg hover:text-brand flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[15px] font-medium transition-colors">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="text-brand shrink-0 text-xl transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-muted pb-6 text-sm leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA + producto relacionado ─── */}
      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="relative flex flex-col items-start gap-8 overflow-hidden rounded-2xl bg-zinc-100 px-8 py-16 md:px-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-1/3 -right-[5%] h-105 w-105 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_65%)]"
              />
              <p className="eyebrow relative text-zinc-500!">Siguiente paso</p>
              <h2 className="display text-ink relative max-w-xl text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
                ¿Quieres ver {producto.nombre}{' '}
                <em className="text-zinc-500">funcionando?</em>
              </h2>
              <p className="relative max-w-md text-sm leading-relaxed text-zinc-600">
                Agendamos una demo sobre su caso concreto y le decimos con franqueza si encaja
                o no.
              </p>
              <div className="relative flex flex-wrap gap-4">
                <ButtonLink href="/contact" variant="light" icon={<ArrowUpRightIcon size={14} />}>
                  Agendar demo
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          {otro && (
            <Reveal delay={0.1}>
              <Link
                href={`/productos/${otro.slug}`}
                className="border-line hover:border-line-strong group mt-6 flex flex-col justify-between gap-4 border p-8 transition-colors md:flex-row md:items-center"
              >
                <div>
                  <p className="eyebrow">También desarrollamos</p>
                  <p className="display text-fg group-hover:text-brand mt-3 text-2xl transition-colors">
                    {otro.nombre}
                  </p>
                  <p className="text-muted mt-2 max-w-md text-[13px] leading-relaxed">
                    {otro.resumen}
                  </p>
                </div>
                <span className="text-brand shrink-0">
                  <ArrowUpRightIcon size={22} />
                </span>
              </Link>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  )
}
