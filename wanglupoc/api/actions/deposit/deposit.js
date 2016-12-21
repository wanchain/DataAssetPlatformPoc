/**
 * Created by jishiwu on 12/20/16.
 */
import UserBalance from '../../models/userBalance';
import Assets from '../../models/assetsmodel';
import AssetTransaction from '../../models/assetTransaction';
var ethereum = require('../../ethereum/ethereum');
// get stock balance


var _getUserAssets = function(user, callback){
  Assets.find({}, function(err, assetsFind){
    console.log("findAssetContracts" + JSON.stringify(assetsFind, null, "    "));
    if(err){
      callback(err, null);
    } else {
      var cpAssetsFind = assetsFind;
      console.log("cpAssetsFind" + JSON.stringify(assetsFind, null, "    "));
      for(var i in assetsFind){
        assetsFind[i] = assetsFind[i].toObject();
        assetsFind[i]['hold'] = ethereum.getCustomTokenBalance(assetsFind[i].contractAddress, user.ethAddress);
        console.log();
      }
      callback(null, assetsFind);
    }
  });
};

export function getStockBalance(req) {
  console.log("-----getStockBalance");
  //UI test
/*  return new Promise((resolve, reject) => {
    console.log("get success!!");

    // need a name table...
    const balance = [
      {id: 1, assetsName: "网录币", assetsTitle: 'WLC', stockNumber: 1700, unitPrice: 18.3},
      {id: 2, assetsName: "时代网", assetsTitle: 'SD', stockNumber: 2700, unitPrice: 17.3},
      {id: 3, assetsName: "新海股份(XH)", assetsTitle: 'XH', stockNumber: 1500, unitPrice: 12.3}
    ];
    resolve({data: balance});
  });*/
  //intergrate to ethereum
  const user = req.session.user;
  return new Promise((resolve, reject) => {
    _getUserAssets(user, function (err, assetArray) {
      if(err){
        reject({error: err});
      } else {
        resolve({data: balance});
      }
    });
  });
}

// get cash balance
/*
 {
 "userbalance": {
 "_id": "5859f7eb4c8a1e2bf023f90a",
 "cash": 101,
 "userid": "5853c9e91c26062227aeef14",
 "__v": 0,
 "assets": [
 {
 "_id": "5858ad03d123dd0e582084e7",
 "created_at": "2016-12-20T04:01:07.507Z",
 "updated_at": "2016-12-20T08:10:27.237Z",
 "creatorAddress": "0x4d3e67e30a250b647b7ea5b1f684b03d6f8d5255",
 "assetsName": "sss",
 "assetsTitle": "s",
 "assetsType": 0,
 "publishType": 0,
 "stockNumber": 9999999,
 "unitType": 0,
 "unitPrice": 1,
 "members": "",
 "publishTime": "2016-12-29T00:00:00.000Z",
 "totalValue": 0,
 "exchangeState": false,
 "__v": 0,
 "contractAddress": "0xc0b2c2f422bc90a8167f4c6a43a2629c7293ee01",
 "hold": 999998000
 }
 ]
 }
 }
* */
export function getbalance(req) {
  console.log("-----getbalance");
  const user = req.session.user;

  return new Promise((resolve, reject) => {
    //var balance = new UserBalance();
    UserBalance.findOne({'userid': user._id}, function (err, balance){
      if(!balance) {
        balance = new UserBalance();
        balance['userid'] = user._id;
        balance.cash = 0;
      }
      if(err){
        reject({error: err});
      } else {
        _getUserAssets(user, function (error, findAssets){
          console.log('findAssets' + JSON.stringify(findAssets, null, '     '));
          var modifyAbleBalance = balance.toObject();
          if(error){
            //omited
          } else {
            modifyAbleBalance['assets'] = findAssets;
          }
          resolve({"userbalance": modifyAbleBalance});
        });
      }
    });
  });
}

// get transactions
export function getTransactions(req) {
  console.log("-----getTransactions");
  const user = req.session.user;
  // return new Promise((resolve, reject) => {
  //   console.log("get success!!");
  //
  //   // trade type: 0 买入, 1 卖出, state: 200 代表完成
  //   const transactions = [
  //    {fromAddress: '0xbbbbbbbbbbbbbb', toAddress: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: 0, totalPrice: 200, transferQuantity: 10, valuePerShare: 20, fee: 0, status: '完成', timestamp: '2016-10-12'},
  //    {fromAddress: '0xbbbbbbbbbbbbbb', toAddress: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: 0, totalPrice: 200, transferQuantity: 10, valuePerShare: 20, fee: 0, status: '完成', timestamp: '2016-10-12'},
  //    {fromAddress: '0xbbbbbbbbbbbbbb', toAddress: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: 0, totalPrice: 200, transferQuantity: 10, valuePerShare: 20, fee: 0, status: '完成', timestamp: '2016-10-12'},
  //    {fromAddress: '0xbbbbbbbbbbbbbb', toAddress: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: 0, totalPrice: 200, transferQuantity: 10, valuePerShare: 20, fee: 0, status: '完成', timestamp: '2016-10-12'}
  //   ];
  //   resolve({data: transactions});
  // });
  return new Promise((resolve, reject) => {
    AssetTransaction.find({fromAddress: user.ethAddress}, function(err, transactions){
      if(err){
        reject({error: err});
      } else {
        resolve({data: transactions});
      }
    });
  });
}

export function deposit(req) {
  console.log("-----deposit");
  console.log(" request" + JSON.stringify(req.body, null, '$$$$'));
  const user = req.session.user;
  return new Promise((resolve, reject) => {
    //var balance = new UserBalance();
    UserBalance.findOne({'userid': user._id}, function (err, balance){
      console.log(typeof balance);
      console.log('user balance: ' + JSON.stringify(balance, null, '$$$$'));
      if(!balance) {
        balance = new UserBalance();
        balance['userid'] = user._id;
        balance.cash = 0;
      }
      balance.cash += req.body.addcash;
      balance.save(function (err, data){
        if(err) {
          reject({'error': err});
        } else {
          resolve({userbalance: data});
        }
      })
    });

/*    console.log("deposit success!!");
    // 充值成功，现在的金额，加上充值的金额。。
    // req.body = {userid: xx, id: xx, name: xx, amount: xx}
    const balance = [
      {id: 1, name: 'CNY', amount: 8990000},
      {id: 2, name: 'USD', amount: 5990000}
    ];
    const cashbalance = balance.find((item) => {
      return (item.name === req.body.name) !== -1;
    });

    if (cashbalance.length > 0) {
      cashbalance[0].amount = cashbalance[0].amount + req.body.amount;
      resolve({data: cashbalance[0]});
    }*/
  });
}

export function withdraw(req) {
  console.log("-----withdraw");
  return new Promise((resolve, reject) => {
    console.log("withdraw success!!");
    // 提取成功，现在的金额，减去提取的金额。。
    // req.body = {id: xx, name: xx, amount: xx}
    const balance = [
      {id: 1, name: 'CNY', amount: 8990000},
      {id: 2, name: 'USD', amount: 5990000}
    ];
    const index = balance.findIndex((item) => {
      return (item.name === req.body.name) !== -1;
    });

    if (index >= 0) {
      balance[index].amount = balance[index].amount - req.body.amount;
      resolve({data: balance});
    } else {
      reject({error: 'can not find the cash type!!'})
    }
  });
}
