import { Task } from '../../types/Task.type';
import {TaskEntity} from '../../db/entity/task';
import connection from '../../server';


const getTaskRepository = async() => connection.then(c => c.getRepository(TaskEntity));
/**
 * Returns array of Tasks on current Board
 * @param boardId - id of Board
 * @returns Promise of array of Tasks
 */
export const getAllTasks = async(boardId:string):Promise<Task[]> => getTaskRepository().then(taskRepository => taskRepository.find({boardId}) as Promise<Task[]>);

/**
 * Returns Task by boardId & taskId
 * @param boardId - id of Board
 * @param taskId - id of Task
 * @returns Promise of Tasks or undefined
 */
export const getTaskById = async(boardId:string, taskId:string):Promise<Task | undefined> =>{
  const taskRepository =await getTaskRepository();
  return await taskRepository.findOne({ boardId, id:taskId}) as Task | undefined;
}


/**
 * Returns new created Task
 * @param task - Task object for creating Task in store
 * @param boardId - id of Board
 * @returns Promise of Task
 */
export const createTask = async(task:Task, boardId:string):Promise<Task> => {
  const taskRepository = await getTaskRepository();
  return taskRepository.save({...task,boardId});
}


/**
 * Returns updated Task by boardId & taskId
 * @param task - Task object for updating Task in store by boardId & taskId
 * @param boardId - id of Board
 * @param taskId - id of Task
 * @returns Promise of Task or undefined
 */
export const updateTaskById = async(task:Task, boardId:string, taskId:string):Promise<Task | undefined> => {
  const taskRepository = await getTaskRepository();
  const updatedTask  = taskRepository.findOne({ id: taskId, boardId });
  if (!updatedTask) {
    return;
  }
  return taskRepository.save({ updatedTask, ...task });
}

/**
 * Returns deleted Task by boardId & taskId
 * @param boardId - id of Board
 * @param taskId - id of Task
 * @returns Promise boolean
 */
export const deleteTaskById = async(boardId:string, taskId:string):Promise<boolean> => !!(await getTaskRepository().then(taskRepository =>
    taskRepository.delete({ id:taskId, boardId}))).affected

