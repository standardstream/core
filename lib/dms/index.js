import raven    from 'raven'
import Server   from 'paradigm-server-express'

import Events     from './events'
import Middleware from './middleware'
import mixin      from './mixin'
import Model      from './model'

class DataManagementSystem {

  constructor(options = {}) {
    this.mixin(Events)
    this.mixin(Middleware)
  }

  start(port) {

    var server = this.server = new Server({
      cwd: __dirname,
      paths: {
        routes: '../../server/routes',
        views: '../../views',
      },
      port: process.env.NODE_PORT || port || 8120
    })

    if(process.env.NODE_ENV == 'production') {
      server.use(raven.middleware.express.requestHandler(process.env.SENTRY_URL))
      server.use(raven.middleware.express.errorHandler(process.env.SENTRY_URL))
    }

    server.start()

    return this

  }

  stop() {

    this.server.stop()
    process.exit(0)

  }

}

Object.assign(DataManagementSystem.prototype, {mixin})

export {Model}
export default DataManagementSystem
