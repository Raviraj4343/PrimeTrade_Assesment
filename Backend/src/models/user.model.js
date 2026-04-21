import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import constants from '../constants/constant.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: Object.values(constants.roles),
      default: constants.roles.USER
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, constants.config.bcryptSaltRounds);
  return next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
