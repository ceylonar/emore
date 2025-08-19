'use server';

/**
 * @fileOverview Updates the store's WhatsApp number via admin settings.
 *
 * - updateWhatsAppNumber - A function that updates the WhatsApp number.
 * - UpdateWhatsAppNumberInput - The input type for the updateWhatsAppNumber function.
 * - UpdateWhatsAppNumberOutput - The return type for the updateWhatsAppNumber function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UpdateWhatsAppNumberInputSchema = z.object({
  whatsAppNumber: z
    .string()
    .describe('The new WhatsApp number to update the store to.'),
});
export type UpdateWhatsAppNumberInput = z.infer<typeof UpdateWhatsAppNumberInputSchema>;

const UpdateWhatsAppNumberOutputSchema = z.object({
  success: z.boolean().describe('Whether the update was successful.'),
  message: z.string().describe('A message indicating the result of the update.'),
});
export type UpdateWhatsAppNumberOutput = z.infer<typeof UpdateWhatsAppNumberOutputSchema>;

export async function updateWhatsAppNumber(input: UpdateWhatsAppNumberInput): Promise<UpdateWhatsAppNumberOutput> {
  return updateWhatsAppNumberFlow(input);
}

const updateWhatsAppNumberFlow = ai.defineFlow(
  {
    name: 'updateWhatsAppNumberFlow',
    inputSchema: UpdateWhatsAppNumberInputSchema,
    outputSchema: UpdateWhatsAppNumberOutputSchema,
  },
  async input => {
    // In a real application, you would save the WhatsApp number to a database or
    // configuration file. For this example, we'll just return a success message.
    // You might also want to add validation to the WhatsApp number.

    // Placeholder for actual implementation
    console.log(`WhatsApp number updated to: ${input.whatsAppNumber}`);

    return {
      success: true,
      message: `WhatsApp number updated to ${input.whatsAppNumber} successfully.`, // Added backticks for template literal
    };
  }
);
