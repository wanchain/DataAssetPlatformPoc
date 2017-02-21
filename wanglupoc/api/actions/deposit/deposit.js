import UserBalance from '../../models/userBalance';
import Assets from '../../models/assetsmodel';
import AssetTransaction from '../../models/assetTransaction';
var ethereum = require('../../ethereum/ethereum');

const _getUserAssets = (user, callback) => {
  Assets.find({}, function(err, res){
    if(err){
      callback(err, null);
    } else {
      console.log(res[0].contractAddress);
      for(var i in res) {
        res[i] = res[i].toObject();
        res[i]['hold'] = ethereum.getCustomTokenBalance(res[i].contractAddress, user.ethAddress) / 100;
        console.log(res[i]);
      }
      callback(null, res);
    }
  });
};

export function getStockBalance(req) {
  console.log("-----getStockBalance");
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

let getbalancenum = 0;

export function getBalance(req) {
  const { user } = req.session;
  return new Promise((resolve, reject) => {
    UserBalance.findOne({'userid': user._id}, function (err, balance){
      if(!balance) {
        balance = new UserBalance();
        balance.userid = user._id;
        balance.cash = 0;
      }
      if(err){
        reject({error: err});
      } else {
        _getUserAssets(user, (error, findAssets) => {
          var modifyAbleBalance = balance.toObject();
          if(error){
          } else {
            modifyAbleBalance['assets'] = findAssets;
          }
          resolve({"userbalance": modifyAbleBalance});
        });
      }
    });
  });
}

export function getTransactions(req) {
  const user = req.session.user;
  return new Promise((resolve, reject) => {
    if (!user) {
      reject({error: 408});
      return undefined;
    }
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
  const user = req.session.user;
  console.log('cash-----', req.body.addcash);
  return new Promise((resolve, reject) => {
    UserBalance.findOne({'userid': user._id}, function (err, balance){
      if(!balance) {
        balance = new UserBalance();
        balance.userid = user._id;
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
  });
}

export function withdraw(req) {
  return new Promise((resolve, reject) => {
    const balance = [
      {id: 1, name: 'CNY', amount: 8990000},
      {id: 2, name: 'USD', amount: 5990000}
    ];
    const index = balance.findIndex((item) => {
      return (item.name === req.body.name);
    });

    if (index >= 0) {
      balance[index].amount = balance[index].amount - req.body.amount;
      resolve({data: balance});
    } else {
      reject({error: 'can not find the cash type!!'})
    }
  });
}

export default {

}
