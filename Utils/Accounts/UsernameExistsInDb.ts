import { db } from "@/Store/FireBase/SetUp";
import { get, ref } from "firebase/database";


export const usernameExistsInDb = async (username: string) => {

    try {
        // Create a reference to the location in the database where the user's data will be stored
        const dbRef = ref(db, 'users/' + username);

        // Get a snapshot of the data at the referenced location in the database
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error("Error getting user data from firebase");
    }
}
