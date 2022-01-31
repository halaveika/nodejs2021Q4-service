import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: WinstonLogger) {
    this.logger.setContext(LoggerMiddleware.name);
  }
  use(req: Request, res: Response, next: NextFunction) {
    
    this.logger.log(req.body);
    next();
  }
}
