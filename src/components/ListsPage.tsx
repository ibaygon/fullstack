import { useEffect, useState } from "react";
import { getLists } from "../api/client";
import type { ListItem } from "../types/list";

export function ListsPage() {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLists()
      .then(setLists)
      .catch(() => setError("Error loading lists"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {lists.map((l) => (
        <li key={l.id}>{l.title}</li>
      ))}
    </ul>
  );
}
