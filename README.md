# Savegre Soft — sitio web

Sitio corporativo de Savegre Soft. Next.js 16 (App Router) exportado como sitio
estático y servido desde Cloudflare Workers.

- **Producción:** https://savegresoft.com
- **Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · Motion

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
```

## Estructura

```
app/
├─ lib/site.ts          → dominio, contacto, WhatsApp y fundadores
├─ lib/productos.ts     → catálogo de Wapi y Factu (alimenta 3 páginas)
├─ components/Shared/   → Navbar, Footer, primitivas de UI, iconos, Motion
├─ productos/[slug]/    → ficha completa de cada producto
├─ sitemap.ts           → sitemap.xml
├─ robots.ts            → robots.txt
└─ opengraph-image.tsx  → imagen de vista previa social (generada en el build)
public/_headers         → cabeceras que aplica Cloudflare
wrangler.jsonc          → configuración del Worker de assets estáticos
```

## Configurar el WhatsApp

Está pendiente. En [`app/lib/site.ts`](app/lib/site.ts) cambia:

```ts
export const whatsapp = {
  number: '50688887777',      // internacional, solo dígitos, sin + ni espacios
  display: '+506 8888-7777',  // lo que ve el usuario
  greeting: '...',
}
```

Mientras `number` sea el valor de ejemplo (`50600000000`), el botón flotante
lleva a `/contact` y la tarjeta de contacto indica «número por configurar», en
vez de enlazar a un chat inexistente. Al poner el número real se activan solos
el botón flotante, la tarjeta de contacto y los CTA de las fichas de producto.

## Despliegue en Cloudflare

El sitio es un export estático (`output: 'export'` en `next.config.ts`) servido
por un Worker de solo assets — no hay código de servidor.

### Primera vez

```bash
npx wrangler login
npm run deploy
```

`npm run deploy` construye y publica en un paso. Para probar antes de publicar
con el runtime real de Cloudflare (no el de Next):

```bash
npm run preview      # http://localhost:8787
```

> **Detén `preview` (Ctrl+C) antes de volver a construir.** Mientras corre,
> wrangler mantiene abierta la carpeta `out/`, y `next build` empieza por
> borrarla: si sigue viva, el build falla con `EBUSY: resource busy or locked`.
> En Windows, Ctrl+C a veces deja vivo el proceso `workerd`; si el error
> persiste:
>
> ```powershell
> Get-Process workerd, wrangler -ErrorAction SilentlyContinue | Stop-Process -Force
> ```

### Dominio

En el panel de Cloudflare → Workers & Pages → `savegre-website` → Settings →
Domains & Routes, añade `savegresoft.com` como *Custom Domain*.
Cloudflare crea el registro DNS y el certificado.

> **Importante:** el dominio debe coincidir con `site.url` en
> [`app/lib/site.ts`](app/lib/site.ts). De ahí salen los `canonical` de cada
> página, las URLs del `sitemap.xml`, el `robots.txt` y los datos
> estructurados. Si se despliega bajo otro dominio sin actualizar ese valor,
> los buscadores indexan un dominio mientras el canonical les señala otro.

### Qué resuelve `public/_headers`

- **`/opengraph-image`** — el build genera la imagen sin extensión; sin
  `Content-Type: image/png` explícito, Cloudflare la sirve como
  `application/octet-stream` y WhatsApp, LinkedIn y X descartan la vista previa.
- **`/_next/static/*`** — caché inmutable de un año (los nombres llevan hash).
- **Cabeceras de seguridad** — HSTS, `nosniff`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy` y una CSP cerrada a `'self'`, posible
  porque el sitio no carga nada de terceros (las fuentes son auto-alojadas).

Si más adelante se añade analítica o cualquier script externo, hay que
ampliar la CSP en ese archivo o el navegador lo bloqueará.

## Después de publicar

1. **Google Search Console** — dar de alta `savegresoft.com` y enviar
   `https://savegresoft.com/sitemap.xml`.
2. **Rich Results Test** — validar `/productos/wapi` y `/productos/factu`; la
   página declara `SoftwareApplication`, `FAQPage` y `BreadcrumbList`.
3. **Vista previa social** — comprobar un enlace en WhatsApp o LinkedIn.

## Pendiente

- **El formulario de contacto no tiene backend.** Valida y compone un `mailto:`
  con los datos. Para recibir los envíos en el servidor: apuntar el `submit` de
  [`app/contact/ContactForm.tsx`](app/contact/ContactForm.tsx) a Formspree o
  similar (funciona con export estático), o quitar `output: 'export'` y usar una
  Server Action.
- Correo de contacto y perfil de GitHub en `app/lib/site.ts` son provisionales.
