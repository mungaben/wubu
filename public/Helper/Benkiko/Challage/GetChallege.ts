import axios from "axios";
let data = JSON.stringify({
  challenge_transaction_xdr: "",
  client_account_signing_seed: "",
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://api.benkiko.io/v1/auth/sign",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

const GetChallage = axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
  .catch((error) => {
    console.log(error);
    return error;
  });

export default GetChallage;
