#  Deployment del Proyecto en Vercel (Frontend + Supabase)

Este documento explica paso a paso cómo desplegar el frontend en Vercel, cómo configurar Supabase para producción y cómo verificar que todo funciona correctamente.

---

## 1. Requisitos previos

Antes de desplegar, asegúrate de tener:

- Una cuenta en **Vercel**
- Un repositorio en **GitHub**
- Un proyecto creado en **Supabase**
- Las claves y URLs necesarias del backend

---

## 2. Variables de entorno necesarias

El frontend usa Supabase, por lo que requiere **dos variables obligatorias**:

VITE_SUPABASE_URL=https://TU-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_PUBLIC_KEY


### Cómo obtenerlas:

1. Entra en Supabase  
2. Ve a **Project Settings  API**  
3. Copia:

- **Project URL**  para `VITE_SUPABASE_URL`  
- **anon public key**  para `VITE_SUPABASE_ANON_KEY`

 **IMPORTANTE:**  
No uses la URL `/rest/v1/`.  
La URL correcta termina en `.supabase.co`.

---

## 3. Configurar Supabase Authentication para producción

En Supabase → **Authentication → URL Configuration**, configura:

###  Site URL
https://fullstack-rho-lyart.vercel.app


Esto es necesario para que el login con Google funcione en producción.

---

## 4. Desplegar el frontend en Vercel

1. Entra en https://vercel.com  
2. Clic en **New Project**  
3. Selecciona el repositorio del proyecto  
4. Vercel detectará automáticamente Vite + React  
5. En la sección **Environment Variables**, añade:

VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...


6. Clic en **Deploy**

Cuando termine, Vercel generará una URL como:

https://fullstack-rho-lyart.vercel.app/


---

## 5. Conectar el frontend con Supabase en producción

Tu archivo `supabase.ts` debe usar las variables:

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);
```

Si las variables están bien configuradas en Vercel, el frontend se conectará automáticamente al backend.

---

## 6. Probar el despliegue
Después del deploy:

1. Abre la URL de Vercel
2. Intenta iniciar sesión con Google
3. Crea una lista
4. Marca la lista como pública
5. Copia el enlace
6. Ábrelo en modo incógnito

Resultado esperado:
La lista pública se muestra correctamente
- Las listas privadas solo se muestran al dueño
- El login funciona
- La creación y edición funcionan