import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { Top5List } from "../types/Top5List";

interface Top5ContextType {
  lists: Top5List[];
  addList: (list: Top5List) => void;
}

const Top5Context = createContext<Top5ContextType | null>(null);

export const Top5Provider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<Top5List[]>([]);

  // Cargar listas desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("top5lists");
    if (saved) {
      setLists(JSON.parse(saved));
    }
  }, []);

  // Guardar listas cada vez que cambian
  useEffect(() => {
    localStorage.setItem("top5lists", JSON.stringify(lists));
  }, [lists]);

  const addList = (list: Top5List) => {
    setLists((prev) => [...prev, list]);
  };

  return (
    <Top5Context.Provider value={{ lists, addList }}>
      {children}
    </Top5Context.Provider>
  );
};

export const useTop5Context = () => {
  const ctx = useContext(Top5Context);
  if (!ctx) throw new Error("useTop5Context debe usarse dentro de Top5Provider");
  return ctx;
};
