import { fetchCategories } from '../api/productService';

export const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' }
];


export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sortProducts = (products, sortType) => {
  const sorted = [...products];
  switch (sortType) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return products;
  }
};

export const getCategories = async () => {
  const categories = await fetchCategories();

  return categories.map(cat => ({
    value: cat.slug,
    label: cat.name
  }));
};

