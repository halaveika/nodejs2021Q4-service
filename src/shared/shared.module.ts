import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';


@Module({
  imports:[DatabaseModule, LoggerModule],
  exports:[DatabaseModule,LoggerModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class SharedModule {}
