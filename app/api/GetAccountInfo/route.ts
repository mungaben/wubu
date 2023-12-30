import { getAccountInfo } from "@/Utils/Accounts/AccountsOperations";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";





export  async function GET (req:NextRequest,res:NextResponse){
   


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

    const accountInfo = await getAccountInfo(token);
    if (accountInfo.code !== 200) {
        return NextResponse.json({
            status: accountInfo.status,
            code: accountInfo.code,
            data: {
                error: accountInfo.data.error
            },
            message: {
                message: accountInfo.message,
                message2: "error not 200"
            }
        });
    }



    return NextResponse.json({
        status: accountInfo.status,
        code: accountInfo.code,
        data: {
            accountInfo: accountInfo.data.accountInfo
        },
        message: {
            message: accountInfo.message,
            message2: "error not 200"
        }
    });
}