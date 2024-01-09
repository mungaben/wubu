import { Create_stellar_account } from "@/Utils/Accounts/AccountsOperations";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";






export async function GET(res: NextRequest, req: NextResponse) {
    // const body = await res.json()

    // const { username} = body



    // get acess token from cookies
    const cookieStore = cookies()
    let token;
    const septokenCookie = cookieStore.get('septoken');
    if (septokenCookie) {
        token = septokenCookie.value;
    }

    // If the token doesn't exist or is expired, get a new one
    if (!token) {
        const Post_TTransaction = await Post_challenge_transaction();
        token = Post_TTransaction.data.token;
        cookieStore.set('septoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: Post_TTransaction.data.expires_in,
        });
    }

    // create stellar account
    const Create_Stellar_Account = await Create_stellar_account(token, "test0");


    if (Create_Stellar_Account?.code!== 201) {
        return NextResponse.json({
            status: Create_Stellar_Account?.status,
            code: Create_Stellar_Account?.code,
            data: {
                error: Create_Stellar_Account?.data
            },
            message: {
                message: Create_Stellar_Account?.message,
                message2: "error not 200"
            }
        });
    }

    

    
   

    return NextResponse.json({
        message: 'hello'
    })
}