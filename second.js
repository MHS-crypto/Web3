
let rpcurl = "https://ropsten.infura.io/v3/b52c087da7994f05a0b03d3971c59e1a";

let web3 = new Web3(rpcurl);

//console.log("Url:", web3);

let address = "0xbC963B4c37Ab16521125258ce5f869f06F9008e3";
web3.eth.getBalance(address,(err,wei ) =>{
    if(err)
    {
        console.log("An error occured");
    }
    else
    {
    console.log("Wei Balance:", wei);
    console.log("Hassan");
    let balance = web3.utils.fromWei(wei,"ether");
    console.log("Balance in ether:",balance);
    document.getElementById("main").innerHTML =`Balance in ether: ${balance}`;
    }
})