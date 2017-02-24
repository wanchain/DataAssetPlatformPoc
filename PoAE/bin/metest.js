/**
 * 
 npm install -g es6-shim ethereumjs-tx web3 request json-rpc2 
 */

// require('es6-shim');

// var fs = require('fs');

const Web3 = require('web3');
const config = require('../cfg/config.service');
const web3 = new Web3(new Web3.providers.HttpProvider(config.ethereum.url));


var Tx = require('ethereumjs-tx');
var rq = require('request');
const url = require('url');


String.prototype.padLeft = function(len, c){
    var s = this, c = c || '0';
    while(s.length < len) s = c+ s;
    return s;
}

String.prototype.crop0x = function(){
    return this.toLowerCase().replace(/^0x/, '');
}

var rpc = require('json-rpc2');

var SolidityCoder = require("web3/lib/solidity/coder.js");
var server = rpc.Server.$create({
	'headers':{
		'Access-Control-Allow-Origin': '*'
	}
});

server.on('error', function(err){
    console.log(err);
});

var contractFactory = web3.eth.contract()

Chainy = {
    // Creates transaction (and sends it if specified address is system
    add: function(args, opt, callback){
        var from = args[0]; 
        var data = args[1];
        var systemSender = from;
        var servicePK = config.sender.pk;

        var isSystem = true;
        var result = {};
        try {
            var rawTx = {
                from: from,
                to: config.contract,
                nonce: Chainy._getNonce(from),
                gasPrice: '0x' + web3.eth.gasPrice.toString(16),
                gasLimit: config.gasLimit,
                value: '0x1000000000000000',
                data: config.cmd + "20".padLeft(64) + data.length.toString(16).padLeft(64) + new Buffer(data).toString("hex")
            };
            var eTx = new Tx(rawTx);
            result = eTx.serialize().toString('hex');
        } catch(e) {
            
            callback('Create TX failed', null);
            return;
        }

        if(isSystem){
            // Sign
            console.log('isSystem', isSystem);
            var privateKey = new Buffer(servicePK.crop0x(), 'hex');
            var eTx = new Tx(new Buffer(result.crop0x(), 'hex'));
            eTx.sign(privateKey);
            var result = eTx.serialize().toString('hex');
            // Send
            try{
                console.log("sendTx");
                web3.eth.sendRawTransaction('0x' + result.crop0x(), callback);
            }catch(e){
                callback('Send failed', null);
                return;                
            }
            return;
        }

        callback(null, result);
    },

    // Returns chaint data by code
    get: function(args, opt, callback){
        var code = args[0];
        var result = false;
        try {
            var contract = web3.eth.contract(config.ABI).at(config.contract);
            var timestamp = contract.getChainyTimestamp(code).toString();
            var data = contract.getChainyData(code);
            var sender = contract.getChainySender(code);
            console.log('\nTimeStamp: ', timestamp);
            console.log('\nData: ', data);
            console.log('\nSender: ', sender);
            result = {
                timestamp:  contract.getChainyTimestamp(code),
                data:       contract.getChainyData(code),
                sender:     contract.getChainySender(code)
            }
        }catch(e){}
        callback(null, result);
    },

    // Get shortlink by tx hash
    getLink: function(args, opt, callback){
        var txHash = args[0];
        var result = {};
        try{
            return web3.eth.getTransactionReceipt('0x' + txHash.crop0x(), function(cb){
                return function(error, receipt){
                    var link = '';
                    
                    if (receipt) {
                        if (receipt.logs.length) {
                            // console.log('\nReceipt: ', receipt);
                        }
                    }

                    if(!error && receipt && receipt.blockNumber && receipt.logs && receipt.logs.length){
                        for(var i=0; i<receipt.logs.length; i++){
                            var log = receipt.logs[i];
                            if(config.topic === log.topics[0]){
                                try {
                                    var data = SolidityCoder.decodeParams(["uint256", "string"], log.data.replace("0x", ""));
                                    console.log('\nData: ', data);
                                    var timestamp = parseInt(data[0]);
                                    console.log('\nTimestamp: ', timestamp);
                                    var splited = data[1].split('/');
                                    link = splited[splited.length - 1];
                                    console.log('\nLink: ', link);
                                } catch(e) {
                                    console.log('\ERROR: ', e);
                                }
                            }
                        }
                    } else {
                        console.log('Link for ' + txHash + ' is not ready yet');
                    }
                    cb(null, link);
                }
            }(callback));
        }catch(e){}
        callback(null, result);
    },

    // Get tx hash by shortlink code
    getTx: function(args, opt, callback){
        var code = args[0];
        if(!code || code.length <= 2){
            callback('Invalid code format', null);
            return;
        }
        var block = Chainy.base58int(code.slice(0, -2)) + config.blockOffset;
        try {
            var oBlock = web3.eth.getBlock(block, true);
            var tag = 0; 
            if(oBlock && oBlock.transactions.length){
                for(var i = 0; i<oBlock.transactions.length; i++){
                    var tx = oBlock.transactions[i];
                    if(config.contract.toLowerCase() === tx.to.toLowerCase()){
                        var receipt = web3.eth.getTransactionReceipt('0x' + tx.hash.crop0x());
                        if(receipt && receipt.logs && receipt.logs.length){
                            for(var j=0; j<receipt.logs.length; j++){
                                var log = receipt.logs[j];
                                if(config.topic === log.topics[0]){                                    
                                var data = SolidityCoder.decodeParams(["uint256", "string"], log.data.replace("0x", ""));
                                var timestamp = parseInt(data[0]);
                                var splited = data[1].split('/');
                                link = splited[splited.length - 1];
                                callback(null, {hash: tx.hash, sender: tx.from});
                                return;
                                }
                            }
                        }
                    }
                }
            }
        }catch(e){
            callback(e.message, null);
            return;
        }
        callback('Transaction not found', null);
    },

    // Get current nonce for address

    _getNonce: function(address){
        var nonce = 0;
        var coinbase = web3.eth.coinbase;
        console.log(coinbase.substr(2) == address.substr(2));
        try {
            nonce = parseInt(web3.eth.getTransactionCount(coinbase));
        }catch(e){}
        console.log("nonce",  nonce);
        return nonce;
    },

    base58int: function(value){
        var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
            base = alphabet.length;
        var decoded = 0;
        while(value) {
            var alphabetPosition = alphabet.indexOf(value[0]);
            if (alphabetPosition < 0) return false;
            var powerOf = value.length - 1;
            decoded += alphabetPosition * (Math.pow(base, powerOf));
            value = value.substring(1);
        }
        return decoded;    
    }
}

server.expose('add', Chainy.add);
server.expose('get', Chainy.get);
server.expose('getTx', Chainy.getTx);
server.expose('getLink', Chainy.getLink);

var httpServer = server.listen(config.server.port, config.server.address);
