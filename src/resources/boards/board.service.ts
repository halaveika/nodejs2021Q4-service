import {requestBoardSchema,responseBoardSchema} from './board.model';
import { getAllBoardsHandler,getBoardByIdHandler,createBoardHandler, updateBoardByIdHandler,deleteBoardByIdHandler } from './board.handler';
import { validateHook } from '../../hooks/auth';

export const getBoards = {
  preValidation: validateHook,
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
  preValidation: validateHook,
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
  preValidation: validateHook,
  schema: {
    body: requestBoardSchema,
    response: {
      201: responseBoardSchema,
    },
  },
  handler: createBoardHandler,
}

export const putBoard = {
  preValidation: validateHook,
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
  preValidation: validateHook,
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
