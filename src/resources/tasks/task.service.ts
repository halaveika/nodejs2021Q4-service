import {requestTaskSchema,responseTaskSchema} from './task.model';
import { getAllTasksHandler,getTaskByIdHandler,createTaskHandler, updateTaskByIdHandler,deleteTaskByIdHandler } from './task.handler';
import { validateHook } from '../../hooks/auth';

export const getTasks = {
  preValidation: validateHook,
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

export const getTask = {
  preValidation: validateHook,
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

export const postTask = {
  preValidation: validateHook,
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

export const putTask = {
  preValidation: validateHook,
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

export const deleteTask = {
  preValidation: validateHook,
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
