/**
 * Created by zy on 17-1-8.
 * Tx is short for Transaction
 */
 
const redis = require('redis');
const events = require('events');
const mongoose = require('mongoose');
const ethNodeURI = 'http://127.0.0.1:8545';
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(ethNodeURI));

var ethereum = require('./ethereum/ethereum');

import AssetTransaction from './models/assetTransaction';

mongoose.Promise = global.Promise;
const mongoDB = 'mongodb://127.0.0.1/wanglutech';
mongoose.connect(mongoDB);


var client = redis.createClient();
var MaxUnackTxHash = 100;
var MaxUnAckedBlockOffset = 3;
var dispatcher = new events.EventEmitter();

function putUnackedHash(hash, ctxid, dbid, unackedBlockOffset){
  client.rpush('TxHash', JSON.stringify({'hash' : hash, 'ctxid': ctxid, dbid: dbid, unackedBlockOffset: unackedBlockOffset}));
}

function get1TxReceipt(){
  client.lpop('TxHash', function(err, strTxHash){
    if(err || !strTxHash)
      return;

    console.log('processing: ' + strTxHash);
    var hashInfo = JSON.parse(strTxHash);
    var receipt = web3.eth.getTransactionReceipt(hashInfo.hash);
    console.log('get receipt' + receipt);
    if(receipt){
      AssetTransaction.findByIdAndUpdate(hashInfo.dbid, {$set: {'status': 'completed','receipt' : receipt}}, function (err, result) {
        if(err){
          console.log('findOneAndUpdate err:' + err);
        }
      });
    } else { //receipt unavailable
      if(hashInfo.unackedBlockOffset < MaxUnAckedBlockOffset){
        hashInfo.unackedBlockOffset++;
        client.rpush('TxHash',JSON.stringify(hashInfo));
      } else {
        AssetTransaction.find({_id: hashInfo.dbid}, function (err, results) {
          if(err)
            return;
          if(results.length <= 0)
            return;

          var txDBItem = results[0];
          txDBItem['status'] = 'failed';
          txDBItem.save(function (err, data){
            if(err){
              console.log("updated receipt error");
            }
          });
        });
      }
    }
  });
}

function getTxReceipts(){
  client.llen('TxHash', function(err, unAckedlen){
    if(err || unAckedlen < 1)
      return;

    var index = unAckedlen;
    for(; index > 0; index--){
      console.log('getTxReceipts');
      get1TxReceipt();
    }
  });
}

function process1CachedTx(cachedTx){
  console.log(JSON.stringify(cachedTx));
  var tx = new AssetTransaction(cachedTx);
  tx.receipt = {};
  tx.save(function (err, data) {
    if(err){
      console.log('process1CachedTx saved tx to mongodb error occured');
    } else {
      ethereum.transferCustomTokenEx(cachedTx.assetContract, cachedTx.fromAddress, cachedTx.fromUser.so_privatekey,
        cachedTx.toAddress, cachedTx.transferQuantity * 100,
        function (err, txHash) {
          if(err){ 
            data.status = 'failed';
            data.save(function (err, ret) {
              console.log('update tx status failed: ' + err);
            });
          } else {
            console.log('');
            putUnackedHash(txHash, tx.ctxid, data._id, 0);
          }
        }
      );
    }
  });
}

function retrieve1CahchedTx(){
  client.llen('TxHash', function(err, unAckedlen){
    if(!err){
      if(unAckedlen < MaxUnackTxHash){
        client.lpop('CacheTx', function(err, strCacheTx){
          if(!err && strCacheTx){
            console.log('---------------------');
            //console.log(strCacheTx);
            var cachedTx = JSON.parse(strCacheTx);
            process1CachedTx(cachedTx);
            //继续处理剩下的缓存中的交易
            dispatcher.emit('fetch1CachedTx');
          }
        });
      }
    } else {
      console.log('fecth TxHash len in redis error occured!');
    }
  });
}

/*
 * 处理流程： 按照指定的时间间隔
 *          查看TxHash队列中存储的等待receipt的交易，大于阈值表示区块链上压力过大，来不及处理，这时候不再处理缓存中的交易
 *                                               小于阈值时，获取CacheTx中交易处理
 *          监听新块的生成以处理所有TxHash
 */

dispatcher.on('fetch1CachedTx', retrieve1CahchedTx);


setInterval(function () {
  retrieve1CahchedTx()
}, 100);

web3.eth.filter('latest').watch(function (err, blockHash) {
  if(!err) {
    getTxReceipts();
  } else {
    console.log('watch ethereum block generating failed');
  }
});
