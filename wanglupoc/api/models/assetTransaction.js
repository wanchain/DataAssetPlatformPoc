/**
 * Created by zy on 16-11-21.
 */
import mongoose from 'mongoose';

const assetTransaction = new mongoose.Schema({
    fromAddress: String,
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},

    toAddress: String,
    toUser: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},

    assetContract: {type: mongoose.Schema.Types.ObjectId, ref: 'assetContract'},

    valuePerShare: {type: Number},
    transferQuantity: {type: Number},

    timestamp: {type: Date, default: Date.now},
    status: {type: String, enum: ['validating', 'verified', 'failed']}
});

export default mongoose.model('assetTransaction', assetTransaction);