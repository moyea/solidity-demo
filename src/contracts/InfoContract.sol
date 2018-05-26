pragma solidity ^0.4.0;


contract InfoContract {

    string name;
    uint age;

    function setInfo(string _name, uint _age) public {
        name = _name;
        age = _age;
    }

    function getInfo() public constant returns (string, uint) {
        return (name, age);
    }

}
