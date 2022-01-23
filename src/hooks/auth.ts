import { FastifyReply, FastifyRequest } from 'fastify';
import {config} from '../common/config';
import jwt from 'jsonwebtoken';

export const validateHook= async (req:FastifyRequest, reply:FastifyReply) => {
  try {
      const {authorization} = req.headers;
      console.log(authorization);
      if (!authorization) {
          throw new Error('Unauthorized')
      }

      const token = authorization.split(' ')[1];
      console.log(token);
      await jwt.verify(token, config.JWT_SECRET_KEY)
  } catch (error) {
      reply.statusCode = 401
      throw error
  }
}