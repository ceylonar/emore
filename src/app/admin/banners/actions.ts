'use server';

import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { HeroBanner } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function addBanner(bannerData: Omit<HeroBanner, 'id'>) {
    try {
        const bannersCollection = collection(db, 'heroBanners');
        const docRef = await addDoc(bannersCollection, bannerData);
        console.log("Document written with ID: ", docRef.id);
        revalidatePath('/admin/banners');
        revalidatePath('/');
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { success: false, error: `Failed to add banner: ${errorMessage}` };
    }
}

export async function updateBanner(bannerId: string, bannerData: Partial<Omit<HeroBanner, 'id'>>) {
    try {
        const bannerRef = doc(db, 'heroBanners', bannerId);
        await updateDoc(bannerRef, bannerData);
        revalidatePath('/admin/banners');
        revalidatePath('/');
        return { success: true };
    } catch (e) {
        console.error("Error updating document: ", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { success: false, error: `Failed to update banner: ${errorMessage}` };
    }
}

export async function deleteBanner(bannerId: string) {
    try {
        await deleteDoc(doc(db, 'heroBanners', bannerId));
        revalidatePath('/admin/banners');
        revalidatePath('/');
        return { success: true };
    } catch (e) {
        console.error("Error deleting document: ", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { success: false, error: `Failed to delete banner: ${errorMessage}` };
    }
}
