import { getDepositInteractive } from "@/Utils/Accounts/AccountsOperations";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";






export async function GET(req:NextRequest,Res:NextResponse){


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



    const DepositInteractive=await getDepositInteractive(token)

    if (DepositInteractive.code !== 200) {
        return NextResponse.json({
            status: DepositInteractive.status,
            code: DepositInteractive.code,
            data: {
                error: DepositInteractive.data.error
            },
            message: {
                message: DepositInteractive.message,
                message2: "error not 200"
            }
        });
    }

    return NextResponse.json({
        status: "success",
        code: 200,
        data: {
            type: "interactive_customer_info_needed",
            url: "https://staging.benkiko.com/deposit/interactive/5e5e3d3b-4d7d-4f4a-8b6c-7f1a3b1a1b1b",
            id: "5e5e3d3b-4d7d-4f4a-8b6c-7f1a3b1a1b1b"
        },
        message: "Interactive deposit information needed"
    })
}