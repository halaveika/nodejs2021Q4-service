import { Board } from '../../types/Board.type';
import {BoardEntity} from '../../db/entity/board';
import connection from '../../server';

const getBoardRepository = async() => connection.then(c => c.getRepository(BoardEntity));

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
  const boardRepository = await getBoardRepository();
  return boardRepository.save({...board});
}

/**
 * Returns updated Board by Id
 * @param board - Board object for updating Board in store by id
 * @param id - id of Board
 * @returns Promise of Board or undefined
 */
export const updateBoardById = async(board:Board, id:string):Promise<Board | undefined> => {
  const boardRepository = await getBoardRepository();
  const updatedBoard  = await boardRepository.findOne({ id });
  if (!updatedBoard) {
    return;
  }
  return boardRepository.save({ updatedBoard, ...board });
}

/**
 * Returns deleted Board by id & delete all tasks on deleted Board
 * @param id - id of Board
 * @returns Promise boolean
 */
export const deleteBoardById = async(id:string):Promise<boolean> => {
  const boardRepository = await getBoardRepository();
  const boardIsDeleted = !!(await boardRepository.delete({ id})).affected;
 return boardIsDeleted;
}

