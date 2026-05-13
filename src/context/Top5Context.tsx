import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { Top5List } from "../types/Top5List";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

interface Top5ContextType {
  lists: Top5List[];
  addList: (list: Omit<Top5List, "id">) => Promise<void>;
  removeList: (id: number) => Promise<void>;
}

const Top5Context = createContext<Top5ContextType | null>(null);

export const Top5Provider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [lists, setLists] = useState<Top5List[]>([]);

  const loadLists = async () => {
    if (!user) {
      setLists([]);
      return;
    }

    const { data, error } = await supabase
      .from("top5_lists")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (!error && data) {
      setLists(data);
    }
  };

  useEffect(() => {
    loadLists();
  }, [user]);

  const addList = async (list: Omit<Top5List, "id">) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("top5_lists")
      .insert({
        ...list,
        user_id: user.id,
      })
      .select()
      .single();

    if (!error && data) {
      setLists((prev) => [data, ...prev]);
    }
  };

  const removeList = async (id: number) => {
    const { error } = await supabase
      .from("top5_lists")
      .delete()
      .eq("id", id);

    if (!error) {
      setLists((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <Top5Context.Provider value={{ lists, addList, removeList }}>
      {children}
    </Top5Context.Provider>
  );
};

export const useTop5Context = () => {
  const ctx = useContext(Top5Context);
  if (!ctx) throw new Error("useTop5Context debe usarse dentro de Top5Provider");
  return ctx;
};
