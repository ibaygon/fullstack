import { useAuth } from "../context/AuthContext";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  return (
    <button
      type="button"
      onClick={signOut}
      className="text-sm font-medium text-gray-600 border border-gray-300 bg-white px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
    >
      Cerrar sesión
    </button>
  );
};
