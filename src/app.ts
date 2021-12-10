import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import path from 'path';
import boardRouter from './resources/boards/board.router';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';

const app: FastifyInstance = Fastify({})
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
})
app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter, { prefix: 'boards/:boardId'});

export default app;
