'use server';

/**
 * @fileOverview A Genkit flow for updating inventory in Firestore using the Firebase Admin SDK.
 *
 * - addInventoryItem - A function that adds a product or hero banner to Firestore.
 * - AddInventoryItemInput - The input type for the addInventoryItem function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { adminDb } from '@/lib/firebase-admin';

const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(['men', 'women', 'accessories']),
  size: z.string(),
  stock: z.number(),
  imageUrl: z.string(),
  dataAiHint: z.string().optional(),
});

const HeroBannerSchema = z.object({
  title: z.string(),
  imageUrl: z.string(),
  dataAiHint: z.string().optional(),
});

const AddInventoryItemInputSchema = z.union([
  z.object({
    type: z.literal('product'),
    data: ProductSchema,
  }),
  z.object({
    type: z.literal('heroBanner'),
    data: HeroBannerSchema,
  }),
]);

export type AddInventoryItemInput = z.infer<typeof AddInventoryItemInputSchema>;

export async function addInventoryItem(input: AddInventoryItemInput): Promise<void> {
  return addInventoryItemFlow(input);
}

const addInventoryItemFlow = ai.defineFlow(
  {
    name: 'addInventoryItemFlow',
    inputSchema: AddInventoryItemInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    try {
      if (input.type === 'product') {
        // Using Admin SDK to bypass Firestore rules for admin actions
        await adminDb.collection('products').add(input.data);
        console.log('Product added successfully to Firestore via Admin SDK.');
      } else if (input.type === 'heroBanner') {
        // Using Admin SDK to bypass Firestore rules for admin actions
        await adminDb.collection('heroBanners').add(input.data);
        console.log('Hero banner added successfully to Firestore via Admin SDK.');
      }
    } catch (error) {
      console.error('Firestore write error (Admin SDK):', error);
      if (error instanceof Error) {
        throw new Error(`Failed to add item to Firestore: ${error.message}`);
      }
      throw new Error('An unknown error occurred while writing to Firestore.');
    }
  }
);
