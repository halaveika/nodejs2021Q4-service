import { FastifyRequest } from 'fastify';
import {Task} from './Task.type'


export type TaskReqParams = FastifyRequest<{
  Params: { boardId: string, taskId: string };
}>

export type TaskReqParam = FastifyRequest<{
  Params: { boardId: string};
}>

export type TaskReqBodyParams = FastifyRequest<{
  Params: { boardId: string, taskId: string };
  Body: Omit<Task, 'id'>;
}>

export type TaskReqBodyParam = FastifyRequest<{
  Params: { boardId: string};
  Body: Omit<Task, 'id'>;
}>
