import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
   }),DatabaseModule, BoardModule, UserModule, TaskModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
