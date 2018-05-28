const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

const abiArray = [
    {
        "constant": false,
        "inputs": [{"name": "proposal", "type": "uint256"}],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{"name": "", "type": "uint256"}],
        "name": "proposals",
        "outputs": [{"name": "name", "type": "bytes32"}, {"name": "voteCount", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "to", "type": "address"}],
        "name": "delegate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "winningProposal",
        "outputs": [{"name": "winningProposal_", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "voter", "type": "address"}],
        "name": "giveRightToVote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{"name": "", "type": "address"}],
        "name": "voters",
        "outputs": [{"name": "weight", "type": "uint256"}, {"name": "voted", "type": "bool"}, {
            "name": "delegate",
            "type": "address"
        }, {"name": "vote", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getProposalInfo",
        "outputs": [{"name": "proposalNames", "type": "bytes32[]"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "chairPerson",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "winnerName",
        "outputs": [{"name": "winnerName_", "type": "bytes32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "proposalNames", "type": "bytes32[]"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];


const ballotContract = new web3.eth.Contract(abiArray);

ballotContract.options.address = '0x737b967a771f24b5bcc93472d6b5388af7155e4c';

ballotContract.methods.getProposalInfo()
    .call()
    .then(res => res.map(web3.utils.hexToString))
    .then(res => {
        console.log('候选人姓名为:', res);
    });


const accounts = {
    address: [
        '0xb6d8a6537a265cef8bf33ccf4eeae1c7dacc4a09',
        '0x1846289492188dfa1a3c12cec69ef29bd29f5ef6',
        '0x9a5095f203d2daff0bb7408db38b10559f802d0d',
        '0x86d83439fe79116317dbe0e730376772ed5d87c1',
        '0xfbd8a2477241d772c725be00cb303d9d2bf2d660',
        '0xc77c002bba42439dd79fc281f614d69dc7e789a8',
        '0xd5a2002d347bf9e165a4396f3c54a129f269d4e6',
        '0x7603acca532c8ad49e3380c174cd41dd98f49c32',
        '0x6ddb0f97f0fac6856dd1b847a6ac56ed60ccab54',
        '0x6c0171dbf04a06cb4c5c584117a7cbd47066b9f0'
    ],
    pk: [
        'e041e5b27e7c0e03abe7c2933b4d3348cca207b3ace1eba829d24f0218ac04f0',
        'c894c4485b6ddac21f97274e0e915de44c0cf1bcc840295397244b1727d1d31b',
        '90ad9d55e6ed5fc5e008d6f7c1b175f8ff2c5782cdf814f0d07790d104b43bc6',
        '39e667db2793e0ff27a5d83fadd623440668b1d02815355a3451adb63dd648f9',
        '325acd69145d870a8b3a68451fe9c09af869876df2be5c5d336411067b85ae7d',
        '55585d5c56aa3db30a635e3663cc0bb5e5d308d776ab1b4a08da44e40d918b09',
        '5ef50b995db4fdf5094fc098c78d97f228d2747ea73c5e17d0f0cd8601cdce79',
        'cbfd6780e15c094a6ecd575b9663813719f1ee6b5a909d5ca11557a5b3b71f4b',
        '09aef9b86da691b6f69679bcbe50a626102bc0c1cc815b39904424834ef1212c',
        'ca1810386ace6e504d5a2620f1c81305c39a908ede8d58a25f7d4aabe337b4e7'
    ]
};

// 返回当前节点控制的所有账户
web3.eth.getAccounts()
    .then(res => {
        console.log(res);
    });

// getProposalIndexByName('张三')
//     .then(index => {
//         return ballotContract.methods.vote(index)
//             .send({from: accounts.address[3]});
//     })
//     .then(tx => console.log(tx))
//     .catch(err => {
//         console.log('error:=>', err)
//     });

// 获取选举者信息
ballotContract.methods.proposals(0)
    .call()
    .then(res => ({name: web3.utils.hexToString(res.name), voteCount: res.voteCount}))
    .then(res => {
        console.log(res);
    });

// //发放选票
// const vos = [];
// accounts.address
//     .filter(addr => addr !== accounts.address[0]) // 去掉合约发起者
//     .forEach(addr => {
//         let vo = ballotContract.methods.giveRightToVote(addr)
//             .send({from: accounts.address[0]})
//             .then(() => addr);
//         vos.push(vo);
//     });
// Promise.all(vos)
//     .then(res => {
//         console.log('发放选票成功', res);
//     });

// ballotContract.methods.voters(1)
//     .call()
//     .then(res => console.log(res));

// 获取选民信息
const promises = [];
accounts.address.forEach(addr => {
    let promise = ballotContract.methods.voters(addr)
        .call()
        .then(({weight, voted, delegate, vote}) => ({address: addr, weight, voted, delegate, vote}));
    promises.push(promise);
});

Promise.all(promises)
    .then(res => {
        console.log('voters:', res);
    });


// web3.eth.defaultAccount = accounts.address[0];
const proposals = ['张三', '李四', '王五', '赵六'];
const randomIndex = () => Math.floor(Math.random() * proposals.length);

// 投票
// accounts.address.forEach(addr => {
//     const index = randomIndex();
//     ballotContract.methods.vote(index)
//         .send({from: addr})
//         .then(() => {
//             console.log(`${addr}投票${proposals[index]}成功`)
//         })
// });


// 0xb6d8a6537a265cef8bf33ccf4eeae1c7dacc4a09投票王五成功
// 0x1846289492188dfa1a3c12cec69ef29bd29f5ef6投票李四成功
// 0x9a5095f203d2daff0bb7408db38b10559f802d0d投票李四成功
// 0x86d83439fe79116317dbe0e730376772ed5d87c1投票王五成功
// 0xfbd8a2477241d772c725be00cb303d9d2bf2d660投票王五成功
// 0xc77c002bba42439dd79fc281f614d69dc7e789a8投票赵六成功
// 0xd5a2002d347bf9e165a4396f3c54a129f269d4e6投票张三成功
// 0x7603acca532c8ad49e3380c174cd41dd98f49c32投票赵六成功
// 0x6ddb0f97f0fac6856dd1b847a6ac56ed60ccab54投票张三成功
// 0x6c0171dbf04a06cb4c5c584117a7cbd47066b9f0投票李四成功

ballotContract.methods.winnerName()
    .call()
    .then(res => {
        console.log(`竞选者${web3.utils.hexToString(res)}胜出`);
    });