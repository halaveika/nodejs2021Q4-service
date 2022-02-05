import { LoggerService, Injectable, Scope } from '@nestjs/common'
import { createLogger, Logger } from 'winston';
import * as winston from 'winston';
import * as path from 'path';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

@Injectable({ scope: Scope.TRANSIENT })

export class  WinstonLogger implements LoggerService {
  private context?: string
  private winstonLogger: Logger

  public setContext(context: string) {
    this.context = context
  }

  constructor() {
 
    this.winstonLogger = createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
            winston.format.uncolorize(),
          ),
          filename: path.join(__dirname, '../../../logs/all.log'),
          level: process.env.LOG_LEVEL
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
            winston.format.uncolorize(),
          ),
          filename: path.join(__dirname, '../../../logs/error.log'),
          level: 'error'
        })
      ]
    })
  }

  log(message: string, context?: string) {
    return this.winstonLogger.info(message, { context: context || this.context })
  }

  error(message: string, trace?: string, context?: string) {
    return this.winstonLogger.error(message, { trace, context: context || this.context })
  }

  warn(message: string, context?: string) {
    return this.winstonLogger.warn(message, { context: context || this.context })
  }

  debug(message: string, context?: string) {
    return this.winstonLogger.debug(message, { context: context || this.context })
  }

  verbose(message: string, context?: string) {
    return this.winstonLogger.verbose(message, { context: context || this.context })
  }
}