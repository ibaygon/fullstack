import { useState, useMemo, useCallback } from "react";
import { useTop5Context } from "../context/Top5Context";
import { EmptyState } from "./EmptyState";
import { ListaCard } from "./ListaCard";

export const ListView = () => {
  const { lists } = useTop5Context();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const totalItems = useMemo(() => {
    return lists.reduce((acc, list) => acc + list.items.length, 0);
  }, [lists]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  if (lists.length === 0) {
    return <EmptyState message="No hay listas aún." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {lists.map((list) => (
        <ListaCard
          key={list.id}
          list={list}
          onClick={() => handleSelect(list.id)}
        />
      ))}
      <p className="text-sm text-gray-500 col-span-full">
        Total de elementos en todas las listas: {totalItems}
      </p>
    </div>
  );
};
