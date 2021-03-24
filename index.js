const Web3 = require('web3');

//console.log(Web3);

let rpcurl = "HTTP://127.0.0.1:7545";

let web3 = new Web3(rpcurl);

//console.log("Url:", web3);

let address = "0x6b60424C328270Ee62D7281C62865516258e1900";
web3.eth.getBalance(address,(err,wei ) =>{
    console.log("Wei Balance:", wei);
    console.log("Hassan");
    let balance = web3.utils.fromWei(wei,"ether");
    console.log("Balance in ether:",balance);
})