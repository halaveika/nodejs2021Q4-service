import { FastifyReply, FastifyRequest } from 'fastify';
import {getAllBoards, getBoardById, createBoard, updateBoardById, deleteBoardById} from './board.postgres.repository';
import {BoardReq,BoardReqParams,BoardReqBody} from '../../types/Board.request.type';
import { Board } from '../../types/Board.type';


/**
 * Get all boards from board.repository, then send response  with statuscode 200 and body with array of all Boards to the client
 * @param _req - request object
 * @param reply - response object
 */
export const getAllBoardsHandler = async(_req:FastifyRequest, reply:FastifyReply):Promise<void> => {
  const boards = await getAllBoards();
  reply.code(200).send(boards);
}

/**
 * Get board by is from board.repository, then send response  with statuscode 200 and body with Board of current boardId or send response with 404 error to the client
 * @param req - request object with params boardId
 * @param reply - response object
 */
export const getBoardByIdHandler = async(req:BoardReq, reply:FastifyReply):Promise<void> => {
  const { boardId } = req.params;
  const board = await getBoardById(boardId);
  if(!board) {
    reply.code(404).send();
  }
  reply.code(200).send(board);
}

/**
 * Create new board in board.repository from body in request, then send response  with statuscode 201 and body with created Board or send response with 400 error to the client
 * @param req - request object with body board.type
 * @param reply - response object
 */
export const createBoardHandler = async(req:BoardReqBody, reply:FastifyReply):Promise<void> => {
  const board = req.body;
  const newBoard = await createBoard(board);
  if(!newBoard) {
    reply.code(400).send();
  }
  reply.code(201).send(newBoard);
}

/**
 * Update existed board in board.repository from body in request by boardId from params , then send response  with statuscode 200 and body with updated Board or send response with 400 error to the client
 * @param req - request object with body board.type and params boardId
 * @param reply - response object
 */
export const updateBoardByIdHandler = async(req:BoardReq, reply:FastifyReply):Promise<void> => {
  const board = req.body;
  const { boardId } = req.params;
  const updatedBoard:Board | undefined = await updateBoardById(board,boardId);
  if(!updatedBoard) {
    reply.code(400).send();
  }
  reply.code(200).send(updatedBoard);
}

/**
 * Delete board in board.repository by boardId, then send response  with statuscode 204 or send response with 401 error to the client
 * @param req - request object with params boardId
 * @param reply - response object
 */
export const deleteBoardByIdHandler = async(req:BoardReqParams, reply:FastifyReply):Promise<void> => {
  const { boardId } = req.params;
  const isDeleted = await deleteBoardById(boardId);
  if(!isDeleted) {
    reply.code(401).send();
  }
  reply.code(204).send();
}