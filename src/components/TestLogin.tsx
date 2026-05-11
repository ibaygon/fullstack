import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";

export const TestLogin = () => {
  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log("Usuario autenticado:", result.user);
      alert("Login correcto: " + result.user.email);
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error en login");
    }
  };

  return (
    <button
      onClick={login}
      className="bg-blue-600 text-white px-4 py-2 rounded-md"
    >
      Probar Login con Google
    </button>
  );
};
