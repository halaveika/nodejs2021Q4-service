const Board = require('./board.model');
const { getAllBoardsHandler,getBoardByIdHandler,createBoardHandler, updateBoardByIdHandler,deleteBoardByIdHandler } = require('./board.handler');


const getBoards = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: Board,
        },
      },
    },
    handler: getAllBoardsHandler
}

const getBoard = {
  schema: {
    querystring: {
      id: { type: 'string' }
    },
    response: {
      200: Board,
      },
    },
  handler: getBoardByIdHandler
}

const postBoard = {
  schema: {
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
        columns: Board.properties.columns,
      },
    },
    response: {
      201: Board,
    },
  },
  handler: createBoardHandler,
}

const putBoard = {
  schema: {
    querystring: {
      id: { type: 'string' }
    },
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
        columns: Board.properties.columns,
      },
    },
    response: {
      200: Board,
    },
  },
  handler: updateBoardByIdHandler,
}

const deleteBoard = {

  schema: {
    querystring: {
      id: { type: 'string' }
    },
    response: {
      204: {
        description: 'Deleted',
        type: 'null',
      },
    },
  },
  handler: deleteBoardByIdHandler

}

module.exports = { getBoards, getBoard, postBoard, putBoard, deleteBoard };
