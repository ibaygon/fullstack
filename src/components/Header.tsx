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
          <Link to="/mis-listas">Mis Listas</Link>
        </div>
      </nav>
    </header>
  );
};
