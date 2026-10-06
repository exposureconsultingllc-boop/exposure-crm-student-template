"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, Trello, Users, Calendar, DollarSign, Clock, 
  Plus, RotateCcw, Megaphone, UserCheck, CheckSquare, Sparkles
} from 'lucide-react'
import { useCRM } from '@/context/crm-context'
import { NewLeadModal } from '@/components/modals/new-lead-modal'
import { NewAgendaModal } from '@/components/modals/new-agenda-modal'
import { NewVentaModal } from '@/components/modals/new-venta-modal'
import { NewSeguimientoModal } from '@/components/modals/new-seguimiento-modal'
import { NewClienteModal } from '@/components/modals/new-cliente-modal'
import { NewTareaModal } from '@/components/modals/new-tarea-modal'

export function CRMHeader() {
  const pathname = usePathname()
  const { mode, setMode, resetToDemo, leads, agendas, ventas, seguimientos, clientes, tareas } = useCRM()

  const [modalLead, setModalLead] = useState(false)
  const [modalAgenda, setModalAgenda] = useState(false)
  const [modalVenta, setModalVenta] = useState(false)
  const [modalSeguimiento, setModalSeguimiento] = useState(false)
  const [modalCliente, setModalCliente] = useState(false)
  const [modalTarea, setModalTarea] = useState(false)

  const liteNav = [
    { href: '/', label: 'Dirección Lite', icon: BarChart3 },
    { href: '/pipeline', label: 'Pipeline', icon: Trello },
    { href: '/leads', label: `Leads (${leads.length})`, icon: Users },
    { href: '/agendas', label: `Agendas (${agendas.length})`, icon: Calendar },
    { href: '/ventas', label: `Ventas (${ventas.length})`, icon: DollarSign },
    { href: '/seguimientos', label: `Seguimientos (${seguimientos.filter(s => s.estado === 'pendiente').length})`, icon: Clock },
  ]

  const proNav = [
    { href: '/', label: 'Dirección Pro', icon: BarChart3 },
    { href: '/pipeline', label: 'Pipeline', icon: Trello },
    { href: '/leads', label: `Leads (${leads.length})`, icon: Users },
    { href: '/agendas', label: `Agendas (${agendas.length})`, icon: Calendar },
    { href: '/ventas', label: `Ventas (${ventas.length})`, icon: DollarSign },
    { href: '/seguimientos', label: `Seguimientos (${seguimientos.filter(s => s.estado === 'pendiente').length})`, icon: Clock },
    { href: '/marketing', label: 'Marketing & Fuentes', icon: Megaphone },
    { href: '/clientes', label: `Clientes (${clientes.length})`, icon: UserCheck },
    { href: '/operaciones', label: `Operaciones (${tareas.filter(t => t.estado !== 'completado').length})`, icon: CheckSquare },
  ]

  const navItems = mode === 'pro' ? proNav : liteNav

  return (
    <>
      <header className="border-b border-slate-800 bg-[#0d131f]/90 backdrop-blur sticky top-0 z-30 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 group-hover:border-emerald-400 transition">
                EX
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white tracking-tight leading-none">Exposure CRM</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase transition ${
                    mode === 'pro' 
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {mode}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Control comercial de tu negocio</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* SWITCH LITE / PRO */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setMode('lite')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  mode === 'lite' 
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lite
              </button>
              <button
                onClick={() => setMode('pro')}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                  mode === 'pro' 
                    ? 'bg-purple-600 text-white font-bold shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>Pro</span>
              </button>
            </div>

            {/* BOTONES RÁPIDOS */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setModalLead(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
              >
                <Plus className="h-3 w-3" />
                <span>Lead</span>
              </button>
              <button 
                onClick={() => setModalAgenda(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-semibold transition"
              >
                <Plus className="h-3 w-3" />
                <span>Agenda</span>
              </button>
              <button 
                onClick={() => setModalVenta(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition"
              >
                <Plus className="h-3 w-3" />
                <span>Venta</span>
              </button>

              {mode === 'pro' && (
                <>
                  <button 
                    onClick={() => setModalCliente(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Cliente</span>
                  </button>
                  <button 
                    onClick={() => setModalTarea(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Tarea</span>
                  </button>
                </>
              )}

              <button 
                onClick={() => {
                  if (confirm('¿Restablecer los datos de ejemplo del template?')) resetToDemo()
                }}
                title="Restablecer datos demo"
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center gap-1 mt-3 pt-2 border-t border-slate-800/60 overflow-x-auto">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isActive 
                    ? "bg-slate-800 text-white font-semibold shadow-sm" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </header>

      <NewLeadModal isOpen={modalLead} onClose={() => setModalLead(false)} />
      <NewAgendaModal isOpen={modalAgenda} onClose={() => setModalAgenda(false)} />
      <NewVentaModal isOpen={modalVenta} onClose={() => setModalVenta(false)} />
      <NewSeguimientoModal isOpen={modalSeguimiento} onClose={() => setModalSeguimiento(false)} />
      <NewClienteModal isOpen={modalCliente} onClose={() => setModalCliente(false)} />
      <NewTareaModal isOpen={modalTarea} onClose={() => setModalTarea(false)} />
    </>
  )
}
