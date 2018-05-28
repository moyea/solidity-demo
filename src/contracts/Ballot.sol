pragma solidity ^0.4.22;

contract Ballot {

    // 选民信息，选民可以自己投票或者将投票权委托给别人
    struct Voter {
        uint weight; // 权重
        bool voted; // 选民是否已投票
        address delegate; // 委托人
        uint vote; // 参选者索引
    }

    // 竞选人
    struct Proposal {
        bytes32 name; // 竞选人姓名
        uint voteCount; // 得票数
    }

    // 主席
    address public chairPerson;

    // 存储选民和地址的映射
    mapping(address => Voter) public voters;

    // 所有候选人信息
    Proposal[] public proposals;

    // 创建一份新的投票并决定候选人(发起选举并决定候选人)
    constructor(bytes32[] proposalNames) public {
        chairPerson = msg.sender;
        // 确定主席为选举(合约)发起人
        voters[chairPerson].weight = 1;
        // 主席也有一票

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name : proposalNames[i],
                voteCount : 0
                }));
        }
    }

    // 主席给予投票权(发放选票)
    function giveRightToVote(address voter) public {
        require(msg.sender == chairPerson, '只有主席才能发放选票');
        require(!voters[voter].voted, '无效的选票');
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    // 选民将自己的投票权委托给其他人
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, '请勿重复投票');
        require(to != msg.sender, '禁止委托给自己');
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;
            require(to != msg.sender, '委托中发现循环');
        }
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // 委托的代表已投票，委托的票数投给代表已投的人
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // 委托的代表未投票，将票数加给委托的代表
            delegate_.weight += sender.weight;
        }
    }

    // 投票操作,将你的票(包含委托给你的票)投给候选人
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, '已投票');
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;
    }

    // 计算胜出的候选人
    function winningProposal() public view returns (uint winningProposal_){
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // 调用winningProposal函数获得候选人索引，然后返回候选者姓名
    function winnerName() public view returns (bytes32 winnerName_){
        winnerName_ = proposals[winningProposal()].name;
    }

    // 获取所有候选人信息
    function getProposalInfo() public constant returns (bytes32[] memory proposalNames) {
        proposalNames = new bytes32[](proposals.length);
        for (uint i = 0; i < proposals.length; i++) {
            proposalNames[i] = proposals[i].name;
        }
    }

}
