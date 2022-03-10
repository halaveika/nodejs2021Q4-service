import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { FileModule } from './file/file.module';
import { ColumnModule } from './column/column.module';
import { FileFastifyModule } from './filefastify/file-fastify.module';
import { ColumnService } from './column/column.service';

const isFastify = process.env.USE_FASTIFY === 'true' ? true : false;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    BoardModule,
    UserModule,
    TaskModule,
    AuthModule,
    SharedModule,
    ColumnModule,
    FileFastifyModule,
    isFastify ? FileFastifyModule : FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
