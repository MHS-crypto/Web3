const rpcurl = "https://ropsten.infura.io/v3/b52c087da7994f05a0b03d3971c59e1a";

const web3 = new Web3(rpcurl);

const address = "0x66234A2516A9fc4B87FAE277EAeb5d37A0791ff7";



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

let contract = new web3.eth.Contract(abi,address);
console.log(contract);

contract.methods.getAge().call((err,result) => {

    console.log("Age:",result);
    document.getElementById("main").innerHTML = `Age of the deployed contract:${result}`
})

