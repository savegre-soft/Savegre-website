import type { Metadata } from 'next'
import { Reveal, Stagger, StaggerItem, Lift } from '../components/Shared/Motion'
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  IconBox,
  PageHeader,
  SectionHeading,
} from '../components/Shared/ui'
import {
  ArrowUpRightIcon,
  ChartIcon,
  CheckIcon,
  CompassIcon,
  LayersIcon,
  ShieldIcon,
} from '../components/Shared/icons'
import { fundadores, site } from '../lib/site'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Savegre Soft es una startup costarricense fundada en 2025 por Steven Gazo y Daniel Hidalgo. Servicios de primera, automatización de procesos y decisiones basadas en datos, desde San José, Costa Rica.',
  alternates: { canonical: '/about' },
}

const enfoques = [
  {
    Icon: ShieldIcon,
    title: 'Servicios de primera',
    desc: 'Trabajo de nivel profesional sin importar el tamaño del cliente. Lo que entregamos a una pyme se sostiene con el mismo rigor que lo que entregamos a una empresa grande.',
  },
  {
    Icon: CompassIcon,
    title: 'Solución de necesidades',
    desc: 'No vendemos tecnología por catálogo. Partimos del problema real de la operación y proponemos lo mínimo que lo resuelve bien.',
  },
  {
    Icon: LayersIcon,
    title: 'Automatización',
    desc: 'Todo proceso repetitivo que consume horas del equipo es candidato a automatizarse. Ahí es donde el software devuelve la inversión más rápido.',
  },
  {
    Icon: ChartIcon,
    title: 'Decisiones basadas en datos',
    desc: 'Instrumentamos lo que construimos para que las decisiones se tomen con números y no con intuiciones.',
  },
]

const valores = [
  {
    title: 'Precisión',
    desc: 'Cada decisión técnica está fundamentada. Si no sabemos justificar por qué elegimos una herramienta, no la elegimos.',
  },
  {
    title: 'Integridad',
    desc: 'Código limpio, compromisos realistas y resultados verificables. Preferimos decir que algo no encaja antes que venderlo.',
  },
  {
    title: 'Escalabilidad',
    desc: 'Arquitecturas que crecen con su negocio sin fricciones ni reescrituras a medio camino.',
  },
]

const practica = [
  'Pruebas automatizadas desde el primer día, no como un añadido final',
  'Despliegue con contenedores estándar, sin atarle a un proveedor',
  'Secretos cifrados en reposo y permisos por rol en todo lo que construimos',
  'Documentación de operación, para que su equipo pueda mantenerlo',
  'Entregas frecuentes y revisables en lugar de una entrega única al final',
  'Observabilidad incluida: si algo falla, se puede ver por qué',
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-20">
        <Container>
          <PageHeader
            eyebrow={`Savegre Soft — Quiénes Somos · Desde ${site.founded}`}
            title="Arquitectura de"
            accent="compromiso"
            lead="Somos una startup costarricense nacida en 2025. No solo escribimos código: diseñamos ecosistemas digitales robustos, automatizamos lo que consume tiempo y dejamos a nuestros clientes decidiendo con datos."
          />
        </Container>
      </section>

      {/* ─── El nombre ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.15fr]">
            {/* Sticky: la columna de texto es más corta que la lista de la
                derecha y, sin esto, deja un vacío grande al hacer scroll. */}
            <Reveal className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>El nombre</Eyebrow>
              <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.15]">
                Por qué
                <br />
                <span className="text-faint italic">Savegre</span>
              </h2>
              <p className="text-muted mt-6 max-w-sm text-sm leading-[1.8]">
                El río Savegre nace en las alturas del Cerro de la Muerte, atraviesa la cordillera
                de Talamanca y desemboca en el Pacífico costarricense. Su cuenca es Reserva de la
                Biosfera de la UNESCO y se le reconoce como uno de los ríos más limpios de la
                región.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-px">
                {[
                  {
                    title: 'Claridad',
                    desc: 'Un río limpio se ve hasta el fondo. Así queremos que sea nuestro trabajo: código legible, arquitecturas explicables y presupuestos sin letra pequeña.',
                  },
                  {
                    title: 'Caudal constante',
                    desc: 'El Savegre corre todo el año. Un sistema bien construido también: sin caídas en el pico de demanda ni sorpresas al reiniciar un servidor.',
                  },
                  {
                    title: 'Nace alto, llega lejos',
                    desc: 'Desde 3.400 metros hasta el mar. Empezamos por los fundamentos —datos, seguridad, arquitectura— porque es lo que permite que el producto llegue lejos.',
                  },
                  {
                    title: 'Un ecosistema, no una pieza',
                    desc: 'Un río sostiene todo lo que vive a su alrededor. El software que entregamos se integra con lo que ya existe en su operación en lugar de reemplazarlo por decreto.',
                  },
                ].map((n) => (
                  <Card key={n.title} className="p-7">
                    <h3 className="text-fg text-sm font-semibold">{n.title}</h3>
                    <p className="text-muted mt-3 text-[13px] leading-relaxed">{n.desc}</p>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="border-line text-muted mt-12 border-t pt-8 text-sm leading-[1.8] md:max-w-3xl">
              Llevamos ese nombre porque somos de aquí. Costa Rica es reconocida por cuidar lo que
              tiene y por hacerlo bien sin necesidad de ser el país más grande —{' '}
              <span className="text-fg">
                exactamente la manera en que queremos hacer software
              </span>
              : con estándares altos, sin desperdicio y pensando en que dure.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ─── Fundadores ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="El equipo"
              title="Quiénes están"
              accent="detrás"
              aside="Una startup pequeña y deliberadamente cercana: quien diseña la solución es quien la construye."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-px md:grid-cols-2">
            {fundadores.map((f) => (
              <StaggerItem key={f.nombre} className="h-full">
                <Lift className="h-full">
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-surface border-line hover:border-line-strong flex h-full flex-col justify-between gap-8 border p-8 transition-colors md:p-10"
                  >
                    <div>
                      <p className="eyebrow">{f.rol}</p>
                      <h3 className="display text-fg group-hover:text-brand mt-4 text-3xl transition-colors">
                        {f.nombre}
                      </h3>
                    </div>
                    <span className="text-brand inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase">
                      Ver LinkedIn
                      <ArrowUpRightIcon size={14} />
                    </span>
                  </a>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── En qué nos enfocamos ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Nuestro enfoque"
              title="En qué nos"
              accent="concentramos"
              aside="Cuatro frentes que aparecen, en distinta proporción, en cada proyecto que tomamos."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-px md:grid-cols-2">
            {enfoques.map(({ Icon, title, desc }) => (
              <StaggerItem key={title} className="h-full">
                <Card className="flex h-full flex-col gap-5 p-8">
                  <IconBox>
                    <Icon size={20} />
                  </IconBox>
                  <h3 className="display text-fg text-2xl">{title}</h3>
                  <p className="text-muted text-sm leading-[1.75]">{desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── Misión y visión ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <Stagger className="grid grid-cols-1 gap-px lg:grid-cols-2">
            {[
              {
                label: 'Misión',
                text: 'Desarrollar soluciones tecnológicas de alta gama que superen los estándares convencionales de fiabilidad, escalabilidad y rendimiento — permitiendo a nuestros clientes operar con confianza.',
              },
              {
                label: 'Visión',
                text: 'Ser reconocidos como el estándar de oro en ingeniería de software en la región, donde cada línea de código sea sinónimo de integridad.',
              },
            ].map(({ label, text }) => (
              <StaggerItem key={label} className="h-full">
                <Card className="h-full p-8 md:p-10">
                  <Eyebrow>{label}</Eyebrow>
                  <p className="text-muted mt-6 text-[15px] leading-[1.8]">{text}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── Valores ─── */}
      <section className="border-line bg-surface border-t py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Valores"
              title="Lo que no"
              accent="negociamos"
              aside="Tres principios que se notan más en lo que rechazamos que en lo que prometemos."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-px lg:grid-cols-3">
            {valores.map((v, i) => (
              <StaggerItem key={v.title} className="h-full">
                <Lift className="h-full">
                  <Card className="h-full p-8">
                    <span className="text-brand text-xs font-semibold tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="display text-fg mt-4 text-2xl">{v.title}</h3>
                    <p className="text-muted mt-4 text-sm leading-relaxed">{v.desc}</p>
                  </Card>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ─── En la práctica ─── */}
      <section className="border-line border-t py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <Eyebrow>En la práctica</Eyebrow>
              <h2 className="display text-fg mt-5 text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.15]">
                Cómo se nota
                <br />
                <span className="text-faint italic">en el día a día</span>
              </h2>
              <p className="text-muted mt-6 max-w-sm text-sm leading-[1.8]">
                Los principios valen poco si no cambian el trabajo diario. Esto es lo que
                aplicamos en cada proyecto, sin importar su tamaño.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="flex flex-col gap-4">
                {practica.map((item) => (
                  <li key={item} className="border-line flex items-start gap-3 border-b pb-4">
                    <span className="text-brand mt-0.5 shrink-0">
                      <CheckIcon size={16} />
                    </span>
                    <span className="text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── Dónde estamos ─── */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="border-line flex flex-col items-start justify-between gap-8 border p-10 md:flex-row md:items-center md:p-14">
              <div>
                <Eyebrow>Dónde estamos</Eyebrow>
                <h2 className="display text-fg mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight">
                  {site.location}
                </h2>
                <p className="text-muted mt-4 max-w-md text-sm leading-relaxed">
                  Trabajamos en horario {site.timezone}, lo que nos deja solapados con casi toda
                  América. {site.schedule.weekdays}.
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
