import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { Top5List } from "../types/Top5List";
import { supabase } from "../lib/supabase";
import { mapTop5ListRow } from "../lib/mapTop5ListRow";
import { useAuth } from "./AuthContext";

export type MutateResult = { ok: true } | { ok: false; error: string };

interface Top5ContextType {
  lists: Top5List[];
  addList: (list: Omit<Top5List, "id" | "is_public" | "user_id">) => Promise<void>;
  removeList: (id: number) => Promise<void>;
  setListPublic: (id: number, is_public: boolean) => Promise<MutateResult>;
  updateList: (
    id: number,
    payload: Omit<Top5List, "id" | "is_public" | "user_id">
  ) => Promise<MutateResult>;
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
      setLists(
        data.map((row) => mapTop5ListRow(row as Record<string, unknown>))
      );
    }
  };

  useEffect(() => {
    loadLists();
  }, [user]);

  const addList = async (list: Omit<Top5List, "id" | "is_public" | "user_id">) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("top5_lists")
      .insert({
        ...list,
        user_id: user.id,
        is_public: false,
      })
      .select()
      .single();

    if (!error && data) {
      setLists((prev) => [
        mapTop5ListRow(data as Record<string, unknown>),
        ...prev,
      ]);
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

  const setListPublic = async (id: number, is_public: boolean) => {
    if (!user) return { ok: false as const, error: "Inicia sesión." };

    const { data, error } = await supabase
      .from("top5_lists")
      .update({ is_public })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error || !data) {
      return {
        ok: false as const,
        error:
          error?.message ||
          "No se pudo guardar. ¿Aplicaste las políticas RLS de actualización en Supabase?",
      };
    }

    const mapped = mapTop5ListRow(data as Record<string, unknown>);
    setLists((prev) => prev.map((l) => (l.id === id ? mapped : l)));
    return { ok: true as const };
  };

  const updateList = async (
    id: number,
    payload: Omit<Top5List, "id" | "is_public" | "user_id">
  ) => {
    if (!user) return { ok: false as const, error: "Inicia sesión." };

    const { data, error } = await supabase
      .from("top5_lists")
      .update({
        title: payload.title,
        category: payload.category,
        items: payload.items,
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error || !data) {
      return {
        ok: false as const,
        error: error?.message || "No se pudo guardar la lista.",
      };
    }

    const mapped = mapTop5ListRow(data as Record<string, unknown>);
    setLists((prev) => prev.map((l) => (l.id === id ? mapped : l)));
    return { ok: true as const };
  };

  return (
    <Top5Context.Provider
      value={{ lists, addList, removeList, setListPublic, updateList }}
    >
      {children}
    </Top5Context.Provider>
  );
};

export const useTop5Context = () => {
  const ctx = useContext(Top5Context);
  if (!ctx) throw new Error("useTop5Context debe usarse dentro de Top5Provider");
  return ctx;
};
