/***
 *     __          __               _    _______        _
 *     \ \        / /              | |  |__   __|      | |
 *      \ \  /\  / /_ _ _ __   __ _| |_   _| | ___  ___| |__
 *       \ \/  \/ / _` | '_ \ / _` | | | | | |/ _ \/ __| '_ \
 *        \  /\  / (_| | | | | (_| | | |_| | |  __/ (__| | | |
 *         \/  \/ \__,_|_| |_|\__, |_|\__,_|_|\___|\___|_| |_|
 *                             __/ |
 *                            |___/
 */
var path = require('path');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var Tx = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');

var fs = require('fs');
var content = fs.readFileSync(path.join(__dirname, "wlcustomizedtoken.sol"), 'utf8');
var solc = require('solc');
var compiled = solc.compile(content, 1);
var myadvancedtokenContract = web3.eth.contract(JSON.parse(compiled.contracts.MyAdvancedToken.interface));


exports.genEthereumAddress = function(){
    var privKey = ethUtil.crypto.randomBytes(32);
    return {
        'privateKey' : ethUtil.bufferToHex(privKey),
        'publicKey' : ethUtil.bufferToHex(ethUtil.privateToAddress(privKey))
    }
};

exports.issueAsset = function(user, assetContract, callback){
	//TODO: validate assetContract info

	var initialSupply = 999999;//assetContract.initTotalShares;
	var tokenName = 'QQQ';//assetContract.name;
	var decimalUnits = 2;
	var tokenSymbol = 'qqq';//assetContract.abbr;
	var centralMinter = "";
	
	var constructorInputs = [initialSupply, tokenName, decimalUnits, tokenSymbol, centralMinter];
	constructorInputs.push({ data: compiled.contracts.MyAdvancedToken.bytecode});
	var txData = myadvancedtokenContract.new.getData.apply(null, constructorInputs);

	//TODO: replace user's private key
	var privateKey = new Buffer('095e53c9c20e23fd01eaad953c01da9e9d3ed9bebcfed8e5b2c2fce94037d963', 'hex');
	var amount = web3.toWei(1, 'ether');
	var bn = new web3.BigNumber(amount);
	var hexValue = '0x' + bn.toString(16);
	//TODO: replace with user address
	var serial = '0x' + web3.eth.getTransactionCount('0x3ae88fe370c39384fc16da2c9e768cf5d2495b48').toString(16);
	var rawTx = { 
	  nonce: serial,
	  gasPrice: '0x43bb88745', 
	  gasLimit: '0x400000',
	  to: '',
	  value: hexValue,
	  from:'0x3ae88fe370c39384fc16da2c9e768cf5d2495b48',
	  data: '0x' + txData
	};
	var tx = new Tx(rawTx);
	console.log(JSON.stringify(tx, null, '    '));
	tx.sign(privateKey);
	var serializedTx = tx.serialize();
	web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash){
	   if(!err){
	      console.log("tx hash:" + hash);
	      var receipt = web3.eth.getTransactionReceipt(hash);
	      var contractAddress = receipt.contractAddress;
	      console.log(receipt);
	   } else {
	       console.log("error:" + err);
	   }
	});	
};

exports.transferCustomToken = function(contractAddress, from, to, quantity, callback){
	//TODO:change parameter
	var rmContractAddress = '0x37dc85ae239ec39556ae7cc35a129698152afe3c';
	var myadvancedtoken = myadvancedtokenContract.at(rmContractAddress);
	var toAccount = '0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8';//to.ethAddress

	var fromAddress = "0x3ae88fe370c39384fc16da2c9e768cf5d2495b48";
	var privateKey = new Buffer('095e53c9c20e23fd01eaad953c01da9e9d3ed9bebcfed8e5b2c2fce94037d963', 'hex');//from.so_privatekey
	var serial = '0x' + web3.eth.getTransactionCount(fromAddress).toString(16);
	var rawTx = { 
	  nonce: serial,
	  gasPrice: '0x43bb88745', 
	  gasLimit: '0x400000',	  
	  to: rmContractAddress,//contract address
	  value: '0x00',
	  from: fromAddress,
	  data: myadvancedtoken.transfer.getData(toAccount, 100)
	};

	var tx = new Tx(rawTx);
	console.log(JSON.stringify(tx, null, '    '));
	tx.sign(privateKey);
	var serializedTx = tx.serialize();
	web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash){
	   if(!err){
	      console.log("tx hash:" + hash);
	   } else {
	       console.log("error:" + err);
	   }
	});
}

exports.getCustomTokenBalance = function(contractAddress, userAddress){
	var customToken = myadvancedtokenContract.at(contractAddress);
	return customToken.balanceOf(userAddress).e;
}