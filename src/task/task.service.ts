import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  /**
   * Returns array of Tasks on current Board
   * @param boardId - id of Board
   * @returns Promise of array of Tasks
   */
  async getAllTasks(boardId: string): Promise<TaskEntity[]> {
    return this.taskRepository.find({ boardId }) as Promise<TaskEntity[]>;
  }

  /**
   * Returns Task by boardId & taskId
   * @param boardId - id of Board
   * @param taskId - id of Task
   * @returns Promise of Tasks or undefined
   */
  async getTaskById(
    boardId: string,
    taskId: string,
  ): Promise<TaskEntity | undefined> {
    return (await this.taskRepository.findOne({ boardId, id: taskId })) as
      | TaskEntity
      | undefined;
  }

  /**
   * Returns new created Task
   * @param task - Task object for creating Task in store
   * @param boardId - id of Board
   * @returns Promise of Task
   */
  async createTask(
    taskDto: CreateTaskDto,
    boardId: string,
  ): Promise<TaskEntity> {
    return this.taskRepository.save({ ...taskDto, boardId });
  }

  /**
   * Returns updated Task by boardId & taskId
   * @param task - Task object for updating Task in store by boardId & taskId
   * @param boardId - id of Board
   * @param taskId - id of Task
   * @returns Promise of Task or undefined
   */
  async updateTaskById(
    taskDto: CreateTaskDto,
    boardId: string,
    taskId: string,
  ): Promise<TaskEntity | undefined> {
    const updatedTask = this.taskRepository.findOne({ id: taskId, boardId });
    if (!updatedTask) {
      return;
    }
    return this.taskRepository.save({ updatedTask, ...taskDto });
  }

  /**
   * Returns deleted Task by boardId & taskId
   * @param boardId - id of Board
   * @param taskId - id of Task
   * @returns Promise boolean
   */
  async deleteTaskById(boardId: string, taskId: string): Promise<boolean> {
    return !!(await this.taskRepository.delete({ id: taskId, boardId }))
      .affected;
  }
}
