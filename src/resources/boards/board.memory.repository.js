const { v4: uuidv4 } = require('uuid');
const {taskStore, boardStore} = require('../../db/store');

const getAllBoards = async() => boardStore;

const getBoardById = async(id) => boardStore.find(board => board.id === id)

const createBoard = async(board) => {
  const newBoard = { ...board, id: uuidv4()};
  boardStore.push(newBoard);
  return newBoard;
}

const updateBoardById = async(board, id) => {
  const index = boardStore.findIndex(item => item.id === id);
  let updatedBoard;
  if (index !== -1) {
    updatedBoard = { ...boardStore[index], ...board };
    boardStore.splice(index, 1, updatedBoard);
  }
  return updatedBoard;
}

const deleteBoardById = async(id) => {
  console.log(`boardId: ${id}`);
  const indexDeletedBoard = boardStore.findIndex(board => board.id === id);
  if (indexDeletedBoard === -1) {
    return false;
  }
  // taskStore = taskStore.filter(task => task.boardId !== id);
  taskStore.forEach((task,index,arr) => {
    if(task.boardId === id){
      arr.splice(index,1);
  }})
  console.dir(taskStore)
  return boardStore.splice(indexDeletedBoard, 1)[0];
}

module.exports = {getAllBoards, getBoardById, createBoard, updateBoardById, deleteBoardById};



