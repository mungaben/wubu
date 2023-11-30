import axios from 'axios';





let config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://developers.stellar.org/transactions?sep=24',
  headers: { 
    'Accept': 'application/json'
  }
};

const returnDta=axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

export default returnDta;