/**
 * Created by jishiwu on 12/6/16.
 */
import Assets from '../../models/assetsmodel';
import AssetTransaction from '../../models/assetTransaction';
import {assignAssetsModelObject} from '../helper/assignModels';
var ethereum = require('../../ethereum/ethereum');
ethereum.monitorIssueAssets();
var redis = require('redis');
var redisClient = redis.createClient();

export default function add(req) {
  console.log("-----asset-add" + req.body);

  const des = {};
  assignAssetsModelObject(des, req.body);
  var newAssets = new Assets(des);
  return new Promise((resolve, reject) => {
    // if save success
    const user = req.session.user;
    if (!user) {
      reject({Error: 'session-user is none'});
      return;
    } else {
      console.log("session-user:" + JSON.stringify(user));
    }
    newAssets.creatorAddress = user.ethAddress;
    newAssets.issueState = "validating";
    newAssets.save(function (err, data) {
      if(err) {
        console.log("add 1 error: " + err);
        reject(err);
      } else {
        console.log("add success!!");
        ethereum.issueAsset(user.ethAddress, user.so_privatekey, data, (err, receipt) => {
          if(err) {
            console.log("add 2 error: " + JSON.stringify(err));
            data.issueState = "failed";
          } else {
            data.issueState = "completed";
            data.contractAddress = receipt.contractAddress;
            data['receipt'] = receipt;
          }
          console.log("add 4 begin save");
          data.save(function (err) {
            if (err) {
              console.log("add 3 error: " + err);
            } else {
              console.log("*****save success:");
              resolve({data: data});
            }
            /*ethereum.transferCustomToken(data.contractAddress, user.ethAddress,
              user.so_privatekey, '0x4f35bf8d8c703bec0f848744b2cac1ff7dd59aa3', 1000, function () {
              });
              var caddr = data.contractAddress;
              setTimeout(function () {
                var twoBalance = ethereum.getCustomTokenBalance(caddr, '0x4f35bf8d8c703bec0f848744b2cac1ff7dd59aa3');
                console.log("user two balance:" + twoBalance);
              }, 2000);*/
          });
        });
      }
    });
  });
}

//poc@imm:查找特定user的asset
export function getall(req) {
  console.log("-----getall");

  return new Promise((resolve, reject) => {
    Assets.find({}, function (err, assetslist) {
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
    Assets.find({assetsName: id}, function (err, asset) {
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
  console.log("-----modify");
  console.log(req.body);
  const item = req.body.item;
  var id = item._id;
  return new Promise((resolve, reject) => {
    Assets.find({_id: id}, function (err, asset) {
      if(err) {
        reject({ message: 'error'});
      } else {
        var aAsset = asset[0];

        // modify its attributes
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