const { getUsers, getUser, postUser, putUser, deleteUser } = require('./user.service');


function userRouter(app, options, done) {
  
  app.get('/users', getUsers)

  app.get('/users/:id', getUser)

  app.post('/users', postUser)

  app.delete('/users/:id', deleteUser)

  app.put('/users/:id', putUser)

  done()
}

module.exports = userRouter