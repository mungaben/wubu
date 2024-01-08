import { getDatabase, ref, get } from "firebase/database";
import { db } from "@/Store/FireBase/SetUp";
import { NextRequest, NextResponse } from "next/server";
import { PostUserDataToFireBase } from "@/Store/FireBase/PostData";

export async function GET(req: NextRequest, res: NextResponse) {

    //  Extract username from request body
    const username = "test";

    const dbRef = ref(db, 'users/' + username);
    console.log("def data", dbRef);

    const DataAvail=await PostUserDataToFireBase ("test","test","test","test","test");
    console.log("data avail",DataAvail);
    
    return NextResponse.json({
        status: "success",
        data: "test",
        response:DataAvail,
        message:"hello"
    })
}