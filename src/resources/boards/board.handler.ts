import { FastifyReply, FastifyRequest } from 'fastify';
import {getAllBoards, getBoardById, createBoard, updateBoardById, deleteBoardById} from './board.memory.repository';
import {BoardReq,BoardReqParams,BoardReqBody} from '../../types/Board.request.type';
import { Board } from '../../types/Board.type';

export const getAllBoardsHandler = async(_req:FastifyRequest, reply:FastifyReply):Promise<void> => {
  const boards = await getAllBoards();
  reply.code(200).send(boards);
}

export const getBoardByIdHandler = async(req:BoardReq, reply:FastifyReply):Promise<void> => {
  const { boardId } = req.params;
  const board = await getBoardById(boardId);
  if(!board) {
    reply.code(404).send();
  }
  reply.code(200).send(board);
}

export const createBoardHandler = async(req:BoardReqBody, reply:FastifyReply):Promise<void> => {
  const board = req.body;
  const newBoard = await createBoard(board);
  if(!newBoard) {
    reply.code(400).send();
  }
  reply.code(201).send(newBoard);
}

export const updateBoardByIdHandler = async(req:BoardReq, reply:FastifyReply):Promise<void> => {
  const board = req.body;
  const { boardId } = req.params;
  const updatedBoard:Board | undefined = await updateBoardById(board,boardId);
  if(!updatedBoard) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedBoard);
}

export const deleteBoardByIdHandler = async(req:BoardReqParams, reply:FastifyReply):Promise<void> => {
  const { boardId } = req.params;
  const isDeleted = await deleteBoardById(boardId);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}