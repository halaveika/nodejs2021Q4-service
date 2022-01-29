import { Module } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([BoardEntity]),AuthModule],
  exports:[TypeOrmModule],
  providers:[BoardService],
  controllers: [BoardController]
})
export class BoardModule {}
