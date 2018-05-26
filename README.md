# 关于该项目
该项目是一个solidity的演示项目。它展示了:  

1. 使用solc编译一个ETH solidity合约  
2. 如何通过web3部署一个合约  
3. 如何通过web3调用一个合约 

## 如何运行
1. 克隆该项目
2. 运行 npm install
3. 运行 npm run test-server
4. 运行 npm run deploy 将会编译contracts目录下的InfoContract.sol,并部署到本地的测试网络
5. 运行 npm run test-call-contract 将会调用已经部署好的合约

## 参考资源
1. [web3-1.0](http://web3js.readthedocs.io/en/1.0/getting-started.html)  
2. [solidity](http://solidity.readthedocs.io/en/v0.4.24/)
3. [solc](https://www.npmjs.com/package/solc)
4. [ganache-cli](https://github.com/trufflesuite/ganache-cli)

## 注意事项
1.使用过程中请保持test-server启动状态  
2.由于环境不同，生成的地址可能会有偏差，请根据实际情况做出相应的调整
