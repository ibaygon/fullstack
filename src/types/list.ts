export interface ListItem {
  id: string;
  title: string;
  category: string;
  items: string[];
}

export interface CreateListDTO {
  title: string;
  category: string;
  items: string[];
}

export interface UpdateListDTO {
  title?: string;
  category?: string;
  items?: string[];
}
