solc = require("solc");
fs = require("fs");
Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
let fileContent = fs.readFileSync("web_New.sol").toString();

console.log(fileContent);

var input = {
    language: "Solidity",
    sources: {
      "web_New.sol": {
        content: fileContent,
      },
    },
  
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Output: ", output);
ABI = output.contracts["web_New.sol"]["AddTwoN"].abi;
bytecode = output.contracts["web_New.sol"]["AddTwoN"].evm.bytecode.object;

console.log("abi: ",ABI);
console.log("bytecode: ",bytecode);

contract = new web3.eth.Contract(ABI);
let defaultAccount;
web3.eth.getAccounts().then((accounts) => {
  console.log("Accounts: ", accounts);

  defaultAccount = accounts[0];

  contract
  .deploy({data:bytecode})
  .send({from:defaultAccount,gas:500000})
  .on("receipt",(receipt) => {
    console.log("contract Address: ", receipt.contractAddress);
  })
  .then((demoContract) => {
    demoContract.methods.a().call((err,data) => {
      console.log("Initial value: ", data);
    });
  })

})