import mongoose from 'mongoose';

const userAssetItemsSchema = new mongoose.Schema({
  quantity: {type: Number, min: 0},

  contractAddr: {type: mongoose.Schema.Types.ObjectId, ref: 'assetContract'}
});

const userBalanceSchema = new mongoose.Schema({
  cash: { type: Number, min: 0 },
  assets: [userAssetItemsSchema]
});

const UserAssetItem = mongoose.model('userAssetItem', userAssetItemsSchema);
const UserBalance = mongoose.model('userBalance', userBalanceSchema);
export { UserAssetItem };
export default UserBalance;