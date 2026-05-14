import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTop5Context } from "../context/Top5Context";

const emptyItem = () => ({ text: "", image: "" });

export const CreatePage = () => {
  const { addList } = useTop5Context();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState(() =>
    Array.from({ length: 5 }, emptyItem)
  );

  const handleItemChange = (index: number, field: "text" | "image", value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSave = async () => {
    await addList({
      title,
      category,
      items,
    });

    navigate("/");
  };

  const navy = "bg-[#0f1b2e]";

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-12">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#0f1b2e]">
            ← Volver a listas
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-[#0f1b2e] mb-2">Crear lista Top 5</h1>
        <p className="text-gray-500 text-sm mb-8">
          Cinco elementos con título; puedes añadir una URL de imagen por elemento (como en idea.md).
        </p>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Título de la lista
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[#0f1b2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f1b2e]/20 focus:border-[#0f1b2e]"
              placeholder="Ej. Mis películas favoritas de ciencia ficción"
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
              placeholder="Películas, videojuegos, música…"
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
                  value={item.image}
                  onChange={(e) => handleItemChange(i, "image", e.target.value)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`w-full ${navy} text-white font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-sm`}
            onClick={handleSave}
          >
            Guardar lista
          </button>
        </div>
      </div>
    </div>
  );
};
