import type { Top5List } from "../types/Top5List";

/** Fila PostgREST / Supabase → modelo de la app */
export function mapTop5ListRow(row: Record<string, unknown>): Top5List {
  const items = row.items;
  return {
    id: row.id as number,
    title: String(row.title ?? ""),
    category: String(row.category ?? ""),
    items: Array.isArray(items) ? (items as Top5List["items"]) : [],
    is_public: row.is_public === true,
    user_id: row.user_id != null ? String(row.user_id) : undefined,
  };
}
