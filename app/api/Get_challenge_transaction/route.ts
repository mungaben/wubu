/* trunk-ignore-all(prettier) */
import { Get_challenge_transaction } from "@/Utils/GetAccessToken";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest, res: NextResponse) {

    const Response = await Get_challenge_transaction()


    if (Response.code !== 200) {
        return NextResponse.json({
            status: Response.status,
            code: Response.code,
            data: {
                error: Response.data.error,
            },
            message: Response.message,
        })
    }

    return NextResponse.json({
        status: Response.status,
        code: Response.code,
        data: {
            transaction: Response.data.transaction,
            network_passphrase: Response.data.network_passphrase,
        },
        message: Response.message,
    })
}

