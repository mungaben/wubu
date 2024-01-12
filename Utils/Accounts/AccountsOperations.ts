// Create stellar account

import axios, { AxiosError, AxiosResponse } from "axios";
import { BENKIKO_BASE, HOME_DOMAIN, BENKIKO_BASE_LIVE, CLIENT_ACCOUNT, SIGNING_SEED, TEST_ANCHOR_DOMAIN } from "../GetAccessToken";
import { generateMnemonic } from "./Generatemnemonic";
export type ErrorResponse = {
    status: string;
    code: number;
    data: {
        message?: string;
        extras?: {
            transaction: string;
            operations: string[];
        };
        error?: string;
    };
    message: string;
};

export type ResponseType = {
    status: string;
    code: number;
    data: {
        public_key: string;
        paymail: string;
        secret_key: string;
        muxed_account: string;
        muxed_id: number;
    };
    message: string;
};



export const Create_stellar_account = async (ACCESS_TOKEN: string, username: string) => {
    if (!ACCESS_TOKEN) {
        throw new Error("ACCESS_TOKEN is not set ");
    }

    const MnemonicComb = generateMnemonic();
    if (!MnemonicComb) {
        throw new Error("MnemonicComb is not set ");
    }
    // ${Math.floor(Math.random() * 100000000) + 1}

    const CreateAccount = axios
        .post(
            `${BENKIKO_BASE}/v1/account`,
            {
                username: `username01`,
                mnemonic: MnemonicComb,
                language: "ENGLISH",
                home_domain: "benkiko.io",
            },
            {
                headers: {
                    Authorization: `Bearer  ${ACCESS_TOKEN}`,
                },
            }
        )
        .then((response: AxiosResponse<ResponseType>) => {
            return response.data as ResponseType;
        })
        .catch((error: any) => {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ErrorResponse>;
                if (serverError && serverError.response) {
                    // console.error('Response data:', serverError.response.data);
                    console.error('Response status:', serverError.response.status);
                    // console.error('Response headers:', serverError.response.headers);
                    // throw serverError;
                }
            } else {
                console.error('An error occurred in creating account:', error.message);
                // throw error;
            }
        });

    return CreateAccount;
}



export const createAccount = async (token: string) => {
    const MnemonicComb = await generateMnemonic();
   
    const url = `${BENKIKO_BASE}/v1/account`;
    const name = `username01${Math.floor(Math.random() * 100000000) + 1}}`
    const data = {
        username: name,
        mnemonic: MnemonicComb.toString(),
        index: 0,
        language: "ENGLISH",
        home_domain: "benkiko.io"
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // 'X-CSRFTOKEN': CSRFToken
    };

    try {
        const response: AxiosResponse = await axios.post(url, data, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        // console.error(error);
        return error;
    }
};



export async function getAccountInfo(token: string) {
    if (!token) {
        throw new Error("ACCESS_TOKEN is not set ");
    }
    const url = `${BENKIKO_BASE}/v1/account-info?account_id=${CLIENT_ACCOUNT}`;
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response: AxiosResponse = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        return error;
    }
}


// merge accounts


export async function mergeAccounts(destination: string, secret_key: string, token: string) {
    const url = `${BENKIKO_BASE}/v1/account-merge`;
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        
    };
    const data = {
        "destination": `${destination}`,
        "secret_key": `${secret_key}`
    };

    try {
        const response: AxiosResponse = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        return error;
    }
}




export async function changeTrust(token: string, asset_code: string, limit: string, secret_key: string) {
    const url = `${BENKIKO_BASE}/v1/change-trust`;
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        
    };
    const data = {
        "asset_code": `${asset_code}`,
        "limit": `${limit}`,
        "secret_key": `${secret_key}`
    };

    try {
        const response: AxiosResponse = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        return error;
    }
}













export async function getDepositInteractive(token:string) {
    const url = `${HOME_DOMAIN}/v1/transactions/deposit/interactive`;
    const params = {
        asset_code: 'USDC',
        domain: `${TEST_ANCHOR_DOMAIN}`,
        secret_key: `${SIGNING_SEED}`
    };
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response: AxiosResponse = await axios.get(url, { params, headers });
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function getDepositInteractiveLive(token: string) {
    const url = 'https://staging.api.benkiko.io/v1/transactions/deposit/interactive';
    const params = {
        asset_code: 'USDC',
        domain: `${TEST_ANCHOR_DOMAIN}`,
        secret_key: `${SIGNING_SEED}`
    };
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response = await axios.get(url, { params, headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Log the error message and the response from the server
            console.error('Axios error: ', error.message);
            console.error('Server response: ', error.response?.data);

            // Return a structured error response
            return {
                error: true,
                message: error.message,
                data: error.response?.data
            };
        } else {
            // Log the error message and stack trace
            console.error('Unexpected error: ', error);
         

            // Return a structured error response
            return {
                error: true,
                message: error,
                data: null
            };
        }
    }
}



