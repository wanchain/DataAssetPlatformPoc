import User from '../models/userModel';
import { getAccountInfo } from '../ethereum/ethereum';

const { address, privateKey } = getAccountInfo();

export default function signup(req) {
  let { username, password } = req.body;
  let user = {
    username,
    password,
    ethPrK: privateKey,
    ethAddress: address
  }
  return new Promise((resolve, reject) => {
    new User(user).save((err, res) => {
      if (err) reject(err);
      req.session.user = user;
      resolve(res);
    })
  })
}
