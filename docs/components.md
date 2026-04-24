# Documentación de Componentes

Este documento describe los componentes creados en el proyecto, sus props tipadas, su propósito, su estilo con Tailwind CSS y cómo se integran mediante composición.

## Loader

### Descripción
Componente reutilizable que muestra un indicador de carga.  
Se usa mientras se esperan datos de la API o del estado global.

### Props
```ts
interface LoaderProps {
  message?: string;
}
```

### Uso
<Loader message="Cargando listas..." />

## ErrorMessage

### Descripción
Muestra un mensaje de error destacado.
Se utiliza para errores de red, validación o fallos en la API.

### Props
```tsx
interface ErrorMessageProps {
  message: string;
}
```
### Uso

```tsx
<ErrorMessage message="No se pudo cargar la información." />
```

## EmptyState

### Descripción
Componente que se muestra cuando no hay datos disponibles.
Puede incluir un botón opcional para realizar una acción.

### Props
```ts
interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}
```

### Uso 
```tsx
<EmptyState
  message="Aún no tienes listas creadas."
  actionLabel="Crear lista"
  onAction={() => navigate("/crear")}
/>
```

## ListaCard

### Descripción
Tarjeta que muestra una lista Top 5 resumida.
Incluye título, categoría y los primeros elementos.
Se usa en listados y dashboards.

### Props
```ts
import type { Top5List } from "../types/Top5List";

interface ListaCardProps {
  list: Top5List;
  onClick?: () => void;
}
```

### Uso
```tsx
<ListaCard list={lista} onClick={() => navigate(`/lista/${lista.id}`)} />
```
## Top5Form

### Descripción
Formulario para crear o editar una lista Top 5.
Incluye inputs para título, categoría y los 5 elementos.
Usa estado interno y Tailwind para el layout.

### Props
```ts
interface Top5FormProps {
  initialData?: Top5List;
  onSubmit: (data: Omit<Top5List, "id">) => void;
}
```
### Uso
```tsx
<Top5Form onSubmit={handleCreate} />
```

## Top5Detail
Descripción
Vista detallada de una lista Top 5.
Muestra título, categoría y los 5 elementos completos.

Props

## Top5Detail

### Descripción
Vista detallada de una lista Top 5.
Muestra título, categoría y los 5 elementos completos.

### Props
```ts
interface Top5DetailProps {
  list: Top5List;
}
```

### Uso
```tsx
<Top5Detail list={lista} />
```

## Modal

### Descripción
Modal reutilizable que usa composición mediante children.
Permite insertar cualquier contenido dentro del modal.

### Props
```ts
interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}
```

### Uso
```tsx
<Modal open={show} title="Editar lista" onClose={close}>
  <Top5Form initialData={data} onSubmit={save} />
</Modal>
```

## ListView (Composición)

### Descripción
Componente que compone varios componentes reutilizables:
- Loader
- ErrorMessage
- EmptyState
- ListaCard
Consume datos tipados (Top5List[]) y aplica Tailwind para el layout.

### Props
```ts
interface ListViewProps {
  lists: Top5List[];
  loading: boolean;
  error?: string;
  onSelect: (id: string) => void;
}
```

### Uso
```tsx
<ListView
  lists={data}
  loading={loading}
  error={error}
  onSelect={openDetail}
/>
```