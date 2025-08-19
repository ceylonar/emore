'use server';

import { z } from 'zod';
import { updateWhatsAppNumber } from '@/ai/flows/update-whatsapp-number';
import { setWhatsAppNumber as saveWhatsAppNumberToStore } from '@/lib/store';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
        return { message: result.message, errors: null };
    } else {
        return { message: `Error from AI Tool: ${result.message}`, errors: null };
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { message: `Failed to update number: ${error}`, errors: null };
  }
}


// --- Superadmin Login Action ---
const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function loginSuperAdmin(prevState: any, formData: FormData) {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validatedFields.success) {
        return { error: 'Invalid data provided.'};
    }

    const { username, password } = validatedFields.data;

    // In a real app, use env vars and proper hashing
    if (username === 'admin' && password === 'password') {
        cookies().set('superadmin-auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return { success: true };
    } else {
        return { error: 'Invalid username or password' };
    }
}
