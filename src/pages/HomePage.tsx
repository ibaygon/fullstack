import { Link } from "react-router-dom";
import { ListView } from "../components/ListView";
import { useAuth } from "../context/AuthContext";
import { LogoutButton } from "../components/LogoutButton";

const navy = "bg-[#0f1b2e]";
const navyText = "text-[#0f1b2e]";

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#0f1b2e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between pb-6 border-b border-gray-200">
          <div className="flex gap-3 items-start">
            <div
              className={`${navy} w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm`}
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2}
                width={12}
                height={12}
                className="shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${navyText}`}>
                Top 5 de Todo
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                Crea y comparte tus listas favoritas
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            {user ? (
              <>
                <Link
                  to="/crear"
                  className={`inline-flex items-center justify-center ${navy} text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition shadow-sm`}
                >
                  + Nueva Lista
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link
                to="/login"
                className={`inline-flex items-center justify-center ${navy} text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition shadow-sm`}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </header>

        <main className="mt-8">
          <ListView />
        </main>
      </div>
    </div>
  );
};
