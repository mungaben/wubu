import { mergeAccounts } from "@/Utils/Accounts/AccountsOperations";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { TMergePostTransactionResponse } from "@/Utils/TypesGenerated";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest,res:NextResponse){

    const body = await req.json()

    const {destination, secret_key} = body

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

    if (!token) {
        return NextResponse.json({
            message: 'token not set'
        })
    }



    const MergeAccountResponse: TMergePostTransactionResponse = await mergeAccounts(token, destination, secret_key);




    return NextResponse.json({
        message:"hello world"
    })
}