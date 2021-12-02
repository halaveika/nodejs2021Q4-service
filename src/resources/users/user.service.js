const {requestUserSchema,responseUserSchema} = require('./user.model');
const { getAllUsersHandler,getUserByIdHandler,createUserHandler, updateUserByIdHandler,deleteUserByIdHandler } = require('./user.handler');


const getUsers = {
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

const getUser = {
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

const postUser = {
  schema: {
    body: requestUserSchema,
    response: {
      201: responseUserSchema,
    },
  },
  handler: createUserHandler,
}

const putUser = {
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

const deleteUser = {

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

module.exports = { getUsers, getUser, postUser, putUser, deleteUser };
