import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { json } from 'stream/consumers';
import { Request, Response } from 'express';
import { FastifyReply, FastifyRequest } from "fastify";
import { WinstonLogger } from '../logger/logger.service';
import { UtilsService } from '../utils/utils.service';

const isFastify = (process.env.USE_FASTIFY === 'true') ? true : false;

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private appLogger: WinstonLogger, private utilsService: UtilsService ) {
    this.appLogger.setContext(LoggerInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    let request:Request, fastifyRequest:FastifyRequest,statusCode:number;
    if (isFastify) {
      fastifyRequest = context.switchToHttp().getRequest<FastifyRequest>();
      statusCode = context.switchToHttp().getResponse<FastifyReply>().statusCode;
      const { method, params, query, body } = fastifyRequest;
      this.appLogger.log(JSON.stringify({
        originalUrl: this.utilsService.getFastifyRequestUrl(fastifyRequest),
        method,
        params,
        query,
        body,
      }));
    } else {
      request = context.switchToHttp().getRequest<Request>();
      statusCode = context.switchToHttp().getResponse<Response>().statusCode;
      const { originalUrl, method, params, query, body } = request;
      this.appLogger.log(JSON.stringify({
        originalUrl,
        method,
        params,
        query,
        body,
      }));
    }



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