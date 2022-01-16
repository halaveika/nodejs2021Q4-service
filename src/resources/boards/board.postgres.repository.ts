import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../types/Board.type';
import {BoardEntity} from '../../db/entity/board';
import {TaskEntity} from '../../db/entity/task';
import connection from '../../server';

const getBoardRepository = async() => await connection.then(c => c.getRepository(BoardEntity));
const getTaskRepository = async() => await connection.then(c => c.getRepository(TaskEntity));

/**
 * Returns array of Boards
 * @returns Promise of array of Boards
 */
export const getAllBoards = async():Promise<Board[]> =>
 getBoardRepository().then(boardRepository => boardRepository.find({}));

/**
 * Returns Board by Id
 * @param id - id of Board
 * @returns Promise of Board or undefined
 */
export const getBoardById = async(id:string):Promise<Board | undefined> =>
  getBoardRepository().then(boardRepository => boardRepository.findOne({id}));

/**
 * Returns new created Board
 * @param board - Board object for creating Board in store
 * @returns Promise of Board
 */
export const createBoard = async(board:Board):Promise<Board> => {
  return getBoardRepository().then(boardRepository => boardRepository.save({...board,id: uuidv4()}))
}

/**
 * Returns updated Board by Id
 * @param board - Board object for updating Board in store by id
 * @param id - id of Board
 * @returns Promise of Board or undefined
 */
export const updateBoardById = async(board:Board, id:string):Promise<Board | undefined> => {
  const boardRepository = await getBoardRepository();
  const updatedBoard  = boardRepository.findOne({ id });
  if (!updatedBoard) {
    return;
  }
  return await boardRepository.save({ updatedBoard, ...board });
}

/**
 * Returns deleted Board by id & delete all tasks on deleted Board
 * @param id - id of Board
 * @returns Promise boolean
 */
export const deleteBoardById = async(id:string):Promise<boolean> => {
  const boardIsDeleted = (await getBoardRepository().then(boardRepository =>
    boardRepository.delete({ id}))).affected ? true : false;
 if (boardIsDeleted) {
   await deletTasksWithBoardPostgres(id);
 }
 return boardIsDeleted;
}

async function deletTasksWithBoardPostgres(id:string):Promise<void>  {
  const taskRepository = await getTaskRepository();
  const tasks = await taskRepository.find({id});
  tasks.forEach(task => taskRepository.delete(task))
}


