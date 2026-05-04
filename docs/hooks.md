# Documentación de Hooks

Este documento explica los hooks utilizados en el proyecto y su propósito.

## useState
Se usa para gestionar estado local dentro de un componente.

Ejemplo:
```ts
const [selectedId, setSelectedId] = useState<string | null>(null);
```

## useEffect
Se usa para manejar efectos secundarios como llamadas a API.

Ejemplo:
```ts
useEffect(() => {
  setLoading(true);
  fetchData();
}, []);
```

## useMemo
Optimiza cálculos costosos memorizando resultados.

Ejemplo:
```ts
const totalItems = useMemo(() => lists.length, [lists]);
```

## useCallback
Memoriza funciones para evitar renders innecesarios.

Ejemplo:
```ts
const handleSelect = useCallback((id: string) => onSelect(id), [onSelect]);
```

## Custom Hook: useTop5Lists
Encapsula la lógica de carga de listas.

Ejemplo:
```ts
export function useTop5Lists() {
  const [lists, setLists] = useState<Top5List[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLists([...]);
      setLoading(false);
    }, 800);
  }, []);

  return { lists, loading };
}
```

## Custom Hook: useToggle
Hook reutilizable para alternar valores booleanos.

Ejemplo:
```ts
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return { value, toggle };
}
```