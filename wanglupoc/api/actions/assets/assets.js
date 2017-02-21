import Asset from '../../models/assetsmodel';
import AssetTransaction from '../../models/assetTransaction';
import {assignAssetsModelObject} from '../helper/assignModels';

var ethereum = require('../../ethereum/ethereum');
ethereum.monitorIssueAssets();
var redis = require('redis');
var redisClient = redis.createClient();

export function add(req) {
  const des = {};
  assignAssetsModelObject(des, req.body);
  var asset = new Asset(des);
  return new Promise((resolve, reject) => {
    const { user } = req.session;
    if (!user) {
      reject({Error: 'login then issue assets'});
      return;
    } 
    asset.creatorAddress = user.ethAddress;
    asset.issueState = "validating";
    asset.save(function (err, res) {
      if(err) {
        console.log("add new asset error: " + err);
        reject(err);
      } else {
        ethereum.issueAsset(user.ethAddress, user.ethPrK, res, (err, receipt) => {
          if (err) {
            console.log("add 2 error: " + JSON.stringify(err));
            res.issueState = "failed";
          }  

          if (receipt) {
            console.log('TX RECEIPT RETRIEVED');
            res.issueState = "completed";
            res.contractAddress = receipt.contractAddress;
            res.receipt = receipt;
          } else {
            console.log('TX RECEIPT RETRIEVMENT FAILED!!!!');
          }

          console.log("add 4 begin save");
          res.save(function (err, result) {
            if (err) {
              console.log("add 3 error: " + err);
              reject(err);
            } else {
              console.log("*****save success:");
              resolve({ data:  result});
            }
          });
        });
      }
    });
  });
}

//poc@imm:查找特定user的asset
export function getall(req) {
  return new Promise((resolve, reject) => {
    Asset.find({}, function (err, assetslist) {
      if (err) {
        console.log("getall error: " + err);
        reject(err);
      } else {
        console.log("get success!!");
        resolve({data: assetslist});
      }
    })
  });
}

export function delone(req) {
  console.log(req.body);
  var id = req.body.id;
  return new Promise((resolve, reject) => {
    Asset.find({assetsName: id}, function (err, asset) {
      if (err) {
        console.log("delOne:" + err);
        reject(err);
      } else {
        console.log("delOne: success");
        if (asset.length <= 0) {
          reject({message: 'error', 'data': 'no such asset'});
        } else {
          asset[0].remove(function (err, data) {
            if (err) {
              reject(err);
            } else {
              console.log("delOne success!!");
              console.log(data);
              resolve({data: data});
            }
          })
        }
      }
    })
  });
}

export function modify(req) {
  const item = req.body.item;
  var id = item._id;
  return new Promise((resolve, reject) => {
    Asset.find({_id: id}, function (err, asset) {
      if(err) {
        reject({ message: 'error'});
      } else {
        var aAsset = asset[0];
        assignAssetsModelObject(aAsset, item);

        aAsset.save(function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve({data: data});
          }
        });
      }
    })
  }); 
}
var cidPrefix = new Date().getTime().toString() + '_';
var cachedTxid = 1;
export function customTokenTransfer(req) {
  console.log('customTokenTransfer' + JSON.stringify(req.body, null, '$$$$'));
  const sender = req.session.user;
  console.log("session-user:" + JSON.stringify(sender));
  const assetContractAddress = req.body.contractAddress;
  const receiverAddress = req.body.receiverAddress;
  const quantity = req.body.number;
  return new Promise((resolve, reject) => {
    // if save success
    var tx = {
      fromAddress: sender.ethAddress,
      fromUser: sender,
      toAddress: receiverAddress,
      assetContract: assetContractAddress,
      transferQuantity: quantity,
      status: 'validating',
      ctxid: cidPrefix + cachedTxid++,
      receipt: {}
    };

    resolve({data: tx});
    console.log('sendedCachedTx: \n' + JSON.stringify(tx, '    '));
    redisClient.rpush('CacheTx', JSON.stringify(tx));
  });
}