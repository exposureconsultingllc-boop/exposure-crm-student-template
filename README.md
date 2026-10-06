# Exposure CRM — Student Template

> **El sistema operativo comercial oficial de Exposure adaptado para alumnos de Skool.**  
> Diseñado para que puedas trazabilizar tus ventas, medir tus métricas oficiales, llevar el control de clientes y operaciones, y traer tus números a las mentorías.

---

## ⚡ Características Principales

- **100% Independiente y Privado**: Tu base de datos es tuya. Exposure **no** tiene acceso a tus prospectos, números ni clientes.
- **Funciona Sin Configuración Previa (Modo Demo)**: Podés clonar el proyecto y probarlo de inmediato en tu navegador con datos ficticios para aprender a usarlo antes de conectar tu base.
- **Métricas Oficiales de Exposure**: Leads, Agendas, Show Rate, Calificadas, Close Rate, Cash Cobrado, AOV (Ticket Promedio) y Pipeline Abierto calculados automáticamente con las mismas fórmulas que usamos en las clases.
- **2 Modos de Complejidad (Lite vs Pro)**:
  - **CRM Lite**: Enfocado en la venta pura (Leads, Agendas, Pipeline Kanban, Ventas, Seguimientos y Dirección Lite).
  - **CRM Pro**: Para agencias y negocios con equipo (agrega Hub de Marketing con atribución por canal, Hub de Clientes con Onboarding/Salud, Hub de Operaciones y Dirección 360°).
- **5 Estilos Visuales Intercambiables**:
  1. **Minimal**: Limpio, tipográfico, estilo Notion / Linear moderno.
  2. **Cards Dashboard**: Tarjetas visuales modulares de fácil lectura.
  3. **Sidebar CRM**: SaaS clásico con navegación lateral para productividad.
  4. **Cockpit (Command Center)**: Look oscuro futurista inspirado en Exposure OS con metas en progreso y HUD de comando.
  5. **Kanban + Metrics**: Foco total en el pipeline comercial con dock de métricas en vivo.

---

## 🚀 Inicio Rápido (En 3 Minutos)

### Requisitos Mínimos
- Tener instalado [Node.js](https://nodejs.org) (versión 18 o superior).

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el CRM
```bash
npm run dev
```
Abrí [http://localhost:3000](http://localhost:3000) en tu navegador. ¡Listo! Ya estás en el **Modo Demo**.

---

## 🗄️ Conectar tu propia Base de Datos (Supabase Gratuito)

Cuando quieras cargar tus datos reales:
1. Creá una cuenta gratuita en [supabase.com](https://supabase.com) y creá un nuevo proyecto.
2. En Supabase, entrá a **SQL Editor** -> **New query**, copiá el código de `supabase/schema.sql` y hacé click en **Run**.
3. (Opcional) Si querés cargar datos de ejemplo en tu base, corré también `supabase/seed.sql`.
4. Creá tu archivo local de variables:
   ```bash
   cp .env.example .env.local
   ```
5. Pegá tu URL y Anon Key de Supabase en `.env.local`.
6. Reiniciá el servidor (`npm run dev`). El indicador superior cambiará a **"Supabase Conectado"**.

---

## 📖 Documentación para Alumnos

- [Guía Paso a Paso para No Técnicos (SETUP-STUDENT.md)](./SETUP-STUDENT.md)
- [Guión y Material de la Clase de Skool (SKOOL-GUIDE.md)](./SKOOL-GUIDE.md)
- [Checklist de Puesta en Marcha (STUDENT-CHECKLIST.md)](./STUDENT-CHECKLIST.md)

---

## 🔒 Privacidad y Seguridad
Este template no incluye ninguna API key, token o dato real de Exposure. Todo el almacenamiento ocurre localmente en tu máquina o en tu propia cuenta de Supabase.
