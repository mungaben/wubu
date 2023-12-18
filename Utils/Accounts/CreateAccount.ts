import { ApiResponse } from "../CreateBenkikoAccount";

const axios = require('axios');
let data = JSON.stringify({
  "username": "postmantest36",
  "mnemonic": "voyage indoor run veteran pride clump seek best stage inflict shrug resource welcome sail lab advice glimpse office catalog nut box pilot jeans frozen",
  "index": 0,
  "language": "ENGLISH",
  "home_domain": "benkiko.io"
});




export const CreateStellarAccount = async (clientAccount: string) => {
    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://api.benkiko.io/v1/auth/challenge?client_account=${clientAccount}&home_domain=benkiko.io`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
          },
          data : data
    };
    
    return axios
        .request(config)
        .then((response:any) => {
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
}
