import type { Product, HeroBanner } from '@/lib/types';
import { db } from './firebase';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';

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

export const getProductById = async (id: string): Promise<Product | null> => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
        return null;
    }
}

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
