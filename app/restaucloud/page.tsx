import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '../components/Shared/Motion'
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  IconBox,
  SectionHeading,
} from '../components/Shared/ui'
import {
  ArrowUpRightIcon,
  CheckIcon,
  UtensilsIcon,
} from '../components/Shared/icons'
import { openGraphBase, site, whatsappEnabled, whatsappUrl } from '../lib/site'
import { getProducto } from '../lib/productos'
import { breadcrumbJsonLd, jsonLdScript } from '../lib/seo'

/**
 * Recorrido completo del sistema Osa (el panel web + punto de venta),
 * en lenguaje de negocio y sin tecnicismos. La ficha técnica del producto vive
 * en /productos/restaucloud; esta página es "el sistema por dentro" para quien
 * evalúa si le sirve a su restaurante.
 */

const DESCRIPCION =
  'Osa es el sistema de gestión y punto de venta para restaurantes de Savegre Soft: pedidos en mesa y para llevar, cocina, inventario, reservaciones, clientes frecuentes, caja, planillas y reportes, para un local o para una cadena de sucursales.'

export const metadata: Metadata = {
  title: 'Osa — El sistema para restaurantes',
  description: DESCRIPCION,
  keywords: [
    'Osa',
    'software para restaurantes',
    'punto de venta para restaurantes',
    'sistema POS Costa Rica',
    'gestión de restaurantes',
    'software para cadenas de restaurantes',
    'pantalla de cocina',
    'control de inventario restaurante',
    'reservaciones de restaurante',
    'Savegre Soft',
  ],
  alternates: { canonical: '/restaucloud' },
  openGraph: {
    ...openGraphBase,
    url: '/restaucloud',
    title: 'Osa — El sistema para restaurantes | Savegre Soft',
    description: DESCRIPCION,
  },
}

/** Cómo se contrata: una base siempre incluida y módulos que se activan aparte. */
const planes = [
  {
    nombre: 'Núcleo',
    etiqueta: 'Siempre incluido',
    desc: 'Usuarios y permisos, restaurantes, áreas y mesas, menú, punto de venta, clientes y el registro automático de cada cambio.',
  },
  {
    nombre: 'Cocina',
    etiqueta: 'Módulo',
    desc: 'La pantalla de cocina y el seguimiento del estado de cada pedido.',
  },
  {
    nombre: 'CRM y Fidelización',
    etiqueta: 'Módulo',
    desc: 'El programa de clientes frecuentes con recompensas automáticas.',
  },
  {
    nombre: 'Inventario y Compras',
    etiqueta: 'Módulo',
    desc: 'Ingredientes, recetas, proveedores, órdenes de compra y cuentas por pagar.',
  },
  {
    nombre: 'Finanzas avanzadas',
    etiqueta: 'Módulo',
    desc: 'Turnos de caja, cuentas por cobrar, notas de crédito y tipo de cambio.',
  },
  {
    nombre: 'Reportes y Analítica',
    etiqueta: 'Módulo',
    desc: 'Ventas, inventario, finanzas y rentabilidad por plato, con exportación.',
  },
  {
    nombre: 'Personal y Turnos',
    etiqueta: 'Módulo',
    desc: 'Programación de turnos, asistencia, planilla, aguinaldo y vacaciones.',
  },
]

/**
 * El recorrido por áreas. Cada bloque es un área del sistema con lo que un
 * dueño de restaurante ve y hace ahí, dicho en su idioma, no en el nuestro.
 */
const areas: { titulo: string; intro: string; puntos: string[] }[] = [
  {
    titulo: 'Inicio: el pulso del día',
    intro: 'Lo primero que aparece al entrar.',
    puntos: [
      'Un resumen real del día —pedidos, ingresos y clientes activos— sumando todas las sucursales.',
      'La actividad reciente: los últimos pedidos de cualquier sucursal, con su número, estado, monto y hora.',
      'Accesos rápidos a lo que se usa a diario y botones directos para una nueva orden o un cliente nuevo.',
    ],
  },
  {
    titulo: 'Sucursales, cadenas y plano de mesas',
    intro: 'Funciona para un local o para una cadena de varias marcas.',
    puntos: [
      'Alta y edición de sucursales con su dirección, horario y estado; se pueden agrupar en cadenas.',
      'Antes de borrar una sucursal, el sistema avisa cuántas mesas, productos y facturas se verían afectados.',
      'Cada sucursal se organiza en áreas (Salón, Terraza…) con un plano visual donde se dibujan las mesas.',
      'El plano se guarda en el servidor: cualquier computadora que abra esa área ve exactamente las mismas mesas.',
      'El estado de la mesa se combina solo: una reserva activa la muestra "Reservada" solo durante su franja horaria, y pasa a "Ocupada" en cuanto llega el pedido.',
      'Un botón "Reorganizar" acomoda todas las mesas en una cuadrícula ordenada de un clic.',
    ],
  },
  {
    titulo: 'El menú',
    intro: 'La carta, con todo lo que un plato necesita.',
    puntos: [
      'Los platos se ordenan en familia → categoría → plato, cada uno con su precio, descripción y disponibilidad.',
      'Modificadores con precio (por ejemplo un grupo "Tamaño" con "Normal" y "Grande +₡1000"), obligatorios u opcionales.',
      'Receta opcional: qué ingredientes lleva el plato y en qué cantidad, para descontar el inventario solo.',
      'Imagen, orden de aparición, canales de venta (comer aquí / para llevar / delivery), etiquetas ("Vegetariano", "Sin gluten") y platos destacados.',
    ],
  },
  {
    titulo: 'Punto de venta',
    intro: 'La pantalla donde se arma y se cobra cada pedido.',
    puntos: [
      'Venta a pantalla completa: categorías con íconos, buscador, favoritos y la línea del pedido con cantidad, nota y precio.',
      'Pedido sin mesa para negocios de solo para llevar o delivery, con la dirección de entrega del cliente.',
      'Al agregar el primer producto se pide el PIN de quien realmente toma el pedido, para que quede a nombre correcto.',
      'Cobro real: efectivo, tarjeta, SINPE Móvil, transferencia u otro; en efectivo calcula el vuelto, y puede cobrar en dólares al tipo de cambio del día.',
      'Solo el personal con permiso de caja cobra; un mesero arma el pedido pero no lo cierra.',
      'Descuentos por plato con motivo, división de la cuenta entre varios comensales y venta a crédito contra una cuenta por cobrar.',
      'Prefactura, resumen de factura, reimpresión de comanda, cambio de mesa e histórico de facturación del cliente.',
      'Al quedar pagado se emite un comprobante con número consecutivo por sucursal.',
    ],
  },
  {
    titulo: 'Cocina',
    intro: 'Lo que ve la cocina cuando entra un pedido.',
    puntos: [
      'Un tablero en tres columnas —Confirmado, En preparación, Listo— que se actualiza solo cada pocos segundos.',
      'Cada ticket muestra la mesa (o si es para llevar), quién tomó el pedido, los platos con sus notas y cuánto lleva esperando.',
      'Un color de alerta —verde, ámbar, rojo— avisa cuando un pedido se está tardando.',
      'Un botón avanza el pedido al siguiente paso y otro lo devuelve si se avanzó por error.',
    ],
  },
  {
    titulo: 'Reservaciones y lista de espera',
    intro: 'La agenda del salón, con el ciclo de vida automático.',
    puntos: [
      'Alta y edición de reservaciones por sucursal, con fecha, hora y duración, vinculadas a un cliente y a una mesa.',
      'Al elegir mesa solo se muestran las libres en ese horario: una reserva de 8 a 9 pm no bloquea la mesa el resto del día.',
      'La reservación pasa sola a "Sentada" al llegar el pedido, a "Completada" al pagarse, y se cancela sola si nadie llega a los 20 minutos.',
      'Vista de calendario del día con las reservas como bloques de color sobre cada mesa.',
      'Lista de espera para quienes llegan sin reservar, con el tiempo que llevan esperando y un botón "Sentar" que lleva directo al punto de venta.',
    ],
  },
  {
    titulo: 'Clientes y fidelización',
    intro: 'La ficha del cliente y el programa de frecuentes.',
    puntos: [
      'Ficha con nombre, contacto, historial de pedidos y reservaciones, y direcciones de entrega para el delivery.',
      'Cada sucursal arma sus propios programas: por visitas, racha de visitas, compra de un producto o monto acumulado.',
      'El avance se acumula solo al pagar un pedido con cliente asignado, y la recompensa se emite sola al llegar a la meta.',
      'Las recompensas —producto gratis, descuento, envío gratis— se canjean desde el mismo punto de venta.',
    ],
  },
  {
    titulo: 'Inventario, proveedores y compras',
    intro: 'El control de insumos, de la entrada a la salida.',
    puntos: [
      'Ingredientes por sucursal con unidad, stock mínimo y costo; el stock nunca se edita a mano, se registra cada movimiento.',
      'Consumo automático: al enviar a cocina un plato con receta, su inventario se descuenta solo.',
      'Alertas cuando un ingrediente cae por debajo de su mínimo, que se resuelven solas al reponerlo.',
      'Proveedores por cadena, con categorías propias y un buscador.',
      'Órdenes de compra con recepción parcial en varias entregas y actualización del costo real del ingrediente.',
      'Devoluciones a proveedor y cuentas por pagar con abonos parciales y su saldo calculado solo.',
    ],
  },
  {
    titulo: 'Caja y finanzas',
    intro: 'El dinero del turno y el crédito a clientes.',
    puntos: [
      'Turnos de caja por sucursal: al cerrar solo se cuenta el efectivo real y el sistema calcula el faltante o sobrante.',
      'Cuentas por cobrar de clientes y empresas con límite de crédito, y ventas "fiadas" desde el punto de venta.',
      'Los abonos se registran con su método de pago y el saldo se actualiza solo.',
      'Tipo de cambio del día traído del Banco Central o ajustado a mano, usado para los cobros en dólares.',
      'Notas de crédito y exoneración de facturas, totales o parciales, sobre un comprobante ya emitido.',
    ],
  },
  {
    titulo: 'Personal, turnos y planillas',
    intro: 'La programación del equipo y su pago.',
    puntos: [
      'Turnos de trabajo por persona y sucursal, con repetición por días de la semana hasta una fecha.',
      'Cada empleado marca su propia entrada y salida; la administración puede marcarla por alguien que lo olvidó.',
      'Vista de calendario del día y organigrama de la cadena por sucursal y puesto.',
      'Planilla por período: trae las horas reales y calcula el bruto, la deducción de CCSS y las horas extra.',
      'Aguinaldo y registro de vacaciones por empleado, con comprobante de pago en PDF.',
    ],
  },
  {
    titulo: 'Reportes y analítica',
    intro: 'Los números para tomar decisiones, todos sobre datos reales.',
    puntos: [
      'Ventas del período: ingresos, pedidos, ticket promedio, platillos más vendidos y ventas por cada persona que atendió.',
      'Inventario: valor total, ingredientes bajo mínimo y movimientos por motivo.',
      'Financieros: ingresos, egresos, utilidad y margen, día por día.',
      'Rentabilidad por plato: cada uno se clasifica en estrella, caballo de batalla, rompecabezas o perro.',
      'Cada pantalla se exporta a Excel y a PDF tal como se ve.',
    ],
  },
  {
    titulo: 'Facturación electrónica',
    intro: 'El trámite ante Hacienda, resuelto por fuera.',
    puntos: [
      'Al cerrar el pago, Osa le pasa la venta a Senda, que arma la clave, el consecutivo, el XML v4.4 y la firma.',
      'El estado de Hacienda —aceptado, rechazado o en proceso— vuelve como una notificación y como un distintivo en el historial de pedidos.',
      'Cada cadena usa su propia cuenta y su propio certificado; no se comparten entre restaurantes.',
      'El paso final para producción es el alta de credenciales reales de cada cliente ante Hacienda.',
    ],
  },
  {
    titulo: 'Usuarios, roles y seguridad',
    intro: 'Quién puede hacer qué, y cómo se protege.',
    puntos: [
      'Alta de usuarios del personal con su rol; los permisos se configuran desde una matriz de rol × acción.',
      'PIN de 4 dígitos para cambiar de usuario en una terminal compartida sin volver a escribir la contraseña.',
      'Un usuario puede quedar fijo a una sucursal: entra directo ahí y no ve las demás.',
      'Las acciones sensibles —cancelar una orden, un descuento, una nota de crédito— piden el PIN de un gerente.',
      'Cada cadena solo ve sus propios datos, y todo cambio queda en una auditoría con filtros por fecha y tipo.',
    ],
  },
  {
    titulo: 'Y además',
    intro: 'Detalles que se notan en el uso diario.',
    puntos: [
      'Centro de notificaciones: una campana avisa de pedido listo, inventario bajo, reserva por comenzar o cuenta vencida.',
      'Centro de ayuda con un asistente que responde cómo hacer algo en el sistema, y tutoriales paso a paso.',
      'Ayuda contextual junto a cada campo de los formularios.',
      'Modo claro y oscuro, y favoritos a las pantallas que más se usan.',
    ],
  },
]

/** Lo que todavía no hace. Se dice de frente, igual que en la ficha técnica. */
const pendiente = [
  'La administración de suscripciones y módulos por cliente desde el panel central todavía se está afinando.',
  'La facturación electrónica funciona a través de Senda; el alta de credenciales de producción de cada cliente ante Hacienda es un trámite aparte.',
  'La solicitud de vacaciones por parte del propio empleado y el cálculo de liquidación no están todavía.',
]

function jsonLd() {
  const url = `${site.url}/restaucloud`
  const producto = getProducto('restaucloud')

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Osa',
      url,
      sameAs: `${site.url}/productos/restaucloud`,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Point of Sale',
      operatingSystem: 'Web, Docker',
      description: DESCRIPCION,
      inLanguage: 'es',
      image: `${site.url}/opengraph-image`,
      author: { '@id': `${site.url}/#organization` },
      publisher: { '@id': `${site.url}/#organization` },
      provider: { '@id': `${site.url}/#organization` },
      featureList: areas.map((a) => a.titulo),
      ...(producto && { keywords: producto.stack.join(', ') }),
    },
    breadcrumbJsonLd([{ name: 'Osa', path: '/restaucloud' }]),
  ]
}

export default function OsaPage() {
  return (
    <>
      {jsonLd().map((bloque, i) => (
        <script key={i} {...jsonLdScript(bloque)} />
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
            <span className="text-muted">Osa</span>
          </nav>

          <div className="flex items-center gap-5">
            <IconBox>
              <UtensilsIcon size={24} />
            </IconBox>
            <h1 className="display text-fg text-[clamp(2.75rem,7vw,5rem)] leading-none">
              Osa
            </h1>
          </div>

          <p className="text-brand mt-6 text-xl leading-snug">
            Todo lo que un restaurante necesita para operar, en una sola pantalla.
          </p>
          <p className="text-muted mt-6 max-w-2xl text-[15px] leading-[1.8]">
            Osa lleva el día a día del restaurante: toma los pedidos en el salón o para
            llevar, los manda a cocina, cobra, controla el inventario y las compras, gestiona
            reservaciones y clientes frecuentes, cierra la caja y calcula la planilla. Funciona
            igual para un solo local que para una cadena de varias sucursales, y cada cadena
            activa solo los módulos que necesita.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Solicitar una demo</ButtonLink>
            <ButtonLink href="/productos/restaucloud" variant="ghost">
              Ficha técnica
            </ButtonLink>
            {whatsappEnabled && (
              <ButtonLink
                href={whatsappUrl('Hola, me interesa Osa para mi restaurante. ¿Podemos conversar?')}
                variant="whatsapp"
                external
              >
                Consultar por WhatsApp
              </ButtonLink>
            )}
          </div>
        </Container>
      </section>

      {/* ─── Cómo se contrata ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Cómo se contrata"
              title="Una base incluida,"
              accent="y módulos aparte"
              aside="El Núcleo siempre está. El resto se activa cuando el restaurante lo pide; lo que no se contrata no aparece en la interfaz."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
            {planes.map((p) => (
              <StaggerItem key={p.nombre} className="h-full">
                <Card className="h-full p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-fg text-sm font-semibold">{p.nombre}</h3>
                    <span className="border-line text-faint shrink-0 border px-2 py-0.5 text-[9px] font-semibold tracking-widest uppercase">
                      {p.etiqueta}
                    </span>
                  </div>
                  <p className="text-muted mt-3 text-[13px] leading-relaxed">{p.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── El sistema por dentro ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>El sistema por dentro</Eyebrow>
            <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">
              Área por <span className="text-faint italic">área</span>
            </h2>
          </Reveal>

          <div className="mt-14 flex flex-col gap-px">
            {areas.map((a, i) => (
              <Reveal key={a.titulo} delay={i * 0.03}>
                <article className="bg-surface border-line grid grid-cols-1 gap-8 border p-8 md:grid-cols-[1fr_1.6fr] md:p-10">
                  <div>
                    <span className="text-brand text-xs font-semibold tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="display text-fg mt-3 text-2xl">{a.titulo}</h3>
                    <p className="text-muted mt-4 text-sm leading-relaxed">{a.intro}</p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {a.puntos.map((punto) => (
                      <li key={punto} className="flex items-start gap-3">
                        <span className="text-brand mt-0.5 shrink-0">
                          <CheckIcon size={15} />
                        </span>
                        <span className="text-muted text-[13px] leading-relaxed">{punto}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Lo que todavía no hace ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Con franqueza</Eyebrow>
            <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">
              Lo que todavía <span className="text-faint italic">no hace</span>
            </h2>
          </Reveal>

          <ul className="mt-10 flex max-w-2xl flex-col gap-4">
            {pendiente.map((item) => (
              <li key={item} className="text-muted border-line border-t pt-4 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─── CTA ─── */}
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
                ¿Quiere verlo con <em className="text-zinc-500">su carta y su operación?</em>
              </h2>
              <p className="relative max-w-md text-sm leading-relaxed text-zinc-600">
                Preparamos una demo sobre su caso concreto —un local o una cadena— y le decimos
                con franqueza si encaja.
              </p>
              <div className="relative flex flex-wrap gap-4">
                <ButtonLink href="/contact" variant="light" icon={<ArrowUpRightIcon size={14} />}>
                  Agendar demo
                </ButtonLink>
                <Link
                  href="/productos/restaucloud"
                  className="text-ink inline-flex items-center gap-2 self-center border-b border-zinc-400 pb-1 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors hover:border-zinc-900"
                >
                  Ver ficha técnica
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
