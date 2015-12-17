require('babel-core/register')

var apiRoutes = require('./server/routes'),
    raven     = require('raven'),
    Server    = require('paradigm-server-express')

/*var server = new Server({
  cwd: __dirname,
  paths: {
    routes: './server/routes',
    views: './views',
  },
  port: 8120
})

if(process.env.NODE_ENV == 'production') {
  server.use(raven.middleware.express.requestHandler(process.env.SENTRY_URL))
  server.use(raven.middleware.express.errorHandler(process.env.SENTRY_URL))
}

server.use('/api', apiRoutes)

server.start()*/
require('./lib/index')
