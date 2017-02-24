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

function _retrieve( shortLink, cb ) {
  const timestamp = contractInstance.getChainyTimestamp(shortLink).toString();
  const fileInfo = JSON.parse(contractInstance.getChainyData(shortLink));
  const sender = contractInstance.getChainySender(shortLink);
  cb(null, {
    timestamp,
    sender,
    fileInfo
  });
}

function _getTxHash( shortLink, cb ) {
  // console.log('poe shotLink: ', shortLink);
  const result = {};
  if (!shortLink || shortLink.length <= 2) {
    const err = "Invalid code format";
    cb(err, null);
    return;
  }
  const block = _base58int(shortLink.slice(0, -2)) + meta.blockOffset;
  // console.log('block-----', block);
  const oBlock = web3.eth.getBlock(block, true);
  // console.log('oBlock-------', oBlock);
  const tag = 0;
  if (oBlock && oBlock.transactions.length) {
    for ( let i = 0; i<oBlock.transactions.length; i++ ) {
      const tx = oBlock.transactions[i];
      // console.log('tx--------', tx);
      const receipt = web3.eth.getTransactionReceipt(tx.hash);
      // console.log('receipt---------', receipt);
      if ( receipt && receipt.logs && receipt.logs.length ) {
        for ( let j = 0; j < receipt.logs.length; j++) {
          const log = receipt.logs[i];
          // console.log('log-----------', log);
          if ( meta.topic === log.topics[0] ) {
            const data = SolidityCoder.decodeParams(["uint256", "string"], log.data.replace("0x", ""));
            const timestamp = parseInt(data[0]);
            const splited = data[1].split('/');
            // console.log({ hash: tx.hash, sender: tx.from});
            cb(null, { hash: tx.hash, sender: tx.from});
            return;
          } else {
            cb("no transactions", null);
          }
        }
      }
    } 
  }
}
 
function _string2Unicode(str) {
  let result = '';
  for (let index = 0; index < str.length; index++) {
    result += '\\u' + parseInt(str[index].charCodeAt(0), 10).toString(16);
  }
  return result;
}

function _unicode2String( unicode ) {
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

function _base58int(value){
  const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
  const base = alphabet.length;
  let decoded = 0;
  while (value) {
    let alphabetPosition = alphabet.indexOf(value[0]);
    if (alphabetPosition < 0) return false;
    const powerOf = value.length - 1;
    decoded += alphabetPosition * (Math.pow(base, powerOf));
    value = value.substring(1);
  }
  return decoded;    
}

// APIs

function addData( ownerAddress, ownerPrivate, inputJSONStr, callback ) {
  var privateKey = new Buffer(meta.privateKey, 'hex');
  var serial = '0x' + web3.eth.getTransactionCount(ownerAddress).toString(16);
  console.log('input json string', inputJSONStr);
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

function getTxHash( shortLink, callback ) {
  _getTxHash( shortLink, callback );
}

module.exports = {
  addData: addData,
  getTxHash: getTxHash,
  getShortLink: getShortLink,
  verify: verify
}

