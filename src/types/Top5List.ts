export interface Top5List {
  id?: number;
  title: string;
  category: string;
  items: {
    text: string;
    image?: string;
  }[];
  /** Si es true, cualquiera con el enlace puede ver la lista (sin tu cuenta). */
  is_public?: boolean;
  user_id?: string;
}
