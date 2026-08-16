/**
 * Catálogo de productos propios.
 *
 * Fuente única para las tres superficies donde aparecen: el resumen en
 * /services, las tarjetas de /portafolio y la ficha completa en
 * /productos/[slug]. Cambiar un dato aquí lo cambia en las tres.
 *
 * `iconKey` es un identificador y no el componente en sí, porque este archivo
 * es `.ts` y no puede contener JSX; el mapeo vive en los componentes.
 */

export type IconKey = 'chat' | 'receipt'

export type Producto = {
  slug: string
  nombre: string
  iconKey: IconKey
  /** Una línea: qué es. */
  claim: string
  /** Dos líneas para tarjetas de portafolio. */
  resumen: string
  /** Párrafo de presentación para /services y la ficha. */
  descripcion: string
  estado: string
  stack: string[]
  metricas: { valor: string; etiqueta: string }[]
  /** El dolor que justifica el producto. */
  problema: { title: string; desc: string }[]
  capacidades: { title: string; desc: string }[]
  /** Documentación por módulo — el grueso de la ficha de producto. */
  modulos: { title: string; desc: string; bullets: string[] }[]
  casos: { title: string; desc: string }[]
  integracion: string[]
  seguridad: string[]
  despliegue: { title: string; desc: string }[]
  faq: { q: string; a: string }[]
}

export const productos: Producto[] = [
  /* ─────────────────────────── WAPI ─────────────────────────── */
  {
    slug: 'wapi',
    nombre: 'Wapi',
    iconKey: 'chat',
    claim: 'Middleware multi-tenant para la WhatsApp Cloud API',
    resumen:
      'Plataforma de conversaciones sobre la WhatsApp Cloud API oficial: mensajería, flujos con IA, colas de atención y campañas.',
    descripcion:
      'Wapi es la capa de integración y orquestación que se coloca sobre la Cloud API oficial de Meta. Sus aplicaciones envían y reciben conversaciones de WhatsApp sin lidiar con webhooks, reintentos, límites de ritmo ni el ciclo de vida de las plantillas — con un motor de flujos, bots de IA y colas de atención humana encima.',
    estado: 'En producción',
    stack: ['.NET 10', 'EF Core', 'PostgreSQL / SQLite', 'Docker', 'Azure'],
    metricas: [
      { valor: '582', etiqueta: 'Pruebas automatizadas' },
      { valor: '~158', etiqueta: 'Endpoints de API' },
      { valor: '3', etiqueta: 'Canales de mensajería' },
    ],
    problema: [
      {
        title: 'La Cloud API es una API, no un producto',
        desc: 'Meta entrega el transporte. La plantilla rechazada, el reintento, la ventana de 24 horas, el estado de entrega y el hilo de conversación son problema suyo.',
      },
      {
        title: 'Cada integración se rehace desde cero',
        desc: 'Un webhook mal procesado pierde mensajes; un reinicio del servidor pierde la cola de envío. Resolverlo bien cuesta meses de trabajo que no diferencian a su negocio.',
      },
      {
        title: 'El bot y el humano no se hablan',
        desc: 'Lo habitual es un bot por un lado y un agente con el teléfono por otro, sin historial compartido ni criterio de cuándo escalar.',
      },
    ],
    capacidades: [
      {
        title: 'Mensajería completa',
        desc: 'Texto, plantillas (incluidas de carrusel y ofertas), media, menús, formularios nativos (Flows), catálogo de productos, ubicación, reacciones y respuestas citadas.',
      },
      {
        title: 'Entrega fiable',
        desc: 'Reintentos ante fallos temporales de Meta, control de ritmo por número y envío encolado que sobrevive a un reinicio: nada se pierde en el camino.',
      },
      {
        title: 'Flujos y bots con IA',
        desc: 'Motor conversacional con estado por contacto: menús, captura de datos y nodos de IA que responden sobre su base de conocimiento y consultan sus sistemas mediante funciones.',
      },
      {
        title: 'Atención humana',
        desc: 'Colas con agentes, auto-asignación, transferencias, horario de atención, plazos de respuesta (SLA), respuestas rápidas y encuestas de satisfacción.',
      },
      {
        title: 'Campañas y CRM',
        desc: 'Envíos masivos segmentados por etiquetas, programables y con seguimiento por destinatario, sobre una ficha 360° de cada contacto.',
      },
      {
        title: 'Aislamiento y cifrado',
        desc: 'Filtros globales por tenant en el modelo de datos y secretos de Meta y OpenAI cifrados con AES-256-GCM en reposo.',
      },
    ],
    modulos: [
      {
        title: 'Mensajería',
        desc: 'Todo lo que la Cloud API permite enviar y recibir, con los errores de Meta ya interpretados en lenguaje entendible.',
        bullets: [
          'Plantillas de todos los tipos, incluidas carrusel y ofertas por tiempo limitado',
          'Formularios nativos de WhatsApp (Flows) y catálogo de productos',
          'Media, ubicación, fichas de contacto, reacciones y respuestas citadas',
          'Reconoce todo lo entrante: botones de plantilla, pedidos, ubicaciones y respuestas de Flows',
          'Envío encolado opcional que sobrevive a reinicios, con control de ritmo por número',
        ],
      },
      {
        title: 'Flujos conversacionales',
        desc: 'Motor con estado por contacto. Se define el árbol de conversación y Wapi lleva a cada persona por él.',
        bullets: [
          'Menús de botones (hasta 3), listas (hasta 10) y texto numerado como alternativa',
          'Nodos de captura de datos para formularios paso a paso',
          'Nodos de IA con OpenAI, con clave por tenant y alternativa global',
          'Escalado a humano por palabra clave, por decisión del modelo o desde una opción de menú',
        ],
      },
      {
        title: 'IA con contexto propio',
        desc: 'El bot responde sobre lo que usted sabe, no sobre lo que el modelo imagina.',
        bullets: [
          'Base de conocimiento con búsqueda semántica por tenant',
          'Funciones que consultan sus sistemas en vivo (estado de pedido, saldo, cita)',
          'Cuando no hay respuesta fiable, deriva en lugar de inventar',
        ],
      },
      {
        title: 'Atención humana y equipos',
        desc: 'La bandeja de los agentes, con las reglas de operación que un equipo real necesita.',
        bullets: [
          'Colas por tenant con agentes asignados y carga visible en tiempo real',
          'Reparto manual (claim) o auto-asignación round-robin',
          'Horario de atención por cola, con zona horaria, horarios partidos y tramos que cruzan medianoche',
          'Plazos de respuesta (SLA), respuestas rápidas y encuestas de satisfacción',
          'Al retirar a un agente, sus conversaciones vuelven a la espera en vez de quedar huérfanas',
        ],
      },
      {
        title: 'Campañas',
        desc: 'Envíos masivos de plantillas con control operativo y de coste.',
        bullets: [
          'Segmentación por etiquetas del CRM',
          'Programación, pausa y reanudación',
          'Seguimiento por destinatario individual',
          'Conversaciones facturables de Meta desglosadas por categoría y por cuenta',
        ],
      },
      {
        title: 'CRM y métricas',
        desc: 'El historial y los números que permiten dirigir el equipo.',
        bullets: [
          'Ficha 360° del contacto: datos, etiquetas, notas internas, actividad y estado del bot',
          'Tiempo de primera respuesta y de resolución, en media, mediana y p90',
          'Carga por agente y cumplimiento de SLA',
          'Auditoría y exportación de datos por tenant',
        ],
      },
    ],
    casos: [
      {
        title: 'Atención al cliente que no depende del horario',
        desc: 'El bot resuelve lo repetitivo con su base de conocimiento y escala a un agente humano solo cuando hace falta, respetando el horario de atención y el SLA.',
      },
      {
        title: 'Notificaciones transaccionales',
        desc: 'Su ERP, POS o sistema interno dispara un aviso — pedido listo, cita mañana, pago recibido — y Wapi lo entrega como plantilla aprobada, con reintentos.',
      },
      {
        title: 'Campañas segmentadas',
        desc: 'Promociones y recordatorios de cobro a un segmento concreto de contactos, programados, con pausa y reanudación y el coste por conversación a la vista.',
      },
      {
        title: 'Una sola bandeja multicanal',
        desc: 'Instagram y Messenger entran por los mismos flujos, las mismas colas y el mismo CRM que WhatsApp. El agente trabaja en un único sitio.',
      },
    ],
    integracion: [
      'API REST documentada con Swagger/OpenAPI y API keys por tenant',
      'Webhooks salientes firmados, con reintentos, hacia sus sistemas',
      'Streaming SSE para bandejas de agente en tiempo real',
      'Funciones de IA que consultan sus APIs en lugar de improvisar',
      'Alta guiada de clientes con Embedded Signup de Meta',
      'Evento session.handoff para avisar a sistemas externos de cada derivación',
    ],
    seguridad: [
      'Aislamiento por tenant con filtros globales en el modelo de datos: una consulta sin filtro no puede devolver datos de otro cliente',
      'Tokens de Meta, app secrets y claves de OpenAI cifrados con AES-256-GCM en reposo',
      'Permisos por rol y auditoría de acciones dentro de cada tenant',
      'En producción la API aborta el arranque si las claves siguen siendo las de ejemplo',
      'Webhooks entrantes verificados por firma e idempotentes ante reenvíos de Meta',
    ],
    despliegue: [
      {
        title: 'Docker Compose',
        desc: 'Un `docker compose up` levanta la API, el panel y la base de datos. Es la vía recomendada para empezar.',
      },
      {
        title: 'Azure Web App for Containers',
        desc: 'Despliegue documentado paso a paso para producción gestionada, con almacenamiento en Azure Blob.',
      },
      {
        title: 'SQLite o PostgreSQL',
        desc: 'SQLite para una instancia única sin instalar nada; PostgreSQL cuando hace falta levantar varias instancias en paralelo.',
      },
      {
        title: 'Almacenamiento a elegir',
        desc: 'Archivos en disco local, Azure Blob Storage o AWS S3, según dónde viva el resto de su infraestructura.',
      },
    ],
    faq: [
      {
        q: '¿Wapi reemplaza a WhatsApp Business?',
        a: 'No. Una cuenta de WhatsApp Business (WABA) real la aloja Meta. Wapi no reimplementa WhatsApp: es la capa de integración y orquestación sobre la Cloud API oficial, y necesita su propia WABA.',
      },
      {
        q: '¿Hay que migrar el número actual?',
        a: 'El número debe estar dado de alta en la Cloud API. El alta guiada con Embedded Signup permite que el cliente autorice desde un popup y el servidor haga el resto de la configuración.',
      },
      {
        q: '¿Qué pasa si se reinicia el servidor a mitad de una campaña?',
        a: 'Nada se pierde. Los webhooks entrantes, los envíos encolados y los webhooks salientes se guardan en base de datos, y los workers reservan lo que procesan, de modo que varias instancias reparten la carga sin duplicarla.',
      },
      {
        q: '¿Se puede usar solo para enviar notificaciones?',
        a: 'Sí. Los módulos son independientes: se puede usar únicamente la API de mensajería sin activar flujos, colas ni campañas.',
      },
      {
        q: '¿Sirve para Instagram y Messenger?',
        a: 'Sí. Ambos canales funcionan sobre los mismos flujos, colas y CRM. Están cubiertos por pruebas automatizadas; la verificación contra los servicios reales de Meta sigue en el mapa de trabajo.',
      },
    ],
  },

  /* ─────────────────────────── FACTU ─────────────────────────── */
  {
    slug: 'factu',
    nombre: 'Factu',
    iconKey: 'receipt',
    claim: 'Facturación electrónica v4.4 para el Ministerio de Hacienda',
    resumen:
      'API de facturación electrónica de Costa Rica: clave, consecutivo, XML v4.4, firma XAdES, envío a Hacienda y entrega al cliente.',
    descripcion:
      'Factu emite comprobantes electrónicos de punta a punta: reserva el consecutivo, genera la clave numérica de 50 dígitos, arma el XML v4.4, lo firma con XAdES usando el certificado del emisor y lo envía a Hacienda — para después consultar el estado y entregar el comprobante al cliente final. Todo detrás de una API REST que su sistema puede llamar.',
    estado: 'En producción',
    stack: ['TypeScript', 'Fastify 5', 'Prisma', 'PostgreSQL', 'Docker'],
    metricas: [
      { valor: '209', etiqueta: 'Pruebas automatizadas' },
      { valor: '7', etiqueta: 'Tipos de comprobante' },
      { valor: 'v4.4', etiqueta: 'Versión de Hacienda' },
    ],
    problema: [
      {
        title: 'La norma no perdona detalles',
        desc: 'Clave de 50 dígitos, consecutivo de 20, XML exacto y firma XAdES válida. Un carácter fuera de sitio es un rechazo, y el rechazo llega después, no en el momento.',
      },
      {
        title: 'Construirlo en casa sale caro',
        desc: 'Criptografía de firma, sesión OAuth contra el IDP de Hacienda y renovación de tokens no son el negocio de un comercio ni de un ERP vertical.',
      },
      {
        title: 'La numeración es un punto crítico',
        desc: 'Dos ventas simultáneas que reciben el mismo consecutivo son un problema contable, y un consecutivo quemado por un envío fallido también.',
      },
    ],
    capacidades: [
      {
        title: '7 tipos de comprobante',
        desc: 'Factura, Tiquete, Nota de Crédito, Nota de Débito, Factura de Compra, Factura de Exportación y Recibo Electrónico de Pago (REP, nuevo en v4.4), más el Mensaje Receptor.',
      },
      {
        title: 'Consecutivos sin colisiones',
        desc: 'Contador atómico por emisor, sucursal, terminal y tipo. Dos emisiones simultáneas nunca repiten número, y el que no llega a Hacienda se devuelve a la serie.',
      },
      {
        title: 'Firma y sesión gestionadas',
        desc: 'Firma XAdES-BES/EPES con el .p12 del emisor y sesión OAuth contra el IDP de Hacienda con renovación automática de tokens.',
      },
      {
        title: 'Estado con re-consulta',
        desc: 'Envío a recepción y polling hasta aceptado o rechazado, con re-consulta periódica de los comprobantes que Hacienda dejó sin veredicto.',
      },
      {
        title: 'Entrega al cliente',
        desc: 'Correo automático con PDF y XML tras la aceptación, con reintentos, historial y reenvío manual cuando hace falta.',
      },
      {
        title: 'Documentos recibidos',
        desc: 'Buzón IMAP o carga manual de las facturas que le emiten a usted, con generación y envío del Mensaje Receptor.',
      },
    ],
    modulos: [
      {
        title: 'Emisión',
        desc: 'El camino completo de un comprobante, desde la llamada a la API hasta el veredicto de Hacienda.',
        bullets: [
          'Reserva de consecutivo con contador atómico por emisor, sucursal, terminal y tipo',
          'Clave numérica de 50 dígitos y consecutivo de 20 generados según la norma',
          'XML v4.4 armado y validado antes de salir',
          'Firma enveloped XAdES-BES / EPES con el certificado .p12 del emisor',
          'Envío a recepción y consulta de estado con polling hasta aceptado o rechazado',
          'Re-consulta periódica de los que Hacienda deja sin veredicto',
        ],
      },
      {
        title: 'Validación previa',
        desc: 'Las reglas de negocio se comprueban antes de contactar al Ministerio, así el error aparece en su flujo y no como un rechazo tardío.',
        bullets: [
          'Comprobación de estructura y de reglas de negocio antes del envío',
          'Errores devueltos en el momento de la llamada, no horas después',
          'Menos consecutivos quemados por documentos mal formados',
        ],
      },
      {
        title: 'Sesión con Hacienda',
        desc: 'La parte que más mantenimiento suele exigir, resuelta y persistida.',
        bullets: [
          'OAuth contra el IDP del Ministerio de Hacienda',
          'Renovación automática de tokens, sin intervención manual',
          'Tokens persistidos y cifrados en reposo',
        ],
      },
      {
        title: 'Entrega y documentos recibidos',
        desc: 'El comprobante no termina en Hacienda: termina en manos del cliente, y los que usted recibe también hay que responderlos.',
        bullets: [
          'Correo automático con PDF y XML tras la aceptación',
          'Reintentos, historial de entregas y reenvío manual',
          'Buzón IMAP o carga manual de las facturas que le emiten',
          'Generación y envío del Mensaje Receptor correspondiente',
        ],
      },
      {
        title: 'Organizaciones, roles y accesos',
        desc: 'Pensado para operar varias empresas o varios emisores desde una sola instalación.',
        bullets: [
          'Multi-tenant: organizaciones aisladas entre sí, con varios usuarios cada una',
          'Roles admin, facturador y lector, con permisos diferenciados',
          'Acceso por JWT, por OAuth con Google o Microsoft, y por API key para integraciones',
          'Límite de peticiones: 300 por minuto en general y 10 por minuto en los endpoints de acceso',
        ],
      },
      {
        title: 'Integraciones y avisos',
        desc: 'Cada evento de negocio puede salir hacia donde su equipo ya trabaja.',
        bullets: [
          'Webhooks firmados con HMAC hacia su ERP o su contabilidad',
          'Eventos: comprobante aceptado, comprobante rechazado, documento recibido y entrega al cliente',
          'Canales de notificación: SMS, WhatsApp, Slack, Teams y Bitrix24',
          'Listados paginados y documentación OpenAPI para construir encima',
        ],
      },
    ],
    casos: [
      {
        title: 'Su sistema factura, Factu cumple',
        desc: 'El ERP o el punto de venta sigue siendo el dueño de la venta; Factu se encarga de clave, consecutivo, firma, envío y estado. No hay que construir criptografía en casa.',
      },
      {
        title: 'Validación antes de Hacienda',
        desc: 'Las reglas de negocio se comprueban antes de contactar al Ministerio, así que los errores se detectan en su flujo y no como un rechazo días después.',
      },
      {
        title: 'Cobros parciales con REP',
        desc: 'El Recibo Electrónico de Pago de la v4.4 permite documentar abonos sobre una factura a crédito sin recurrir a notas de ajuste.',
      },
      {
        title: 'Cuentas por pagar ordenadas',
        desc: 'Las facturas que recibe entran por IMAP, se registran y se responden con el Mensaje Receptor correspondiente, sin revisar el correo a mano.',
      },
    ],
    integracion: [
      'API REST con OpenAPI/Swagger, JWT, OAuth (Google/Microsoft) y API keys',
      'Webhooks firmados con HMAC hacia su ERP o su contabilidad',
      'Eventos de negocio: comprobante aceptado, rechazado, documento recibido y entrega al cliente',
      'Notificaciones a SMS, WhatsApp, Slack, Teams y Bitrix24',
      'Multi-tenant con roles: administrador, facturador y lector',
      'Listados paginados y respuestas consistentes para construir su propia interfaz',
    ],
    seguridad: [
      'Certificados .p12, tokens del IDP y credenciales SMTP/IMAP cifrados en reposo con AES-256-GCM',
      'Sesión en cookie httpOnly y comprobación de Origin contra CSRF en los métodos que cambian estado',
      'Cabeceras de seguridad con helmet y límite de 10 peticiones por minuto en login y recuperación',
      'Documentación interactiva apagada en producción, porque expone el mapa completo de la API',
      'Aislamiento por organización: los comprobantes de un tenant no son visibles desde otro',
    ],
    despliegue: [
      {
        title: 'Docker Compose',
        desc: '`docker compose up` levanta la API junto a PostgreSQL, listo para probar en una laptop.',
      },
      {
        title: 'PostgreSQL con Prisma',
        desc: 'Esquema versionado con migraciones de Prisma, para actualizar sin sorpresas.',
      },
      {
        title: 'Documentación interactiva',
        desc: 'Scalar y Swagger UI incluidas en entornos no productivos para explorar la API antes de integrar.',
      },
      {
        title: 'Servidor propio o nube',
        desc: 'Contenedor estándar: funciona igual en su servidor, en un VPS o en un servicio gestionado de contenedores.',
      },
    ],
    faq: [
      {
        q: '¿Necesito mi propio certificado de Hacienda?',
        a: 'Sí. Factu firma con el certificado .p12 del emisor, que es personal e intransferible. Se sube una vez y queda cifrado en reposo.',
      },
      {
        q: '¿Qué pasa si Hacienda no responde?',
        a: 'El comprobante queda registrado y entra en la re-consulta periódica hasta obtener veredicto. No hay que reenviarlo a mano ni se pierde el consecutivo.',
      },
      {
        q: '¿Sirve para el REP de la versión 4.4?',
        a: 'Sí. El Recibo Electrónico de Pago está soportado, junto con los otros seis tipos de comprobante y el Mensaje Receptor.',
      },
      {
        q: '¿Puedo facturar desde mi propio sistema?',
        a: 'Es el uso previsto. Su ERP o punto de venta llama a la API con los datos de la venta y Factu devuelve el comprobante emitido y su estado.',
      },
      {
        q: '¿Puedo manejar varias empresas?',
        a: 'Sí. Es multi-tenant: cada organización tiene sus usuarios, emisores y comprobantes aislados, y el contador de consecutivos es independiente por emisor, sucursal y terminal.',
      },
    ],
  },
]

export function getProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug)
}
