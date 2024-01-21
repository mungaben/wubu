import axios from "axios";
import { SIGNING_SEED, TEST_ANCHOR_DOMAIN, CLIENT_ACCOUNT, HOME_DOMAIN, BENKIKO_BASE, BENKIKO_BASE_LIVE, SIGNING_SEED2 } from "./Env";




// Get challenge transaction

// get Client Account



if (!SIGNING_SEED) {
  throw new Error("Client_account_signing_seed is not set in the .env file");
}

if (!TEST_ANCHOR_DOMAIN) {
  throw new Error("TEST_ANCHOR_DOMAIN is not set in the .env file");
}

if (!CLIENT_ACCOUNT) {
  throw new Error("Client_account is not set in the .env file");
}
if (!HOME_DOMAIN) {
  throw new Error("Home_domain is not set in the .env file");
}
if (!BENKIKO_BASE) {
  throw new Error("benkiko_base is not set in the .env file");
}
if (!BENKIKO_BASE_LIVE) {
  throw new Error("benkiko_base_live is not set in the .env file");
}

export type GetTransactionResponse = {
  status: string;
  code: number;
  data: {
    transaction: string; // Base64-encoded transaction details
    network_passphrase: string; // Network passphrase associated with the Stellar network
  };
  message: string;
};

export type GetTransactionErrorResponse = {
  status: string;
  code: number;
  data: {
    error: string;
  };
  message: string;
};

export type GetTransactionValidationErrorResponse = {
  status: string;
  code: number;
  data: {
    error: string;
  };
  message: string;
};
interface ErrorResponse {
  status: string;
  code: number;
  data: any;
  message: string;
}

export type PostTransactionResponse = {
  status: string;
  code: number;
  data: {
    token_type: string;
    token: string;
    expires_in: number;
  };
  message: string;
};

export type PostTransactionErrorResponse = {
  status: string;
  code: number;
  data: {
    error: string;
  };
  message: string;
};
// Stellar Ecosystem Proposal (SEP-10)   authentication flow - get challenge transaction
// challenge transaction  is sent to the server to be signed by the client account-signing seed

const SIGNING_SEED_1 = process.env.CLIENT_ACCOUNT_SIGNING_SEED
console.log("SIGNING_SEED", SIGNING_SEED);
console.log("SIGNING_SEED", SIGNING_SEED_1);
console.log("BENKIKO_BASE", process.env.BENKIKO_BASE);

// Assuming CLIENT_ACCOUNT is defined somewhere
console.log("CLIENT_ACCOUNT", CLIENT_ACCOUNT);

// 1 auth challenge transaction
export const Get_challenge_transaction = async () => {
  try {
    const response = await axios.get(
      `${process.env.BENKIKO_BASE}/v1/auth/challenge?client_account=${CLIENT_ACCOUNT}&home_domain=benkiko.io`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    return error;
  }
};
// Sign challenge transaction
// the function takes the challenge transaction and the client account-signing seed as part of sep 10 authentication flow and returns a signed challenge transaction
// the signed challenge transaction is sent to the server to be verified and a token is returned in next step
// 2 sign 

export const Sign_challenge_transaction = async (TRANSACTION_XDR: string) => {
  console.log("TRANSACTION_XDR in xdr", TRANSACTION_XDR);
  console.log("SIGNED_XDR in sign in  ", SIGNING_SEED_1);


  const sign_transaction = axios
    .post(`https://staging.api.benkiko.io/v1/auth/sign`, {
      challenge_transaction_xdr: TRANSACTION_XDR,
      client_account_signing_seed: SIGNING_SEED_1, //the secret seed of the Stellar account that is being authenticated.
    })
    .then((response) => {
      // if success return the signed challenge transaction
      console.log("response from signing transaction", response.data);

      return response.data;
    })
    .catch((error: any) => {
      if (error instanceof Error) {
        let errorResponse: ErrorResponse;
        try {
          errorResponse = JSON.parse(error.message);
        } catch (parseError) {

          throw new Error("Failed to sign transaction");
        }
        // You can further handle or process this error response as needed
      }
    });

  return sign_transaction;
};

// get signed trsaction xdr and send it to the server to be verified

export const Get_challenge_transaction_validation = async () => {
  const Transaction_XDR = await Get_challenge_transaction();
  console.log("Transaction_XDR", Transaction_XDR);


  if (Transaction_XDR.code !== 200) {
    throw new Error("Get challenge transaction failed");
  }

  const Sign_Transaction_Response = await Sign_challenge_transaction(
    Transaction_XDR.data.transaction
  );
  if (Sign_Transaction_Response.code !== 200) {
    throw new Error("Sign challenge transaction failed");
  }
  return Sign_Transaction_Response.data.transaction;
};

// get signed trsaction xdr and send it to the server to be verified
// 3 token
export const Post_challenge_transaction = async () => {
  const SIGNED_XDR: string = await Get_challenge_transaction_validation();
  console.log("SIGNED_XDR", SIGNED_XDR);

  if (!SIGNED_XDR) {
    throw new Error("Signed XDR is not set");
  }


  const data = JSON.stringify({
    signed_challenge_transaction_xdr: SIGNED_XDR,
  });

  try {
    const response = await axios.post(`https://staging.api.benkiko.io/v1/auth/token`, {
      signed_challenge_transaction_xdr: SIGNED_XDR,
    });
    // console.log("response", response.data);

    return response.data as PostTransactionResponse;
  } catch (error: any) {
    if (error.response) {

      throw new Error("Error message:", error.response.data.message);

    } else if (error.request) {

      throw new Error("No response received");

    } else {

      throw new Error("Error occurred before sending the request:", error.message);
    }

  }
};




