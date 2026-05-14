import { useState } from "react";
import type { Top5List } from "../types/Top5List";
import { useTop5Context } from "../context/Top5Context";

interface Top5FormProps {
  initialData?: Top5List;
}

export const Top5Form = ({ initialData }: Top5FormProps) => {
  const { addList } = useTop5Context();

  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [items, setItems] = useState(
    initialData?.items || [
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" }
    ]
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) return setError("El título es obligatorio");
    if (!category.trim()) return setError("La categoría es obligatoria");
    if (items.some((i) => !i.text.trim()))
      return setError("Todos los elementos deben estar completos");

    addList({ title, category, items });

    setSuccess("Lista creada correctamente");
    setTitle("");
    setCategory("");
    setItems([
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" }
    ]);
  };

  return (
    <form className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto flex flex-col gap-4">
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <input
        className="border p-3 rounded-lg"
        placeholder="Título de la lista"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-3 rounded-lg"
        placeholder="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {items.map((item, i) => (
        <input
          key={i}
          className="border p-3 rounded-lg"
          placeholder={`Elemento ${i + 1}`}
          value={item.text}
          onChange={(e) => {
            const newItems = [...items];
            newItems[i].text = e.target.value;
            setItems(newItems);
          }}
        />
      ))}

      <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
        Guardar
      </button>
    </form>
  );
};



