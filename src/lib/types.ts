export type ProductCategory =
  | 't-shirts'
  | 'polos'
  | 'denims'
  | 'trousers'
  | 'shorts'
  | 'hoodies'
  | 'dresses'
  | 'sweaters'
  | 'belts'
  | 'scarves'
  | 'accessories';

export interface SizeStock {
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrls: string[];
  dataAiHint?: string;
  sizes: SizeStock[];
  featured?: boolean;
}

export interface HeroBanner {
  id: string;
  title: string;
  imageUrl: string;
  dataAiHint?: string;
  description?: string;
  offerDetails?: string;
}

export interface CartItem {
  id: string; // This will be composite key: productId-size
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size: string;
}
