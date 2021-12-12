import { FastifyReply } from 'fastify';
import {getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById} from './task.memory.repository';
import {TaskReqBodyParams, TaskReqParams, TaskReqBodyParam, TaskReqParam} from '../../types/Task.request.type';

export const getAllTasksHandler = async(req:TaskReqParam, reply:FastifyReply):Promise<void> => {
  const { boardId} = req.params;
  const task = await getAllTasks(boardId);
  reply.code(200).send(task);
}

export const getTaskByIdHandler = async(req:TaskReqParams, reply:FastifyReply):Promise<void> => {
  const { boardId, taskId } = req.params;
  const task = await getTaskById(boardId, taskId);
  if(!task) {
    reply.code(404).send();
  }
  reply.code(200).send(task);
}

export const createTaskHandler = async(req:TaskReqBodyParam, reply:FastifyReply):Promise<void> => {
  const { boardId} = req.params;
  const task = req.body;
  const newTask = await createTask(task,boardId);

  if(!newTask) {
    reply.code(400).send();
  }
  reply.code(201).send(newTask);
}

export const updateTaskByIdHandler = async(req:TaskReqBodyParams, reply:FastifyReply):Promise<void> => {
  const task = req.body;
  const { boardId, taskId } = req.params;
  const updatedTask = await updateTaskById(task,boardId, taskId);
  if(!updatedTask) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedTask);
}

export const deleteTaskByIdHandler = async(req:TaskReqParams, reply:FastifyReply):Promise<void> => {
  const { boardId, taskId } = req.params;
  const isDeleted = await deleteTaskById(boardId, taskId);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}