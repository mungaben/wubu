import {
  Get_challenge_transaction_validation,
  Post_challenge_transaction,
} from "@/Utils/GetAccessToken";


import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

  const Post_TTransaction = await Post_challenge_transaction();
  console.log("====================================");
  console.log("Post_TTransaction", Post_TTransaction.data);
  console.log("====================================");

  return NextResponse.json({
    status: 200,
    code: 200,
    data: {
      message: "success",
    },
    message: "success",
  });
}
