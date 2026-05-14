import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Top5Detail } from "../components/Top5Detail";
import { useAuth } from "../context/AuthContext";
import { useTop5Context } from "../context/Top5Context";
import { supabase } from "../lib/supabase";
import { getAuthSiteUrl } from "../lib/authSiteUrl";
import { mapTop5ListRow } from "../lib/mapTop5ListRow";
import type { Top5List } from "../types/Top5List";

const primary = "bg-[#0f1b2e]";

export const ListDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { lists, setListPublic } = useTop5Context();

  const [list, setList] = useState<Top5List | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareBusy, setShareBusy] = useState(false);
  const [shareError, setShareError] = useState("");

  const load = useCallback(async () => {
    const listId = Number(id);
    if (!id || !Number.isFinite(listId) || listId <= 0) {
      setList(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fromContext = lists.find((l) => l.id === listId);
    if (fromContext) {
      setList(fromContext);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("top5_lists")
      .select("*")
      .eq("id", listId)
      .maybeSingle();

    if (error || !data) {
      setList(null);
    } else {
      setList(mapTop5ListRow(data as Record<string, unknown>));
    }
    setLoading(false);
  }, [id, lists]);

  useEffect(() => {
    void load();
  }, [load]);

  const isOwner = Boolean(
    user &&
      list?.id != null &&
      (lists.some((l) => l.id === list.id) ||
        (list.user_id != null && list.user_id === user.id))
  );

  const baseUrl = getAuthSiteUrl();
  const shareUrl =
    baseUrl && list?.id != null ? `${baseUrl}/lista/${list.id}` : "";

  const togglePublic = async () => {
    if (!list?.id || !isOwner) return;
    setShareBusy(true);
    setShareError("");
    const next = !list.is_public;
    const res = await setListPublic(list.id, next);
    if (res.ok) {
      setList((prev) => (prev ? { ...prev, is_public: next } : prev));
    } else {
      setShareError(res.error);
    }
    setShareBusy(false);
  };

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      window.prompt("Copia este enlace:", shareUrl);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center text-gray-500 text-sm">
        Cargando lista…
      </div>
    );
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-[#f4f5f7] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-gray-600 mb-2 max-w-sm">
          No encontramos esta lista, o es privada y el dueño aún no la ha hecho
          pública.
        </p>
        <Link
          to="/"
          className={`${primary} text-white text-sm font-semibold px-4 py-2.5 rounded-lg`}
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-12">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 justify-between">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-[#0f1b2e]"
          >
            ← Listas
          </Link>
          {isOwner && id && (
            <Link
              to={`/lista/${id}/edit`}
              className="text-sm font-semibold text-[#0f1b2e] border border-gray-300 bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              Editar lista
            </Link>
          )}
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 pt-8 space-y-6">
        <Top5Detail list={list} />

        {isOwner && (
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
            <h2 className="text-sm font-semibold text-[#0f1b2e]">
              Compartir con cualquiera
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Haz la lista pública para que quien tenga el enlace pueda verla sin
              iniciar sesión en tu cuenta.
            </p>
            {shareError && (
              <p className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {shareError}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={shareBusy}
                onClick={() => void togglePublic()}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition border ${
                  list.is_public
                    ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                    : `${primary} text-white border-transparent hover:opacity-90`
                }`}
              >
                {shareBusy
                  ? "Guardando…"
                  : list.is_public
                    ? "Quitar lista pública"
                    : "Hacer lista pública"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!list.is_public}
                onClick={() => void copyLink()}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
                  list.is_public
                    ? `${primary} text-white hover:opacity-90`
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Copiar enlace
              </button>
            </div>
            {list.is_public && (
              <p className="text-[11px] text-gray-400 break-all">{shareUrl}</p>
            )}
          </section>
        )}

        {!user && list.is_public && (
          <p className="text-center text-xs text-gray-500">
            <Link to="/login" className="text-[#0f1b2e] font-medium underline">
              Inicia sesión
            </Link>{" "}
            para crear tus propias listas.
          </p>
        )}
      </div>
    </div>
  );
};
