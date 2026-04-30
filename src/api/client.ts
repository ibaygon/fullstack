import type { ListItem, CreateListDTO, UpdateListDTO } from "../types/list";

const API_URL = "http://localhost:3000/api/lists";

export async function getLists(): Promise<ListItem[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error fetching lists");
  return res.json();
}

export async function getList(id: string): Promise<ListItem> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("List not found");
  return res.json();
}

export async function createList(data: CreateListDTO): Promise<ListItem> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creating list");
  return res.json();
}

export async function updateList(id: string, data: UpdateListDTO): Promise<ListItem> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error updating list");
  return res.json();
}

export async function deleteList(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting list");
}

