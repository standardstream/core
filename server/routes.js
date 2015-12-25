import express from 'express'
import path    from 'path'

var router  = express.Router()

function getControllerAction(req, res) {

  let controllerName = req.params.controller,
      actionName     = req.params.action

  var Controller = require(path.join(process.cwd(), `./controllers/${controllerName}`))

  if(Controller && Controller.prototype[actionName]) {
    var controller = new Controller()
    controller[actionName].call(controller, req, res)
  }

}

function getControllerActionByVerb(req, res) {

  var controllerName = req.params.controller,
      actionName     = null

  // Map HTTP verb to controller action
  switch(req.method) {

    case 'GET':    actionName = 'get';    break;
    case 'POST':   actionName = 'update'; break;
    case 'PUT':    actionName = 'save';   break;
    case 'DELETE': actionName = 'delete'; break;
    default:

  }

  var Controller = require(path.join(process.cwd(), `./controllers/${controllerName}`))

  if(Controller && Controller.prototype[actionName]) {
    var controller = new Controller()
    controller[actionName].call(controller, req, res)
  }

  else {
    res.status(404).send()
  }

}

function routes(server) {

  server
    .all('/v0.1/:controller/:id', getControllerActionByVerb)

  server
    .all('/v0.1/:controller/:id', getControllerActionByVerb)

}

module.exports = routes

/*function Router(server) {

  router.all('*', (req, res, next) => {
    req.method = req.route.stack[0].method
    console.log('method', req.method)
    next()
  })

  // Micro-dispatcher
  router
    .route('/v0.1/:controller/:action')
    .all(getControllerAction)

  router
    .route('/v0.1/:controller/:id')
    .all(getControllerActionByVerb)

  router
    .route('/v0.1/:controller')
    .all(getControllerActionByVerb)

  return router

}

export default Router*/
