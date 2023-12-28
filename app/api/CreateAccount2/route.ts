import { createAccount } from "@/Utils/Accounts/AccountsOperations";
import { CreateStellarAccount } from "@/Utils/Accounts/CreateAccount";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest, res: NextResponse) {


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

    // log token
    console.log('====================================');
    console.log('token', typeof token, token);
    console.log('====================================');




    const Response = await createAccount(token);
    if (Response.code !== 201) {
        return NextResponse.json({
            status: Response.status,
            code: Response.code,
            data: {
                error: Response.data.error
            },
            message: {
                message: Response.message,
                message2: "error not 200"
            }
        });
    }
    console.log('====================================');
    console.log('Response', Response);
    console.log('====================================');
    return NextResponse.json({
        status: Response.status,
        code: Response.code,
        data: {
            'public key': Response.data['public key'],
            paymail: Response.data.paymail,
            'secret key': Response.data['secret key'],
            'muxed account': Response.data['muxed account'],
            'muxed id': Response.data['muxed id']
        },
        message: Response.message
    });
}