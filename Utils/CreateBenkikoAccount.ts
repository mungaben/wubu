const CreateUrl = "/v1/account/";

const BaseUrl = process.env.Benkiko_TestNet;
import axios from "axios";
// const CreateAccountUrl = BaseUrl + CreateUrl;
const CreateAccountUrl =" https://api.benkiko.io/v1/account"
console.log("CreateAccountUrl", CreateAccountUrl);


// const axios = require("axios");
// let data = JSON.stringify({
//   username: "postmantest36",
//   mnemonic:
//     "voyage indoor run veteran pride clump seek best stage inflict shrug resource welcome sail lab advice glimpse office catalog nut box pilot jeans frozen",
//   index: 0,
//   language: "ENGLISH",
//   home_domain: "benkiko.io",
// });

// let config = {
//   method: "post",
//   maxBodyLength: Infinity,
//   url: CreateAccountUrl,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + process.env.Client_account,
//   },
//   data: data,
// };

// axios
//   .request(config)
//   .then((response:any) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error:any) => {
//     console.log(error);
//   });

  const CreateBenkikoAccount=async()=>{
    let data = JSON.stringify({
        username: "postmantest36",
        mnemonic:
          "voyage indoor run veteran pride clump seek best stage inflict shrug resource welcome sail lab advice glimpse office catalog nut box pilot jeans frozen",
        index: 0,
        language: "ENGLISH",
        home_domain: "benkiko.io",
      });
      
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: CreateAccountUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.Client_account_signing_seed,
        },
        data: data,
      };
      
       const Response =axios
        .request(config)
        .then((response:any) => {
          console.log(JSON.stringify(response.data));
          console.log("response when posting ",response.data.status);
          
        })
        .catch((error:any) => {

          console.log("error when posting ",error);
        });
        return Response;
  }

  export default  CreateBenkikoAccount;