import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import path from 'path';
const app: FastifyInstance = Fastify({})
app.register(require('fastify-swagger'),
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
app.register(require('./resources/users/user.router'));
app.register(require('./resources/boards/board.router'));
app.register(require('./resources/tasks/task.router'), { prefix: 'boards/:boardId'});

export default app;
