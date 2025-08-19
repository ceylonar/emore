'use server';

/**
 * @fileOverview A Genkit flow for updating inventory in Firestore.
 *
 * - addInventoryItem - A function that adds a product or hero banner to Firestore.
 * - AddInventoryItemInput - The input type for the addInventoryItem function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
        await addDoc(collection(db, 'products'), input.data);
        console.log('Product added successfully to Firestore.');
      } else if (input.type === 'heroBanner') {
        await addDoc(collection(db, 'heroBanners'), input.data);
        console.log('Hero banner added successfully to Firestore.');
      }
    } catch (error) {
      console.error('Firestore write error:', error);
      // Re-throw the error to be caught by the calling server action
      if (error instanceof Error) {
        throw new Error(`Failed to add item to Firestore: ${error.message}`);
      }
      throw new Error('An unknown error occurred while writing to Firestore.');
    }
  }
);
