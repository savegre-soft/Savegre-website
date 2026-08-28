import { createClient } from '@supabase/supabase-js'

/**
 * Cliente de Supabase para el navegador.
 *
 * El sitio se publica como export estático (`output: 'export'`), así que no hay
 * servidor: tanto el formulario público como el CRM hablan directamente con
 * Supabase desde el cliente. La seguridad la dan las políticas RLS del schema
 * `website` — la clave publishable no es un secreto.
 *
 * `db.schema: 'website'` hace que todas las consultas (`.from('contacts')`)
 * apunten a ese schema en lugar de `public`.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error(
    'Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Defínelas en .env.local (ver .env.local del repo).'
  )
}

export const supabase = createClient(url, anonKey, {
  db: { schema: 'website' },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // Necesario para el enlace de "olvidé mi contraseña": al volver, el SDK
    // lee el token del hash y emite el evento PASSWORD_RECOVERY.
    detectSessionInUrl: true,
  },
})

/**
 * ¿El usuario autenticado actual está en la lista blanca del CRM
 * (`website.crm_members`)? La comprobación vive en la base de datos como
 * función `SECURITY DEFINER`; aquí solo se invoca por RPC.
 */
export async function esMiembroCrm(): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_crm_member')
  if (error) return false
  return data === true
}

export type ContactStatus = 'new' | 'in_progress' | 'done' | 'archived'

export type Contact = {
  id: string
  created_at: string
  full_name: string
  email: string
  subject: string
  detail: string
  status: ContactStatus
  notes: string | null
  source: string
}
