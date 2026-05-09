export interface Quote {
  id: number;
  text: string;
  author: string;
  category: 'Boy' | 'Girl' | 'Boyfriend' | 'Girlfriend';
  subcategory: string;
}

export interface FavoritesState {
  favorites: Quote[];
  isLoading: boolean;
  error: string | null;
}