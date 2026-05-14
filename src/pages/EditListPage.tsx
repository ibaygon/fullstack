import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTop5Context } from "../context/Top5Context";
import { supabase } from "../lib/supabase";
import { mapTop5ListRow } from "../lib/mapTop5ListRow";
import type { Top5List } from "../types/Top5List";

const navy = "bg-[#0f1b2e]";

const emptyItem = () => ({ text: "", image: "" });

function normalizeItems(raw: Top5List["items"]) {
  const mapped = raw.map((item) =>
    typeof item === "string" ? { text: item, image: "" } : { ...item }
  );
  while (mapped.length < 5) mapped.push(emptyItem());
  return mapped.slice(0, 5);
}

export const EditListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lists, updateList } = useTop5Context();

  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState(() => Array.from({ length: 5 }, emptyItem));
  const [saveError, setSaveError] = useState("");

  const listId = Number(id);

  const load = useCallback(async () => {
    if (!user || !id || !Number.isFinite(listId) || listId <= 0) {
      setForbidden(!user);
      setLoading(false);
      return;
    }

    setLoading(true);
    setForbidden(false);

    const fromContext = lists.find((l) => l.id === listId);
    let row: Top5List | null = fromContext ?? null;

    if (!row) {
      const { data, error } = await supabase
        .from("top5_lists")
        .select("*")
        .eq("id", listId)
        .maybeSingle();
      if (!error && data) row = mapTop5ListRow(data as Record<string, unknown>);
    }

    if (!row) {
      setForbidden(true);
      setLoading(false);
      return;
    }

    const isMine =
      lists.some((l) => l.id === row!.id) ||
      (row.user_id != null && row.user_id === user.id);

    if (!isMine) {
      setForbidden(true);
      setLoading(false);
      return;
    }

    setTitle(row.title);
    setCategory(row.category);
    setItems(normalizeItems(row.items));
    setLoading(false);
  }, [user, id, listId, lists]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleItemChange = (index: number, field: "text" | "image", value: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    setItems(next);
  };

  const handleSave = async () => {
    setSaveError("");
    if (!Number.isFinite(listId) || listId <= 0) return;

    const res = await updateList(listId, { title, category, items });
    if (res.ok) navigate(`/lista/${listId}`);
    else setSaveError(res.error);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center text-gray-500 text-sm">
        Cargando…
      </div>
    );
  }

  if (forbidden || !user) {
    return (
      <div className="min-h-screen bg-[#f4f5f7] flex flex-col items-center justify-center px-4 text-center gap-4">
        <p className="text-gray-600 text-sm max-w-sm">
          No puedes editar esta lista. Inicia sesión con la cuenta del dueño o
          comprueba el enlace.
        </p>
        <Link to="/" className={`${navy} text-white text-sm font-semibold px-4 py-2.5 rounded-lg`}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-12">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 justify-between">
          <Link
            to={`/lista/${listId}`}
            className="text-sm font-medium text-gray-600 hover:text-[#0f1b2e]"
          >
            ← Volver al detalle
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-[#0f1b2e] mb-2">Editar lista</h1>
        <p className="text-gray-500 text-sm mb-8">
          Modifica título, categoría y los cinco ítems. Guarda para aplicar los cambios.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
          {saveError && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {saveError}
            </p>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Título de la lista
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[#0f1b2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f1b2e]/20 focus:border-[#0f1b2e]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Categoría
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[#0f1b2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f1b2e]/20 focus:border-[#0f1b2e]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="pt-2 space-y-4">
            <p className="text-sm font-semibold text-[#0f1b2e]">Tus 5 ítems</p>
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-100 bg-gray-50/80 p-4 space-y-3"
              >
                <p className="text-xs font-bold text-gray-500">#{i + 1}</p>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0f1b2e] placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f1b2e]/20 focus:border-[#0f1b2e]"
                  placeholder="Título del elemento"
                  value={item.text}
                  onChange={(e) => handleItemChange(i, "text", e.target.value)}
                />
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0f1b2e] placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f1b2e]/20 focus:border-[#0f1b2e]"
                  placeholder="URL de imagen (opcional)"
                  value={item.image ?? ""}
                  onChange={(e) => handleItemChange(i, "image", e.target.value)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`w-full ${navy} text-white font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-sm`}
            onClick={() => void handleSave()}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};
