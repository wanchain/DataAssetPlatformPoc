import mongoose from 'mongoose';

const userBalanceSchema = new mongoose.Schema({
  userid: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'user'
  },
  cash: { 
  	type: Number,
  	min: 0 
  }
});

const UserBalance = mongoose.model('UserBalance', userBalanceSchema);
export default UserBalance;