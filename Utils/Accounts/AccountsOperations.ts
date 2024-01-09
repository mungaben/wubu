// Create stellar account

import axios, { AxiosError, AxiosResponse } from "axios";
import { BENKIKO_BASE, HOME_DOMAIN, BENKIKO_BASE_LIVE, CLIENT_ACCOUNT, SIGNING_SEED, TEST_ANCHOR_DOMAIN } from "../GetAccessToken";
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



export const Create_stellar_account = async (ACCESS_TOKEN: string, username: string) => {
    if (!ACCESS_TOKEN) {
        throw new Error("ACCESS_TOKEN is not set ");
    }

    const MnemonicComb = generateMnemonic();
    // console.log('====================================');
    // console.log('MnemonicComb', MnemonicComb);
    // console.log('====================================');
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


export const createAccount = async (token: string) => {
    const MnemonicComb = await generateMnemonic();
   
    const url = `${BENKIKO_BASE}/v1/account`;
    // const CSRFToken = 'c4IOAkPsIOkbWGN2YIPY6W0wuiF1oGRT9XPPei9ckJaaOl5PdgGmuip5mcwOb8kJ';
    // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iZW5raWtvLmlvL2F1dGgiLCJzdWIiOiJHQlNQRVBBT1pNNFE2NU1IT1M0WjVOS1k1NUhUWFpFRFFFVEtDUExFNEJDNFRCWVhGUlRaSVlTRiIsImlhdCI6MTcwMzc5NDA5NywiZXhwIjoxNzAzODgwNDk3LCJqdGkiOiJkYTBiNmZmYzg2NzY1OTMyZDdkNmYxZTVhMmRkYmQwNDVjODA2NTg5NDFkM2U2MjYxZDcwNTA2NGQ1NGZmNWJlIn0.UNVRI8ykH6HcfFzJUWzrHtqt_l10GNYP3u761LXNoJs';
    const name = `username01${Math.floor(Math.random() * 100000000) + 1}}`
    const data = {
        // username: `username01${Math.floor(Math.random() * 100000000) + 1}}`,
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
        // 'X-CSRFTOKEN': 'XQBWrKwdjM4ggHS8ovija3wA0RAe6W3eUJIX5IQXVHUf8maVD39HypV9SLr1Tow4'
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
        // 'X-CSRFTOKEN': 'XQBWrKwdjM4ggHS8ovija3wA0RAe6W3eUJIX5IQXVHUf8maVD39HypV9SLr1Tow4'
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

// export async function getDepositInteractive(token:string) {
//     const url = 'https://staging.api.benkiko.io/v1/transactions/deposit/interactive';
//     const params = {
//         asset_code: 'USDB',
//         domain: 'testanchor.stellar.org',
//         secret_key: 'gAAAAABkVMwqYQdZVUQBwK5uNUeUgp2T8CYb4IvK7NwA7fiHZfgxFAiia-DP3-UiJm2J_Lksxa8EjFh3m-Q-3OTiyI-Ik8EIthz6mijIQVvKORPNl6X0ZwCicl8B7WY9MAFq2J1Wqd8phbmmV7gamzW-uzyoyGddkg%3D%3D'
//     };
//     const headers = {
//         'accept': 'application/json',
//         'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iZW5raWtvLmlvL2F1dGgiLCJzdWIiOiJHQlNQRVBBT1pNNFE2NU1IT1M0WjVOS1k1NUhUWFpFRFFFVEtDUExFNEJDNFRCWVhGUlRaSVlTRiIsImlhdCI6MTcwNDE5MDg3MiwiZXhwIjoxNzA0Mjc3MjcyLCJqdGkiOiI1YTYwNWM3ZTAxMDJiZmYxNTA4NjBhMGFlYzQ1YTk0ZjM4YzFlNWNiYTI1OTczMTFhZjIzYjU5MzBhOGE3ZDQ0In0.av66fDcv0jH5r-9zVhlyw_oL-Rkm8jhjCZMWOruYXTs",
//     };

//     try {
//         const response: AxiosResponse = await axios.get(url, { params, headers });
//         console.log('====================================');
//         console.log('response', response.data);
//         console.log('====================================');
//         return response.data;
//     } catch (error:any) {
//         console.log('====================================');
//         console.log('error', error?.response?.data);
//         console.log('====================================');



//         return error;
//     }
// }

export async function getDepositInteractive(token: string) {
    const url = 'https://staging.api.benkiko.io/v1/transactions/deposit/interactive';
    const params = {
        asset_code: 'ETH',
        domain: 'testanchor.stellar.org',
        secret_key: 'gAAAAABkVMwqYQdZVUQBwK5uNUeUgp2T8CYb4IvK7NwA7fiHZfgxFAiia-DP3-UiJm2J_Lksxa8EjFh3m-Q-3OTiyI-Ik8EIthz6mijIQVvKORPNl6X0ZwCicl8B7WY9MAFq2J1Wqd8phbmmV7gamzW-uzyoyGddkg%3D%3D'
    };
    const headers = {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iZW5raWtvLmlvL2F1dGgiLCJzdWIiOiJHQlNQRVBBT1pNNFE2NU1IT1M0WjVOS1k1NUhUWFpFRFFFVEtDUExFNEJDNFRCWVhGUlRaSVlTRiIsImlhdCI6MTcwNDE5MDg3MiwiZXhwIjoxNzA0Mjc3MjcyLCJqdGkiOiI1YTYwNWM3ZTAxMDJiZmYxNTA4NjBhMGFlYzQ1YTk0ZjM4YzFlNWNiYTI1OTczMTFhZjIzYjU5MzBhOGE3ZDQ0In0.av66fDcv0jH5r-9zVhlyw_oL-Rkm8jhjCZMWOruYXTs'
    };

    try {
        const response = await axios.get(url, { params, headers });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}





// export async function getDepositInteractive(token:string) {
//     const url = `${HOME_DOMAIN}/v1/transactions/deposit/interactive`;
//     const params = {
//         asset_code: 'USDC',
//         domain: `${TEST_ANCHOR_DOMAIN}`,
//         secret_key: `${SIGNING_SEED}`
//     };
//     const headers = {
//         'accept': 'application/json',
//         'Authorization': `Bearer ${token}`,
//     };

//     try {
//         const response: AxiosResponse = await axios.get(url, { params, headers });
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// }


// export async function getDepositInteractiveLive(token: string) {
//     const url = 'https://staging.api.benkiko.io/v1/transactions/deposit/interactive';
//     const params = {
//         asset_code: 'USDC',
//         domain: `${TEST_ANCHOR_DOMAIN}`,
//         secret_key: `${SIGNING_SEED}`
//     };
//     const headers = {
//         'accept': 'application/json',
//         'Authorization': `Bearer ${token}`,
//     };

//     try {
//         const response = await axios.get(url, { params, headers });
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             // Log the error message and the response from the server
//             console.error('Axios error: ', error.message);
//             console.error('Server response: ', error.response?.data);

//             // Return a structured error response
//             return {
//                 error: true,
//                 message: error.message,
//                 data: error.response?.data
//             };
//         } else {
//             // Log the error message and stack trace
//             console.error('Unexpected error: ', error.message);
//             console.error(error.stack);

//             // Return a structured error response
//             return {
//                 error: true,
//                 message: error.message,
//                 data: null
//             };
//         }
//     }
// }







