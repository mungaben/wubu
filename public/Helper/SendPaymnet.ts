import keyPairData from "./KeysCreator";


const {pair,publicKey,secretkey }=keyPairData
var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");




// Keys for accounts to issue and receive the new asset
var sourceKeys = StellarSdk.Keypair.fromSecret(
   pair.secret(),
);
var destinationId = "GDKPSD5W3BXJ2JNEHJ6OJYUK65TXSEODBYMJ3ZKOBUIPCHSLO6IJ5AMJ";
// Transaction will hold a built transaction we can resubmit if the result is unknown.
var transaction;

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.
const sendPayment =server
  .loadAccount(destinationId)
  // If the account is not found, surface a nicer error message for logging.
  .catch(function (error:any) {
    if (error instanceof StellarSdk.NotFoundError) {
      throw new Error("The destination account does not exist!");
    } else return error;
  })
  // If there was no error, load up-to-date information on your account.
//   get account sequence number from the network
  .then(function () {
    console.log("Balances for account: " + sourceKeys.publicKey());
    
    return server.loadAccount(sourceKeys.publicKey());
  })
  .then(function (sourceAccount:any) {
    // Start building the transaction.transaction object
    transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationId,
          // Because Stellar allows transaction in many currencies, you must
          // specify the asset type. The special "native" asset represents Lumens.
          asset: StellarSdk.Asset.native(),
          amount: "200",
        }),
      )
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(StellarSdk.Memo.text("Test Transaction"))
      // Wait a maximum of three minutes for the transaction
      .setTimeout(180)
      .build();
    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    // And finally, send it off to Stellar!
    return server.submitTransaction(transaction);
  })
  .then(function (result:any) {
    console.log("Success! Results:", result);
  })
  .catch(function (error:any) {
    console.error("Something went wrong! in catch", error);
    // If the result is unknown (no response body, timeout etc.) we simply resubmit
    // already built transaction:
    // server.submitTransaction(transaction);
  });



export default sendPayment;