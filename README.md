# GLAMOURSKIN - Tienda de Cosméticos Premium

Este proyecto es una web e-commerce funcional construida con Next.js 14 (App Router), enfocada en una experiencia de usuario premium para la venta de productos de belleza y cosméticos.

## 🚀 Tecnologías

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS
- **Estado Global:** Zustand + Persist middleware (localStorage)
- **Base de Datos:** MongoDB Atlas + Mongoose
- **Validación:** Zod + React Hook Form
- **Iconos:** Lucide React
- **Notificaciones:** React Hot Toast

## 📦 Estructura del Proyecto

- `/app`: Rutas y API (Next.js App Router)
- `/components`: Componentes de UI (Layout, Products, Cart, etc.)
- `/models`: Modelos de Mongoose
- `/store`: Gestión de estado (Store del carrito)
- `/lib`: Utilidades (DB connection, formatting)
- `/types`: Definiciones de TypeScript
- `/scripts`: Script de seed para la base de datos

## ⚙️ Configuración e Instalación

1. **Clonar e instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Crea un archivo `.env.local` en la raíz con:

   ```env
   MONGODB_URI=tu_uri_de_mongodb
   ```

3. **Poblar la base de datos (Seed):**

   ```bash
   node scripts/seed.mjs
   ```

4. **Correr en modo desarrollo:**
   ```bash
   npm run dev
   ```

## 🛠️ Funcionalidades implementadas

- **Catálogo Dinámico:** Filtrado por categorías, búsqueda por texto y ordenamiento por precio/novedad.
- **Carrito de Compras:** Persistente en localStorage, permite ajustar cantidades y ver subtotales.
- **Checkout Flow:** Formulario validado con Zod.
- **Exportación de Pedido:**
  - **WhatsApp:** Genera un mensaje formateado y redirige a wa.me.
  - **JSON:** Genera un payload estructurado para copiar al portapapeles.
- **Diseño Premium:** Estética cuidada, animaciones fluidas y responsive design completo.

## 📄 Licencia

Este proyecto fue desarrollado bajo requerimiento para un catálogo de Freelance.
