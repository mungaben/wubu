import firebase from "firebase/compat/app";
import { db, firebase_app } from "./SetUp";
import { getDatabase, ref, set } from "firebase/database";

export const PostUserDataToFireBase = async (username: string, hashed_password: string, paymail: string, publicKey: string, secretKey: string) => {

  try {
    await set(ref(db, 'users/' + username), {
      hashed_password,
      paymail,
      publicKey,
      secretKey
    });
  } catch (error) {
    throw new Error("Error posting user data to firebase");
  }
}


export const GetUserDataFromFireBase = async (username: string) => {
  const db = firebase.database();
  try {
    const snapshot = await db.ref('users/' + username).get();
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error getting user data from firebase");
  }
}


