# API Client

Este documento describe la capa de red del frontend.

## Endpoints

### GET /api/lists
Devuelve todas las listas.

### GET /api/lists/:id
Devuelve una lista por ID.

### POST /api/lists
Crea una lista nueva.

### PUT /api/lists/:id
Actualiza una lista existente.

### DELETE /api/lists/:id
Elimina una lista.

## Tipos

- ListItem
- CreateListDTO
- UpdateListDTO

## Cliente

El cliente está implementado en `src/api/client.ts` y expone:

- getLists()
- getList(id)
- createList(data)
- updateList(id, data)
- deleteList(id)