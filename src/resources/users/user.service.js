
const User = require('./user.model');
const {getAllUsersHandler} = require('./user.handler');


const getAll = {
  
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

module.exports = { getAll };
