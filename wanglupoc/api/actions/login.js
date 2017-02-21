import User from '../models/userModel';

export default function login(req) {
  const { username, password } = req.body;
  return new Promise((resolve, reject) => {
    User.findOne({username: username})
      .then(res => {
        if(res) {
          req.session.user = res;
          resolve({ user: res });
        } else {
          reject({status: 401, code: 2, message:"User name or password invalid"});
        }
      })
      .catch(err => {
        reject({status: 402, code: 3, message: err.errmsg ?  err.errmsg : JSON.stringify(err)});
      });
  });
}
