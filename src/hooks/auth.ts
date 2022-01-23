import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import {config} from '../common/config';

export const validateHook= async (req:FastifyRequest, reply:FastifyReply) => {
  try {
      const {authorization} = req.headers;
      if (!authorization) {
          throw new Error('Unauthorized')
      }

      const token = authorization.split(' ')[1];
      jwt.verify(token, config.JWT_SECRET_KEY)
  } catch (error) {
      reply.status(401);
      throw error
  }
}