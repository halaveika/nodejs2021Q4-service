
import { v4 as uuidv4 } from 'uuid';
import {taskStore} from '../../db/store';
import { Task } from '../../types/Task.type';

/**
 * Returns array of Tasks on current Board
 * @param boardId - id of Board
 * @returns Promise of array of Tasks
 */
export const getAllTasks = async(boardId:string):Promise<Task[]> => taskStore.filter(task => task.boardId === boardId);

/**
 * Returns Task by boardId & taskId
 * @param boardId - id of Board
 * @param taskId - id of Task
 * @returns Promise of Tasks or undefined
 */
export const getTaskById = async(boardId:string, taskId:string):Promise<Task | undefined> => taskStore.find(task => task.id === taskId && task.boardId === boardId)

/**
 * Returns new created Task
 * @param task - Task object for creating Task in store
 * @param boardId - id of Board
 * @returns Promise of Task
 */
export const createTask = async(task:Task, boardId:string):Promise<Task> => {
  const newTask = {...task,id: uuidv4(), boardId};
  taskStore.push(newTask);
  return newTask;
}

/**
 * Returns updated Task by boardId & taskId
 * @param task - Task object for updating Task in store by boardId & taskId
 * @param boardId - id of Board
 * @param taskId - id of Task
 * @returns Promise of Task or undefined
 */
export const updateTaskById = async(task:Task, boardId:string, taskId:string):Promise<Task | undefined> => {
  const index = taskStore.findIndex(item => item.id === taskId && item.boardId === boardId);
  let updatedTask : Task | undefined ;
  if (index !== -1) {
    updatedTask = { ...taskStore[index], ...task };
    taskStore.splice(index, 1, updatedTask);
  }
  return updatedTask;
}

/**
 * Returns deleted Task by boardId & taskId
 * @param boardId - id of Board
 * @param taskId - id of Task
 * @returns Promise boolean
 */
export const deleteTaskById = async(boardId:string, taskId:string):Promise<boolean> => {
  const index = taskStore.findIndex(task => task.id === taskId && task.boardId === boardId );
  if (index === -1) {
    return false;
  } 
  return true;
}



