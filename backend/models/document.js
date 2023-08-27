const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
  caption: String,
  filename: String,
  fileId: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Document', documentSchema)