# Guía de Instalación para Alumnos (Paso a Paso)

Esta guía está pensada para que puedas tener tu CRM funcionando aunque nunca antes hayas tocado una línea de código.

---

## Elegí tu camino:

- **CAMINO A**: Solo querés abrirlo y probar cómo funciona en tu computadora (5 minutos).
- **CAMINO B**: Querés conectarlo a tu propia base de datos para cargar tus prospectos reales.
- **CAMINO C**: Querés dejarlo online en internet (con tu propio link) para usarlo desde cualquier dispositivo.

---

# 🟢 CAMINO A: Solo Probarlo (Modo Demo)

1. **Descargá el template**:
   - Descargá el archivo `.zip` desde la clase de Skool y descomprimilo en tu computadora (ej: en Documentos o Escritorio).
2. **Instalá Node.js**:
   - Entrá a [nodejs.org](https://nodejs.org) y descargá la versión recomendada (LTS).
   - Instálala haciendo click en Siguiente -> Siguiente -> Finalizar.
3. **Abrí la terminal en la carpeta**:
   - En Windows: Abrí la carpeta del CRM, hacé click derecho en un espacio vacío y elegí *"Abrir en Terminal"* (o *"Open in Terminal"*).
   - En Mac: Abrí la app Terminal y escribí `cd ` seguido de arrastrar la carpeta a la ventana.
4. **Instalá el proyecto**:
   Escribí el siguiente comando y apretá Enter:
   ```bash
   npm install
   ```
   *(Va a tardar 1 o 2 minutos mientras descarga los paquetes).*
5. **Iniciá el CRM**:
   Escribí:
   ```bash
   npm run dev
   ```
6. **Abrí tu navegador**:
   Entrá a [http://localhost:3000](http://localhost:3000).  
   ¡Listo! Ya podés ver el panel, crear leads, moverlos en el pipeline, registrar ventas y cambiar de estilos. Todo se guarda en tu navegador.

---

# 🔵 CAMINO B: Conectar tu propia Base de Datos (Supabase)

Cuando quieras usarlo para tu negocio en serio y tener tus datos respaldados en la nube:

1. **Creá tu cuenta en Supabase**:
   - Entrá a [supabase.com](https://supabase.com) y registrate con tu email o GitHub (es 100% gratis).
2. **Creá un nuevo proyecto**:
   - Hacé click en **"New Project"**.
   - Elegí un nombre (ej: *Mi Negocio CRM*) y una contraseña para la base de datos (anotala en un lugar seguro).
   - Seleccioná la región más cercana (ej: *São Paulo* o *US East*).
   - Hacé click en **"Create new project"** y esperá 1 minuto a que termine de crearse.
3. **Creá las tablas con un click**:
   - En el menú izquierdo de Supabase, hacé click en el ícono de **SQL Editor**.
   - Hacé click en **"New query"**.
   - Abrí el archivo `supabase/schema.sql` de este template, copiá todo su texto y pegalo en el editor de Supabase.
   - Hacé click en el botón verde **"Run"**.
   - *(Opcional)*: Si querés cargar datos demo en tu base, hacé lo mismo con `supabase/seed.sql`.
4. **Copiá tus credenciales**:
   - En Supabase, andá al engranaje abajo a la izquierda (**Project Settings**) -> **API**.
   - Vas a ver dos datos:
     - **Project URL** (empieza con `https://...`)
     - **Project API Keys -> anon public** (una clave larga que empieza con `eyJ...`)
5. **Pegá tus claves en el CRM**:
   - En la carpeta de tu CRM, duplicá el archivo `.env.example` y renombralo a `.env.local`.
   - Abrí `.env.local` con cualquier editor de texto o bloc de notas y pegá tus valores:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-larga
     ```
6. **Reiniciá tu CRM**:
   - En tu terminal, apretá `Ctrl + C` para detener el servidor y volvé a escribir `npm run dev`.
   - Ahora el cartel superior dirá **"Supabase Conectado"**. Todos los datos que cargues se guardarán en tu base privada.

---

# 🟣 CAMINO C: Dejarlo Online (Deploy en Vercel)

Para poder entrar a tu CRM desde tu celular o desde cualquier computadora sin tener la terminal abierta:

1. **Subí el proyecto a tu propio GitHub**:
   - Creá una cuenta gratuita en [github.com](https://github.com) y creá un repositorio nuevo (ej: `mi-crm`).
   - Marcá el repositorio como **Private (Privado)** para que nadie vea tu código ni datos.
   - Subí los archivos de tu CRM a tu repositorio.
2. **Creá una cuenta en Vercel**:
   - Entrá a [vercel.com](https://vercel.com) y registrate con tu cuenta de GitHub.
3. **Importá tu repositorio**:
   - Hacé click en **"Add New..."** -> **"Project"**.
   - Seleccioná tu repositorio de GitHub y hacé click en **"Import"**.
4. **Agregá tus variables de entorno**:
   - En la pantalla de configuración antes del deploy, desplegá la sección **"Environment Variables"**.
   - Agregá:
     - `NEXT_PUBLIC_SUPABASE_URL`: (tu URL de Supabase)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (tu clave de Supabase)
5. **Hacé click en "Deploy"**:
   - En 1 minuto Vercel te dará un link público (ej: `https://mi-crm.vercel.app`).
   - ¡Listo! Ya tenés tu CRM 100% online y privado.
