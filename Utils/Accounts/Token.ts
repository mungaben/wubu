


import { cookies } from "next/headers";
import { Post_challenge_transaction } from "../GetAccessToken";

export let ACCESS_TOKEN: string;

export const getAccessToken = async () => {
  const Post_TTransaction = await Post_challenge_transaction();

  const token = Post_TTransaction.data.token;
  if (!token) {
    throw new Error("Token is not set");
  }

  //  store token in cookies to be used in the next requests
  const cookieStore = cookies();

  const septokenCookie = cookieStore.get("septoken");

  if (septokenCookie) {
    ACCESS_TOKEN = septokenCookie.value;
  } else {

    cookieStore.set("septoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: Post_TTransaction.data.expires_in,
    });

    ACCESS_TOKEN = token;

  }




}