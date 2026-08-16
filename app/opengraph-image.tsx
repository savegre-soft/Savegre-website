import { ImageResponse } from 'next/og'

/**
 * Imagen de vista previa para redes sociales, generada en tiempo de build.
 *
 * Antes el metadata apuntaba a `/og-image.jpg`, un archivo que no existía en
 * `public/`: cada enlace compartido en WhatsApp, LinkedIn o X salía sin
 * imagen. Al ser un archivo `opengraph-image`, Next inyecta las etiquetas
 * `og:image` y `twitter:image` en todas las páginas automáticamente.
 */

// Igual que el sitemap: con `output: 'export'` hay que declararlo estático
// para que la imagen se genere en el build y no en cada petición.
export const dynamic = 'force-static'

export const alt = 'Savegre Soft — Desarrollo de software en Costa Rica'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090b',
          padding: '72px 80px',
          fontFamily: 'serif',
        }}
      >
        {/* Halo de marca */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0) 65%)',
          }}
        />

        {/* Barra superior */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 46, height: 2, background: '#3b82f6' }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#a1a1aa',
              fontFamily: 'sans-serif',
            }}
          >
            San José, Costa Rica
          </div>
        </div>

        {/* Titular */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, color: '#fafafa', lineHeight: 1.05 }}>
            Construimos software
          </div>
          <div style={{ fontSize: 92, color: '#71717a', fontStyle: 'italic', lineHeight: 1.05 }}>
            que escala.
          </div>
        </div>

        {/* Pie */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #1c1c1f',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <div style={{ fontSize: 40, color: '#fafafa' }}>Savegre</div>
            <div style={{ fontSize: 40, color: '#3b82f6' }}>.</div>
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#71717a',
              fontFamily: 'sans-serif',
            }}
          >
            Desarrollo de Software &amp; Análisis de Datos
          </div>
        </div>
      </div>
    ),
    size
  )
}
