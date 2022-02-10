import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import logger from './logger';

const errorHandler = (error:FastifyError, _request:FastifyRequest, reply:FastifyReply) => {
  logger.error(error)
  reply.status(500).send({ ok: false })
}

export default errorHandler;