# Formularios e interacción

Este documento describe cómo se gestionan los formularios en la aplicación usando React y TypeScript.

## Formularios controlados

Un formulario controlado es aquel en el que cada input está conectado al estado del componente mediante `useState`.

```tsx
const [title, setTitle] = useState("");

<input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
```

## Validación básica

- El formulario valida que:
- El título no esté vacío
- La categoría no esté vacía
- Los cinco elementos tengan contenido
```tsx
if (!title.trim()) {
  setError("El título es obligatorio");
  return;
}
```

## Mensajes de error y confirmación

```tsx
{error && <p className="text-red-600">{error}</p>}
{success && <p className="text-green-600">{success}</p>}
```

## Ejemplo completo de formulario

```tsx
<form onSubmit={handleSubmit}>
  <input value={title} onChange={(e) => setTitle(e.target.value)} />
  <input value={category} onChange={(e) => setCategory(e.target.value)} />

  {items.map((item, i) => (
    <input
      key={i}
      value={item}
      onChange={(e) => {
        const newItems = [...items];
        newItems[i] = e.target.value;
        setItems(newItems);
      }}
    />
  ))}

  <button>Guardar</button>
</form>
```