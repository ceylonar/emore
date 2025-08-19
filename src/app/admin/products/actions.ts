'use server';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function addProduct(productData: Omit<Product, 'id'>) {
    try {
        const productsCollection = collection(db, 'products');
        const docRef = await addDoc(productsCollection, productData);
        console.log("Document written with ID: ", docRef.id);
        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: "Failed to add product" };
    }
}
