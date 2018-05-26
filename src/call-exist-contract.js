/**
 * 调用区块链上已经存在的合约,需要知道合约的abiArray信息
 */
const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

const infoContractABIArray = [{
  "constant": true,
  "inputs": [],
  "name": "getInfo",
  "outputs": [{"name": "", "type": "string"}, {"name": "", "type": "uint256"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{"name": "_fName", "type": "string"}, {"name": "_age", "type": "uint256"}],
  "name": "setInfo",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];

const contractDeployedAddress = '0xAF9b853AAdAd921ee9ECf774701de0ec5281B64a';
const contract = new web3.eth.Contract(infoContractABIArray, contractDeployedAddress);

// 调用返回值为constant的合约函数不需要花费gas
contract.methods.getInfo()
  .call()
  .then(console.log)
  .catch(err => console.log(err));

// 调用合约的setInfo函数
contract.methods.setInfo('李四', 80)
  .send({from: '0xb55d0089a26f413fa9fe49a4521c68dcc1a07094'})
  .then(tx => {
    console.log('tx===>:', tx);
    // 调用getInfo
    contract.methods.getInfo()
      .call()
      .then(console.log);
  });
