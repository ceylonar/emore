import type { Product, HeroBanner } from '@/lib/types';

export const mockHeroBanners: HeroBanner[] = [
  { id: '1', title: 'Beyond Linen', imageUrl: 'https://placehold.co/1600x800', dataAiHint: 'fashion model' },
  { id: '2', title: 'Summer Collection', imageUrl: 'https://placehold.co/1600x800', dataAiHint: 'summer fashion' },
  { id: '3', title: 'Italian Craftsmanship', imageUrl: 'https://placehold.co/1600x800', dataAiHint: 'italian street' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Verona Linen Shirt',
    description: 'A classic white linen shirt, perfect for any occasion. Made with the finest Italian linen.',
    price: 120.00,
    category: 'men',
    imageUrl: 'https://placehold.co/600x800',
    dataAiHint: 'linen shirt'
  },
  {
    id: '2',
    name: 'Amalfi Coast Dress',
    description: 'Flowy and elegant, this dress captures the essence of the Italian coast.',
    price: 250.00,
    category: 'women',
    imageUrl: 'https://placehold.co/600x800',
    dataAiHint: 'elegant dress'
  },
  {
    id: '3',
    name: 'Tuscan Leather Belt',
    description: 'Handcrafted from genuine Tuscan leather, this belt is a timeless accessory.',
    price: 95.00,
    category: 'accessories',
    imageUrl: 'https://placehold.co/600x800',
    dataAiHint: 'leather belt'
  },
  {
    id: '4',
    name: 'Milano Silk Scarf',
    description: 'A luxurious silk scarf with a unique print, designed in Milano.',
    price: 75.00,
    category: 'accessories',
    imageUrl: 'https://placehold.co/600x800',
    dataAiHint: 'silk scarf'
  },
  {
    id: '5',
    name: 'Capri Chino Trousers',
    description: 'Comfortable and stylish chino trousers, ideal for a smart-casual look.',
    price: 150.00,
    category: 'men',
    imageUrl: 'https://placehold.co/600x800',
    dataAiHint: 'chino trousers'
  },
  {
    id: '6',
    name: 'Florence Knit Sweater',
    description: 'A soft, high-quality knit sweater for cooler evenings.',
    price: 180.00,
    category: 'women',
    imageUrl: 'https://placehold.co/600x800',
    dataAiHint: 'knit sweater'
  },
];

export const getProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts;
};

export const getHeroBanners = async (): Promise<HeroBanner[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHeroBanners;
};
