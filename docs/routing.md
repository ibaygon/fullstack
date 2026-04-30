# Documentación de rutas y navegación

Este documento describe la estructura de rutas de la aplicación usando React Router.


## Estructura de rutas

La aplicación utiliza BrowserRouter y define estas rutas principales:

- Ruta /  
  Muestra la página de inicio (HomePage), donde se listan las listas Top 5.

- Ruta /crear  
  Muestra la página de creación (CreatePage), con el formulario para crear una nueva lista.

- Ruta *  
  Muestra la página 404 (NotFoundPage) para cualquier ruta no definida.


## Configuración en App.tsx

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CreatePage } from "./pages/CreatePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crear" element={<CreatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Navegación
Para navegar entre páginas sin recargar la aplicación se usa el componente Link de react-router-dom.

Ejemplo de navegación en el header:

```tsx
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between max-w-4xl mx-auto">
        <Link to="/" className="font-bold text-lg">
          Top 5 de Todo
        </Link>

        <div className="flex gap-4">
          <Link to="/">Inicio</Link>
          <Link to="/crear">Crear Lista</Link>
        </div>
      </nav>
    </header>
  );
};
```

## Página 404
La ruta comodín (*) captura cualquier URL que no coincida con las rutas definidas y muestra una página 404.

```tsx
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">404 - Página no encontrada</h1>
      <Link to="/" className="text-blue-600 underline">
        Volver al inicio
      </Link>
    </div>
  );
};
```

## Conclusión
- Se usa BrowserRouter para envolver la aplicación.
- Routes y Route definen las páginas principales.
- Link permite navegar sin recargar la página.
- La ruta * gestiona las páginas no encontradas con una vista 404 personalizada.