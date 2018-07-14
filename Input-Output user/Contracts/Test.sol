pragma solidity ^0.4.21;

contract Test{
	int count=0;
	string store;




	function increase() public{
		count = count+1;
	}


	function decrease() public{
		count = count-1;
	}

	function display() public constant returns(int){
		return count ;
	}

	function setString( string input) public {
		store = input;
	}

	function getString() public constant returns(string){
		return store;
	}
}