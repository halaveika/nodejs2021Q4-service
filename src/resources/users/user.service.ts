import {requestUserSchema,responseUserSchema} from './user.model';
import { getAllUsersHandler,getUserByIdHandler,createUserHandler, updateUserByIdHandler,deleteUserByIdHandler } from './user.handler';
import { validateHook } from '../../hooks/auth';


export const getUsers = {
  preValidation: validateHook,
  schema: {
    response: {
      200: {
        type: 'array',
        items: responseUserSchema,
      },
    },
  },
  handler: getAllUsersHandler
}

export const getUser = {
  preValidation: validateHook,
  schema: {
    querystring: {
      id: { type: 'string' }
    },
    response: {
      200: responseUserSchema,
      },
    },
  handler: getUserByIdHandler
}

export const postUser = {
  preValidation: validateHook,
  schema: {
    body: requestUserSchema,
    response: {
      201: responseUserSchema,
    },
  },
  handler: createUserHandler,
}

export const putUser = {
  preValidation: validateHook,
  schema: {
    querystring: {
      id: { type: 'string' }
    },
    body: requestUserSchema,
    response: {
      200: responseUserSchema,
    },
  },
  handler: updateUserByIdHandler,
}

export const deleteUser = {
  preValidation: validateHook,
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
  handler: deleteUserByIdHandler

}
