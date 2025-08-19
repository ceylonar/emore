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
        
        // Revalidate the paths where the banners are displayed
        revalidatePath('/');
        revalidatePath('/manage-banners');

        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: "Failed to add banner" };
    }
}