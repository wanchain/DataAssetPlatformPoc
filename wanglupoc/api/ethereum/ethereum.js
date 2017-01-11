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
var events = require('events');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var Tx = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');

/* for improve debug performace, using compiled result replace compiling runtime, temporary leaving next code here
var fs = require('fs');
var content = fs.readFileSync(path.join(__dirname, "wlcustomizedtoken.sol"), 'utf8');
var solc = require('solc');
var compiled = solc.compile(content, 1);
var myadvancedtokenContract = web3.eth.contract(JSON.parse(compiled.contracts.MyAdvancedToken.interface));
*/
var compiled_interface = '[{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],"name":"setPrices","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"mintedAmount","type":"uint256"}],"name":"mintToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"},{"name":"centralMinter","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]';
var compiled_bytecode = '60a060405260096060527f546f6b656e20302e3100000000000000000000000000000000000000000000006080526001805460008290527f546f6b656e20302e31000000000000000000000000000000000000000000001282556100b4907fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf66020600283861615610100026000190190931692909204601f01919091048101905b808211156101b457600081556001016100a0565b5050604051610dbb380380610dbb8339810160405280805190602001909190805182019190602001805190602001909190805182019190602001805190602001909190505084848484600080546c0100000000000000000000000033810204600160a060020a0319909116179055600160a060020a0333166000908152600660209081526040822086905560058690558451600280549381905292601f6000196101006001841615020190911684900481018390047f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace908101939091908801908390106101b857805160ff19168380011785555b506101e89291506100a0565b5090565b828001600101855582156101a8579182015b828111156101a85782518260005055916020019190600101906101ca565b50508060036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024157805160ff19168380011785555b506102719291506100a0565b82800160010185558215610235579182015b82811115610235578251826000505591602001919060010190610253565b5050600480547f01000000000000000000000000000000000000000000000000000000000000008085020460ff19909116179055505050600160a060020a0382161590506102dd5760008054600160a060020a0319166c01000000000000000000000000838102041790555b60008054600160a060020a031681526006602052604090208590555050505050610ab08061030b6000396000f3606060405236156100fb5760e060020a600035046305fefda7811461010057806306fdde0314610129578063095ea7b31461018b57806318160ddd1461019e57806323b872dd146101ac578063313ce567146101e35780634b750334146101f45780635a3b7e421461020257806370a082311461026657806379c65068146102835780638620410b146102ac5780638da5cb5b146102ba57806395d89b41146102d1578063a6f2ae3a14610336578063a9059cbb14610376578063b414d4b6146103aa578063cae9ca51146103ca578063dd62ed3e1461047b578063e4849b32146104a5578063e724529c146104d6578063f2fde38b146104ff575b610002565b346100025761052560043560243560005433600160a060020a039081169116146105ed57610002565b346100025761052760028054604080516020601f600019610100600187161502019094168590049384018190048102820181019092528281529291908301828280156106235780601f106105f857610100808354040283529160200191610623565b346100025761059560043560243561044c565b34610002576105a9600a5481565b3461000257610595600435602435604435600160a060020a0383166000908152600b602052604081205460ff161561062b57610002565b34610002576105bb60045460ff1681565b34610002576105a960085481565b346100025761052760018054604080516020601f6002600019610100878916150201909516949094049384018190048102820181019092528281529291908301828280156106235780601f106105f857610100808354040283529160200191610623565b34610002576105a960043560066020526000908152604090205481565b346100025761052560043560243560005433600160a060020a039081169116146106f157610002565b34610002576105a960095481565b34610002576105d1600054600160a060020a031681565b346100025761052760038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281529291908301828280156106235780601f106105f857610100808354040283529160200191610623565b346100025761052560095460009034811561000257600160a060020a03301660009081526006602052604090205491900491508190101561077d57610002565b3461000257610525600435602435600160a060020a033316600090815260066020526040902054819010156107d757610002565b3461000257610595600435600b6020526000908152604090205460ff1681565b3461000257604080516020600460443581810135601f8101849004840285018401909552848452610595948235946024803595606494929391909201918190840183828082843750949650505050505050600160a060020a03338116600090815260076020908152604080832093871683529290529081208390558361087d81855b600160a060020a0333811660009081526007602090815260408083209590931682529390935290912055600190565b34610002576007602090815260043560009081526040808220909252602435815220546105a99081565b3461000257610525600435600160a060020a0333166000908152600660205260409020548190101561095a57610002565b346100025761052560043560243560005433600160a060020a039081169116146109f157610002565b346100025761052560043560005433600160a060020a03908116911614610a5b57610002565b005b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156105875780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b604080519115158252519081900360200190f35b60408051918252519081900360200190f35b6040805160ff9092168252519081900360200190f35b60408051600160a060020a039092168252519081900360200190f35b600891909155600955565b820191906000526020600020905b81548152906001019060200180831161060657829003601f168201915b505050505081565b600160a060020a0384166000908152600660205260409020548290101561065157610002565b600160a060020a038316600090815260066020526040902054828101101561067857610002565b600160a060020a0380851660008181526006602090815260408083208054889003905587851680845281842080548901905584845260078352818420339096168452948252918290208054879003905581518681529151600080516020610a908339815191529281900390910190a35060019392505050565b600160a060020a038083166000908152600660209081526040808320805486019055600a805486019055805185815290513090941693600080516020610a90833981519152929181900390910190a381600160a060020a031630600160a060020a0316600080516020610a90833981519152836040518082815260200191505060405180910390a35050565b600160a060020a0333811660008181526006602090815260408083208054870190553090941680835291849020805486900390558351858152935192939192600080516020610a908339815191529281900390910190a350565b600160a060020a03821660009081526006602052604090205481810110156107fe57610002565b600160a060020a0333166000908152600b602052604090205460ff161561082457610002565b600160a060020a0333811660008181526006602090815260408083208054879003905593861680835291849020805486019055835185815293519193600080516020610a90833981519152929081900390910190a35050565b156109525780600160a060020a0316638f4ffcb1338630876040518560e060020a0281526004018085600160a060020a0316815260200184815260200183600160a060020a03168152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156109255780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b156100025760325a03f11561000257505050600191505b509392505050565b600160a060020a03308116600090815260066020526040808220805485019055339092168082528282208054859003905560085492519092840280156108fc0292909190818181858888f1935050505015156109b557610002565b30600160a060020a031633600160a060020a0316600080516020610a90833981519152836040518082815260200191505060405180910390a350565b600160a060020a0382166000818152600b6020908152604091829020805460ff191660f860020a8681020417905581519283528315159083015280517f48335238b4855f35377ed80f164e8c6f3c366e54ac00b96a6402d4a9814a03a59281900390910190a15050565b600080546c010000000000000000000000008084020473ffffffffffffffffffffffffffffffffffffffff199091161790555056ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
var myadvancedtokenContract = web3.eth.contract(JSON.parse(compiled_interface));

exports.genEthereumAddress = function(){
    var privKey = ethUtil.crypto.randomBytes(32);
    return {
        'privateKey' : ethUtil.bufferToHex(privKey).substr(2),
        'publicKey' : ethUtil.bufferToHex(ethUtil.privateToAddress(privKey))
    }
};

var unackedAssetsHash = [];
var dispatcher = new events.EventEmitter();
var maxBlockReceiptUnavailable = 3;
exports.issueAsset = function(userEthAddress, userPrivateKey, assetContract, callback){
	//TODO: validate assetContract info
  var decimalUnits = 2;
	var initialSupply = assetContract.stockNumber * Math.pow(10, decimalUnits);//assetContract.initTotalShares;
	var tokenName = assetContract.assetsTitle;
	var tokenSymbol = assetContract.assetsName;
	var centralMinter = "";

	var constructorInputs = [initialSupply, tokenName, decimalUnits, tokenSymbol, centralMinter];

  constructorInputs.push({ data: compiled_bytecode});
	var txData = myadvancedtokenContract.new.getData.apply(null, constructorInputs);

	//TODO: replace user's private key
	var privateKey = new Buffer(userPrivateKey, 'hex');
	var amount = web3.toWei(1, 'ether');
	var bn = new web3.BigNumber(amount);
	var hexValue = '0x' + bn.toString(16);
	//TODO: replace with user address
	var serial = '0x' + web3.eth.getTransactionCount(userEthAddress).toString(16);
	var rawTx = {
	  nonce: serial,
	  gasPrice: '0x43bb88745',
	  gasLimit: '0x400000',
	  to: '',
	  value: hexValue,
	  from: userEthAddress,
	  data: '0x' + txData
	};
	var tx = new Tx(rawTx);
	tx.sign(privateKey);
	var serializedTx = tx.serialize();
	web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash){
	   if(!err){
	     unackedAssetsHash.push({hash: hash, blockOffset: 0});
	     dispatcher.on(hash, function (err, receipt) {
	       callback(err, receipt);
       });
	     // console.log("tx hash:" + hash);
	     // //because the getTransactionReceipt interface get result immidiately,so delay temporary
	     // //web3.eth.getTransactionReceipt(hash, function(error, result){
       // //  console.log("issue asset result:" + JSON.stringify(result));
	     // //  callback(error, result);
       // //});
       //var delayExecContext = {cb: callback, hash: hash};
       //setTimeout(function() {
       //  var receipt = web3.eth.getTransactionReceipt(delayExecContext.hash);
       //  console.log(JSON.stringify(receipt));
       //  if (receipt) {
       //    delayExecContext.cb(null, receipt);
       //  } else {
       //    delayExecContext.cb({error: 'fetch receipt failed'}, null);
       //  }
       //}, 30000);
	   } else {
       console.log("err");
	       callback(err, null);
	   }
	});
};

exports.utilTransferEther4Test = function(){

};

exports.transferCustomToken = function(contractAddress, senderEthAddress, senderPrivateKey, receiverEthAddress, quantity, callback){
	//TODO:change parameter
	var myadvancedtoken = myadvancedtokenContract.at(contractAddress);
	var privateKey = new Buffer(senderPrivateKey, 'hex');//from.so_privatekey
	var serial = '0x' + web3.eth.getTransactionCount(senderEthAddress).toString(16);
	var rawTx = {
	  nonce: serial,
	  gasPrice: '0x43bb88745',
	  gasLimit: '0x400000',
	  to: contractAddress,//contract address
	  value: '0x00',
	  from: senderEthAddress,
	  data: myadvancedtoken.transfer.getData(receiverEthAddress, quantity)
	};

	var tx = new Tx(rawTx);
	console.log(JSON.stringify(tx, null, '    '));
	tx.sign(privateKey);
	var serializedTx = tx.serialize();
	web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash){
	   if(!err){
	   	  var hash4Timeout = hash;
	   	  var cb4TimeOut = callback;
			  setTimeout(function() {
			  	var receipt = web3.eth.getTransactionReceipt(hash4Timeout);
			  	if(receipt){
			  		cb4TimeOut(null, receipt);
					} else {
			  		cb4TimeOut('transfer failed', null);
					}
				}, 5000);
	   } else {
	      callback(err, null);
	   }
	});
};

exports.transferCustomTokenEx = function(contractAddress, senderEthAddress, senderPrivateKey, receiverEthAddress, quantity, callback){
  //TODO:change parameter
  var myadvancedtoken = myadvancedtokenContract.at(contractAddress);
  var privateKey = new Buffer(senderPrivateKey, 'hex');//from.so_privatekey
  var serial = '0x' + web3.eth.getTransactionCount(senderEthAddress).toString(16);
  var rawTx = {
    nonce: serial,
    gasPrice: '0x43bb88745',
    gasLimit: '0x400000',
    to: contractAddress,//contract address
    value: '0x00',
    from: senderEthAddress,
    data: myadvancedtoken.transfer.getData(receiverEthAddress, quantity)
  };

  var tx = new Tx(rawTx);
  console.log(JSON.stringify(tx, null, '    '));
  tx.sign(privateKey);
  var serializedTx = tx.serialize();
  web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash){
  	callback(err, hash);
  });
};


exports.getCustomTokenBalance = function(contractAddress, userAddress){
	var customToken = myadvancedtokenContract.at(contractAddress);
	return customToken.balanceOf(userAddress).toNumber();
};
var newBlockCB = null;
exports.setNewBlockGenCB = function(cb){
  newBlockCB = cb;
};

exports.monitorIssueAssets = function () {
  web3.eth.filter('latest').watch(function (err, blockHash) {
    if (!err) {
      for (var i = unackedAssetsHash.length - 1; i >= 0; i--) {
        var item = unackedAssetsHash[i];
        var receipt = web3.eth.getTransactionReceipt(item.hash);
        if (receipt) {
          dispatcher.emit(item.hash, null, receipt);
          unackedAssetsHash.splice(i, 1);
        } else {
          if (item.blockOffset < maxBlockReceiptUnavailable) {
            unackedAssetsHash[i].blockOffset = item.blockOffset + 1;
          } else {
            unackedAssetsHash.splice(i, 1);
            dispatcher.emit(item.hash, 'retrive receipt failed', null);
          }
        }
      }

      if (newBlockCB)
        newBlockCB();
    } else {
      console.log('monitor new block failed');
    }
  });
}