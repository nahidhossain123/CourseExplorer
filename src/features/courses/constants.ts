export const CATEGORIES = ['All', 'Design', 'Development', 'Business'];

export const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const SORT_OPTIONS = [
  { label: 'Rating', value: 'rating' },
  { label: 'Price (Low to High)', value: 'price_asc' },
  { label: 'Price (High to Low)', value: 'price_desc' },
  { label: 'Duration', value: 'duration' },
] as const;

export type SortValue = typeof SORT_OPTIONS[number]['value'];
