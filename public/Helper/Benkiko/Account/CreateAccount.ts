import axios from 'axios';
let data = JSON.stringify({
  "username": "postmantest36",
  "mnemonic": "voyage indoor run veteran pride clump seek best stage inflict shrug resource welcome sail lab advice glimpse office catalog nut box pilot jeans frozen",
  "index": 0,
  "language": "ENGLISH",
  "home_domain": "benkiko.io"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://staging.api.benkiko.io/v1/account',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
