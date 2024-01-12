import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from "next";
import { Post_challenge_transaction } from "@/Utils/GetAccessToken";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(res: NextRequest, req: NextResponse) {

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

  return NextResponse.json({
    token

  })


}
