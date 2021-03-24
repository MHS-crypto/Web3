var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

let rpcUrl = "HTTP://127.0.0.1:7545";

let web3 = new Web3(rpcUrl);

const account1 = "0x214475B0E440Dbe090AF17841a12E88c842f49B4";
const private_key1 = "672d4bc296f200f6e87bf8aff03f692f4bf9315972adaf87382d11bf6a3b3004";

const account2 = "0xC18F5f3a2EFBa44b4F927d948550345933C110db";

const private_key1_bufer = Buffer.from(private_key1,'hex'); //private key is string it will be converted into binary array

web3.eth.getTransactionCount(account1, (err,txCount)=>{
    let convertToHex = web3.utils.toHex;
    const txtObject = {
        nounce: convertToHex(txCount),
        to: account2,
        value: convertToHex(web3.utils.toWei('4', 'ether')),
        gas: convertToHex(21000),
        gasPrice: convertToHex(web3.utils.toWei('10', 'gwei')),
    }

    const tx = new Tx.Transaction(txtObject);
    tx.sign(private_key1_bufer);
    const serializedtx = tx.serialize();
    const raw = '0x' + serializedtx.toString('hex');

    web3.eth.sendSignedTransaction(raw,(err,txHash)=>
    {
        console.log("Transaction hash:",txHash);
    })
})