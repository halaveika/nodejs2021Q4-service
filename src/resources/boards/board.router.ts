import { FastifyInstance } from 'fastify';
import { getBoards, getBoard, postBoard, putBoard, deleteBoard } from './board.service';

/**
 * handle endpoints for boardRouter
 * @param app - instance of fastify from fastify package
 */
const boardRouter = async(app:FastifyInstance):Promise<void> =>{
  
  app.get('/boards', getBoards)

  app.get('/boards/:boardId', getBoard)

  app.post('/boards', postBoard)

  app.delete('/boards/:boardId', deleteBoard)

  app.put('/boards/:boardId', putBoard)

}

export default boardRouter;