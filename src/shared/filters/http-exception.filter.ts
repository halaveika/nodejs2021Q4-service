import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FastifyRequest } from 'fastify';
import { WinstonLogger } from '../logger/logger.service';
import { UtilsService } from '../utils/utils.service';

const isFastify = process.env.USE_FASTIFY === 'true' ? true : false;

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private appLogger: WinstonLogger,
    private utilsService: UtilsService,
  ) {
    this.appLogger.setContext(HttpExceptionFilter.name);
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let fastifyRequest: FastifyRequest, request: Request;
    if (isFastify) {
      fastifyRequest = ctx.getRequest<FastifyRequest>();
    } else {
      request = ctx.getRequest<Request>();
    }

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: isFastify ? fastifyRequest.url : request.url,
      method: isFastify ? fastifyRequest.method : request.method,
      message: exception.message || null,
    };
    this.appLogger.log(JSON.stringify(exceptionResponse));
    this.appLogger.error(
      exception.message,
      JSON.stringify({
        stack: exception.stack,
        requestURL: isFastify
          ? fastifyRequest.protocol +
            '://' +
            fastifyRequest.hostname +
            this.utilsService.getFastifyRequestUrl(fastifyRequest)
          : request.protocol +
            '://' +
            request.get('host') +
            request.originalUrl,
        ...errorResponse,
      }),
    );
    response.status(status).send(errorResponse);
  }
}
