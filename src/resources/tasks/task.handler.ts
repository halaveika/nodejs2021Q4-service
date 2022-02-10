import { FastifyReply } from 'fastify';
import {getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById} from './task.postgres.repository';
import {TaskReqBodyParams, TaskReqParams, TaskReqBodyParam, TaskReqParam} from '../../types/Task.request.type';

/**
 *  Get all tasks from task.repository, then send response  with statuscode 200 and body with array of all tasks to the client
 * @param req - request object with boardId params
 * @param reply - response object
 */
export const getAllTasksHandler = async(req:TaskReqParam, reply:FastifyReply):Promise<void> => {
  const { boardId} = req.params;
  const task = await getAllTasks(boardId);
  reply.code(200).send(task);
}

/**
 * Get task by id from task.repository, then send response  with statuscode 200 and body with task of current boardId,taskId or send response with 404 error to the client
 * @param req - request object with params boardId,taskId
 * @param reply - response object
 */
export const getTaskByIdHandler = async(req:TaskReqParams, reply:FastifyReply):Promise<void> => {
  const { boardId, taskId } = req.params;
  const task = await getTaskById(boardId, taskId);
  if(!task) {
    reply.code(404).send();
  }
  reply.code(200).send(task);
}

/**
 * Create new task in task.repository from body in request, then send response  with statuscode 201 and body with created task of current boardId or send response with 400 error to the client
 * @param req - request object with body task.type and params boardId
 * @param reply - response object
 */
export const createTaskHandler = async(req:TaskReqBodyParam, reply:FastifyReply):Promise<void> => {
  const { boardId} = req.params;
  const task = req.body;
  const newTask = await createTask(task,boardId);

  if(!newTask) {
    reply.code(400).send();
  }
  reply.code(201).send(newTask);
}

/**
 * Update existed task in task.repository from body in request by boardId and taskId from params , then send response  with statuscode 200 and body with updated task or send response with 400 error to the client
 * @param req - request object with body task.type and params boardId, taskId
 * @param reply - response object
 */
export const updateTaskByIdHandler = async(req:TaskReqBodyParams, reply:FastifyReply):Promise<void> => {
  const task = req.body;
  const { boardId, taskId } = req.params;
  const updatedTask = await updateTaskById(task,boardId, taskId);
  if(!updatedTask) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedTask);
}

/**
 * Delete task in task.repository by boardId and taskId, then send response  with statuscode 204 or send response with 401 error to the client
 * @param req - request object with params boardId,taskId
 * @param reply - response object
 */
export const deleteTaskByIdHandler = async(req:TaskReqParams, reply:FastifyReply):Promise<void> => {
  const { boardId, taskId } = req.params;
  const isDeleted = await deleteTaskById(boardId, taskId);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}