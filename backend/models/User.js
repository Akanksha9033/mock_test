// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },

//   password: {
//     type: String,
//     required: true
//   },

//   role: {
//     type: String,
//     enum: ['Admin', 'Teacher', 'Student', 'Management'],
//     default: 'Student' // Student is default if not provided
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['Admin', 'Teacher', 'Student', 'Management'],
    default: 'Student',
  },

  phone: {
    type: String,
  },

  dob: {
    type: String, // or Date if you want strict type
  },

  location: {
    type: String,
  },

  description: {
    type: String,
  },

  social: {
    facebook: { type: String },
    youtube: { type: String },
    linkedin: { type: String },
    telegram: { type: String },
    whatsapp: { type: String },
  },

  profilePhoto: {
    type: String, // base64 string or image URL
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
