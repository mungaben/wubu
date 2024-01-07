import { changeTrust } from "@/Utils/Accounts/AccountsOperations";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";






export async function POST(req: NextRequest, res: NextResponse) {


    const body = await req.json()

    const { asset_code, limit, secret_key } = body

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



    const chageTrustResponse = await changeTrust(token, asset_code, limit, secret_key);


    if (chageTrustResponse.code !== 201) {
        return NextResponse.json({
            status: chageTrustResponse.status,
            code: chageTrustResponse.code,
            data: {
                error: chageTrustResponse.data
            },
            message: {
                message: chageTrustResponse.message,
                message2: "error not 201"
            }
        });
    }




    return NextResponse.json({
        status: chageTrustResponse.status,
        code: chageTrustResponse.code,
        data: {
            detail: chageTrustResponse.data.detail
        },
        message: chageTrustResponse.message

    })

}