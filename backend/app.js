const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())

module.exports = app