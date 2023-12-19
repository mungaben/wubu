// Create stellar account

import axios, { AxiosError, AxiosResponse } from "axios";
import { BENKIKO_BASE, HOME_DOMAIN,BENKIKO_BASE_LIVE } from "../GetAccessToken";







// Create stellar account
// This endpoint is used to generate a new keypair and create an account using the generated keypair.





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



export const Create_stellar_account = async (ACCESS_TOKEN:string) => {
    if (!ACCESS_TOKEN) {
        throw new Error("ACCESS_TOKEN is not set ");
    }
 
    const CreateAccount = axios
        .post(
            `${BENKIKO_BASE}/v1/account`,
            {
                username: "postmantest36",
                mnemonic: "voyage indaar run veteran pride clump seek best stage inflict shrug resource welcome sail lab advice glimpse office catalog nut box pilot jeans frozen",
                index: 0,
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
            console.log('====================================');
            console.log('response in', response);
            console.log('====================================');
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