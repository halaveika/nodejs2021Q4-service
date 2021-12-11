import {getAllBoards, getBoardById, createBoard, updateBoardById, deleteBoardById} from './board.memory.repository';

export const getAllBoardsHandler = async(req, reply) => {
  const boards = await getAllBoards();
  reply.code(200).send(boards);
}

export const getBoardByIdHandler = async(req, reply) => {
  const { boardId } = req.params;
  const board = await getBoardById(boardId);
  if(!board) {
    reply.code(404).send();
  }
  reply.code(200).send(board);
}

export const createBoardHandler = async(req, reply) => {
  const board = req.body;
  const newBoard = await createBoard(board);
  if(!newBoard) {
    reply.code(400).send();
  }
  reply.code(201).send(newBoard);
}

export const updateBoardByIdHandler = async(req, reply) => {
  const board = req.body;
  const { boardId } = req.params;
  const updatedBoard = await updateBoardById(board,boardId);
  if(!updatedBoard) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedBoard);
}

export const deleteBoardByIdHandler = async(req, reply) => {
  const { boardId } = req.params;
  const isDeleted = await deleteBoardById(boardId);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}