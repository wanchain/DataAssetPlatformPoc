import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
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
  createdOn: { 
    type: Date,
    "default": Date.now
  },
  updatedOn: {
    type: Date,
    "default": Date.now
  },
  // bellow items is filled by the block chain
  contractAddress: String,
  creatorAddress: String,
  marketPrice: Number,
  issueState: {type: String, enum: ['validating', 'failed', 'completed']},
  receipt: Object
});


// setup model
export default mongoose.model('asset', assetSchema); 

