import { createAccount } from "@/Utils/Accounts/AccountsOperations";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json()

    // Destructure the request body to extract the necessary fields
    const { username, MnemonicComb } = body;
    if (!username || !MnemonicComb) {
        // If any field is missing, return an error response
        return NextResponse.json({
            status: "error",
            code: 400,
            data: {
                error: "missing fields",
                username: username,
                MnemonicComb: MnemonicComb,
            },
            message: `required fields are missing`
        });
    }


    const cookieStore = cookies()
    let token;
    const septokenCookie = cookieStore.get('septoken');
    if (septokenCookie) {
        token = septokenCookie.value;
    }
    // If the token doesn't exist or is expired, get a new one
    if (!token) {

        const Post_TTransaction = await Post_challenge_transaction();

        console.log("Post_TTransaction", Post_TTransaction);

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
    console.log("create account response data ", Response);

    if (Response.code === 400) {
        if(Response.data.username){
            console.log("Response.data.username",Response.data.username);
            
            return NextResponse.json({
                status: Response.status,
                code: Response.code,
                data: Response.data.username[0],
                message: Response.data.username[0],
            });
        }

        return NextResponse.json({
            status: Response.status,
            code: Response.code,
            data: Response.data,
            message: Response.message,
        });
    } else if (Response.code === 401) {
        return NextResponse.json({
            status: Response.status,
            code: Response.code,
            data: Response.data,
            message: Response.message
        });

    } else if (Response.code === 422) {
        return NextResponse.json({
            status: Response.status,
            code: Response.code,
            data: Response.data,
            message: Response.message
        });
    } else if (Response.code === 500) {
        return NextResponse.json({
            status: Response.status,
            code: Response.code,
            data: Response.data,
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