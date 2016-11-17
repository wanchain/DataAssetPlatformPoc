import UserDao from '../dao/userDao'

export default function login(req) {
  const user = {
    name: req.body.name,
    password: req.body.password
  };
  var result = UserDao.signin(user, (suser) => {
    req.session.user = suser;
  });
  console.log("you are right");
  return Promise.resolve(result);
}
