import { FastifyRequest } from 'fastify';
import {User} from './User.type'


export type UserReq = FastifyRequest<{
  Params: { id: string };
  Body: Omit<User, 'password'>;
}>

export type UserReqParams = FastifyRequest<{
  Params: { id: string };
}>

export type UserReqBody = FastifyRequest<{
  Body: Omit<User, 'password'>;
}>


export type LoginReqBody = FastifyRequest<{
  Body: Omit<User, 'id'>;
}>