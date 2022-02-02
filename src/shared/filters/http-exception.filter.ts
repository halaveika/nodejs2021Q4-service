import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WinstonLogger } from '../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private appLogger: WinstonLogger) {
    this.appLogger.setContext(HttpExceptionFilter.name);
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || null,
    };
    this.appLogger.error(exception.message, JSON.stringify({
      stack: exception.stack,
      requestURL:
        request.protocol + '://' + request.get('host') + request.originalUrl,
      ...errorResponse,
    }));
    response.status(status).json(errorResponse);
  }
}