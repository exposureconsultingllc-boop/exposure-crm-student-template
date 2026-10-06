"use client"

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { 
  Lead, Agenda, Venta, Seguimiento, Cliente, OperacionTarea,
  MetricasLite, MetricasPro, MetricasFuente, CrmMode, FuenteLead, LayoutStyle 
} from '@/types/crm'
import { 
  DEMO_LEADS as INITIAL_LEADS, 
  DEMO_AGENDAS as INITIAL_AGENDAS, 
  DEMO_VENTAS as INITIAL_VENTAS, 
  DEMO_SEGUIMIENTOS as INITIAL_SEGUIMIENTOS,
  DEMO_CLIENTES as INITIAL_CLIENTES 
} from '@/lib/demo-data'

const INITIAL_TAREAS: OperacionTarea[] = [
  { id: '1', tarea: 'Revisar guion del setter para mejorar tasa de agenda', area: 'ventas', responsable: 'Joaquín', prioridad: 'alta', estado: 'pendiente', fecha_limite: '2026-10-08', created_at: new Date().toISOString() },
  { id: '2', tarea: 'Crear 3 ganchos nuevos para Meta Ads', area: 'marketing', responsable: 'Mateo', prioridad: 'media', estado: 'en_progreso', fecha_limite: '2026-10-10', created_at: new Date().toISOString() },
  { id: '3', tarea: 'Onboarding llamada 1 a 1 de Ignacio Rossi', area: 'producto', responsable: 'Facundo', prioridad: 'alta', estado: 'pendiente', fecha_limite: '2026-10-07', created_at: new Date().toISOString() },
  { id: '4', tarea: 'Conciliar cobros de Stripe y transferencias de la semana', area: 'administracion', responsable: 'Tomás', prioridad: 'baja', estado: 'completado', fecha_limite: '2026-10-05', created_at: new Date().toISOString() }
]

interface CRMContextType {
  layoutStyle: LayoutStyle
  setLayoutStyle: (s: LayoutStyle) => void
  mode: CrmMode
  setMode: (m: CrmMode) => void
  leads: Lead[]
  agendas: Agenda[]
  ventas: Venta[]
  seguimientos: Seguimiento[]
  clientes: Cliente[]
  tareas: OperacionTarea[]
  inversionAds: number
  setInversionAds: (m: number) => void
  metricas: MetricasLite
  metricasLite: MetricasLite
  metricasPro: MetricasPro
  addLead: (lead: Omit<Lead, 'id' | 'created_at'>) => Lead
  updateLead: (id: string, data: Partial<Lead>) => void
  deleteLead: (id: string) => void
  addAgenda: (agenda: Omit<Agenda, 'id' | 'created_at'>) => Agenda
  updateAgenda: (id: string, data: Partial<Agenda>) => void
  toggleShow: (agendaId: string) => void
  toggleCalifica: (agendaId: string) => void
  addVenta: (venta: Omit<Venta, 'id' | 'created_at'>) => Venta
  addSeguimiento: (seg: Omit<Seguimiento, 'id' | 'created_at'>) => Seguimiento
  updateSeguimiento: (id: string, data: Partial<Seguimiento>) => void
  toggleSeguimientoCompletado: (id: string) => void
  addCliente: (c: Omit<Cliente, 'id' | 'created_at'>) => Cliente
  updateCliente: (id: string, data: Partial<Cliente>) => void
  deleteCliente: (id: string) => void
  addTarea: (t: Omit<OperacionTarea, 'id' | 'created_at'>) => OperacionTarea
  updateTarea: (id: string, data: Partial<OperacionTarea>) => void
  toggleTareaCompletada: (id: string) => void
  deleteTarea: (id: string) => void
  resetToDemo: () => void
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

const STORAGE_KEY = 'exposure_crm_data_v2'
const MODE_STORAGE_KEY = 'exposure_crm_mode'

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<CrmMode>('lite')
  const [layoutStyle, setLayoutStyleState] = useState<LayoutStyle>('cockpit')
  const [leads, setLeads] = useState<Lead[]>([])
  const [agendas, setAgendas] = useState<Agenda[]>([])
  const [ventas, setVentas] = useState<Venta[]>([])
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [tareas, setTareas] = useState<OperacionTarea[]>([])
  const [inversionAds, setInversionAds] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const storedLayout = localStorage.getItem('exposure_crm_layout_style') as LayoutStyle
      if (storedLayout) setLayoutStyleState(storedLayout)

      const storedMode = localStorage.getItem(MODE_STORAGE_KEY) as CrmMode
      if (storedMode === 'lite' || storedMode === 'pro') {
        setModeState(storedMode)
      }

      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setLeads(parsed.leads || [])
        setAgendas(parsed.agendas || [])
        setVentas(parsed.ventas || [])
        setSeguimientos(parsed.seguimientos || [])
        setClientes(parsed.clientes || [])
        setTareas(parsed.tareas || [])
        setInversionAds(parsed.inversionAds || 0)
      } else {
        const now = new Date().toISOString()
        setLeads(INITIAL_LEADS.map(l => ({ ...l, created_at: now } as Lead)))
        setAgendas(INITIAL_AGENDAS.map(a => ({ ...a, created_at: now } as Agenda)))
        setVentas(INITIAL_VENTAS.map(v => ({ ...v, created_at: now } as Venta)))
        setSeguimientos(INITIAL_SEGUIMIENTOS.map(s => ({ ...s, created_at: now } as Seguimiento)))
        setClientes(INITIAL_CLIENTES.map(c => ({ ...c, created_at: now } as Cliente)))
        setTareas(INITIAL_TAREAS)
      }
    } catch {
      // Fallback
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        leads,
        agendas,
        ventas,
        seguimientos,
        clientes,
        tareas,
        inversionAds
      }))
    } catch {
      // Fallback
    }
  }, [leads, agendas, ventas, seguimientos, clientes, tareas, inversionAds, isLoaded])

    const setLayoutStyle = (s: LayoutStyle) => {
    setLayoutStyleState(s)
    try { localStorage.setItem('exposure_crm_layout_style', s) } catch {}
  }

const setMode = (m: CrmMode) => {
    setModeState(m)
    try {
      localStorage.setItem(MODE_STORAGE_KEY, m)
    } catch {}
  }

  // Métricas Lite
  const metricasLite = useMemo<MetricasLite>(() => {
    const totalLeads = leads.length
    const totalAgendas = agendas.length
    const tasaAgenda = totalLeads > 0 ? Math.round((totalAgendas / totalLeads) * 100) : 0

    const totalShows = agendas.filter(a => a.show).length
    const showRate = totalAgendas > 0 ? Math.round((totalShows / totalAgendas) * 100) : 0

    const totalCalificadas = agendas.filter(a => a.califica).length
    const tasaCalificacion = totalShows > 0 ? Math.round((totalCalificadas / totalShows) * 100) : 0

    const totalVentas = ventas.length
    const closeRate = totalCalificadas > 0 ? Math.round((totalVentas / totalCalificadas) * 100) : 0

    const cashCollected = ventas.reduce((acc, v) => acc + (Number(v.cash_collected) || 0), 0)
    const ticketPromedio = totalVentas > 0 ? Math.round(cashCollected / totalVentas) : 0

    const saldosPendientes = ventas.reduce((acc, v) => acc + (Number(v.saldo_pendiente) || 0), 0)
    const calificadasAbiertas = agendas.filter(a => a.califica && !a.cerro).length
    const pipelineAbierto = saldosPendientes + (calificadasAbiertas * 1500)

    return {
      totalLeads,
      totalAgendas,
      tasaAgenda,
      totalShows,
      showRate,
      totalCalificadas,
      tasaCalificacion,
      totalVentas,
      closeRate,
      cashCollected,
      ticketPromedio,
      pipelineAbierto
    }
  }, [leads, agendas, ventas])

  // Métricas Pro
  const metricasPro = useMemo<MetricasPro>(() => {
    const saldosPendientes = ventas.reduce((acc, v) => acc + (Number(v.saldo_pendiente) || 0), 0)

    const FUENTES_LISTA: FuenteLead[] = ['organico', 'ads', 'outbound', 'youtube', 'referidos', 'otro']
    const fuentes: MetricasFuente[] = FUENTES_LISTA.map(fuente => {
      const fLeads = leads.filter(l => l.fuente === fuente).length
      const fAgendas = agendas.filter(a => a.fuente === fuente).length
      const fVentas = ventas.filter(v => v.fuente === fuente).length
      const fCash = ventas.filter(v => v.fuente === fuente).reduce((acc, v) => acc + (Number(v.cash_collected) || 0), 0)
      const tasaAgenda = fLeads > 0 ? Math.round((fAgendas / fLeads) * 100) : 0
      const tasaCierre = fAgendas > 0 ? Math.round((fVentas / fAgendas) * 100) : 0

      return {
        fuente,
        leads: fLeads,
        agendas: fAgendas,
        ventas: fVentas,
        cash: fCash,
        tasaAgenda,
        tasaCierre
      }
    })

    const clientesActivos = clientes.filter(c => c.estado === 'activo').length
    const clientesOnboarding = clientes.filter(c => c.estado === 'onboarding').length
    const clientesRiesgo = clientes.filter(c => c.salud === 'rojo' || c.salud === 'amarillo').length
    const clientesFinalizados = clientes.filter(c => c.estado === 'finalizado').length
    const progresoPromedioClientes = clientes.length > 0 
      ? Math.round(clientes.reduce((acc, c) => acc + c.progreso_pct, 0) / clientes.length) 
      : 0

    const tareasPendientes = tareas.filter(t => t.estado !== 'completado').length
    const tareasAltaPrioridad = tareas.filter(t => t.prioridad === 'alta' && t.estado !== 'completado').length
    const hoy = new Date().toISOString().split('T')[0]
    const tareasVencidas = tareas.filter(t => t.estado !== 'completado' && t.fecha_limite && t.fecha_limite < hoy).length

    return {
      ...metricasLite,
      saldosPendientes,
      fuentes,
      clientesActivos,
      clientesOnboarding,
      clientesRiesgo,
      clientesFinalizados,
      progresoPromedioClientes,
      tareasPendientes,
      tareasAltaPrioridad,
      tareasVencidas
    }
  }, [metricasLite, leads, agendas, ventas, clientes, tareas])

  const addLead = (data: Omit<Lead, 'id' | 'created_at'>): Lead => {
    const newLead: Lead = {
      ...data,
      id: 'lead_' + Date.now(),
      created_at: new Date().toISOString()
    }
    setLeads(prev => [newLead, ...prev])
    return newLead
  }

  const updateLead = (id: string, data: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...data } : l))
  }

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id))
  }

  const addAgenda = (data: Omit<Agenda, 'id' | 'created_at'>): Agenda => {
    const newAgenda: Agenda = {
      ...data,
      id: 'agenda_' + Date.now(),
      created_at: new Date().toISOString()
    }
    setAgendas(prev => [newAgenda, ...prev])

    if (data.lead_id) {
      updateLead(data.lead_id, { estado: 'agendado' })
    }
    return newAgenda
  }

  const updateAgenda = (id: string, data: Partial<Agenda>) => {
    setAgendas(prev => prev.map(a => a.id === id ? { ...a, ...data } : a))
  }

  const toggleShow = (agendaId: string) => {
    setAgendas(prev => prev.map(a => {
      if (a.id !== agendaId) return a
      const nextShow = !a.show
      return {
        ...a,
        show: nextShow,
        estado: nextShow ? (a.califica ? 'calificada' : 'asistio') : 'no_show'
      }
    }))
  }

  const toggleCalifica = (agendaId: string) => {
    setAgendas(prev => prev.map(a => {
      if (a.id !== agendaId) return a
      const nextCalifica = !a.califica
      return {
        ...a,
        califica: nextCalifica,
        show: nextCalifica ? true : a.show,
        estado: nextCalifica ? 'calificada' : (a.show ? 'asistio' : a.estado)
      }
    }))
  }

  const addVenta = (data: Omit<Venta, 'id' | 'created_at'>): Venta => {
    const newVenta: Venta = {
      ...data,
      id: 'venta_' + Date.now(),
      created_at: new Date().toISOString()
    }
    setVentas(prev => [newVenta, ...prev])

    if (data.agenda_id) {
      updateAgenda(data.agenda_id, {
        cerro: true,
        show: true,
        califica: true,
        estado: 'venta_cerrada'
      })
    }

    const clienteExistente = clientes.find(c => c.nombre.toLowerCase() === data.cliente_nombre.toLowerCase())
    if (!clienteExistente) {
      const nuevoCliente: Cliente = {
        id: 'cli_' + Date.now(),
        venta_id: newVenta.id,
        nombre: data.cliente_nombre,
        producto: 'Programa High Ticket',
        fecha_ingreso: data.fecha,
        estado: 'onboarding',
        progreso_pct: 10,
        salud: 'verde',
        proxima_accion: 'Llamada de bienvenida / Onboarding',
        created_at: new Date().toISOString()
      }
      setClientes(prev => [nuevoCliente, ...prev])
    }

    return newVenta
  }

  const addSeguimiento = (data: Omit<Seguimiento, 'id' | 'created_at'>): Seguimiento => {
    const newSeg: Seguimiento = {
      ...data,
      id: 'seg_' + Date.now(),
      created_at: new Date().toISOString()
    }
    setSeguimientos(prev => [newSeg, ...prev])
    return newSeg
  }

  const updateSeguimiento = (id: string, data: Partial<Seguimiento>) => {
    setSeguimientos(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  }

  const toggleSeguimientoCompletado = (id: string) => {
    setSeguimientos(prev => prev.map(s => {
      if (s.id !== id) return s
      const nextEstado = s.estado === 'pendiente' ? 'realizado' : 'pendiente'
      return { ...s, estado: nextEstado }
    }))
  }

  const addCliente = (data: Omit<Cliente, 'id' | 'created_at'>): Cliente => {
    const newCli: Cliente = {
      ...data,
      id: 'cli_' + Date.now(),
      created_at: new Date().toISOString()
    }
    setClientes(prev => [newCli, ...prev])
    return newCli
  }

  const updateCliente = (id: string, data: Partial<Cliente>) => {
    setClientes(prev => prev.map(c => c.id === id ? { ...c, ...data } : c))
  }

  const deleteCliente = (id: string) => {
    setClientes(prev => prev.filter(c => c.id !== id))
  }

  const addTarea = (data: Omit<OperacionTarea, 'id' | 'created_at'>): OperacionTarea => {
    const newT: OperacionTarea = {
      ...data,
      id: 'tarea_' + Date.now(),
      created_at: new Date().toISOString()
    }
    setTareas(prev => [newT, ...prev])
    return newT
  }

  const updateTarea = (id: string, data: Partial<OperacionTarea>) => {
    setTareas(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
  }

  const toggleTareaCompletada = (id: string) => {
    setTareas(prev => prev.map(t => {
      if (t.id !== id) return t
      const nextEstado = t.estado === 'completado' ? 'pendiente' : 'completado'
      return { ...t, estado: nextEstado }
    }))
  }

  const deleteTarea = (id: string) => {
    setTareas(prev => prev.filter(t => t.id !== id))
  }

  const resetToDemo = () => {
    const now = new Date().toISOString()
    setLeads(INITIAL_LEADS.map(l => ({ ...l, created_at: now } as Lead)))
    setAgendas(INITIAL_AGENDAS.map(a => ({ ...a, created_at: now } as Agenda)))
    setVentas(INITIAL_VENTAS.map(v => ({ ...v, created_at: now } as Venta)))
    setSeguimientos(INITIAL_SEGUIMIENTOS.map(s => ({ ...s, created_at: now } as Seguimiento)))
    setClientes(INITIAL_CLIENTES.map(c => ({ ...c, created_at: now } as Cliente)))
    setTareas(INITIAL_TAREAS)
    setInversionAds(0)
  }

  return (
    <CRMContext.Provider value={{
      layoutStyle,
      setLayoutStyle,
      mode,
      setMode,
      leads,
      agendas,
      ventas,
      seguimientos,
      clientes,
      tareas,
      inversionAds,
      setInversionAds,
      metricas: metricasLite,
      metricasLite,
      metricasPro,
      addLead,
      updateLead,
      deleteLead,
      addAgenda,
      updateAgenda,
      toggleShow,
      toggleCalifica,
      addVenta,
      addSeguimiento,
      updateSeguimiento,
      toggleSeguimientoCompletado,
      addCliente,
      updateCliente,
      deleteCliente,
      addTarea,
      updateTarea,
      toggleTareaCompletada,
      deleteTarea,
      resetToDemo
    }}>
      {children}
    </CRMContext.Provider>
  )
}

export function useCRM() {
  const context = useContext(CRMContext)
  if (!context) {
    throw new Error('useCRM debe usarse dentro de un CRMProvider')
  }
  return context
}
