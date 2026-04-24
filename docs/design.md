# Componentes principales

## Header
Componente superior de navegación. Muestra el título de la aplicación y enlaces a las páginas principales (Inicio, Crear Lista, Mis Listas). Se renderiza en todas las páginas a través del Layout.

## ListaCard
Tarjeta reutilizable que muestra una lista Top 5 en formato compacto. Incluye título, categoría y un resumen de los elementos. Se usa en la página de inicio y en la página de “Mis Listas”.

## Top5Form
Formulario para crear o editar una lista Top 5. Contiene campos para título, categoría y los cinco elementos. Gestiona validación básica y envía los datos al contexto global para crear o actualizar una lista.

## Top5Detail
Página que muestra una lista completa en detalle. Permite ver los cinco elementos, editar la lista o eliminarla. Consume el estado global para obtener la lista seleccionada.

## Loader
Componente visual reutilizable que muestra un indicador de carga mientras se realizan operaciones asíncronas (fetch, creación, eliminación). Se usa en cualquier parte de la app donde haya estados de red.

## ErrorMessage
Componente reutilizable para mostrar errores de red o validación. Recibe un mensaje por props y lo muestra con estilo destacado. Se usa en formularios, páginas y operaciones async.

## EmptyState
Componente que se muestra cuando no hay listas disponibles. Incluye un mensaje amigable y, opcionalmente, un botón para crear una nueva lista. Se usa en la página principal y en “Mis Listas”.

## Layout
Componente que envuelve todas las páginas. Incluye el Header y un contenedor principal para el contenido. Garantiza consistencia visual en toda la aplicación.

---

# Componentes reutilizables

Dentro de la arquitectura del proyecto se identifican varios componentes que pueden reutilizarse en diferentes páginas. Estos componentes ayudan a mantener consistencia visual, reducir duplicación de código y facilitar el mantenimiento.

## Loader
Componente visual que muestra un indicador de carga durante operaciones asíncronas.  
Se reutiliza en:
- Carga inicial de listas
- Creación de listas
- Eliminación de listas
- Actualización de listas

## ErrorMessage
Componente para mostrar errores de red o validación.  
Se reutiliza en:
- Formularios (Top5Form)
- Páginas que consumen datos del backend
- Operaciones async fallidas

## EmptyState
Componente que se muestra cuando no hay datos disponibles.  
Se reutiliza en:
- Página principal (cuando no existen listas)
- Página de “Mis Listas”
- Resultados de búsqueda sin coincidencias

## ListaCard (reutilizable dentro de listados)
Tarjeta que muestra una lista Top 5 en formato compacto.  
Se reutiliza en:
- Página de inicio
- Página de “Mis Listas”

## Layout
Componente que envuelve todas las páginas y contiene el Header.  
Se reutiliza en:
- Todas las páginas de la aplicación


## Resumen del por qué son reutilizables
Estos componentes representan patrones comunes de la interfaz (carga, error, estados vacíos, tarjetas y estructura general).  
Al centralizarlos:
- Se mantiene una estética coherente
- Se reduce la duplicación de código
- Se facilita el mantenimiento
- Se mejora la escalabilidad del proyecto

---

# Gestión del estado de la aplicación

La aplicación utiliza **React + Context + Hooks personalizados** para gestionar el estado global.  
Este enfoque permite compartir datos entre páginas y componentes sin necesidad de prop drilling.

## Estado global
El estado principal de la aplicación contiene:

```ts
{
  lists: Top5List[];
  loading: boolean;
  error: string | null;
}
Acciones principales
El contexto expone funciones que modifican el estado:

fetchLists()  obtiene todas las listas desde la API

createList()  crea una nueva lista

deleteList()  elimina una lista por ID

updateList()  actualiza una lista existente
```

## Flujo de actualización
Un componente llama a una acción del contexto.

El contexto activa loading = true.

Se hace la petición a la API, si tiene éxito:
Se actualiza lists
loading = false
error = null

Si falla:
error contiene el mensaje
loading = false

## Componentes que consumen el estado
- Home muestra todas las listas
- Mis Listas muestra solo las del usuario
- Top5Detail muestra una lista concreta
- Top5Form crea o edita listas

Este sistema permite que toda la aplicación se actualice automáticamente cuando cambian los datos.

---
# Diseño del backend/API

La API sigue una estructura REST sencilla para gestionar listas Top 5.

## Endpoints

### GET /api/v1/lists
Devuelve todas las listas almacenadas.

**Respuesta:**
```json
[
  {
    "id": "abc123",
    "title": "Top 5 Películas",
    "category": "Cine",
    "items": ["Matrix", "Alien", "Seven", "Whiplash", "Interstellar"]
  }
]
```
### POST /api/v1/lists
Crea una nueva lista.

Body esperado
```json
{
  "title": "Top 5 Juegos",
  "category": "Videojuegos",
  "items": ["Zelda", "Halo", "Doom", "Portal", "Bloodborne"]
}
```

Respuesta:
```json
{
  "id": "xyz789",
  "title": "Top 5 Juegos",
  "category": "Videojuegos",
  "items": [...]
}
```

### DELETE /api/v1/lists/:id
Elimina una lista por ID.
Respuestas:
204 eliminada correctamente
404 no existe

---

# Datos persistidos vs datos en cliente

En la aplicación existen dos tipos de datos:  
1) los que forman parte del dominio y deben guardarse en el servidor.  
2) los que solo afectan a la interfaz y deben mantenerse únicamente en el cliente.

## Datos que se guardan en el servidor
Los datos persistentes son aquellos que representan información real del proyecto, es decir, las listas Top 5 creadas por el usuario. Estos datos deben sobrevivir aunque el usuario cierre la aplicación o cambie de dispositivo.

El servidor almacena:
- El identificador de cada lista (id): necesario para localizar, editar o eliminar una lista concreta.
- El título de la lista: parte fundamental del contenido.
- La categoría: permite clasificar y filtrar las listas.
- Los cinco elementos del Top 5: representan el contenido principal de cada lista.

Estos datos pertenecen al dominio de la aplicación y deben persistir porque representan información creada por el usuario.

## Datos que solo existen en el cliente
Hay información que no debe guardarse en el servidor porque no forma parte del contenido real, sino del comportamiento visual de la aplicación.

El cliente gestiona:
- El estado de carga (loading): indica si la aplicación está esperando una respuesta de la API.
- Los errores (error): mensajes temporales que informan de fallos en la red o validación.
- Los filtros aplicados por el usuario: como categoría seleccionada o búsqueda por texto.
- El modo oscuro o claro: una preferencia visual del usuario.

Estos datos no deben persistirse porque no representan contenido del usuario, sino estados temporales de la interfaz.

## Resumen conceptual
El servidor guarda la información que define las listas Top 5.  
El cliente guarda únicamente estados visuales y preferencias que afectan a la experiencia de uso, no al contenido.

---

# Decisiones de arquitectura

Durante el diseño de la aplicación se tomaron varias decisiones técnicas y estructurales para garantizar claridad, escalabilidad y coherencia en el desarrollo.

## 1. Enfoque general
Se optó por una arquitectura basada en **React + TypeScript + Context**, con una separación clara entre componentes, páginas y lógica de negocio.  
El objetivo es mantener un código modular, fácil de mantener y preparado para futuras ampliaciones.

## 2. Estructura del proyecto
El proyecto se organiza en carpetas por responsabilidad:
- `components/` elementos visuales reutilizables  
- `pages/` vistas principales de la aplicación  
- `context/` gestión del estado global  
- `api/` → comunicación con el backend  
- `types/` definición de tipos y modelos  
- `utils/` funciones auxiliares  

Esta estructura facilita la localización del código y el trabajo en equipo.

## 3. Gestión del estado
Se decidió usar **React Context** en lugar de Redux o librerías externas, ya que el proyecto es de tamaño medio y no requiere una solución más compleja.  
El contexto permite compartir el estado global (listas, errores, carga) entre componentes sin necesidad de pasar props manualmente.

## 4. Comunicación con el backend
La comunicación entre frontend y backend se realiza mediante **fetch** y una capa de abstracción en `api/listsApi.ts`.  
Esto permite centralizar las peticiones, manejar errores y mantener los contratos de datos definidos en la API REST.

## 5. Persistencia de datos
Solo los datos del dominio (listas Top 5) se guardan en el servidor.  
Los estados visuales (loading, error, filtros, modo oscuro) se mantienen en el cliente, ya que no forman parte del contenido del usuario.

## 6. Reutilización de componentes
Se priorizó la creación de componentes reutilizables para estados comunes (carga, error, vacío) y estructuras visuales (Layout, ListaCard).  
Esto mejora la consistencia y reduce la duplicación de código.

## 7. Escalabilidad y mantenimiento
La arquitectura está pensada para crecer fácilmente:
- Se pueden añadir nuevas páginas sin romper la estructura existente.  
- El contexto puede ampliarse con nuevos estados o acciones.  
- La API puede evolucionar sin afectar al frontend si se mantienen los contratos de datos.

## 8. Conclusión
La arquitectura final equilibra simplicidad y organización.  
Permite desarrollar nuevas funcionalidades sin complicar el código existente y mantiene una separación clara entre presentación, lógica y datos.

