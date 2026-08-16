/**
 * Alias planos para los payloads RSC del export estático.
 *
 * EL PROBLEMA
 * `next build` con `output: 'export'` escribe los payloads de navegación en
 * carpetas anidadas:
 *
 *   out/services/__next.services/__PAGE__.txt
 *
 * pero el cliente los pide con los separadores convertidos en puntos:
 *
 *   GET /services/__next.services.__PAGE__.txt?_rsc=6uoq4   -> 404
 *
 * El resultado es que **todos los prefetch fallan**. La navegación sigue
 * funcionando, pero cae al modo antiguo: recarga completa del documento en vez
 * de una transición cliente con el payload ya descargado. Además llena la
 * consola de 404.
 *
 * LA SOLUCIÓN
 * Tras el build, dejar una copia de cada payload con el nombre plano que el
 * cliente realmente pide. No se borra nada: quedan ambas rutas disponibles.
 *
 * Es un parche para Next 16.2.3. Si una versión futura corrige el desajuste,
 * este script simplemente generará archivos que ya nadie consulta — conviene
 * revisarlo al actualizar Next.
 */

import { copyFile, mkdir, readdir, stat } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'

const RAIZ = 'out'
const PREFIJO = '__next.'

/** Devuelve todas las rutas de archivo bajo `dir`, recursivamente. */
async function archivosDe(dir) {
  const entradas = await readdir(dir, { withFileTypes: true })
  const salida = []
  for (const e of entradas) {
    const ruta = join(dir, e.name)
    if (e.isDirectory()) salida.push(...(await archivosDe(ruta)))
    else salida.push(ruta)
  }
  return salida
}

/** Localiza las carpetas `__next.*`, que son las que hay que aplanar. */
async function carpetasNext(dir) {
  const entradas = await readdir(dir, { withFileTypes: true })
  const salida = []
  for (const e of entradas) {
    if (!e.isDirectory()) continue
    const ruta = join(dir, e.name)
    if (e.name.startsWith(PREFIJO)) salida.push(ruta)
    // Se sigue bajando: las rutas dinámicas anidan otra carpeta dentro.
    else salida.push(...(await carpetasNext(ruta)))
  }
  return salida
}

async function main() {
  try {
    await stat(RAIZ)
  } catch {
    console.error(`[rsc] No existe "${RAIZ}/". Ejecuta "next build" primero.`)
    process.exit(1)
  }

  const carpetas = await carpetasNext(RAIZ)
  let copiados = 0

  for (const carpeta of carpetas) {
    const padre = dirname(carpeta)
    const nombre = carpeta.slice(padre.length + 1) // p. ej. "__next.services"

    for (const archivo of await archivosDe(carpeta)) {
      // "$d$slug/__PAGE__.txt" -> "$d$slug.__PAGE__.txt"
      const interno = relative(carpeta, archivo).split(/[\\/]/).join('.')
      const destino = join(padre, `${nombre}.${interno}`)

      await mkdir(dirname(destino), { recursive: true })
      await copyFile(archivo, destino)
      copiados++
    }
  }

  console.log(`[rsc] ${copiados} payloads duplicados con nombre plano.`)
}

await main()
