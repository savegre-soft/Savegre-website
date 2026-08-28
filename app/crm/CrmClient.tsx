'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eyebrow } from '../components/Shared/ui'
import {
  supabase,
  esMiembroCrm,
  type Contact,
  type ContactStatus,
} from '../lib/supabase'

/* ─────────────────────────────────────────────────────────────
   Etiquetas y orden de los estados de una consulta.
   ───────────────────────────────────────────────────────────── */

const ESTADOS: { value: ContactStatus; label: string; color: string }[] = [
  { value: 'new', label: 'Nueva', color: 'text-brand border-brand/40 bg-brand/10' },
  {
    value: 'in_progress',
    label: 'En curso',
    color: 'text-amber-300 border-amber-800 bg-amber-950',
  },
  {
    value: 'done',
    label: 'Cerrada',
    color: 'text-green-300 border-green-900 bg-green-950',
  },
  {
    value: 'archived',
    label: 'Archivada',
    color: 'text-faint border-line bg-raised',
  },
]

const etiqueta = (s: ContactStatus) =>
  ESTADOS.find((e) => e.value === s)?.label ?? s

type Filtro = ContactStatus | 'all'

const FILTROS: { value: Filtro; label: string }[] = [
  { value: 'all', label: 'Todas' },
  ...ESTADOS.map((e) => ({ value: e.value as Filtro, label: e.label })),
]

const fecha = (iso: string) =>
  new Date(iso).toLocaleString('es-CR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

/* ───────────────────────────────────────────────────────────── */

export default function CrmClient() {
  const router = useRouter()
  const [sesionLista, setSesionLista] = useState(false)
  const [email, setEmail] = useState<string | null>(null)

  const [contactos, setContactos] = useState<Contact[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<Filtro>('all')
  const [abierto, setAbierto] = useState<string | null>(null)

  // ─── Carga de consultas ───
  const cargar = useCallback(async () => {
    setCargando(true)
    setError(null)
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(
        'No se pudieron cargar las consultas. ' +
          'Verifica que tu correo esté autorizado.'
      )
      setContactos([])
    } else {
      setContactos(data as Contact[])
    }
    setCargando(false)
  }, [])

  // ─── Puerta de acceso + primera carga ───
  useEffect(() => {
    let vivo = true

    ;(async () => {
      const { data } = await supabase.auth.getSession()
      if (!vivo) return
      if (!data.session) {
        router.replace('/login')
        return
      }
      // El correo debe estar en la lista blanca (website.crm_members). Si no,
      // se cierra la sesión y no se muestra nada del CRM.
      if (!(await esMiembroCrm())) {
        if (!vivo) return
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }
      if (!vivo) return
      setEmail(data.session.user.email ?? null)
      setSesionLista(true)
      cargar()
    })()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/login')
    })
    return () => {
      vivo = false
      sub.subscription.unsubscribe()
    }
  }, [router, cargar])

  // ─── Mutaciones ───
  const cambiarEstado = async (id: string, status: ContactStatus) => {
    setContactos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    )
    const { error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id)
    if (error) cargar()
  }

  const guardarNota = async (id: string, notes: string) => {
    const valor = notes.trim() || null
    setContactos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, notes: valor } : c))
    )
    const { error } = await supabase
      .from('contacts')
      .update({ notes: valor })
      .eq('id', id)
    if (error) cargar()
  }

  const borrar = async (id: string) => {
    if (!confirm('¿Eliminar esta consulta? No se puede deshacer.')) return
    setContactos((prev) => prev.filter((c) => c.id !== id))
    const { error } = await supabase.from('contacts').delete().eq('id', id)
    if (error) cargar()
  }

  const salir = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  // ─── Derivados ───
  const visibles = useMemo(
    () =>
      filtro === 'all'
        ? contactos
        : contactos.filter((c) => c.status === filtro),
    [contactos, filtro]
  )

  const conteo = useMemo(() => {
    const m: Record<string, number> = {}
    for (const c of contactos) m[c.status] = (m[c.status] ?? 0) + 1
    return m
  }, [contactos])

  if (!sesionLista) {
    return <p className="text-muted text-sm">Verificando acceso…</p>
  }

  return (
    <div>
      {/* Cabecera */}
      <div className="border-line flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div>
          <Eyebrow>Savegre Soft — Interno</Eyebrow>
          <h1 className="display text-fg mt-4 text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.1]">
            Consultas de contacto
          </h1>
        </div>
        <div className="flex items-center gap-4 text-right">
          {email && <span className="text-faint text-xs">{email}</span>}
          <button
            onClick={salir}
            className="border-line-strong text-muted hover:border-faint hover:text-fg border px-4 py-2 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTROS.map((f) => {
          const n = f.value === 'all' ? contactos.length : conteo[f.value] ?? 0
          const activo = filtro === f.value
          return (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={`border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activo
                  ? 'border-brand bg-brand/10 text-brand'
                  : 'border-line text-muted hover:border-line-strong hover:text-fg'
              }`}
            >
              {f.label}
              <span className="text-faint ml-1.5">{n}</span>
            </button>
          )
        })}
        <button
          onClick={cargar}
          className="border-line text-muted hover:border-line-strong hover:text-fg ml-auto border px-3.5 py-1.5 text-xs font-medium transition-colors"
        >
          Actualizar
        </button>
      </div>

      {/* Lista */}
      <div className="mt-8">
        {error && (
          <p className="border border-red-900 bg-red-950 px-4 py-3 text-[13px] text-red-300">
            {error}
          </p>
        )}

        {cargando ? (
          <p className="text-muted py-12 text-sm">Cargando consultas…</p>
        ) : visibles.length === 0 ? (
          <p className="text-muted py-12 text-sm">
            {contactos.length === 0
              ? 'Todavía no hay consultas.'
              : 'No hay consultas con este filtro.'}
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {visibles.map((c) => (
              <Fila
                key={c.id}
                contacto={c}
                abierto={abierto === c.id}
                onToggle={() =>
                  setAbierto((prev) => (prev === c.id ? null : c.id))
                }
                onEstado={(s) => cambiarEstado(c.id, s)}
                onNota={(n) => guardarNota(c.id, n)}
                onBorrar={() => borrar(c.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────── */

function Fila({
  contacto: c,
  abierto,
  onToggle,
  onEstado,
  onNota,
  onBorrar,
}: {
  contacto: Contact
  abierto: boolean
  onToggle: () => void
  onEstado: (s: ContactStatus) => void
  onNota: (n: string) => void
  onBorrar: () => void
}) {
  const [nota, setNota] = useState(c.notes ?? '')
  // Si el valor guardado cambia (recarga, guardado en otra pestaña), se
  // resincroniza el textarea — ajuste de estado en render, el patrón que
  // recomienda React para "derivar de props anteriores".
  const [notaGuardada, setNotaGuardada] = useState(c.notes ?? '')
  if (notaGuardada !== (c.notes ?? '')) {
    setNotaGuardada(c.notes ?? '')
    setNota(c.notes ?? '')
  }

  const badge = ESTADOS.find((e) => e.value === c.status)?.color ?? ''
  const notaSucia = (c.notes ?? '') !== nota

  return (
    <li className="bg-surface border-line border">
      {/* Fila resumen */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
        aria-expanded={abierto}
      >
        <span
          className={`shrink-0 border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${badge}`}
        >
          {etiqueta(c.status)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-fg block truncate text-sm font-medium">
            {c.subject}
          </span>
          <span className="text-faint block truncate text-xs">
            {c.full_name} · {c.email}
          </span>
        </span>
        <span className="text-faint hidden shrink-0 text-xs sm:block">
          {fecha(c.created_at)}
        </span>
        <span className="text-faint shrink-0 text-xs">{abierto ? '−' : '+'}</span>
      </button>

      {/* Detalle */}
      {abierto && (
        <div className="border-line border-t px-5 py-5">
          <p className="text-muted text-[10px] tracking-[0.05em] uppercase">
            Mensaje
          </p>
          <p className="text-fg mt-2 text-sm leading-relaxed whitespace-pre-wrap">
            {c.detail}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs">
            <a
              href={`mailto:${c.email}?subject=${encodeURIComponent(
                'Re: ' + c.subject
              )}`}
              className="text-brand hover:text-fg transition-colors"
            >
              Responder por correo →
            </a>
            <span className="text-faint sm:hidden">{fecha(c.created_at)}</span>
          </div>

          {/* Nota interna */}
          <div className="mt-5">
            <label
              htmlFor={`nota-${c.id}`}
              className="text-muted text-[10px] tracking-[0.05em] uppercase"
            >
              Nota interna
            </label>
            <textarea
              id={`nota-${c.id}`}
              rows={2}
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Contexto, seguimiento, presupuesto enviado…"
              className="border-line bg-ink text-fg placeholder:text-faint focus:border-brand mt-2 w-full resize-y border px-3 py-2 text-sm focus-visible:outline-none"
            />
            {notaSucia && (
              <button
                onClick={() => onNota(nota)}
                className="bg-brand-fill hover:bg-brand-dim mt-2 px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-white uppercase transition-colors"
              >
                Guardar nota
              </button>
            )}
          </div>

          {/* Acciones */}
          <div className="border-line mt-5 flex flex-wrap items-center gap-3 border-t pt-4">
            <label
              htmlFor={`estado-${c.id}`}
              className="text-muted text-[10px] tracking-[0.05em] uppercase"
            >
              Estado
            </label>
            <select
              id={`estado-${c.id}`}
              value={c.status}
              onChange={(e) => onEstado(e.target.value as ContactStatus)}
              className="border-line bg-ink text-fg focus:border-brand border px-3 py-1.5 text-xs focus-visible:outline-none"
            >
              {ESTADOS.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>

            <button
              onClick={onBorrar}
              className="ml-auto text-xs text-red-400 transition-colors hover:text-red-300"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </li>
  )
}
