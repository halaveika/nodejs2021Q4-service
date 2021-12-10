import { v4 as uuidv4 } from 'uuid';
import {taskStore, boardStore}from '../../db/store';
import {deletTasksWithBoard} from '../../utils/helper';
import { Board } from '../../types/Board.type';

export const getAllBoards = async():Promise<void> => boardStore;

export const getBoardById = async(id):Promise<void> => boardStore.find(board => board.id === id)

export const createBoard = async(board:Board):Promise<Board> => {
  const newBoard = { ...board, id: uuidv4()};
  boardStore.push(newBoard);
  return newBoard;
}

export const updateBoardById = async(board:Board, id:string):Promise<Board | undefined> => {
  const index = boardStore.findIndex(item => item.id === id);
  let updatedBoard;
  if (index !== -1) {
    updatedBoard = { ...boardStore[index], ...board };
    boardStore.splice(index, 1, updatedBoard);
  }
  return updatedBoard;
}

export const deleteBoardById = async(id:string):Promise<Board | boolean> => {
  const indexDeletedBoard = boardStore.findIndex(board => board.id === id);
  if (indexDeletedBoard === -1) {
    return false;
  }
  deletTasksWithBoard(taskStore,id)
  return boardStore.splice(indexDeletedBoard, 1)[0];
}




