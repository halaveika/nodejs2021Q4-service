import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [DatabaseModule, LoggerModule],
  exports: [DatabaseModule, LoggerModule, UtilsService],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    UtilsService,
  ],
})
export class SharedModule {}
