const path = require('path');
const app = require('fastify')({ logger: true })
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

module.exports = app;
