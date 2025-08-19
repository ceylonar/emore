// This is a mock store. In a real application, use a database like Firestore.
let whatsAppNumber = '+1234567890'; // Default number

export const getWhatsAppNumber = async (): Promise<string> => {
  // In a real app, you'd fetch this from your database.
  return Promise.resolve(whatsAppNumber);
};

export const setWhatsAppNumber = async (newNumber: string): Promise<void> => {
  // In a real app, you'd save this to your database.
  console.log(`[Store] WhatsApp number updated to: ${newNumber}`);
  whatsAppNumber = newNumber;
  return Promise.resolve();
};
