import { FastifyInstance } from 'fastify';
import { getUsers, getUser, postUser, putUser, deleteUser } from './user.service';

/**
 * Handle endpoints for userRouter
 * @param app - instance of fastify from fastify package
 */
const userRouter = async(app:FastifyInstance):Promise<void> => {
  
  app.get('/users', getUsers)

  app.get('/users/:id', getUser)

  app.post('/users', postUser)

  app.delete('/users/:id', deleteUser)

  app.put('/users/:id', putUser)

}

export default userRouter;