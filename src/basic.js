/**
 * @desc 演示web3的执行交易及查询交易
 */

const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

web3.eth.defaultAccount = '0xc8909b82b4614faa1ff344170ef77bfdf565619c';

const addresses = [
  '0xc8909b82b4614faa1ff344170ef77bfdf565619c',
  '0xbf418f533a7be96d105ccf720be5ab9c4ef72ac3',
  '0x9dd968c30aeb3f0f598902633c00745bfad658f6',
  '0xb55d0089a26f413fa9fe49a4521c68dcc1a07094',
  '0x092c74c4b84c986eb213063dd34a8d09e66e5ca8',
  '0x395a2d4156982a48d475eb6354c66f078e124afe',
  '0xba165082435e0c4a1ba1579516e6cbcd9a5930e4',
  '0xe320b25686e1e3fde80a6e5ce1ed61da928465d5',
  '0x1845fff727df7fb47396e583e4ea9800a3203ac8',
  '0xfef6d9fd5d63a2217482b21739729830b3db2fb9'
];

// 返回给定账户中的余额，单位:wei
web3.eth.getBalance(web3.eth.defaultAccount)
  .then(balance => {
    // 将wei转换为eth
    const ethNum = web3.utils.fromWei(balance, 'ether');
    console.log(`当前账户余额为:${ethNum}ETH`);
    if (ethNum > 50) {
      // 将50eth转换为wei
      const weiNum = web3.utils.toWei('50', 'ether').toString();
      // 发起一笔交易
      web3.eth.sendTransaction({to: addresses[2], value: weiNum, gas: 2100000})
        .then(console.log)
        .catch(console.error);
    }
  });

web3.eth.getBlockNumber()
  .then(blockNumber => console.log('当前区块数为:', blockNumber));

web3.eth.getBlock(1)
  .then(block => {
    console.log('区块1上的所有交易信息:', block.transactions);
    web3.eth.getTransaction(block.transactions[0])
      .then(tx => {
        console.log(tx);
      });
  });

web3.eth.getTransactionFromBlock(1, 0)
  .then(console.log);

web3.eth.getTransactionCount(web3.eth.defaultAccount)
  .then(count => console.log(`当前账户${web3.eth.defaultAccount}总交易数量为：${count}笔`));
