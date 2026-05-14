import { useTop5Context } from "../context/Top5Context";
import { ListaCard } from "./ListaCard";
import { EmptyState } from "./EmptyState";

export const ListView = () => {
  const { lists } = useTop5Context();

  if (lists.length === 0) {
    return (
      <div className="py-16">
        <EmptyState message="No hay listas aún. ¡Crea tu primera lista!" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {lists.map((list) => (
        <ListaCard key={list.id} list={list} />
      ))}
    </div>
  );
};
