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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskEntity } from './task.entity';

@ApiTags('tasks')
// @UseGuards(AuthGuard)
@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get All Tasks' })
  @ApiResponse({ status: 200, type: [TaskEntity] })
  @Get()
  getAllTasks(@Param('boardId') boardId: string) {
    return this.taskService.getAllTasks(boardId);
  }

  @ApiOperation({ summary: 'Get Task' })
  @ApiResponse({ status: 200, type: TaskEntity })
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

  @ApiOperation({ summary: 'Create Task' })
  @ApiResponse({ status: 200, type: TaskEntity })
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

  @ApiOperation({ summary: 'Update Task' })
  @ApiResponse({ status: 200, type: TaskEntity })
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

  @ApiOperation({ summary: 'Delete Task' })
  @ApiResponse({ status: 204 })
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
