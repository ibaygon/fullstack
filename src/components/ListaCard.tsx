import React from "react";
import type { Top5List } from "../types/Top5List";
import { useTop5Context } from "../context/Top5Context";

interface ListaCardProps {
  list: Top5List;
  onClick: () => void;
}

export const ListaCard = ({ list, onClick }: ListaCardProps) => {
  const { removeList } = useTop5Context();

  const handleDelete = () => {
    if (list.id !== undefined) {
      removeList(list.id);
    }
  };

  return (
    <div className="border p-4 rounded shadow bg-white flex flex-col">
      {/* Contenido clicable */}
      <div
        className="cursor-pointer flex-1"
        onClick={() => list.id !== undefined && onClick()}
      >
        <h2 className="text-xl font-bold">{list.title}</h2>
        <p className="text-sm text-gray-500">{list.category}</p>

        <ul className="mt-2 list-disc ml-4">
          {list.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Botón de eliminar debajo */}
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Eliminar
      </button>
    </div>
  );
};



