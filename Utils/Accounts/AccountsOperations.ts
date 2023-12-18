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




export const Create_stellar_account = async (ACCESS_TOKEN: any) => {
 
    const CreateAccount = axios
        .post(
            `${BENKIKO_BASE}/v1/account'`,
            {
                username: "postmantest3",
                mnemonic: "voyage indoor run veteran pride clump seek best stage inflict shrug resource welcome sail lab advice glimpse office catalog nut box pilot jeans frozen",
                index: 0,
                language: "ENGLISH",
                home_domain: HOME_DOMAIN,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            }
        )
        .then((response: AxiosResponse<ResponseType>) => {
            console.log('====================================');
            console.log('response in get challange transaction', response);
            console.log('====================================');
            return response.data as ResponseType;
        })
        .catch((error: any) => {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ErrorResponse>;
                if (serverError && serverError.response) {
                    // console.error('Server responded with status code', serverError.response.status);
                    console.error('Response data:', serverError.response.data);

                    return serverError.response.data;
                }
            } else {

                console.error('An error occurred in creating account:');
                return error;
            }
        });

    return CreateAccount;
}


