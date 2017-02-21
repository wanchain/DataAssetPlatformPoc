const meta = require('./poe_Meta');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const async = require('async');
const ethNodeURI = 'http://127.0.0.1:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNodeURI));

const contractAddress = meta.address;
const contractFactory = web3.eth.contract(meta.abi);
const contractInstance = contractFactory.at(contractAddress);
const SolidityCoder = require('web3/lib/solidity/coder.js');

const _queue = async.queue(_work, 1);

function _work(item, cb) {
  const { txHash } = item;
  const receipt = web3.eth.getTransactionReceipt(txHash);
  if (receipt) {
    _processTransactionReceipt(receipt, cb)
  } else {
    setTimeout(() => {
      _work(item, cb)
    }, 3000)
  }
}

function _pushWork(payload, cb) {
  const work = {
    txHash: payload
  }

  _queue.push(work, cb);
}

function _processTransactionReceipt(receipt, callback) {
  const { blockNumber, logs } = receipt;
  const log = logs[0];
  const { data, topics } = log;
  if (meta.topic === log.topics[0]){
    const dataDecrypted = SolidityCoder.decodeParams(["uint256", "string"], data.replace("0x", ""));
    const timestamp = parseInt(dataDecrypted[0]);
    const linkArray = dataDecrypted[1].split("/");
    const link = linkArray[linkArray.length - 1];
    callback(null, { blockNumber, timestamp, link });
  }
}

function _retrieve( shortLink, cb) {
  const timestamp = contractInstance.getChainyTimestamp(shortLink).toString();
  const data = JSON.parse(contractInstance.getChainyData(shortLink));
  const uText = data.description;
  const text = _unicode2String(data.description);
  const sender = contractInstance.getChainySender(shortLink);
  cb(null, {
    timestamp,
    uText,
    text,
    sender
  })
}

function _string2Unicode(str) {
  let result = '';
  for (let index = 0; index < str.length; index++) {
    result += '\\u' + parseInt(str[index].charCodeAt(0), 10).toString(16);
  }
  return result;
}

function _unicode2String(unicode) {
  const data = unicode.split('\\u');
  console.log(data);
  let str = '';
  for (let it = 0; it < data.length; it++) {
    if (data[it]) {
      str += String.fromCharCode(parseInt(data[it], 16).toString(10));
    } 
  }
  return str;
}

// APIs

function addData( ownerAddress, ownerPrivate, inputJSONStr, callback ) {
  var privateKey = new Buffer(meta.privateKey, 'hex');
  var serial = '0x' + web3.eth.getTransactionCount(ownerAddress).toString(16);

  var rawTx = {
    nonce: serial,
    gasPrice: '0x43bb88745',
    gasLimit: '0x400000',
    to: contractAddress,
    value: '0x00',
    from: ownerAddress,
    data: contractInstance.addChainyData.getData(inputJSONStr)
  }

  var tx = new Tx(rawTx);
  tx.sign(privateKey);
  var serializedTx = tx.serialize();

  web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
    callback(err, hash);
  })
}

function getShortLink( txHash, callback ) {
  _pushWork(txHash, callback);
}

function verify( shortLinkCode, callback ) {
  _retrieve( shortLinkCode, callback);
}

module.exports = {
  addData: addData,
  getShortLink: getShortLink,
  verify: verify
}

