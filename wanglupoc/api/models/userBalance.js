import mongoose from 'mongoose';
/*
const userAssetItemsSchema = new mongoose.Schema({
  quantity: {type: Number, min: 0},

  contractAddr: {type: mongoose.Schema.Types.ObjectId, ref: 'Assets'}
});*/

const userBalanceSchema = new mongoose.Schema({
  userid: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  cash: { type: Number, min: 0 },
  //assets: [String] //contract addresses
});

//const UserAssetItem = mongoose.model('UserAssetItem', userAssetItemsSchema);
const UserBalance = mongoose.model('UserBalance', userBalanceSchema);
//export { UserAssetItem };
export default UserBalance;