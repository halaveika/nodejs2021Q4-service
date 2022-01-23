import fastify, { FastifyInstance } from 'fastify';
import "reflect-metadata";
import * as path from 'path';
import fastifySwagger from 'fastify-swagger';
import boardRouter from './resources/boards/board.router';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './resources/login/login.router';
import logger from './common/logger';
import { validateHook } from './hooks/auth';


const app: FastifyInstance = fastify({logger})
app.register(fastifySwagger,
{
  mode: 'static',
  exposeRoute: true,
  routePrefix: '/doc',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    postProcessor(swaggerObject) {
      return swaggerObject
    },
    baseDir: '/doc',
  },
});
app.addHook("preHandler", validateHook)
app.register(loginRouter);
app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter, { prefix: 'boards/:boardId'});
export default app;
