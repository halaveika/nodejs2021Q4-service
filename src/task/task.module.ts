import { Module } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([TaskEntity])],
  exports:[TypeOrmModule]
})
export class TaskModule {}
