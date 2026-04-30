import { useState } from "react";
import type { Top5List } from "../types/Top5List.ts";
import { useTop5Context } from "../context/Top5Context";

interface Top5FormProps {
  initialData?: Top5List;
}

export const Top5Form: React.FC<Top5FormProps> = ({ initialData }) => {
  const { addList } = useTop5Context();

  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [items, setItems] = useState(initialData?.items || ["", "", "", "", ""]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    if (!category.trim()) {
      setError("La categoría es obligatoria");
      return;
    }

    if (items.some((i) => !i.trim())) {
      setError("Todos los elementos deben estar completos");
      return;
    }

    addList({
      id: crypto.randomUUID(),
      title,
      category,
      items,
    });

    setSuccess("Lista creada correctamente");
    setTitle("");
    setCategory("");
    setItems(["", "", "", "", ""]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
    >
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <input
        className="border p-2 rounded"
        placeholder="Título de la lista"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {items.map((item, i) => (
        <input
          key={i}
          className="border p-2 rounded"
          placeholder={`Elemento ${i + 1}`}
          value={item}
          onChange={(e) => {
            const newItems = [...items];
            newItems[i] = e.target.value;
            setItems(newItems);
          }}
        />
      ))}

      <button className="bg-blue-600 text-white py-2 rounded-md">
        Guardar
      </button>
    </form>
  );
};
