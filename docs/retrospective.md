# Retrospectiva del proyecto — Top 5 de Todo

## Principales problemas encontrados

### Integración frontend ↔ Supabase (API)

- **Row Level Security (RLS)**: Las operaciones que en local “parecían correctas” fallaban en silencio o con mensajes crípticos hasta definir políticas coherentes para `SELECT`, `INSERT`, `UPDATE` y `DELETE` sobre `top5_lists`. El caso más confuso fue el **UPDATE** para marcar una lista como pública: hacía falta una política explícita `USING` / `WITH CHECK` con `auth.uid() = user_id`, y no bastaba con reutilizar plantillas de ejemplo (p. ej. joins con otras tablas) que no aplicaban a nuestro esquema.

- **Listas compartidas y lectura anónima**: Hacer que un enlace funcionara **sin** iniciar sesión en la cuenta del dueño implicó separar bien “mis listas” (carga filtrada por `user_id`) de “ver una lista por id” con políticas que permitan a `anon` leer solo filas `is_public = true`.

- **Respuesta de PostgREST y el estado de React**: Tras un `update`, conviene usar `.select().single()` para validar que la fila devuelta es la esperada y actualizar el estado con un mapeo estable (`mapTop5ListRow`), en lugar de asumir siempre el éxito del cliente.

### Tipos y modelo de datos

- **Tipos TypeScript vs filas de Supabase**: Campos como `user_id`, `is_public` o el JSON `items` no siempre estaban presentes en el objeto que llegaba al detalle de una lista; eso rompía la lógica de “soy el dueño” (`is_public`, botón compartir, borrar). La solución pasó por **mapear siempre** las filas a un modelo `Top5List` y, en UI, combinar comprobaciones por `user_id` y por pertenencia a la lista cargada en contexto.

- **`user` en `AuthContext` tipado como `any`**: Facilita prototipos pero oculta errores (p. ej. comparación con `user_id`). Mejoraría el proyecto sustituyendo `any` por el tipo `User` de `@supabase/supabase-js`.

### Frontend (UI y tooling)

- **Tailwind sin integrar en Vite**: En un momento las clases utilitarias no generaban CSS (no estaba el plugin de Tailwind en `vite.config.ts` ni `@import "tailwindcss"` en `index.css`), de modo que los SVG crecían al tamaño por defecto del navegador. Fue un fallo de **configuración**, no solo de diseño.

- **Rutas y flujos**: Alinear detalle (`/lista/:id`), edición (`/lista/:id/edit`), creación y home evitó enlaces rotos y estados inconsistentes al compartir URLs.

---

## Uso de IA durante el desarrollo

Se utilizó asistencia de IA (Cursor) para:

- **Acelerar diagnósticos** cuando el síntoma no coincidía con la causa (p. ej. iconos enormes por ausencia de Tailwind en el build, o checkbox de “lista pública” que no reflejaba errores de RLS).
- **Bosquejar y refinar código** de contexto React (`Top5Provider`, `AuthProvider`), páginas de detalle/edición y políticas SQL de ejemplo alineadas con el esquema real.
- **Mantener coherencia visual** respecto a referencias de UI y revisar accesibilidad básica (etiquetas, estados de carga, mensajes de error visibles para el usuario).

La IA no sustituyó la lectura de la documentación de Supabase ni las pruebas manuales en el panel (Auth, RLS, SQL Editor); sirvió sobre todo para **iterar más rápido** y documentar decisiones en el repositorio.

---

## Reflexión final

Lo que más costó fue **migrar de Firebase a Supabase en el eje de autenticación**: volver a cablear el flujo de sesión (OAuth con Google, `onAuthStateChange`, `redirectTo`), alinear los **UUID de `auth.users`** con la columna **`user_id`** en `top5_lists` y asegurar que cada operación CRUD respetara RLS. Fue un buen recordatorio de que el “fullstack” moderno no termina en el frontend: **las reglas en base de datos son parte del contrato de la API**.

En retrospectiva, conviene definir **pronto** el modelo de permisos (dueño vs público vs anónimo) y tipar el cliente Supabase con más rigor para reducir fricción. El proyecto quedó más robusto al centralizar el mapeo de filas, mostrar errores de mutación al usuario y documentar despliegue y URLs en el README.
