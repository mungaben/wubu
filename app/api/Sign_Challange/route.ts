import {
  SIGNING_SEED,
  Sign_challenge_transaction,
} from "@/Utils/GetAccessToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { TRANSACTION_XDR } = body;

  console.log('====================================');
  console.log('TRANSACTION_XDR', TRANSACTION_XDR);
  console.log('====================================');
 
  if (!TRANSACTION_XDR) {
    return NextResponse.json({
      status: 400,
      data: {
        error: "Transaction XDR is not set ",
      },
      message: "Sign challenge transaction failed",
    });
  }

  if (!SIGNING_SEED) {
    return NextResponse.json({
      status: 400,
      data: {
        error: "Client_account_signing_seed is not set ",
      },
      message: "Sign challenge transaction failed",
    });
  }

  const Sign_Transaction_Response = await Sign_challenge_transaction(
    TRANSACTION_XDR
  );

  if (Sign_Transaction_Response.code !== 200) {
    return NextResponse.json({
      status: Sign_Transaction_Response.status,
      code: Sign_Transaction_Response.code,
      data: {
        error: Sign_Transaction_Response.data.error,
      },
      message: Sign_Transaction_Response.message,
    });
  }
  console.log('====================================');
  console.log("sign transaction",Sign_Transaction_Response);
  console.log('====================================');

  return NextResponse.json({
    status: Sign_Transaction_Response.status,
    code: Sign_Transaction_Response.code,
    data: {
        transaction: Sign_Transaction_Response.data.transaction,
        network_passphrase: Sign_Transaction_Response.data.network_passphrase,
    },
    message: Sign_Transaction_Response.message,
  });
}
