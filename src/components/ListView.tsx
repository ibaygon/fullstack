import { useState, useMemo, useCallback } from "react";
import type { Top5List } from "../types/Top5List";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { EmptyState } from "./EmptyState";
import { ListaCard } from "./ListaCard";

interface ListViewProps {
  lists: Top5List[];
  loading: boolean;
  error?: string;
  onSelect: (id: string) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  lists,
  loading,
  error,
  onSelect,
}) => {


  const [selectedId, setSelectedId] = useState<string | null>(null);

  const totalItems = useMemo(() => {
    return lists.reduce((acc, list) => acc + list.items.length, 0);
  }, [lists]);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
      onSelect(id);
    },
    [onSelect]
  );

  if (loading) return <Loader message="Cargando listas..." />;
  if (error) return <ErrorMessage message={error} />;
  if (lists.length === 0)
    return <EmptyState message="No hay listas aún." />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {lists.map((list) => (
        <ListaCard
          key={list.id}
          list={list}
          onClick={() => handleSelect(list.id)}
        />
      ))}

      {/* Ejemplo de uso de useMemo */}
      <p className="text-sm text-gray-500 col-span-full">
        Total de elementos en todas las listas: {totalItems}
      </p>
    </div>
  );
};

