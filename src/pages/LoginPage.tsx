import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>

      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

