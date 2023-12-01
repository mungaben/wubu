



import axios from 'axios';
import { type } from 'os';
let data = JSON.stringify({
  "challenge_transaction_xdr": "",
  "client_account_signing_seed": ""
});




type SignChallageData={
    challenge_transaction_xdr:string,
    client_account_signing_seed:string

}




const  GetDataFRomBenkikoSign= async (data:SignChallageData)=>{

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.benkiko.io/v1/auth/sign',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
    const SignChallage =await axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data;
    })
    .catch((error) => {
        console.log(error);
        return error;
    });
    return SignChallage;
}




export default GetDataFRomBenkikoSign;