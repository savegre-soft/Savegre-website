'use client'

import { motion } from 'motion/react'
import { whatsappEnabled, whatsappUrl } from '../../lib/site'
import { WhatsAppIcon } from './icons'

/**
 * Botón flotante de WhatsApp, presente en todas las páginas.
 *
 * Mientras el número siga siendo el de ejemplo (`whatsappEnabled === false`) el
 * botón se muestra igual, pero lleva a /contact en lugar de a un chat con un
 * número inexistente. En cuanto se ponga el número real en `app/lib/site.ts`,
 * pasa a abrir WhatsApp automáticamente — no hay que tocar este archivo.
 *
 * El texto ("Escríbenos") se despliega al pasar el cursor; en móvil queda solo
 * el icono para no tapar contenido.
 */
export default function WhatsAppFab() {
  const configurado = whatsappEnabled
  const href = configurado ? whatsappUrl() : '/contact'

  return (
    <motion.a
      href={href}
      {...(configurado ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={configurado ? 'Escríbenos por WhatsApp' : 'Ir a la página de contacto'}
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-whatsapp text-ink group fixed right-5 bottom-5 z-40 flex items-center rounded-full p-4 shadow-lg shadow-black/40 md:right-8 md:bottom-8"
    >
      {/* Pulso: llama la atención sin ser intrusivo */}
      <span
        aria-hidden="true"
        className="bg-whatsapp absolute inset-0 -z-10 animate-ping rounded-full opacity-20"
      />
      <WhatsAppIcon size={24} />
      <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-[max-width,margin] duration-300 group-hover:ml-2 group-hover:max-w-40">
        Escríbenos
      </span>
    </motion.a>
  )
}
