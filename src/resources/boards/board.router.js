const { getBoards, getBoard, postBoard, putBoard, deleteBoard } = require('./board.service');


function boardRouter(app, options, done) {
  
  app.get('/boards', getBoards)

  app.get('/boards/:id', getBoard)

  app.post('/boards', postBoard)

  app.delete('/boards/:id', deleteBoard)

  app.put('/boards/:id', putBoard)

  done()
}

module.exports = boardRouter