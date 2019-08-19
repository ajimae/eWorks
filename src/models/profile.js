import mongoose from 'mongoose';

/**
 *
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
    lowercase: true,
  },
  dob: {
    type: Date,
    required: false,
    unique: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    unique: false,
    default: null,
  },
  avatar: {
    type: String,
    required: false,
    default: 'http://www.link.com/avatar.png',
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
    default: null,
  },
  country: {
    type: String,
    required: false,
    unique: false,
    default: null,
  },
  handles: {
    twitter: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
    facebook: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
    linkedin: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
    github: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
  },
  details: {
    badge: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
    ratings: {
      type: Number,
      required: false,
      unique: false,
      default: 0,
    },
    skills: {
      type: Array,
      trim: true,
      required: false,
    },
  },
  additionalInfo: {
    profileViewCount: {
      type: Number,
      required: false,
      default: 0,
    },
    lastSeen: {
      type: Date,
      required: false,
      default: null,
    },
  },
}, { timestamps: true });


const Profile = mongoose.model('Profile', userProfile);
export default Profile;
