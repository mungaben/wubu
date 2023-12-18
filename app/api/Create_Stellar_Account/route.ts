import { Create_stellar_account } from "@/Utils/Accounts/AccountsOperations";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";






export async function GET(res: NextRequest, req: NextResponse) {


    // get acess token from cookies
    const cookieStore = cookies()
    let token;
    const septokenCookie = cookieStore.get('septoken');
    if (septokenCookie) {
        token = septokenCookie.value;
    }

    // If the token doesn't exist or is expired, get a new one
    if (!token) {
        console.log('====================================');
        console.log("no Token");
        console.log('====================================');
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
    const Create_Stellar_Account = await Create_stellar_account(token);
    console.log('====================================');
    console.log('Create_Stellar_Account', Create_Stellar_Account);
    console.log('====================================');

    if (Create_Stellar_Account) {
        console.log('====================================');
        console.log('Create_Stellar_Account', Create_Stellar_Account);
        console.log('====================================');
    }

    return NextResponse.json({
        message: 'hello'
    })
}