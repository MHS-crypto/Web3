var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

let rpcUrl = "https://ropsten.infura.io/v3/b52c087da7994f05a0b03d3971c59e1a";

let web3 = new Web3(rpcUrl);

const account1 = "0xbC963B4c37Ab16521125258ce5f869f06F9008e3";
const private_key1 = "0afb2ab9a63268e00e2001855409fb4bf51a9879706b4cc44afec36ee3edb819";

const account2 = "0xE73f5B9959429610278606a7B47d73Cad9c50457";

const private_key1_bufer = Buffer.from(private_key1,'hex'); //private key is string it will be converted into binary array

web3.eth.getTransactionCount(account1, (err,txCount)=>{
    let convertToHex = web3.utils.toHex;
    const txtObject = {
        nonce: convertToHex(txCount),
        to: account2,
        value: convertToHex(web3.utils.toWei('2', 'ether')),
        gas: convertToHex(21000),
        gasPrice: convertToHex(web3.utils.toWei('10', 'gwei')),
    }

    const tx = new Tx.Transaction(txtObject,{chain:'ropsten'});
    tx.sign(private_key1_bufer);
    const serializedtx = tx.serialize();
    const raw = '0x' + serializedtx.toString('hex');

    web3.eth.sendSignedTransaction(raw,(err,txHash)=>
    {
        console.log("Transaction hash:",txHash);
    })
})