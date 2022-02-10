import { FastifyRequest } from 'fastify';
import {Board} from './Board.type'


export type BoardReq = FastifyRequest<{
  Params: { boardId: string };
  Body: Omit<Board, 'id'>;
}>

export type BoardReqParams = FastifyRequest<{
  Params: { boardId: string };
}>

export type BoardReqBody = FastifyRequest<{
  Body: Omit<Board, 'id'>;
}>
