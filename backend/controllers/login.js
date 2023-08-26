const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : (password === user.password)

  if (!user) return response.status(400).json({
    error: 'username does not exist'
  })

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  response
    .status(200)
    .send({ username: user.username, password: user.password })
})

module.exports = loginRouter