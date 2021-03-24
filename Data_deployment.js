var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const rpcurl = "https://ropsten.infura.io/v3/b52c087da7994f05a0b03d3971c59e1a";

const web3 = new Web3(rpcurl);

var address = "0x66234A2516A9fc4B87FAE277EAeb5d37A0791ff7";

const account1 = "0xbC963B4c37Ab16521125258ce5f869f06F9008e3";
const private_key1 = "0afb2ab9a63268e00e2001855409fb4bf51a9879706b4cc44afec36ee3edb819";

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const private_key1_bufer = Buffer.from(private_key1,"hex");
var contract = new web3.eth.Contract(abi,address);

web3.eth.getTransactionCount(account1,(err,txtCount)=>{
    const txtObject ={
            nonce: web3.utils.toHex(txtCount),
            gasLimit: web3.utils.toHex(800000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10","gwei")),
            to: address,
            data: contract.methods.setAge(25).encodeABI(),
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