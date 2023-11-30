



import axios from 'axios';


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.benkiko.io/v1/auth/challenge?client_account=GAHM5HYSMHXZQV42GLIWBSM2VV7F7KGGCRG66LIA2LJ5PHWDNWR3WO2H&home_domain=benkiko.io',
  headers: { }
};

const AuthChallagne= axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
    return response.data;
})
.catch((error) => {
  console.log("error on authchallge",error);
    return error;
});


export default AuthChallagne;
