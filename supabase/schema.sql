-- ==============================================================
-- EXPOSURE CRM STUDENT TEMPLATE - SCHEMA DEFINITIVO
-- Ejecutar en Supabase: SQL Editor -> New Query -> Run
-- ==============================================================

create extension if not exists "pgcrypto";

-- 1. LEADS & CONTACTOS
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text,
  telefono text,
  instagram text,
  fuente text default 'organico', -- organico, ads, outbound, youtube, referidos, otro
  campana text,
  estado text not null default 'nuevo', -- nuevo, en_conversacion, agendado, no_califica, perdido
  ingreso_mensual text,
  inversion_disponible text,
  problema_actual text,
  urgencia text,
  score text default 'tibio', -- frio, tibio, caliente
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. AGENDAS / LLAMADAS
create table if not exists public.agendas (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  nombre text not null,
  email text,
  telefono text,
  instagram text,
  fecha_agenda date not null default current_date,
  hora_agenda text,
  setter text,
  closer text,
  fuente text default 'organico',
  show boolean not null default false,
  califica boolean not null default false,
  cerro boolean not null default false,
  estado text not null default 'agendada', -- agendada, cancelada, no_show, realizada_sin_cierre, venta_cerrada
  motivo_no_cierre text,
  ingreso_mensual text,
  inversion_disponible text,
  problema_actual text,
  urgencia text,
  notas_llamada text,
  grabacion_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. VENTAS Y CAJA
create table if not exists public.ventas (
  id uuid primary key default gen_random_uuid(),
  agenda_id uuid references public.agendas(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  cliente_nombre text not null,
  fecha date not null default current_date,
  ticket_total numeric not null default 0,
  cash_collected numeric not null default 0,
  medio_de_pago text default 'stripe', -- stripe, transferencia, crypto, paypal, efectivo, otro
  closer text,
  setter text,
  fuente text default 'organico',
  plan_cuotas text default 'pago_unico', -- pago_unico, 2_cuotas, 3_cuotas, recurrente
  saldo_pendiente numeric not null default 0,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. SEGUIMIENTOS (FOLLOW-UP QUEUE)
create table if not exists public.seguimientos (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  agenda_id uuid references public.agendas(id) on delete set null,
  nombre_contacto text not null,
  telefono text,
  fecha_proximo_contacto date not null default (current_date + interval '2 days'),
  responsable text,
  estado text not null default 'pendiente', -- pendiente, realizado, cancelado
  motivo text,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. PRODUCTO / CLIENTES (HUB CLIENTES)
create table if not exists public.clientes (
  id uuid primary key default gen_random_uuid(),
  venta_id uuid references public.ventas(id) on delete set null,
  nombre text not null,
  email text,
  telefono text,
  producto text not null default 'Programa High Ticket',
  fecha_ingreso date not null default current_date,
  estado text not null default 'onboarding', -- onboarding, activo, pausa, finalizado, cancelado
  progreso_pct integer default 10,
  salud text default 'verde', -- verde, amarillo, rojo
  proxima_accion text,
  entregables_pendientes text,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. OPERACIONES Y TAREAS (HUB OPERACIONES)
create table if not exists public.operaciones_tareas (
  id uuid primary key default gen_random_uuid(),
  tarea text not null,
  area text default 'ventas', -- ventas, marketing, producto, administracion
  responsable text,
  prioridad text default 'media', -- alta, media, baja
  estado text default 'pendiente', -- pendiente, en_progreso, completado
  fecha_limite date,
  notas text,
  created_at timestamptz not null default now()
);

-- INDICES DE RENDIMIENTO
create index if not exists idx_leads_fecha on public.leads (created_at);
create index if not exists idx_agendas_fecha on public.agendas (fecha_agenda);
create index if not exists idx_ventas_fecha on public.ventas (fecha);
create index if not exists idx_seguimientos_fecha on public.seguimientos (fecha_proximo_contacto);
create index if not exists idx_clientes_estado on public.clientes (estado);
create index if not exists idx_tareas_estado on public.operaciones_tareas (estado);
