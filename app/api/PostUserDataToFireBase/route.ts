import { getDatabase, ref, get } from "firebase/database";
import { db } from "@/Store/FireBase/SetUp";
import { NextRequest, NextResponse } from "next/server";
import { PostUserDataToFireBase } from "@/Store/FireBase/PostData";

export async function GET(req: NextRequest, res: NextResponse) {

    //  Extract username from request body
    const username = "test";

    const dbRef = ref(db, 'users/' + username);
    console.log("def data", dbRef);

    const DataAvail = await PostUserDataToFireBase("test", "test", "test", "test", "test");
    console.log("data avail", DataAvail);

    return NextResponse.json({
        status: "success",
        data: "test",
        response: DataAvail,
        message: "hello"
    })
}


// post   data: {
//     'public key': 'GB2UFNZGEOFPHVLDGKIXXBD3EMVTUTYQ63WVGWYNRROWFALNHY5AMAK2',
//     paymail: 'username0105*benkiko.io',
//     'secret key': 'gAAAAABlnPYMaGRCszi5h_wzom74hPN0HPf_VNBiqbZ8FrlGVlfFmGsp0OJTtrj0e-S9vzV64ZgwWsxjM1ClzQEOMjqzrJ_SfMuIhUu8xK50MSulw4RSRldlhZh6nL2A_-hKPkJHH_HQl_al0WaPlGF9Tv3mSWFX7w==',
//     'muxed account': 'MB2UFNZGEOFPHVLDGKIXXBD3EMVTUTYQ63WVGWYNRROWFALNHY5AMAAAAAAAAABDI4UEW',
//     'muxed id': 9031
//   },


export async function POST(req: NextRequest, res: NextResponse) {
    //  Extract username from request body

    const body = await req.json()

    const { 'public key': public_key, paymail, 'secret key': secret_key, 'muxed account': muxed_account, 'muxed id': muxed_id } = body;
    console.log('====================================');
    console.log("body", public_key, paymail, secret_key, muxed_account, muxed_id);
    console.log('====================================');

    if (!public_key || !paymail || !secret_key || !muxed_account || !muxed_id) {
        return NextResponse.json({
            status: "error",
            data: {
                error: "Invalid data"
            },
            message: {
                message: "Invalid data"
            }
        });
    }
    console.log('====================================');
    console.log("paymail", paymail);
    console.log('====================================');
    const sanitizedPaymail = encodeURIComponent(paymail).replace(/\%|\*|\./g, '_');
    const dbRef = ref(db, 'users/' + sanitizedPaymail);
    console.log('====================================');
    console.log("sanitizedPaymail", sanitizedPaymail);
    console.log('====================================');
    // console.log("def data", dbRef);
    const snapshot = await get(dbRef);
    // if (snapshot.exists()) {
    //     console.log(snapshot.val());
    // } else {
    //     console.log("No data available");
    // }

    console.log('====================================');
    console.log(snapshot.val());
    console.log('====================================');
    const DataAvail = await PostUserDataToFireBase(public_key, paymail, secret_key, muxed_account, muxed_id);
    console.log("data avail", DataAvail);

    return NextResponse.json({
        status: "success",
        data: "test",
        response: DataAvail,
        message: "hello"
    })
}