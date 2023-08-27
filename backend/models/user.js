const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  school: {
    type: String,
    default: ''
  },
  major: {
    type: String,
    default: ''
  },
  yearlevel: {
    type: Number,
    default: 0
  },
  courses: [String],
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }
})

module.exports = mongoose.model('User', userSchema)