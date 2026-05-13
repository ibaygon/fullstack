import { useAuth } from "../context/AuthContext";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  return (
    <button
      onClick={signOut}
      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
    >
      Cerrar sesión
    </button>
  );
};
