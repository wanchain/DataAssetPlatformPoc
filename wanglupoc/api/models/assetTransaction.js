/**
 * Created by zy on 16-11-21.
 */
import mongoose from 'mongoose';

const assetTransaction = new mongoose.Schema({
    fromAddress: String,
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},

    toAddress: String,

    assetContract: String,

    valuePerShare: {type: Number},
    transferQuantity: {type: Number},

    timestamp: {type: Date, default: Date.now},
    status: {type: String, enum: ['validating', 'failed', 'completed']}
});

export default mongoose.model('AssetTransaction', assetTransaction);