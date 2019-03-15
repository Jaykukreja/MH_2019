const Web3 = require('web3');
//Web Connection
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
console.log(`Talking with a geth server ${web3.version.api} \n`);
const abiArray=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_cId",
				"type": "uint256"
			},
			{
				"name": "_key",
				"type": "string"
			}
		],
		"name": "citizenRegisteration",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oId",
				"type": "uint256"
			},
			{
				"name": "_oName",
				"type": "string"
			},
			{
				"name": "_accountAddress",
				"type": "address"
			}
		],
		"name": "organizationRegisteration",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_cId",
				"type": "uint256"
			}
		],
		"name": "getcitizenKey",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_oId",
				"type": "uint256"
			}
		],
		"name": "getorganizationAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const address = '0xda43051686fe5202b6c0c504fbf0716f7bf298e0';
const contract = web3.eth.contract(abiArray);
const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;

module.exports.web3=web3;
module.exports.contractInstance=contractInstance;

