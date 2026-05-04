import type { Top5List } from "../types/Top5List";
import { useTop5Context } from "../context/Top5Context";

interface ListaCardProps {
  list: Top5List;
  onClick?: () => void;
}

export const ListaCard = ({ list, onClick }: ListaCardProps) => {
  const { removeList } = useTop5Context();

  return (
    <div className="relative p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition">

      {/* Contenido */}
      <div onClick={onClick} className="cursor-pointer pb-10">
        <h2 className="text-xl font-bold mb-2">{list.title}</h2>
        <p className="text-sm text-gray-500 mb-3">Categoría: {list.category}</p>

        <ul className="list-disc list-inside space-y-1">
          {list.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Botón de eliminar abajo a la derecha */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeList(list.id);
        }}
        className="absolute bottom-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
      >
        Eliminar
      </button>
    </div>
  );
};


