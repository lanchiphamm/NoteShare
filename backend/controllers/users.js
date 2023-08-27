const usersRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')

// usersRouter.post('/', async (request, response) => {
//   const { username, password } = request.body

//   const user = await User.findOne({ username })
//   console.log(user)
//   if (user) {
//     console.log('user existed')
//     return response.status(401).json({
//       error: 'invalid username or password'
//     })
//   } else {
//     const userNew = new User({
//       username,
//       password
//     })
  
//     const savedUser = await userNew.save()
  
//     response.status(201).json(savedUser)
//   }
// })

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('document', { caption: 1, filename: 1 , fileId: 1})

  response.json(users)
})

module.exports = usersRouter