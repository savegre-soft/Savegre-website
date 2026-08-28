'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eyebrow } from '../components/Shared/ui'
import { supabase, esMiembroCrm } from '../lib/supabase'

type Modo = 'signin' | 'signup' | 'forgot' | 'reset'

const inputBase =
  'w-full border border-line bg-ink px-4 py-3 text-sm text-fg transition-colors ' +
  'placeholder:text-faint focus:border-brand focus-visible:outline-none'

const NO_AUTORIZADO =
  'Este correo no está autorizado para el CRM de Savegre Soft.'

export default function LoginClient() {
  const router = useRouter()
  const [modo, setModo] = useState<Modo>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const [comprobando, setComprobando] = useState(true)

  // ─── Sesión existente + enlace de recuperación ───
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setModo('reset')
        setError(null)
        setAviso('Elige una contraseña nueva.')
        setComprobando(false)
      }
    })

    ;(async () => {
      // Si venimos del correo de recuperación, esperamos al evento de arriba.
      if (
        typeof window !== 'undefined' &&
        window.location.hash.includes('type=recovery')
      ) {
        return
      }
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        if (await esMiembroCrm()) {
          router.replace('/crm')
          return
        }
        await supabase.auth.signOut()
      }
      setComprobando(false)
    })()

    return () => sub.subscription.unsubscribe()
  }, [router])

  const irAlCrmSiEsMiembro = async () => {
    if (await esMiembroCrm()) {
      router.replace('/crm')
      return true
    }
    await supabase.auth.signOut()
    setError(NO_AUTORIZADO)
    return false
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setAviso(null)

    const correo = email.trim().toLowerCase()

    if (modo === 'signup' || modo === 'reset') {
      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.')
        return
      }
    }

    setCargando(true)

    try {
      // ── Restablecer contraseña (ya hay sesión de recuperación) ──
      if (modo === 'reset') {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) {
          setError('No se pudo cambiar la contraseña. Solicita un enlace nuevo.')
          return
        }
        await irAlCrmSiEsMiembro()
        return
      }

      // ── Enviar enlace de recuperación ──
      if (modo === 'forgot') {
        await supabase.auth.resetPasswordForEmail(correo, {
          redirectTo: `${window.location.origin}/login`,
        })
        setAviso(
          'Si el correo está autorizado, te enviamos un enlace para ' +
            'restablecer la contraseña. Revisa tu bandeja.'
        )
        return
      }

      // ── Crear cuenta ──
      if (modo === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: correo,
          password,
          options: { emailRedirectTo: `${window.location.origin}/login` },
        })

        if (error) {
          const m = error.message.toLowerCase()
          if (m.includes('already registered') || m.includes('already been registered')) {
            setError('Ya existe una cuenta con este correo. Inicia sesión.')
            setModo('signin')
          } else if (m.includes('autorizado') || m.includes('not authorized')) {
            setError(NO_AUTORIZADO)
          } else {
            setError('No se pudo crear la cuenta. ' + NO_AUTORIZADO)
          }
          return
        }

        // Con el correo en la lista blanca la cuenta queda confirmada al
        // instante y `signUp` ya devuelve sesión.
        if (data.session) {
          await irAlCrmSiEsMiembro()
          return
        }

        // Sin sesión: normalmente el correo ya tenía cuenta (Supabase no lo
        // dice, para no revelar qué correos existen). Que inicie sesión.
        setAviso(
          'Si el correo está autorizado, ya puedes iniciar sesión con tu ' +
            'contraseña. Si no la recuerdas, usa "Olvidé mi contraseña".'
        )
        setModo('signin')
        return
      }

      // ── Iniciar sesión ──
      const { error } = await supabase.auth.signInWithPassword({
        email: correo,
        password,
      })
      if (error) {
        setError('Correo o contraseña incorrectos.')
        return
      }
      await irAlCrmSiEsMiembro()
    } finally {
      setCargando(false)
    }
  }

  const cambiarModo = (m: Modo) => {
    setModo(m)
    setError(null)
    setAviso(null)
    setPassword('')
  }

  if (comprobando) {
    return <p className="text-muted text-sm">Cargando…</p>
  }

  const titulos: Record<Modo, string> = {
    signin: 'Acceso al CRM',
    signup: 'Crear cuenta',
    forgot: 'Recuperar acceso',
    reset: 'Nueva contraseña',
  }

  const botones: Record<Modo, string> = {
    signin: 'Entrar →',
    signup: 'Crear cuenta →',
    forgot: 'Enviar enlace →',
    reset: 'Guardar contraseña →',
  }

  return (
    <div>
      <Eyebrow>Savegre Soft — Interno</Eyebrow>
      <h1 className="display text-fg mt-6 text-[clamp(2rem,5vw,3rem)] leading-[1.1]">
        {titulos[modo]}
      </h1>
      <p className="text-muted mt-4 text-[14px] leading-relaxed">
        Área privada. Solo para correos autorizados del equipo de Savegre Soft.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5" noValidate>
        {modo !== 'reset' && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-muted text-xs tracking-[0.05em] uppercase"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className={inputBase}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {modo !== 'forgot' && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-muted text-xs tracking-[0.05em] uppercase"
            >
              {modo === 'reset' ? 'Nueva contraseña' : 'Contraseña'}
            </label>
            <input
              id="password"
              type="password"
              autoComplete={
                modo === 'signin' ? 'current-password' : 'new-password'
              }
              required
              minLength={modo === 'signin' ? undefined : 8}
              className={inputBase}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {(modo === 'signup' || modo === 'reset') && (
              <p className="text-faint text-[11px]">Mínimo 8 caracteres.</p>
            )}
          </div>
        )}

        {error && (
          <p className="border border-red-900 bg-red-950 px-4 py-2.5 text-[13px] text-red-300">
            {error}
          </p>
        )}
        {aviso && (
          <p className="border border-green-900 bg-green-950 px-4 py-2.5 text-[13px] text-green-300">
            {aviso}
          </p>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="bg-brand-fill hover:bg-brand-dim active:scale-[0.98] mt-2 px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-all disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cargando ? 'Un momento…' : botones[modo]}
        </button>
      </form>

      {/* Cambios de modo */}
      <div className="text-faint mt-6 flex flex-col gap-2 text-[13px]">
        {modo === 'signin' && (
          <>
            <button
              type="button"
              onClick={() => cambiarModo('signup')}
              className="hover:text-fg text-left transition-colors"
            >
              ¿Primera vez? <span className="text-brand">Crear cuenta</span>
            </button>
            <button
              type="button"
              onClick={() => cambiarModo('forgot')}
              className="hover:text-fg text-left transition-colors"
            >
              <span className="text-brand">Olvidé mi contraseña</span>
            </button>
          </>
        )}
        {(modo === 'signup' || modo === 'forgot') && (
          <button
            type="button"
            onClick={() => cambiarModo('signin')}
            className="hover:text-fg text-left transition-colors"
          >
            ← Volver a <span className="text-brand">iniciar sesión</span>
          </button>
        )}
      </div>
    </div>
  )
}
