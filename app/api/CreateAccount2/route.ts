import { createAccount } from "@/Utils/Accounts/AccountsOperations";
import { CreateStellarAccount } from "@/Utils/Accounts/CreateAccount";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json()

    // Destructure the request body to extract the necessary fields
    const { username, MnemonicComb } = body;

    const cookieStore = cookies()
    let token;
    const septokenCookie = cookieStore.get('septoken');
    if (septokenCookie) {
        token = septokenCookie.value;
    }

    // If the token doesn't exist or is expired, get a new one
    if (!token) {
        console.log("token not set");

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

    const Response = await createAccount(token, username, MnemonicComb);
    if (Response.code !== 201) {
        return NextResponse.json({
            status: Response.status,
            code: Response.code,
            data: {
                error: Response.data.error
            },
            message: Response.message
        });
    }

    return NextResponse.json({
        status: Response.status,
        code: Response.code,
        data: {
            public_key: Response.data['public key'],
            paymail: Response.data.paymail,
            secret_key: Response.data['secret key'],
            muxed_account: Response.data['muxed account'],
            muxed_id: Response.data['muxed id']
        },
        message: Response.message
    });
}