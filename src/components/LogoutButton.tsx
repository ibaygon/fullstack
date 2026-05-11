import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut(auth)}
      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
    >
      Cerrar sesión
    </button>
  );
};
