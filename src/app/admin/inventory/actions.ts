'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  category: z.enum(['men', 'women', 'accessories']),
  size: z.string().min(1, 'Size is required'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  dataAiHint: z.string().optional(),
});

const heroBannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  dataAiHint: z.string().optional(),
});

export async function addProduct(data: unknown) {
  const validatedFields = productSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await addDoc(collection(db, 'products'), validatedFields.data);
    revalidatePath('/admin/inventory');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create product.' };
  }
}


export async function addHeroBanner(data: unknown) {
  const validatedFields = heroBannerSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await addDoc(collection(db, 'heroBanners'), validatedFields.data);
    revalidatePath('/admin/inventory');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to create hero banner: ${errorMessage}` };
  }
}
