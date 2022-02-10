import { FastifyInstance } from 'fastify';
import {loginUser} from './login.service';

/**
 * Handle endpoints for loginRouter
 * @param app - instance of fastify from fastify package
 */
const loginRouter = async(app:FastifyInstance):Promise<void> => {
  
  app.post('/login', loginUser)

}

export default loginRouter