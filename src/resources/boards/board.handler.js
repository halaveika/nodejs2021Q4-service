const {getAllBoards, getBoardById, createBoard, updateBoardById, deleteBoardById} = require('./board.memory.repository');

const getAllBoardsHandler = async(req, reply) => {
  const boards = await getAllBoards();
  reply.code(200).send(boards);
}

const getBoardByIdHandler = async(req, reply) => {
  const { boardId } = req.params;
  const board = await getBoardById(boardId);
  if(!board) {
    reply.code(404).send();
  }
  reply.code(200).send(board);
}

const createBoardHandler = async(req, reply) => {
  const board = req.body;
  const newBoard = await createBoard(board);
  if(!newBoard) {
    reply.code(400).send();
  }
  reply.code(201).send(newBoard);
}

const updateBoardByIdHandler = async(req, reply) => {
  const board = req.body;
  const { boardId } = req.params;
  const updatedBoard = await updateBoardById(board,boardId);
  if(!updatedBoard) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedBoard);
}

const deleteBoardByIdHandler = async(req, reply) => {
  const { boardId } = req.params;
  const isDeleted = await deleteBoardById(boardId);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}

module.exports = { getAllBoardsHandler,getBoardByIdHandler,createBoardHandler,updateBoardByIdHandler,deleteBoardByIdHandler };