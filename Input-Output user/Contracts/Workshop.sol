pragma solidity^0.4.21;

contract Workshop{
	string URL;

	function setURL(string input) public{
		URL = input;
	}


	function getURL() public constant returns(string){
		return URL;
	}

}