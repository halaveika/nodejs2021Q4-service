
import { v4 as uuidv4 } from 'uuid';
import {taskStore} from '../../db/store';

export const getAllTasks = async(boardId) => taskStore.filter(task => task.boardId === boardId);

export const getTaskById = async(boardId, taskId) => taskStore.find(task => task.id === taskId && task.boardId === boardId)

export const createTask = async(task, boardId) => {
  const newTask = {...task,id: uuidv4(), boardId};
  taskStore.push(newTask);
  return newTask;
}

export const updateTaskById = async(task, boardId, taskId) => {
  const index = taskStore.findIndex(item => item.id === taskId && item.boardId === boardId);
  let updatedTask;
  if (index !== -1) {
    updatedTask = { ...taskStore[index], ...task };
    taskStore.splice(index, 1, updatedTask);
  }
  return updatedTask;
}

export const deleteTaskById = async(boardId, taskId) => {
  const index = taskStore.findIndex(task => task.id === taskId && task.boardId === boardId );
  if (index === -1) {
    return false;
  }
  return taskStore.splice(index, 1)[0];
}



