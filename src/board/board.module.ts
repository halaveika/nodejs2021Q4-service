import { Module } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  imports:[TypeOrmModule.forFeature([BoardEntity])],
  exports:[TypeOrmModule],
  providers:[BoardService],
  controllers: [BoardController]
})
export class BoardModule {}
