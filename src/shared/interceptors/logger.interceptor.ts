import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { json } from 'stream/consumers';
import { WinstonLogger } from '../logger/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private appLogger: WinstonLogger) {
    this.appLogger.setContext(LoggerInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    this.appLogger.log(JSON.stringify({
      originalUrl,
      method,
      params,
      query,
      body,
    }));

    return next.handle().pipe(
      tap((data) =>
      this.appLogger.log(JSON.stringify({
          statusCode,
          data,
        }))
      )
    );
  }
}