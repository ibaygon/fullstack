import type { Top5List } from "../types/Top5List";

interface ListaCardProps {
  list: Top5List;
  onClick?: () => void;
}

export const ListaCard = ({ list, onClick }: ListaCardProps) => {
  return (
    <div
      className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold mb-2">{list.title}</h2>
      <p className="text-sm text-gray-500 mb-3">Categoría: {list.category}</p>

      <ul className="list-disc list-inside space-y-1">
        {list.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

