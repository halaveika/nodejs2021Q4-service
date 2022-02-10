const {requestBoardSchema,responseBoardSchema} = require('./board.model');
const { getAllBoardsHandler,getBoardByIdHandler,createBoardHandler, updateBoardByIdHandler,deleteBoardByIdHandler } = require('./board.handler');


const getBoards = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: responseBoardSchema,
        },
      },
    },
    handler: getAllBoardsHandler
}

const getBoard = {
  schema: {
    querystring: {
      boardId: { type: 'string' }
    },
    response: {
      200: responseBoardSchema,
      },
    },
  handler: getBoardByIdHandler
}

const postBoard = {
  schema: {
    body: requestBoardSchema,
    response: {
      201: responseBoardSchema,
    },
  },
  handler: createBoardHandler,
}

const putBoard = {
  schema: {
    querystring: {
      boardId: { type: 'string' }
    },
    body: requestBoardSchema,
    response: {
      200: responseBoardSchema,
    },
  },
  handler: updateBoardByIdHandler,
}

const deleteBoard = {

  schema: {
    querystring: {
      boardId: { type: 'string' }
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
