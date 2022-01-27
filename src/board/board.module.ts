import { Module } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([BoardEntity])],
  exports:[TypeOrmModule]
})
export class BoardModule {}
