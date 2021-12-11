import {getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById} from './task.memory.repository';

export const getAllTasksHandler = async(req, reply) => {
  const { boardId} = req.params;
  const task = await getAllTasks(boardId);
  reply.code(200).send(task);
}

export const getTaskByIdHandler = async(req, reply) => {
  const { boardId, taskId } = req.params;
  const task = await getTaskById(boardId, taskId);
  if(!task) {
    reply.code(404).send();
  }
  reply.code(200).send(task);
}

export const createTaskHandler = async(req, reply) => {
  const { boardId} = req.params;
  const task = req.body;
  const newTask = await createTask(task,boardId);

  if(!newTask) {
    reply.code(400).send();
  }
  reply.code(201).send(newTask);
}

export const updateTaskByIdHandler = async(req, reply) => {
  const task = req.body;
  const { boardId, taskId } = req.params;
  const updatedTask = await updateTaskById(task,boardId, taskId);
  if(!updatedTask) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedTask);
}

export const deleteTaskByIdHandler = async(req, reply) => {
  const { boardId, taskId } = req.params;
  const isDeleted = await deleteTaskById(boardId, taskId);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}