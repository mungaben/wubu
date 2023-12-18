import { ApiResponse } from "./CreateBenkikoAccount";
import StellarSdk from 'stellar-sdk';


const axios = require("axios");

// Get challenge transaction

// get Client Account

export const CLIENT_ACCOUNT = process.env.CLIENT_ACCOUNT!;
const HOME_DOMAIN = process.env.HOME_DOMAIN!;
export const SIGNING_SEED = process.env.CLIENT_ACCOUNT_SIGNING_SEED!;
export const BENKIKO_BASE = process.env.BENKIKO_BASE!;

if (!SIGNING_SEED) {
  throw new Error("Client_account_signing_seed is not set in the .env file");
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
export const Get_challenge_transaction = async () => {
  const GetTransaction = axios
    .get(
      `${BENKIKO_BASE}/v1/auth/challenge?client_account=${CLIENT_ACCOUNT}&home_domain=benkiko.io`
    )
    .then((response: GetTransactionResponse) => {
      return response.data;
    })
    .catch((error: any) => {
      return error;
    });

  return GetTransaction;
};

// Sign challenge transaction
// the function takes the challenge transaction and the client account-signing seed as part of sep 10 authentication flow and returns a signed challenge transaction
// the signed challenge transaction is sent to the server to be verified and a token is returned in next step

export const Sign_challenge_transaction = async (TRANSACTION_XDR: string) => {
  const sign_transaction = axios
    .post(`${BENKIKO_BASE}/v1/auth/sign`, {
      challenge_transaction_xdr: TRANSACTION_XDR,
      client_account_signing_seed: SIGNING_SEED, //the secret seed of the Stellar account that is being authenticated.
    })
    .then((response: GetTransactionResponse) => {
      // if success return the signed challenge transaction
      return response.data;
    })
    .catch((error: any) => {
      if (error instanceof Error) {
        let errorResponse: ErrorResponse;
        try {
          errorResponse = JSON.parse(error.message);
        } catch (parseError) {
          console.error("Failed to sign transaction ", error.message);
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

  if (Transaction_XDR.code !== 200) {
    throw new Error("Get challenge transaction failed");
  }

  const Sign_Transaction_Response = await Sign_challenge_transaction(
    Transaction_XDR.data.transaction
  );

  if (Sign_Transaction_Response.code !== 200) {
    throw new Error("Sign challenge transaction failed");
  }
  console.log('====================================');
  console.log("sign Transaction", Sign_Transaction_Response.data.transaction);
  console.log('====================================');

  const transaction = new StellarSdk.Transaction(Sign_Transaction_Response.data.transaction, StellarSdk.Networks.TESTNET);

  console.log(transaction.signatures);

  return Sign_Transaction_Response.data.transaction;
};

// final step in the SEP-10 authentication flow
// the signed challenge transaction is sent to the server to be verified and a token is returned
// export const Post_challenge_transaction = async () => {
//   const SIGNED_XDR: string = await Get_challenge_transaction_validation();
//   if (!SIGNED_XDR) {
//     throw new Error("Signed XDR is not set");
//   }

//   let data = JSON.stringify({
//     signed_challenge_transaction_xdr: SIGNED_XDR,
//   });

//   const Post_TTransaction = axios
//     .post(`${BENKIKO_BASE}/v1/auth/token`, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response: PostTransactionResponse) => {

//       return response.data;
//     })
//     .catch((error: any) => {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         console.log('Server responded with status:', error.response.status);
//         console.log('Error message:', error.response.data.message);
//         // Handle the error based on the response data
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.log('No response received');
//         // Handle this case accordingly
//       } else {
//         // Something happened in setting up the request
//         console.log('Error occurred before sending the request:', error.message);
//         // Handle this case accordingly
//       }
//     });

//   return Post_TTransaction;
// };


export const Post_challenge_transaction = async () => {
  const SIGNED_XDR: string = await Get_challenge_transaction_validation();
  if (!SIGNED_XDR) {
    throw new Error("Signed XDR is not set");
  }

  const transaction = new StellarSdk.Transaction(SIGNED_XDR, StellarSdk.Networks.TESTNET);

  console.log("in post challange", transaction.signatures);


  const publicKeys = transaction.operations.map((operation:any ) => operation.source);

  console.log("public keys ",publicKeys);


  // confirm that the transaction is valid with sdk

  const xdrString = SIGNED_XDR// your XDR string
  const publicKey1 = publicKeys[0]; // replace with your actual public key
  const publicKey2 = publicKeys[1]; // replace with your actual public key

  // const transaction = new StellarSdk.Transaction(xdrString, StellarSdk.Networks.TESTNET);

  // Get the transaction hash that the signatures are signing
  const txHash = transaction.hash();

  // Create keypair instances for the signers
  const keypair1 = StellarSdk.Keypair.fromPublicKey(publicKey1);
  const keypair2 = StellarSdk.Keypair.fromPublicKey(publicKey2);

  // Verify the signatures
  let allSignaturesValid = true;
  transaction.signatures.forEach((signature:any) => {
    const signatureValid = keypair1.verify(txHash, signature.signature());

    if (!signatureValid) {
      allSignaturesValid = false;
    }
  });

  if (allSignaturesValid) {
    console.log("All signatures on the transaction are valid.");
  } else {
    console.log("One or more signatures on the transaction are not valid.");
  }











  const data = JSON.stringify({
    signed_challenge_transaction_xdr: SIGNED_XDR,
  });

  try {
    const response = await axios.post(`${BENKIKO_BASE}/v1/auth/token`, {
      signed_challenge_transaction_xdr: SIGNED_XDR,
    });
    return response.data as PostTransactionResponse;
  } catch (error: any) {
    if (error.response) {
      console.log('Server responded with status:', error.response.status);
      console.log('Error message:', error.response.data.message);
      // Handle the error based on the response data
    } else if (error.request) {
      console.log('No response received');
      // Handle this case accordingly
    } else {
      console.log('Error occurred before sending the request:', error.message);
      // Handle this case accordingly
    }
    return error.response as PostTransactionErrorResponse;
  }
};
