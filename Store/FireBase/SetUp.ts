import firebase, { getApps, initializeApp } from 'firebase/app';
import 'firebase/database';
import { getDatabase } from 'firebase/database';


// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


// Initialize Firebase
export let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getDatabase(firebase_app);













// const db = firebase.database();

// // POST to users/{{ username }}
// function postUser(username: string, hashed_password: string, paymail: string, publicKey: string, secretKey: string): Promise<void> {
//   return db.ref('users/' + username).set({
//     hashed_password,
//     paymail,
//     publicKey,
//     secretKey
//   });
// }