
const { v4: uuidv4 } = require('uuid');
const {boardStore,taskStore} = require('../../db/store');

const getAllBoards = async() => boardStore;

const getBoardById = async(id) => boardStore.find(board => board.id === id)

const createBoard = async(board) => {
  if(!board.title) {return undefined}
  const newBoard = { id: uuidv4(), ...board};
  boardStore.push(newBoard);
  return newBoard;
}

const updateBoardById = (board, id) => {
  const index = boardStore.findIndex(item => item.id === id);
  let updatedBoard;
  if (index !== -1) {
    updatedBoard = { ...boardStore[index], ...board };
    boardStore.splice(index, 1, updatedBoard);
  }
  return updatedBoard;
}

const deleteBoardById = async(id) => {
  const indexDeletedBoard = boardStore.find(board => board.id === id);
  if (indexDeletedBoard === -1) {
    return false;
  }
  taskStore.forEach((task,index) =>{
    if (task.boardId === id) {
      taskStore.splice(index, 1);
    }
  })
  return boardStore.splice(indexDeletedBoard, 1)[0];
}

module.exports = {getAllBoards, getBoardById, createBoard, updateBoardById, deleteBoardById};



