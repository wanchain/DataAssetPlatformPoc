/**
 * Created by jishiwu on 12/6/16.
 */
import Assets from '../../models/assetsmodel';

export default function add(req) {
  console.log("-----");
  console.log(req.body);

  var newAssets = Assets({
    corporation: req.body.corporation,
    property: req.body.property,
    stocktotalnumber: req.body.stocktotalnumber,
    totalvalue: req.body.totalvalue,
    exchangestate: req.body.exchangestate,
    createtime: req.body.createtime,
  });
  return new Promise((resolve, reject) => {
    // if save success
    newAssets.save(function (err) {
      if(err) {
        console.log("add error: " + err);
        reject(err);
      } else {
        console.log("add success!!");
        resolve("create success");
      }
    });
    console.log("add.... ");
    // else reject

  });

  // return Promise.resolve({success: 'yes'});
}

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
    Assets.find({corporation: id}, function (err, asset) {
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
        aAsset.corporation = item.corporation;
        aAsset.property = item.property;
        aAsset.stocktotalnumber = item.stocktotalnumber;
        aAsset.totalvalue = item.totalvalue;
        aAsset.exchangestate = item.exchangestate;
        aAsset.createtime = item.createtime;

        aAsset.save(function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve({item: data});
          }
        });
      }
    })
  });
}