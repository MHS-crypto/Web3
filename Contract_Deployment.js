var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const rpcurl = "https://ropsten.infura.io/v3/b52c087da7994f05a0b03d3971c59e1a";

const web3 = new Web3(rpcurl);

const byteCode =  "608060405234801561001057600080fd5b5061012f806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c8063967e6e65146037578063d5dcf127146051575b600080fd5b603d6069565b6040516048919060c2565b60405180910390f35b6067600480360381019060639190608f565b6072565b005b60008054905090565b8060008190555050565b60008135905060898160e5565b92915050565b60006020828403121560a057600080fd5b600060ac84828501607c565b91505092915050565b60bc8160db565b82525050565b600060208201905060d5600083018460b5565b92915050565b6000819050919050565b60ec8160db565b811460f657600080fd5b5056fea264697066735822122076d39d96a173222cc339a02e0351ab528d2f4df2657d6a624660dbe4d643a09d64736f6c63430008010033"
	

const account1 = "0xbC963B4c37Ab16521125258ce5f869f06F9008e3";
const private_key1 = "0afb2ab9a63268e00e2001855409fb4bf51a9879706b4cc44afec36ee3edb819";
const private_key1_bufer = Buffer.from(private_key1,"hex");
const byteCodeBuffer = Buffer.from(byteCode,'hex');


web3.eth.getTransactionCount(account1,(err,txtCount)=>{
    const txtObject ={
            nonce: web3.utils.toHex(txtCount),
            gasLimit: web3.utils.toHex(800000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10","gwei")),
            data: byteCodeBuffer,
    };
    const tx = new Tx.Transaction(txtObject,{chain: 'ropsten'});

    tx.sign(private_key1_bufer);
    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');
    console.log("TX OBJECT:",txtObject);

    web3.eth.sendSignedTransaction(raw,(err,txHash)=>
    {
        console.log("Transaction hash:",txHash);
    })
})