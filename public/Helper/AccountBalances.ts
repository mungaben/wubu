import StellarSdk from "stellar-sdk";
import keyPairData from "./KeysCreator";
const { pair } = keyPairData;

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// the JS SDK uses promises for most actions, such as retrieving an account



// const account = await server.loadAccount(pair.publicKey());
// console.log("Balances for account: " + pair.publicKey());
// account.balances.forEach(function (balance) {
//   console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
// });



const AccountBalance=async function(){
    const account = await server.loadAccount(pair.publicKey());
    console.log("Balances for account: " + pair.publicKey());
    // account.balances.forEach(function (balance:any) {
    //   console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    // });

    const Balance = account.balances.forEach(function (balance:any) {
        console.log("Type account:", balance.asset_type, ", Balance:", balance.balance);
      }
    );
    console.log("Balance",Balance);
    
    return Balance;
}

export default AccountBalance;