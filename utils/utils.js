var crypto = require('crypto');
var assert = require('assert');
const obj=require('../routes/config');
var web3=obj.web3;
var contractInstance=obj.contractInstance;




function generateKey(){
	var rand = require("random-key");
	var key=rand.generate(10);
	return key;
}


function encrypt(key,data){

	//console.log(data);
	var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
	//var key = 'password';
	//var text = 'I love kittens';

	var cipher = crypto.createCipher(algorithm, key);
	//console.log(cipher);  
	var encrypted_data = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
	//console.log("hi");
	//console.log(encrypted_data);
	return encrypted_data;
}


function decrypt(key,data){

	var algorithm = 'aes256';
	var decipher = crypto.createDecipher(algorithm, key);
// //console.log(decipher);  

	var decrypted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
	//console.log(decrypted);  

	//assert.equal(decrypted, data);
	return decrypted;
}

function citizenRegisteratn(cId,key){
	return contractInstance.citizenRegisteration(cId,key,{ from: web3.eth.accounts[0], gas: 3000000 });
}

module.exports = {encrypt,decrypt,generateKey,citizenRegisteratn}
// module.exports = {decrypt}
// module.exports = {generateKey};
// module.exports = {citizenRegisteration};