const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const path = require('path');

const web3 = new Web3('http://localhost:8545');
const contractsPath = path.resolve(process.cwd(), 'src/contracts');
/**
 * compiler input description
 * @see https://solidity.readthedocs.io/en/develop/using-the-compiler.html#input-description
 */
const input = {
  language: 'Solidity', // 指明合约的语言
  sources: { // 合约源文件
    'InfoContract.sol': { //
      content: fs.readFileSync(path.join(contractsPath, 'InfoContract.sol'), 'utf-8') // 合约主体内容，可通过content或urls来指定
    }
  },
  settings: { // 配置项
    evmVersion: 'byzantium', // evm版本
    outputSelection: { // 编译的输出选择
      '*': {
        '*': ['metadata', 'evm.bytecode', 'abi']
      }
    }
  }
};

// 注意JSON.stringify 将input转换成JSON字符串
const solcOutput = solc.compileStandardWrapper(JSON.stringify(input));

// 注意JSON.parse，将编译输出的JSON字符串转换为JSON
const compiledContract = JSON.parse(solcOutput).contracts['InfoContract.sol']['InfoContract'];

const abiArray = compiledContract.abi;
const bytecode = compiledContract.evm.bytecode.object;

const infoContract = new web3.eth.Contract(abiArray, {data: bytecode});

// 部署地址(可以先运行test-server,之后从控制台Available Accounts选择一个来替换该地址)
const deployedAddress = '0xc8909b82b4614faa1ff344170ef77bfdf565619c';

web3.eth.estimateGas({data: bytecode})
  .then(gas => {
    infoContract
      .deploy() // 因为InfoContract构造器不需要参数，所以可以不传
      .send({from: deployedAddress, gas: gas * 5}) // 将合约发布到区块上，send时需要指定从哪个地址(from)扣费,以及燃料多少(gas)
      .on('transactionHash', tH => console.log('transactionHash:==>', tH)) // 产生了交易hash事件，一般只触发一次
      .on('receipt', receipt => console.log('Contract deployed ok，the address is:', receipt.contractAddress)) // 合约部署成功事件，一般触发一次
      .on('confirmation', (confNumber, receipt) => console.log(`合约被第${confNumber}次确认`)) // 合约被确认事件，最多触发24次
      .then(contractInstance => {
        console.log('合约部署成功！');
        testContract(contractInstance);
      })
  });


function testContract(contractInstance) {

  contractInstance.methods.getInfo()
    .call()  // 合约函数getInfo指明了返回值为constant，不需要花费gas即可调用
    .then(res => {
      console.log('合约getInfo方法调用成功:', res);
      return contractInstance.methods.setInfo('张三', 27)
        .send({from: deployedAddress, gas: 2100000}); // 合约函数未指明返回constant,故需要发起事务，指明调用者，并花费该账户的gas
    })
    .then(tx => {
      console.log('setInfo调用成功,交易信息为:', tx);
      return contractInstance.methods.getInfo()
        .call();
    })
    .then(res => {
      console.log('合约getInfo方法调用成功:', res);
    })
}
