import { v4 as uuidv4 } from 'uuid';
import {taskStore, boardStore}from '../../db/store';
import {deletTasksWithBoard} from '../../utils/helper';
import { Board } from '../../types/Board.type';

/**
 * return array of Boards
 * @returns Promise of array of Boards
 */
export const getAllBoards = async():Promise<Board[]> => boardStore;

/**
 * return Board by Id
 * @param id - id of Board
 * @returns Promise of Board or undefined
 */
export const getBoardById = async(id:string):Promise<Board | undefined> => boardStore.find(board => board.id === id)

/**
 * return new created Board
 * @param board - Board object for creating Board in store
 * @returns Promise of Board
 */
export const createBoard = async(board:Board):Promise<Board> => {
  const newBoard = { ...board, id: uuidv4()};
  boardStore.push(newBoard);
  return newBoard;
}

/**
 * return updated Board by Id
 * @param board - Board object for updating Board in store by id
 * @param id - id of Board
 * @returns Promise of Board or undefined
 */
export const updateBoardById = async(board:Board, id:string):Promise<Board | undefined> => {
  const index = boardStore.findIndex(item => item.id === id);
  let updatedBoard:Board | undefined;
  if (index !== -1) {
    updatedBoard = { ...boardStore[index], ...board };
    boardStore.splice(index, 1, updatedBoard);
  }
  return updatedBoard;
}

/**
 * return deleted Board by Id
 * @param id - id of Board
 * @returns Promise of Board or undefined
 */
export const deleteBoardById = async(id:string):Promise<Board | undefined> => {
  const indexDeletedBoard = boardStore.findIndex(board => board.id === id);
  if (indexDeletedBoard === -1) {
    return undefined;
  }
  deletTasksWithBoard(taskStore,id)
  return boardStore.splice(indexDeletedBoard, 1)[0];
}




