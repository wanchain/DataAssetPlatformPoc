/**
 *
 */

import User from '../models/userModel';

export default function login(req) {
  const user = {
    name: req.body.name,
    password: req.body.password
  };
  return new Promise((resolve, reject) => {
    if(!user.name){
      reject({status: 400, code: 1, message:"Must provide email and password"});
    }

    User.findOne({name: user.name})
      .then(findUser => {
        if(findUser) {
          //TODO: trim user fields
          req.session.user = findUser;
          resolve({'user': findUser});
        } else {
          reject({status: 401, code: 2, message:"User name or password invalid"});
        }
      })
      .catch(error => {
        reject({status: 402, code: 3, message: error.errmsg ?  error.errmsg : JSON.stringify(error)});
      });
  });

}
