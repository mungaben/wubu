import { PostUserDataToFireBase } from "@/Store/FireBase/PostData";
import { db } from "@/Store/FireBase/SetUp";
import { get, ref, set } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {

    //  Extract username from request body
    const username = "test";

    const dbRef = ref(db, 'users/' + username);
    console.log("def data", dbRef);

    const DataAvail = await PostUserDataToFireBase("test1", "test1", "test1", "test1", "test1");
    console.log("data avail", DataAvail);

    return NextResponse.json({
        status: "success",
        data: "test",
        response: DataAvail,
        message: "hello"
    })
}


export async function POST(req: NextRequest, res: NextResponse) {
    //  Extract username from request body

    const body = await req.json()

    // Destructure the request body to extract the necessary fields
    const { public_key, secret_key, paymail, username, hashed_password } = body;

    // Check if all necessary fields are present in the request body
    if (!public_key || !paymail || !secret_key || !username || !hashed_password) {
        // If any field is missing, return an error response
        return NextResponse.json({
            status: "error",
            data: {
                error: "missing fields",
                public_key: public_key,
                paymail: paymail,
                secret_key: secret_key,
                username: username,
                hashed_password: hashed_password

            },
            message: `required fields are missing`
        });
    }









    // Sanitize the paymail by encoding it and replacing certain characters with '_'
    const sanitizedPaymail = encodeURIComponent(paymail).replace(/\%|\*|\./g, '_');

    // Create a reference to the location in the database where the user's data will be stored
    const dbRef = ref(db, 'users/' + username);

    // Get a snapshot of the data at the referenced location in the database
    const snapshot = await get(dbRef);
    if (!snapshot.exists()) {
        try {
            await set(ref(db, 'users/' + username), {
                hashed_password,
                paymail,
                public_key,
                secret_key
            });
            return NextResponse.json({
                status: "success",
                data: "test",
                response: `${paymail} posted to firebase `,

            })
        } catch (error) {
            return NextResponse.json({
                status: "error",
                data: "test",
                response: `${paymail} already exists `,

            })
        }
    }

    return NextResponse.json({
        status: "success",
        data: "test",
        response: `${paymail} already exists `,

    })

}