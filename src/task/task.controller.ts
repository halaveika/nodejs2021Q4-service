import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@UseGuards(AuthGuard)
@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(@Param('boardId') boardId: string) {
    return this.taskService.getAllTasks(boardId);
  }

  @Get('/:taskId')
  async getTaskByIdH(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    const task = await this.taskService.getTaskById(boardId, taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async createTask(
    @Param('boardId') boardId: string,
    @Body() taskDto: CreateTaskDto,
  ) {
    const newTask = await this.taskService.createTask(taskDto, boardId);
    if (!newTask) {
      throw new BadRequestException('Task not created');
    }
    return newTask;
  }

  @Put('/:taskId')
  async updateTaskById(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() taskDto: CreateTaskDto,
  ) {
    const updatedTask = await this.taskService.updateTaskById(
      taskDto,
      boardId,
      taskId,
    );
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }

  @Delete('/:taskId')
  async deleteTaskById(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    const isDeleted = await this.taskService.deleteTaskById(boardId, taskId);
    if (!isDeleted) {
      throw new NotFoundException('Task not found');
    }
    return isDeleted;
  }
}
