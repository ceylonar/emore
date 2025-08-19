import * as admin from 'firebase-admin';

const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!FIREBASE_SERVICE_ACCOUNT) {
  if (process.env.NODE_ENV === 'production') {
    // In production, we expect the service account to be set.
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT environment variable not set.'
    );
  } else {
    // In development, we can fall back to default credentials.
    console.warn(
      'FIREBASE_SERVICE_ACCOUNT not set. Using default application credentials. This is intended for local development only.'
    );
  }
}

const serviceAccount = FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(FIREBASE_SERVICE_ACCOUNT)
  : undefined;

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
    databaseURL: `https://emor-elegance.firebaseio.com`,
  });
}


export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
