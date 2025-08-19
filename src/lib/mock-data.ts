import type { Product, HeroBanner } from '@/lib/types';
import { db } from './firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export const getProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(db, 'products');
  const q = query(productsCollection);
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
  return products;
};

export const getHeroBanners = async (): Promise<HeroBanner[]> => {
  const bannersCollection = collection(db, 'heroBanners');
  const q = query(bannersCollection);
  const querySnapshot = await getDocs(q);
  const banners = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as HeroBanner[];
  return banners;
};
