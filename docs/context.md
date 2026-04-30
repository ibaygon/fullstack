# Documentación de Context API

Este documento describe la implementación del estado global usando React Context.

## ¿Qué es Context API?
Context API permite compartir estado entre múltiples componentes sin necesidad de pasar props manualmente. Es útil cuando varios componentes necesitan acceder al mismo dato.

## Implementación del contexto

Creamos un contexto tipado:

```ts
const Top5Context = createContext<Top5ContextValue | undefined>(undefined);
```

Creamos un Provider que contiene el estado global:

```ts
export const Top5Provider = ({ children }) => {
  const [lists, setLists] = useState<Top5List[]>([]);
  const addList = (list: Top5List) => setLists(prev => [...prev, list]);

  return (
    <Top5Context.Provider value={{ lists, addList }}>
      {children}
    </Top5Context.Provider>
  );
};
```

## Hook para consumir el contexto

```ts
export function useTop5Context() {
  const ctx = useContext(Top5Context);
  if (!ctx) throw new Error("useTop5Context debe usarse dentro de Top5Provider");
  return ctx;
}
```
## Uso en componentes

```ts
const { lists, addList } = useTop5Context();
```

## ¿Cuándo usar Context API?
- Cuando muchos componentes necesitan el mismo estado
- Cuando pasar props manualmente sería incómodo
- Cuando el estado debe ser global (tema, usuario, listas, carrito)

No es recomendable cuando:
- El estado cambia muy frecuentemente
- Solo un componente necesita ese estado

## Conclusión
Context API permite manejar estado global de forma simple y tipada, evitando el prop drilling y manteniendo la aplicación organizada.