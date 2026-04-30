import { useState } from "react";
import { useTop5Context } from "../context/Top5Context";
import { useNavigate } from "react-router-dom";

export const CreatePage = () => {
  const { addList } = useTop5Context();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState(["", "", "", "", ""]);

  const handleItemChange = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  const handleSave = () => {
    addList({
      id: crypto.randomUUID(),
      title,
      category,
      items,
    });

    navigate("/listas");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear lista Top 5</h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Título de la lista"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {items.map((item, i) => (
        <input
          key={i}
          className="border p-2 w-full mb-2"
          placeholder={`Elemento #${i + 1}`}
          value={item}
          onChange={(e) => handleItemChange(i, e.target.value)}
        />
      ))}

      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={handleSave}
      >
        Guardar
      </button>
    </div>
  );
};

