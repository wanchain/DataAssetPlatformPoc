/**
 * Created by jishiwu on 12/5/16.
 */
import mongoose from 'mongoose';

// const db = 'mongodb://127.0.0.1/wanglutech';
//
// mongoose.connect(db);
//
// mongoose.connection.on('connected', function(){
//   console.log('Mongoose connected to ' + db);
// });
//
// mongoose.connection.on('error', function(err){
//   console.log('Mongoose connection error: ' + err);
// });
//
// mongoose.connection.on('disconnected', function () {
//   console.log('Mongoose disconnected');
// });

//
const assetsSchema = new mongoose.Schema({
  assetsName: { type: String, required: true, unique: true },
  assetsTitle: String,
  assetsType: Number,
  publishType: Number,
  stockNumber: Number,
  unitType: Number,
  unitPrice: Number,
  members: String,
  publishTime: Date,
  totalValue: Number,
  exchangeState: Boolean,
  created_at: Date,
  updated_at: Date,
  // bellow items is filled by the block chain
  contractAddress: String,
  creatorAddress: String,
  marketPrice: Number,
  issueState: {type: String, enum: ['validating', 'failed', 'completed']},
  receipt: Object
});

assetsSchema.pre('save', function addTime(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  // if check success
  next();
  // else
  // next(err);
});

// setup model
export default mongoose.model('Assets', assetsSchema);

// use case
// var node = new AssetsListModel({name: 'Exx' });
// node.save(function (err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('The new node is saved');
//   }
// });
// Assets.create({name: 'Ex2'}, function(err, node, numAffected){
//   if(err) {
//     res.send({'success': false, 'err': err});
//   } else {
//     res.send({'success': true});
//     console.log("AssetsModel created and saved: " + node);
//     res.redirect('/');
//   }
// });
