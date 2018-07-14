//////////////////////////////////////////////////////////////////
/***************    CONNECTION WITH THE SMART CONTRACT*************/
var http = require('http');
var url = require('url');
var fs = require('fs');



var Web3 = require('web3');// Import the web3 module
if(typeof web3 !== 'undefined'){
	web3 = new Web3(web3.currentProvider);
}
else{
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
	//web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
}


 web3.eth.getAccounts((err,accounts)=> {
	if (err) return
		web3.eth.defaultAccount = accounts[0];
}); // used to define the default acccount. this account will pay for the transactions


var Test = new web3.eth.Contract(  [
    {
      "constant": false,
      "inputs": [],
      "name": "increase",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "decrease",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "display",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "input",
          "type": "string"
        }
      ],
      "name": "setString",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getString",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],'0x5F4d91CbcC2F6210dF90FB3774AbC5EC01EEc58D'); // create an instance which refers to your smart contract, allowing you to interact with it



var server= http.createServer(function(req, res) {

  var url_parts = url.parse(req.url, true);
  var setstring = url_parts.query.setstring;
  var increase = url_parts.query.increase;
  var decrease = url_parts.query.decrease;
  var refreshstring = url_parts.query.refreshstring;
  var refreshcounter = url_parts.query.refreshcounter;
  if(setstring) {
    console.log('function called');
    Test.methods.setString(setstring).send({ from : web3.eth.defaultAccount });


  } else if(increase){
    console.log('increase called');
    Test.methods.increase().send({ from : web3.eth.defaultAccount});

  } else if(decrease){
    console.log('decreased called');
    Test.methods.decrease().send({ from : web3.eth.defaultAccount});

  }
  else if (refreshstring){
    Test.methods.getString().call(function(error, result){
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify({ getstring : result + ' ' }));
    });

  }
  else if (refreshcounter){
    Test.methods.display().call(function(error, result){
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify({ display : result + ' ' }));
    });

  }

   else {
    console.log('Reloaded !');

    res.writeHead(200, {'Content-Type' : 'text/html'});
    fs.readFile('index.html',function(err, data){
      res.end(data);
    });
  }
}).listen(1337,'127.0.0.1');

