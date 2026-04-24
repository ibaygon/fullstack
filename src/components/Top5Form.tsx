import { useState } from "react";
import type { Top5List } from "../types/Top5List.ts";

interface Top5FormProps {
  initialData?: Top5List;
  onSubmit: (data: Omit<Top5List, "id">) => void;
}

export const Top5Form: React.FC<Top5FormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [items, setItems] = useState(initialData?.items || ["", "", "", "", ""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, items });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
    >
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
