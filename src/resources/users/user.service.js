const User = require('./user.model');
const { getAllUsersHandler,getUserByIdHandler,createUserHandler, updateUserByIdHandler,deleteUserByIdHandler } = require('./user.handler');


const getUsers = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: User,
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
      200: User,
      },
    },
  handler: getUserByIdHandler
}

const postUser = {
  schema: {
    body: {
      type: 'object',
      required: ['name','login','password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: User,
    },
  },
  handler: createUserHandler,
}

const putUser = {
  schema: {
    querystring: {
      id: { type: 'string' }
    },
    body: {
      type: 'object',
      required: ['name','login','password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: User,
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
