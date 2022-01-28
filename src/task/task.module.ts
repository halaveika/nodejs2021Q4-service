import { Module } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import {TaskController } from './task.controller';

@Module({
  imports:[TypeOrmModule.forFeature([TaskEntity])],
  exports:[TypeOrmModule],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
