import type { Metadata } from 'next'
import { Reveal } from '../components/Shared/Motion'
import { Container, PageHeader, Card, Tag, ButtonLink } from '../components/Shared/ui'
import { openGraphBase, site } from '../lib/site'
import { breadcrumbJsonLd, jsonLdScript } from '../lib/seo'
import {
  getDanaProducts,
  formatPrecio,
  etiquetaCobro,
} from '../lib/danaProducts'

/**
 * Catálogo de productos (`/products`).
 *
 * Página de SOLO LECTURA: lista los productos públicos que DANA (el CRM)
 * expone por su API. El `fetch` ocurre en el build (ver `lib/danaProducts.ts`),
 * así que el HTML sale estático y el token nunca llega al navegador. Para
 * actualizar lo publicado, se vuelve a desplegar.
 */

// `output: 'export'` exige declarar la ruta como estática explícitamente.
export const dynamic = 'force-static'

const DESCRIPCION =
  'Catálogo de productos y servicios de Savegre Soft: desarrollo, asesoría y plataformas, con su precio de referencia.'

export const metadata: Metadata = {
  title: 'Productos',
  description: DESCRIPCION,
  alternates: { canonical: '/products' },
  openGraph: {
    ...openGraphBase,
    url: '/products',
    title: 'Productos | Savegre Soft',
    description: DESCRIPCION,
  },
}

export default async function ProductsPage() {
  const productos = await getDanaProducts()

  // Datos estructurados: lista de productos con su oferta, para los buscadores.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Productos — Savegre Soft',
    url: `${site.url}/products`,
    numberOfItems: productos.length,
    itemListElement: productos.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        sku: p.sku || undefined,
        description: p.description || undefined,
        category: p.category || undefined,
        ...(p.quoteOnly
          ? {}
          : {
              offers: {
                '@type': 'Offer',
                price: p.price,
                priceCurrency: p.currency,
                availability: 'https://schema.org/InStock',
              },
            }),
      },
    })),
  }

  return (
    <section className="pt-16 pb-24">
      <script {...jsonLdScript(itemListJsonLd)} />
      <script
        {...jsonLdScript(breadcrumbJsonLd([{ name: 'Productos', path: '/products' }]))}
      />

      <Container>
        <PageHeader
          eyebrow="Savegre Soft — Catálogo"
          title="Nuestros"
          accent="productos"
          lead="Desarrollo, asesoría y plataformas listas para su negocio. Cada producto muestra su precio de referencia; escríbanos para una propuesta a su medida."
        />

        {productos.length === 0 ? (
          <div className="border-line text-muted mt-16 border border-dashed px-8 py-16 text-center text-sm">
            <p>Estamos actualizando el catálogo. Vuelva pronto.</p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/contact" variant="ghost">
                Hablemos de su proyecto
              </ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {productos.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 6) * 0.05}>
                  <Card className="flex h-full flex-col p-7">
                    {/* Categoría + SKU */}
                    <div className="mb-5 flex items-center justify-between gap-3">
                      {p.category ? <Tag>{p.category}</Tag> : <span />}
                      {p.sku && (
                        <span className="text-faint font-mono text-[11px]">
                          #{p.sku}
                        </span>
                      )}
                    </div>

                    <h2 className="text-fg text-base font-medium">{p.name}</h2>

                    {p.description && (
                      <p className="text-muted mt-3 line-clamp-5 text-[13px] leading-relaxed whitespace-pre-line">
                        {p.description.trim()}
                      </p>
                    )}

                    {/* Precio — empujado al fondo de la tarjeta */}
                    <div className="border-line mt-auto flex items-end justify-between gap-3 border-t pt-5">
                      {p.quoteOnly ? (
                        <span className="text-fg text-sm font-medium">
                          A cotizar
                        </span>
                      ) : (
                        <div>
                          <span className="text-fg text-lg font-medium">
                            {formatPrecio(p.price, p.currency)}
                          </span>
                          <span className="text-faint ml-1 text-[11px] tracking-wide uppercase">
                            + IVA {p.taxRate}%
                          </span>
                        </div>
                      )}

                      {etiquetaCobro(p.billingModel) && !p.quoteOnly && (
                        <span className="text-faint text-[11px] tracking-wide uppercase">
                          {etiquetaCobro(p.billingModel)}
                        </span>
                      )}
                    </div>

                    {p.setupFee > 0 && !p.quoteOnly && (
                      <p className="text-faint mt-2 text-[11px]">
                        + {formatPrecio(p.setupFee, p.currency)} de instalación
                      </p>
                    )}
                  </Card>
                </Reveal>
              ))}
            </div>

            {/* CTA general (sigue siendo una página de solo lectura) */}
            <Reveal className="border-line mt-16 flex flex-col items-start justify-between gap-6 border-t pt-10 sm:flex-row sm:items-center">
              <p className="text-muted max-w-md text-sm leading-relaxed">
                ¿No ve exactamente lo que necesita? Armamos propuestas a la
                medida de cada proyecto.
              </p>
              <ButtonLink href="/contact">Solicitar una propuesta</ButtonLink>
            </Reveal>
          </>
        )}
      </Container>
    </section>
  )
}
