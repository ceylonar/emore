'use server';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { HeroBanner } from '@/lib/types';

export async function addBanner(bannerData: Omit<HeroBanner, 'id'>) {
    try {
        const bannersCollection = collection(db, 'heroBanners');
        const docRef = await addDoc(bannersCollection, bannerData);
        console.log("Document written with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: "Failed to add banner" };
    }
}
