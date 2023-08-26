const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  name: String,
  school: String,
  major: String,
  yearlevel: Number,
  courses: [String],
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }
})

module.exports = mongoose.model('User', userSchema)