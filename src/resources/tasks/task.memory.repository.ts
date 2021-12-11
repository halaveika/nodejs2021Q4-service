
import { v4 as uuidv4 } from 'uuid';
import {taskStore} from '../../db/store';
import { Task } from '../../types/Task.type';

export const getAllTasks = async(boardId:string):Promise<Task[]> => taskStore.filter(task => task.boardId === boardId);

export const getTaskById = async(boardId:string, taskId:string):Promise<Task | undefined> => taskStore.find(task => task.id === taskId && task.boardId === boardId)

export const createTask = async(task:Task, boardId:string):Promise<Task> => {
  const newTask = {...task,id: uuidv4(), boardId};
  taskStore.push(newTask);
  return newTask;
}

export const updateTaskById = async(task:Task, boardId:string, taskId:string):Promise<Task | undefined> => {
  const index = taskStore.findIndex(item => item.id === taskId && item.boardId === boardId);
  let updatedTask : Task | undefined ;
  if (index !== -1) {
    updatedTask = { ...taskStore[index], ...task };
    taskStore.splice(index, 1, updatedTask);
  }
  return updatedTask;
}

export const deleteTaskById = async(boardId:string, taskId:string):Promise<Task | boolean> => {
  const index = taskStore.findIndex(task => task.id === taskId && task.boardId === boardId );
  if (index === -1) {
    return false;
  }
  return taskStore.splice(index, 1)[0];
}



