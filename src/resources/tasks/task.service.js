const {requestTaskSchema,responseTaskSchema} = require('./task.model');
const { getAllTasksHandler,getTaskByIdHandler,createTaskHandler, updateTaskByIdHandler,deleteTaskByIdHandler } = require('./task.handler');


const getTasks = {
    schema: {
      querystring: {
        boardId: { type: 'string' }
      },
      response: {
        200: {
          type: 'array',
          items: responseTaskSchema,
        },
      },
    },
    handler: getAllTasksHandler
}

const getTask = {
  schema: {
    querystring: {
      boardId: { type: 'string' },
      taskId: { type: 'string' }
    },
    response: {
      200: responseTaskSchema,
      },
    },
  handler: getTaskByIdHandler
}

const postTask = {
  schema: {
    querystring: {
      boardId: { type: 'string' }
    },
    body: requestTaskSchema,
    response: {
      201: responseTaskSchema,
    },
  },
  handler: createTaskHandler,
}

const putTask = {
  schema: {
    querystring: {
      boardId: { type: 'string' },
      taskId: { type: 'string' }
    },
    body: requestTaskSchema,
    response: {
      200: responseTaskSchema,
    },
  },
  handler: updateTaskByIdHandler,
}

const deleteTask = {

  schema: {
    querystring: {
      boardId: { type: 'string' },
      taskId: { type: 'string' }
    },
    response: {
      204: {
        description: 'Deleted',
        type: 'null',
      },
    },
  },
  handler: deleteTaskByIdHandler

}

module.exports = { getTasks, getTask, postTask, putTask, deleteTask };
