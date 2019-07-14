import mongoose from 'mongoose';

/**
 * @description profile entity
 */
const userProfile = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: false,
  },
  email: {
    type: String,
    trim: true,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
    unique: false,
  },
  gender: {
    type: String,
    required: false,
    unique: false,
  },
  contact: [{
    type: String,
    trim: true,
    required: false,
    unique: false,
  }],
  address: [{
    type: String,
    required: false,
  }],
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
    unique: false,
  },
  skills: [{
    type: String,
    trim: true,
    required: false,
  }],
}, { timestamps: true });


const Profile = mongoose.model('Profile', userProfile);
export default Profile;
