'use server';

import { addDoc, collection } from 'firebase/firestore';
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
