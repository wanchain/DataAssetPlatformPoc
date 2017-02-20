/**
 * Created by zy on 16-12-19.
 */
import User from '../models/userModel';
var ethereum = require('../ethereum/ethereum');

// UserType: 0 normal  1 admin 2 super admin
export default function signup(req) {
  const user = {
    name: req.body.name,
    password: req.body.password,
    userType: req.body.userType
  };
  console.log(req.body);
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
          createUser.email = createUser.ethAddress;
          createUser.so_privatekey = ethaddr.privateKey;
          // send some gas to the new ethaddr
          ethereum.giveStartupGas(createUser.ethAddress);
          return createUser.save();
        }
      })
      .then(createdUser => {
        console.log(JSON.stringify(createdUser, null, '    '));
        if(createdUser){


          req.session.user = createdUser;
          resolve({'user': createdUser});
        }
      })
      .catch(error => {
        reject({status: 402, code: 3, message: JSON.stringify(error)});
      });
  });
}
