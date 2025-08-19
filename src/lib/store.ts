import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const SETTINGS_DOC_ID = 'storeSettings';
const WHATSAPP_NUMBER_KEY = 'whatsAppNumber';

export const getWhatsAppNumber = async (): Promise<string> => {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data()?.[WHATSAPP_NUMBER_KEY]) {
      return docSnap.data()[WHATSAPP_NUMBER_KEY];
    } else {
      // Return a default or initial value if not set
      return '+94751131033';
    }
  } catch (error) {
    console.error("Error fetching WhatsApp number: ", error);
    // Return default in case of error
    return '+94751131033';
  }
};

export const setWhatsAppNumber = async (newNumber: string): Promise<void> => {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    await setDoc(docRef, { [WHATSAPP_NUMBER_KEY]: newNumber }, { merge: true });
    console.log(`[Store] WhatsApp number updated to: ${newNumber}`);
  } catch (error) {
    console.error("Error setting WhatsApp number: ", error);
    // Optionally re-throw or handle the error as needed
  }
};
