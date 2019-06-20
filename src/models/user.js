import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * @description user entity
 */
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: false
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: false
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'regular'
  },
  isActive: {
    type: Boolean,
    required: false,
    default: false
  },
  profileId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }],
}, { timestamps: true });

/**
 * @description encrypt and store user password
 *
 * @param save, callback
 */
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  // generate a hashing salt
  bcrypt.genSalt(10, function (error, salt) {
    if (error) {
      throw new Error('error occurred while encryting password');
    }

    // hash password using generated salt
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) {
        throw new Error('an error occurred while encryting password');
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);
export default User;
