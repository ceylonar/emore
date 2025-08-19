'use server';

import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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
        revalidatePath(`/product/${docRef.id}`);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { success: false, error: `Failed to add product: ${errorMessage}` };
    }
}

export async function updateProduct(productId: string, productData: Partial<Omit<Product, 'id'>>) {
    try {
        const productRef = doc(db, 'products', productId);
        await updateDoc(productRef, productData);
        revalidatePath('/admin/products');
        revalidatePath('/');
        revalidatePath(`/product/${productId}`);
        return { success: true };
    } catch (e) {
        console.error("Error updating document: ", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { success: false, error: `Failed to update product: ${errorMessage}` };
    }
}

export async function deleteProduct(productId: string) {
    try {
        await deleteDoc(doc(db, 'products', productId));
        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true };
    } catch (e) {
        console.error("Error deleting document: ", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { success: false, error: `Failed to delete product: ${errorMessage}` };
    }
}
