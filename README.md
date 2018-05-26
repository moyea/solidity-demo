# 关于该项目
该项目是一个solidity的演示项目。它展示了:  
1. 通过web3发起交易及查询交易  
2. 使用solc编译一个ETH solidity合约  
3. 如何通过web3部署一个合约  
4. 如何通过web3调用一个合约 

## 如何使用
1. 克隆该项目
2. 安装依赖
```bash
npm install
```
3. 启动本地测试网络
```bash
npm run test-server
```

### demo演示

1.展示基本的交易，**需要保持test-server为启动状态**
```bash
npm run basic
```
2.编译部署合约到本地的测试网络，**需要保持test-server为启动状态**
```bash
npm run deploy
```
3.调用已经部署好的合约，**需要保持test-server为启动状态**
```bash
npm run test-call-contract
```

## 注意事项
1.查看演示demo时请保持test-server启动状态  
2.由于web3，solc更新较快，且api变化较大，请注意版本问题  
3.由于环境不同，生成的地址可能会有偏差，请根据实际情况做出相应的调整

## 参考资源
1. [web3-1.0](http://web3js.readthedocs.io/en/1.0/getting-started.html)  
2. [solidity](http://solidity.readthedocs.io/en/v0.4.24/)
3. [solc](https://www.npmjs.com/package/solc)
4. [ganache-cli](https://github.com/trufflesuite/ganache-cli)

