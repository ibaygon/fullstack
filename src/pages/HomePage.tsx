import { ListView } from "../components/ListView";
import { useAuth } from "../context/AuthContext";
import { LogoutButton } from "../components/LogoutButton";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis listas Top 5</h1>

        {/* Si NO hay usuario → botón de login */}
        {!user && (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Iniciar sesión
          </Link>
        )}

        {/* Si hay usuario → botón crear lista + logout */}
        {user && (
          <div className="flex items-center gap-4">
            <Link
              to="/crear"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Crear lista
            </Link>

            <LogoutButton />
          </div>
        )}
      </div>

      <ListView />
    </div>
  );
};
