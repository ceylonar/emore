'use server';

import { z } from 'zod';
import { updateWhatsAppNumber } from '@/ai/flows/update-whatsapp-number';
import { setWhatsAppNumber as saveWhatsAppNumberToStore } from '@/lib/store';
import { revalidatePath } from 'next/cache';

// --- WhatsApp Number Update Action ---

const updateSchema = z.object({
  whatsAppNumber: z.string().min(10, { message: 'Please enter a valid phone number with country code.' }),
});

export async function handleUpdateWhatsAppNumber(prevState: any, formData: FormData) {
  const validatedFields = updateSchema.safeParse({
    whatsAppNumber: formData.get('whatsAppNumber'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
    };
  }
  
  try {
    // Call the GenAI flow
    const result = await updateWhatsAppNumber({ whatsAppNumber: validatedFields.data.whatsAppNumber });
    
    if (result.success) {
        // Also save to our mock store for retrieval in the app
        await saveWhatsAppNumberToStore(validatedFields.data.whatsAppNumber);
        revalidatePath('/admin/settings');
        revalidatePath('/checkout');
        return { message: result.message, errors: null };
    } else {
        return { message: `Error from AI Tool: ${result.message}`, errors: null };
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { message: `Failed to update number: ${error}`, errors: null };
  }
}
