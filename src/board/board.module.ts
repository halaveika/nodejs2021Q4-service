import { Module } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ColumnService } from 'src/column/column.service';
import { ColumnModule } from 'src/column/column.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity]), AuthModule, ColumnModule],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
