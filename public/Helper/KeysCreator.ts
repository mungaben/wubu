import { log } from 'console';
import Stellar from 'stellar-sdk';

const pair = Stellar.Keypair.random();


// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7

// see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html

const secretkey= pair.secret();
// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
 const publicKey=pair.publicKey();
// GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB

console.log("secretet",pair.secret());


const keyPairData = {
    secretkey: pair.secret(),
    publicKey: pair.publicKey(),
    pair
};

export default keyPairData;