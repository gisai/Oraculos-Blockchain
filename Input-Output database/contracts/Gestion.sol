pragma solidity ^0.4.21;
contract Gestion {
string queryinput = "init";
string result= "No Query";
event mysqlevent (
string input);
event phpEvent(
string query_input
);
function getString () public constant returns( string) {
return queryinput;
}
function setString (string input) public {
queryinput = input;
}
function getResult() public constant returns( string) {
return result;
}
function setResult(string input) public {
result = input;
}
function CreateMySQLEvent(string input)public {
emit mysqlevent(input);
}
function CreatephpEvent(string input) public {
emit phpEvent(input);
}
}