import { useEffect, useState } from "react";
import type { Top5List } from "../types/Top5List";

export function useTop5Lists() {
  const [lists, setLists] = useState<Top5List[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de API
    setTimeout(() => {
      setLists([
        {
          id: "1",
          title: "Top 5 Películas",
          category: "Cine",
          items: ["Inception", "Matrix", "Interstellar", "Avatar", "Gladiator"],
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return { lists, loading };
}
