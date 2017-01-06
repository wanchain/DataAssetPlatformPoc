/**
 * Created by jishiwu on 12/6/16.
 */
import Assets from '../../models/assetsmodel';
import AssetTransaction from '../../models/assetTransaction';
import {assignAssetsModelObject} from '../helper/assignModels';
var ethereum = require('../../ethereum/ethereum');

export default function add(req) {
  console.log("-----asset-add" + req.body);

  const des = {};
  assignAssetsModelObject(des, req.body);
  var newAssets = new Assets(des);
  return new Promise((resolve, reject) => {
    // if save success
    const user = req.session.user;
    if (!user) {
      console.error("session-user is none");
      reject();
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
        resolve({data: data});
        ethereum.issueAsset(user.ethAddress, user.so_privatekey, data, (err, receipt) => {
          if(err) {
            console.log("add 2 error: " + err);
            data.issueState = "failed";
          } else {
            data.issueState = "completed";
            data.contractAddress = receipt.contractAddress;
            data['receipt'] = receipt;
          }
          data.save(function (err) {
            console.log("add 3 error: " + err);
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

export function customTokenTransfer(req) {
  console.log('customTokenTransfer' + JSON.stringify(req.body, null, '$$$$'));
  const sender = req.session.user;
  console.log("session-user:" + JSON.stringify(sender));
  const assetContractAddress = req.body.contractAddress;
  const receiverAddress = req.body.receiverAddress;
  const quantity = req.body.number;
  return new Promise((resolve, reject) => {
    // if save success

    var tx = new AssetTransaction({
      fromAddress: sender.ethAddress,
      fromUser: sender,
      toAddress: receiverAddress,
      assetContract: assetContractAddress,
      transferQuantity: quantity,
      status: 'validating',
      receipt: {}
    });
    tx.save(function (err, data) {
      if(err) {
        console.log("add error: " + err);
        tx.status = err ? 'failed' : 'completed';
        reject(err);
      } else {
        console.log("add success!!");
        resolve({data: data});
        var dbTx = data;
        console.log('quantity : ' + quantity);
        ethereum.transferCustomToken(assetContractAddress, sender.ethAddress,
             sender.so_privatekey, receiverAddress, quantity *100,
             function (err, dummy) {
                 dbTx.status = err ? 'failed' : 'completed';
                 dbTx['receipt'] = dummy;
                 dbTx.save();
             });
      }
    });
  });
}