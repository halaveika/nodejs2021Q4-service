import {Logger, pino} from 'pino';
import * as path from 'path';
import { FastifyReply, FastifyRequest } from 'fastify';
import {LOG_FILE_ALL, LOG_FILE_ERROR} from '../constants';
import {config} from './config';
import {BoardReq,BoardReqParams,BoardReqBody} from '../types/Board.request.type';
import {TaskReqBodyParams, TaskReqParams, TaskReqBodyParam, TaskReqParam} from '../types/Task.request.type';
import {UserReq, UserReqParams, UserReqBody} from '../types/User.request.type';

type CustomRequest = BoardReq | BoardReqParams | BoardReqBody | TaskReqBodyParams | TaskReqParams | TaskReqBodyParam
| TaskReqParam | UserReq | UserReqParams | UserReqBody


const logger:Logger = pino({
  transport:{
    targets: [{
      level: config.LOG_LEVEL as pino.LevelWithSilent,
      target: 'pino-pretty',
      options:  {
        translateTime: 'SYS:standard',
        colorize: true,
        levelKey: 'level',
        }
    },
    {
      level: config.LOG_LEVEL as pino.LevelWithSilent,
      target:'pino/file',
      options:  {
        destination: path.join(__dirname, LOG_FILE_ALL),
        mkdir: true
        }
    },
     {
      level: 'error',
      target: 'pino/file',
      options: { destination: path.join(__dirname, LOG_FILE_ERROR), mkdir: true}
    }
  ]
  },
  serializers: {
    res (reply:FastifyReply) {
      // The default
      return {
        statusCode: reply.statusCode,
        body: reply.request.body,
      }
    },
    req (request:FastifyRequest | CustomRequest) {
      return {
        method: request.method,
        url: request.url,
        path: request.routerPath,
        parameters: request.params,
        query_parameters: request.query,
        body: request.body,
        headers: request.headers
      };
    }
  }
})


export default logger;