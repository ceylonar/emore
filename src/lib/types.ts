export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'accessories';
  imageUrl: string;
  dataAiHint?: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
