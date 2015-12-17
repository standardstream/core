import express from 'express'
var router  = express.Router()

function Router(server) {

  /*
  Micro-dispatcher
  */
  router.get('/v0.1/:controller/:action', (req, res) => {

    let controllerName = req.params.controller,
        actionName     = req.params.action

    var Controller = require(`../controllers/${controllerName}`)

    if(Controller && Controller.prototype[actionName]) {
      var controller = new Controller()
      controller[actionName].call(controller, req, res)
    }

  })

  return router

}

export default Router
