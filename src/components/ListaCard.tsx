import type { Top5List } from "../types/Top5List.ts";

interface ListaCardProps {
  list: Top5List;
  onClick?: () => void;
}

export const ListaCard: React.FC<ListaCardProps> = ({ list, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:scale-[1.02] transition"
    >
      <h3 className="text-lg font-semibold">{list.title}</h3>
      <p className="text-sm text-gray-500">{list.category}</p>

      <ul className="mt-3 text-gray-700 text-sm">
        {list.items.slice(0, 3).map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};
