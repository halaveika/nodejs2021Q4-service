import { Module } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import {TaskController } from './task.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([TaskEntity]),AuthModule],
  exports:[TypeOrmModule],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
