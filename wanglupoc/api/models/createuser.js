/**
 * Created by zy on 16-11-17.
 */
require('../../server.babel');

mongoose =require('mongoose');
mongoose.Promise = global.Promise;
const mongoDB = 'mongodb://127.0.0.1/wanglutech';
mongoose.connect(mongoDB);

 User = require('./userModel');
new User({
  email : "dream",
  password : "testing",
  name : "dream"
}).save();
