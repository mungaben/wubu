// Create stellar account

import axios, { AxiosError, AxiosResponse } from "axios";
import { BENKIKO_BASE, HOME_DOMAIN,BENKIKO_BASE_LIVE,CLIENT_ACCOUNT } from "../GetAccessToken";
import { generateMnemonic } from "./Generatemnemonic";








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

    const MnemonicComb= generateMnemonic();
    // console.log('====================================');
    // console.log('MnemonicComb', MnemonicComb);
    // console.log('====================================');
    if (!MnemonicComb) {
        throw new Error("MnemonicComb is not set ");
    }
 
    const CreateAccount = axios
        .post(
            `${BENKIKO_BASE}/v1/account`,
            {
                username: "ken",
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




// "energy swift machine ivory wall giant affair stomach impose elder drive bicycle enroll garment wagon hurdle angry pause resource forest young odor life pepper",


export const createAccount = async (token:string) => {
    const MnemonicComb= await  generateMnemonic();
    console.log('====================================');
    console.log(typeof MnemonicComb, MnemonicComb ,BENKIKO_BASE);
    console.log('====================================');
    const url = `${BENKIKO_BASE}/v1/account`;
    // const CSRFToken = 'c4IOAkPsIOkbWGN2YIPY6W0wuiF1oGRT9XPPei9ckJaaOl5PdgGmuip5mcwOb8kJ';
    // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iZW5raWtvLmlvL2F1dGgiLCJzdWIiOiJHQlNQRVBBT1pNNFE2NU1IT1M0WjVOS1k1NUhUWFpFRFFFVEtDUExFNEJDNFRCWVhGUlRaSVlTRiIsImlhdCI6MTcwMzc5NDA5NywiZXhwIjoxNzAzODgwNDk3LCJqdGkiOiJkYTBiNmZmYzg2NzY1OTMyZDdkNmYxZTVhMmRkYmQwNDVjODA2NTg5NDFkM2U2MjYxZDcwNTA2NGQ1NGZmNWJlIn0.UNVRI8ykH6HcfFzJUWzrHtqt_l10GNYP3u761LXNoJs';
    const data = {
        username:  "postmantest364906",
        mnemonic:  MnemonicComb.toString(),
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
        // console.log(response.data);
        return response.data;   
    } catch (error) {
        // console.error(error);
        return error;
    }
};



export async function getAccountInfo(token:string) {
    if (!token) {
        throw new Error("ACCESS_TOKEN is not set ");
    }
    const url = `https://staging.api.benkiko.io/v1/account-info?account_id=${CLIENT_ACCOUNT}`;
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

