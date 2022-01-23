import { FastifyReply, FastifyRequest } from 'fastify';
import {config} from '../common/config';
import jwt from 'jsonwebtoken';

export const validateHook= async (request:FastifyRequest, reply:FastifyReply) => {
  try {
      const { authorization } = request.headers

      if (!authorization) {
          throw new Error('Unauthorized')
      }

      const token = authorization.split(' ')[1];
      await jwt.verify(token, config.JWT_SECRET_KEY)
  } catch (error) {
      reply.statusCode = 401
      throw error
  }
}