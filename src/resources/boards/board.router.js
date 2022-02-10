const { getBoards, getBoard, postBoard, putBoard, deleteBoard } = require('./board.service');


function boardRouter(app, options, done) {
  
  app.get('/boards', getBoards)

  app.get('/boards/:boardId', getBoard)

  app.post('/boards', postBoard)

  app.delete('/boards/:boardId', deleteBoard)

  app.put('/boards/:boardId', putBoard)

  done()
}

module.exports = boardRouter