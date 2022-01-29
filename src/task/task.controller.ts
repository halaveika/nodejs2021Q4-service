import { Controller, Get,Body, Param, Post, Put, Delete,NotFoundException,HttpCode,BadRequestException,UseGuards} from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(@Param('boardId') boardId: string){
    return this.taskService.getAllTasks(boardId);
  }

  @Get('/:taskId')
  async getTaskByIdH(@Param('boardId') boardId: string,@Param('taskId') taskId: string){
    const task = await this.taskService.getTaskById(boardId, taskId);
    if(!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async createTask(@Param('boardId') boardId: string,@Body() task:TaskEntity){
    const newTask = await this.taskService.createTask(task,boardId);
    if(!newTask) {
      throw new BadRequestException('Task not created');
    }
    return newTask;
  }

  @Put('/:taskId')
  async updateTaskById(@Param('boardId') boardId: string, @Param('taskId') taskId: string,@Body() task:TaskEntity){
    const updatedTask = await this.taskService.updateTaskById(task,boardId, taskId);
    if(!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }

  @Delete('/:taskId')
  @HttpCode(204)
  async deleteTaskById(@Param('boardId') boardId: string, @Param('taskId') taskId: string){
    const isDeleted = await this.taskService.deleteTaskById(boardId, taskId);
    if(!isDeleted) {
      throw new NotFoundException('Task not found');
    }
    return isDeleted;
  }

}
