export type SortOption =
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'discount'
  | 'rating'
  | 'newest';

export interface SearchFilters {
  query: string;
  category: string | null;
  brand: string | null;
  platformId: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  availability: 'any' | 'in_stock' | 'out_of_stock';
  sort: SortOption;
  page: number;
  pageSize: number;
}

export interface SearchSuggestionGroup {
  products: Array<{ id: string; title: string }>;
  brands: string[];
  categories: string[];
}

export const defaultSearchFilters: SearchFilters = {
  query: '',
  category: null,
  brand: null,
  platformId: null,
  minPrice: null,
  maxPrice: null,
  minRating: null,
  availability: 'any',
  sort: 'relevance',
  page: 1,
  pageSize: 9,
};
