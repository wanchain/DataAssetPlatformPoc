import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },

  password: String,

  name: {
    type: String,
    unique: true
  },

  userType: {
    type:String,
    enum: ['customer', 'admin']
  },

  ethAddress: {
    type: String,
    lowercase:true
  },

  so_privatekey: {
    type: String
  }
});

userSchema.pre('save', function hashPassword(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePass(canditatePassword, callback) {
  bcrypt.compare(canditatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

export default mongoose.model('user', userSchema);
