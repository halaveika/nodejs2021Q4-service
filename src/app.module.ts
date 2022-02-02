import { Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { FileModule } from './file/file.module';
import { ColumnModule } from './column/column.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
   }), BoardModule, UserModule, TaskModule, AuthModule, SharedModule, FileModule, ColumnModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
