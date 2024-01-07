import { getDatabase, ref, get } from "firebase/database";
import { db } from "@/Store/FireBase/SetUp";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

    //  Extract username from request body
    const username = "test";

    const dbRef = ref(db, 'users/' + username);
    console.log("def data", dbRef);

    // try {
    //     const dbRef = ref(db, 'users/' + username);
    //      console.log("def data",dbRef);
    //     const snapshot = await get(dbRef);
    //     if (snapshot.exists()) {
    //         return NextResponse.json({
    //             status: "success",
    //             data: snapshot.val(),

    //         });

    //     } else {
    //         return NextResponse.json({
    //             status: "error",
    //             data: "No data available",

    //         });
    //     }
    // } catch (error) {
    //     throw new Error("Error getting user data from firebase");
    // }
    return NextResponse.json({
        message:"hello"
    })
}