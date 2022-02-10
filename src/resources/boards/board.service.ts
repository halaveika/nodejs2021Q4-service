import {requestBoardSchema,responseBoardSchema} from './board.model';
import { getAllBoardsHandler,getBoardByIdHandler,createBoardHandler, updateBoardByIdHandler,deleteBoardByIdHandler } from './board.handler';


export const getBoards = {
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

export const getBoard = {
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

export const postBoard = {
  schema: {
    body: requestBoardSchema,
    response: {
      201: responseBoardSchema,
    },
  },
  handler: createBoardHandler,
}

export const putBoard = {
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

export const deleteBoard = {

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
