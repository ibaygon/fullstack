# Top 5 de Todo

## Logline

Aplicación web para crear, ordenar y compartir listas personales de cinco ítems (películas, juegos, música, etc.), con autenticación y persistencia en la nube.

## Descripción breve

Los usuarios inician sesión (Google vía Supabase), gestionan sus listas Top 5, pueden marcar una lista como **pública** para compartirla por enlace, editar contenido y ver el detalle con imágenes y títulos. Los datos viven en PostgreSQL detrás de Supabase; el frontend es una SPA React desplegada en Vercel.

## Despliegue

**Frontend**: https://fullstack-rho-lyart.vercel.app 
**Backend / BaaS (Supabase)** : https://kobsndrjtvcxenhvhopy.supabase.co 

> La “API” principal que consume el frontend es la **REST de PostgREST** y **Auth** de Supabase en la URL anterior. Opcionalmente el repo incluye un servidor Express en `server/` para pruebas o extensiones.

## Características

1. Registro de sesión con **Google OAuth** (Supabase Auth).
2. CRUD de listas Top 5 (título, categoría, cinco ítems con texto e imagen por URL).
3. **Listas públicas** compartibles por enlace y vista de detalle para visitantes (según RLS en Supabase).
4. Edición de listas desde la vista de detalle y eliminación solo del dueño.

## Tecnologías

### Frontend

| Tecnología | Uso |
|------------|-----|
| React 19 + TypeScript | UI, rutas y estado en componentes y contextos |
| Vite 8 | Build y servidor de desarrollo |
| Tailwind CSS 4 | Estilos utilitarios (`@tailwindcss/vite`) |
| React Router 7 | Navegación (`/`, `/crear`, `/lista/:id`, `/lista/:id/edit`, `/login`) |

### Backend / datos

| Tecnología | Uso |
|------------|-----|
| Supabase (PostgreSQL + Auth + RLS) | Persistencia, usuarios y políticas de acceso |
| `@supabase/supabase-js` | Cliente desde el frontend |
| Node + Express (en `server/`) | API REST de ejemplo / extensión (no obligatoria para el despliegue actual) |

### Auxiliares

| Herramienta | Uso |
|---------------|-----|
| ESLint | Calidad de código |
| Documentación en `docs/` | Idea de producto, retrospectiva, notas de diseño |
| Vercel | Hosting del build estático del frontend |

## Estructura del proyecto

```text
fullstack/
├── index.html                 # Punto de entrada HTML (Vite)
├── vite.config.ts             # Vite + plugin React + Tailwind
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── public/
├── src/
│   ├── main.tsx               # Montaje de React
│   ├── App.tsx                # Rutas principales
│   ├── index.css              # Tailwind + variables CSS
│   ├── api/
│   │   └── client.ts          # Cliente HTTP (si se usa API propia)
│   ├── lib/
│   │   ├── supabase.ts        # Cliente Supabase
│   │   └── mapTop5ListRow.ts  # Mapeo fila DB → tipo Top5List
│   ├── context/
│   │   ├── AuthContext.tsx    # Sesión Supabase Auth
│   │   └── Top5Context.tsx    # Listas y mutaciones
│   ├── components/            # Tarjetas, formularios, layout…
│   ├── pages/                 # Home, crear, editar, detalle, login…
│   └── types/
│       └── Top5List.ts
├── server/                    # Backend Express (opcional)
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── validators/
├── supabase/
│   └── migrations/            # SQL (p. ej. listas públicas / RLS)
├── docs/
│   ├── idea.md
│   ├── retrospective.md
│   └── …
└── README.md
```

## Descargar y ejecutar

```bash
git clone https://github.com/ibaygon/fullstack.git
cd fullstack
npm install
```

Variables de entorno: copia `.env.example` a `.env.local` y rellena valores. En **Vercel** → Project → Settings → Environment Variables añade al menos:

| Variable | Ejemplo |
|----------|---------|
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | clave anónima del proyecto |
| `VITE_SITE_URL` | `https://fullstack-rho-lyart.vercel.app` ( dominio real, **sin** `/` final) |

### OAuth: por qué salía localhost y cómo corregirlo

Tras iniciar sesión con Google, Supabase redirige al usuario a una URL permitida. Si **`redirectTo` no está en la lista** de “Redirect URLs” del proyecto, Supabase usa la **Site URL** del panel. Si la Site URL sigue siendo `http://localhost:5173`, el navegador intentará abrir localhost en producción y verás `ERR_CONNECTION_REFUSED`.

1. **Supabase** → Authentication → URL configuration  
   - **Site URL**: `https://fullstack-rho-lyart.vercel.app` ( URL de Vercel).  
   - **Redirect URLs**: añade la misma URL y, si quieres previews, algo como `https://*.vercel.app/**` según [docs de Supabase](https://supabase.com/docs/guides/auth/redirect-urls).

2. **Vercel**: define `VITE_SITE_URL` igual que la URL pública del despliegue (el código la usa como `redirectTo` en `signInWithOAuth`).

3. Vuelve a desplegar el frontend tras cambiar variables.

```bash
npm run dev
```

Abre el frontend en `http://localhost:5173` (puerto por defecto en `vite.config.ts`).

## Desplegar en Vercel

### Frontend

1. Conecta el repositorio GitHub/GitLab a Vercel.
2. Framework preset: **Vite**; comando de build: `npm run build`; directorio de salida: `dist`.
3. Variables de entorno: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y **`VITE_SITE_URL`** (URL pública del sitio, ver sección OAuth arriba).
4. **Directorio de salida del build**: `dist` (Vite).
5. El archivo **`vercel.json`** en la raíz reenvía las rutas de la SPA (`/lista/...`, `/crear`, etc.) a `index.html` para evitar 404 al abrir un enlace directo o en incógnito.
6. Despliega; la URL de producción es la indicada arriba (o la que asigne Vercel).

### Backend Express (opcional)

1. Si despliegas `server/` por separado, configura el proyecto Node en Vercel u otro host con el `package.json` de `server/`.
2. Ajusta CORS y la URL base que use el frontend en `src/api/client.ts` si aplica.
3. No es necesario para el flujo actual basado solo en Supabase desde el cliente.

## Documentación adicional

- Idea y alcance: `docs/idea.md`
- Retrospectiva (problemas, IA, reflexión): `docs/retrospective.md`
- Tablero Trello: [https](https://trello.com/invite/b/69e1f91b04f4ec0222588361/ATTI37936966d35c8a05ef480007758826e5CCD40D8B/fullstack-top-5-de-todo)