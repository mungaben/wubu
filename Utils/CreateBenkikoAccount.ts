import axios from "axios";

export const signInKey = process.env.CLIENT_ACCOUNT_SIGNING_SEED;
export const clientAccount = process.env.CLIENT_ACCOUNT;

if (!signInKey) {
  throw new Error("Client_account_signing_seed is not set in the .env file");
} else if (!clientAccount) {
  throw new Error("Client_account is not set in the .env file");
}

export type ApiResponse = {
  status: string;
  code: number;
  data: {
    transaction: string; // Base64-encoded transaction details
    network_passphrase: string; // Network passphrase associated with the Stellar network
  };
  message: string;
};



export const Challange = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.benkiko.io/v1/auth/challenge?client_account=${clientAccount}&home_domain=benkiko.io`,
    headers: {},
  };

  return axios
    .request(config)
    .then((response) => {
      const responseData: ApiResponse = response.data;

      return {
        status: responseData.status,
        code: responseData.code,
        data: {
          transaction: responseData.data.transaction,
          network_passphrase: responseData.data.network_passphrase,
        },
        message: responseData.message,
      };
    })
    .catch((error: any) => {
      console.log("response error", error);
      throw error; // Propagate the error so it can be caught in the calling function
    });
};






export const SignInchallange = async (challenge_transaction_xdr: string) => {
  const data = JSON.stringify({
    challenge_transaction_xdr: challenge_transaction_xdr,
    client_account_signing_seed: signInKey,
  });
  console.log("data", data);
  console.log("challenge_transaction_xdr", challenge_transaction_xdr);

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.benkiko.io/v1/auth/sign",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const responseData: ApiResponse = response.data;

    return {
      status: responseData.status,
      code: responseData.code,
      data: {
        transaction: responseData.data.transaction,
        network_passphrase: responseData.data.network_passphrase,
      },
      message: responseData.message,
    };
  } catch (error) {
    throw error; // Propagate the error so it can be caught in the calling function
  }
};
