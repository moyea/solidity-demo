const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const path = require('path');

const web3 = new Web3('http://localhost:8545');
const contractsPath = path.resolve(process.cwd(), 'src/contracts');

const input = {
    language: 'Solidity', // 指明合约的语言
    sources: { // 合约源文件
        'Ballot.sol': { //
            content: fs.readFileSync(path.join(contractsPath, 'Ballot.sol'), 'utf-8') // 合约主体内容，可通过content或urls来指定
        }
    },
    settings: { // 配置项
        evmVersion: 'byzantium', // evm版本
        outputSelection: { // 编译的输出选择
            '*': {
                '*': ['evm.bytecode', 'abi']
            }
        }
    }
};


const solcOutput = solc.compileStandardWrapper(JSON.stringify(input));

// console.log(solcOutput);


const compiledContract = JSON.parse(solcOutput).contracts['Ballot.sol']['Ballot'];

const abiArray = compiledContract.abi;
const bytecode = compiledContract.evm.bytecode.object;
console.log('................');
console.log(abiArray);
console.log('................');

const ballotContract = new web3.eth.Contract(abiArray, {data: bytecode});

const deployedAddress = '0xb6d8a6537a265cef8bf33ccf4eeae1c7dacc4a09';

// function stringToBytes(str) {
//     var ch, st, re = [];
//     for (var i = 0; i < str.length; i++) {
//         ch = str.charCodeAt(i);
//         st = [];
//         do {
//             st.push(ch & 0xFF);
//             ch = ch >> 8;
//         } while (ch);
//         re = re.concat(st.reverse());
//     }   // return an array of bytes
//     return re;
// }

// function stringToBytes(str) {
//     return Array.prototype.slice.call(new Buffer(str), 0);
// }


web3.eth.estimateGas({data: bytecode})
    .then(gas => {
        ballotContract
            .deploy({
                arguments: [
                    ['张三', '李四', '王五', '赵六'].map(web3.utils.stringToHex)
                    // ['Tom', 'Jerry', 'John', 'David', 'May']
                ]
            }) // 因为InfoContract构造器不需要参数，所以可以不传
            .send({from: deployedAddress, gas: gas * 5}) // 将合约发布到区块上，send时需要指定从哪个地址(from)扣费,以及燃料多少(gas)
            .on('transactionHash', tH => console.log('transactionHash:==>', tH)) // 产生了交易hash事件，一般只触发一次
            .on('receipt', receipt => console.log('Contract deployed ok，the address is:', receipt.contractAddress)) // 合约部署成功事件，一般触发一次
            .on('confirmation', (confNumber, receipt) => console.log(`合约被第${confNumber}次确认`)) // 合约被确认事件，最多触发24次
            .then(contractInstance => {
                console.log('合约部署成功！');
                contractInstance.methods.getProposalInfo()
                    .call()
                    .then(res => {
                        const proposalNames = res.map(web3.utils.hexToString);
                        console.log(proposalNames);
                    });
            });
    });