/**
 * Created by zy on 16-12-19.
 */
import User from '../models/userModel';
var ethereum = require('../ethereum/ethereum');


export default function signup(req) {
  const user = {
    name: req.body.name,
    password: req.body.password,
    userType: req.body.UserType
  };
  return new Promise((resolve, reject) => {
    //TODO: strict verify
    if(!user.name){
      reject({status: 400, code: 1, message:"Must provide email and password"});
    }

    User.findOne({name: user.name})
      .then(findUser => {
        if(findUser) {
          reject({status: 401, code: 2, message:"User already exist"});
          return undefined;
        } else {
          var createUser = new User(user);
          var ethaddr = ethereum.genEthereumAddress();
          createUser.ethAddress = ethaddr.publicKey;
          createUser.so_privatekey = ethaddr.privateKey;
          return createUser.save();
        }
      })
      .then(createdUser => {
        if(createdUser){
          req.session.user = createdUser;
          resolve({'user': createdUser});
        }
      })
      .catch(error => {
        reject({status: 402, code: 3, message: error.errmsg ?  error.errmsg : JSON.stringify(error)});
      });
  });
}
