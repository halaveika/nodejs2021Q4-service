import { Module,NestModule,MiddlewareConsumer  } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
   }), BoardModule, UserModule, TaskModule, AuthModule, SharedModule],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
