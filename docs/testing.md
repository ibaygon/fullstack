# Testing Guide — Aplicación Top 5

Este documento describe las pruebas manuales y automáticas recomendadas para garantizar que la aplicación **Top 5 Lists** funciona correctamente después de los últimos cambios (contexto, persistencia, navegación y renderizado).


## 1. Pruebas de creación de listas

### Caso: Crear una lista válida
**Pasos**
1. Navegar a `/crear`.
2. Completar:
   - Título
   - Categoría
   - 5 elementos
3. Pulsar **Guardar**.

**Resultado esperado**
- Redirige a `/listas`.
- La nueva lista aparece en pantalla.
- `localStorage.getItem("top5lists")` contiene la lista recién creada.

### Caso: Intentar guardar con campos vacíos
*(Si aún no hay validación, este test sirve para detectar la necesidad de implementarla)*

**Pasos**
1. Dejar campos vacíos.
2. Pulsar **Guardar**.

**Resultado esperado**
- La app debería impedir guardar o mostrar un mensaje de error.
- *(Si no ocurre, se documenta como bug pendiente.)*


## 2. Pruebas de persistencia (localStorage)

### Caso: Persistencia después de recargar
**Pasos**
1. Crear una lista.
2. Recargar la página (`F5`).

**Resultado esperado**
- La lista sigue visible en `/` y `/listas`.
- `localStorage` mantiene los datos.

### Caso: Persistencia después de cerrar y abrir el navegador
**Pasos**
1. Crear una lista.
2. Cerrar el navegador.
3. Abrirlo de nuevo y entrar a la app.

**Resultado esperado**
- Las listas siguen presentes.


## 3. Pruebas de navegación

### Caso: Navegar entre páginas
**Pasos**
1. Ir a `/`.
2. Ir a `/crear`.
3. Crear una lista.
4. Ir a `/listas`.
5. Volver a `/`.

**Resultado esperado**
- Las listas aparecen en todas las vistas que las muestran.
- No se pierde información al cambiar de ruta.


## 4. Pruebas del contexto (Top5Context)

###  Caso: El contexto comparte estado entre páginas
**Pasos**
1. Crear una lista en `/crear`.
2. Navegar a `/`.

**Resultado esperado**
- La lista aparece sin necesidad de recargar.

### Caso: El contexto carga datos desde localStorage
**Pasos**
1. Crear una lista.
2. Recargar la página.
3. Abrir la consola y ejecutar:

```js
localStorage.getItem("top5lists")
```

Resultado esperado
- El JSON contiene la lista creada.
- La UI refleja ese estado.

## 5. Pruebas de ListView

Caso: Mostrar listas
Pasos
Crear varias listas.
Ir a /listas.
Resultado esperado
- Se muestran todas las tarjetas.
- El contador total de elementos es correcto.

Caso: Estado vacío
Pasos
- Borrar manualmente localStorage:
```js
localStorage.clear()
```
- Ir a /.
Resultado esperado
Se muestra el componente EmptyState con el mensaje “No hay listas aún.”

## 6. Pruebas de errores comunes

Caso: El contexto no se monta dos veces
Pasos
- Revisar que StrictMode esté desactivado.
- Crear una lista.
- Recargar.
Resultado esperado
- La lista NO desaparece.
- localStorage no se sobrescribe con [].

Caso: No existen imports rotos
Pasos
- Ejecutar en PowerShell:

```Powershell
Get-ChildItem -Recurse .\src\ | Select-String "ListsPage"
```
Resultado esperado
- No aparece ninguna referencia a ListsPage.tsx.

## 7. Pruebas de regresión

Después de cualquier cambio en:
- Top5Context.tsx
- ListView.tsx
- CreatePage.tsx
- App.tsx
- main.tsx
Repetir:
- Creación de lista
- Navegación
- Recarga
- Persistencia
Para asegurar que no se reintroduce el bug donde las listas desaparecían.

## 8. Pruebas futuras (pendientes)

- Edición de listas
- Eliminación de listas
- Filtros por categoría
- Integración con API real
- Tests automatizados con Vitest / React Testing Library