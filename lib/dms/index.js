import events   from 'events'
import through2 from 'through2'
import winston  from 'winston'

import Scrape from './scrape'
import thinky from '../../config/db'

var emitter = new events.EventEmitter()

class DataManagementSystem {

  constructor(options = {}) {
    this.emit = emitter.emit
    this.off  = emitter.removeListener
    this.on   = emitter.on
    this.once = emitter.once

    this.thinky = thinky

    this.body                   = null
    this.middlewareLayers       = []
    this.Model                  = options.model
    this.currentMiddlewareLayer = 0

  }

  data(data) {

    this.use((next) => {

      this.body = data
      next()

    })

    return this

  }

  log(str = '') {

    this.use((next) => {

      console.log(this.body)
      //winston.log('debug', this.body)
      next()

    })

    return this

  }

  next() {

    this.currentMiddlewareLayer++

    var nextMiddleware = this.middlewareLayers[this.currentMiddlewareLayer]

    if(nextMiddleware) {

      nextMiddleware.call(this, this.next.bind(this))

    }

    else if(this.middlewareLayers.length == this.currentMiddlewareLayer) {

      this.emit('end')

    }

  }

  streamToString(whatever) {

    var chunks = '',
        _this  = this

    this.middlewareLayers.push(null)

    whatever
      .pipe(through2({objectMode: true, allowHalfOpen: false}, function(chunk, enc, t2cb) {

        chunks += chunk.toString()

        t2cb(null, chunks)
      }))
      .on('data', function(data) {
        //console.log('do we have something?', data)
      })
      .on('end', function() {

        _this.body = chunks
        _this.next()

      })

    return this

  }

  use(fn) {

    this.middlewareLayers.push(fn)

    return this

  }

}

DataManagementSystem.prototype.get = function get(id) {

  var _this = this

  this.use((next) => {

    var model = new this.Model()

    model.get(id, function getCallback(err, res) {
      _this.body = res

      next()
    })

  })

  return this

}

DataManagementSystem.prototype.getAll = function get() {

  var _this = this

  this.use((next) => {

    var model = new this.Model()

    model.getAll(function getAllCallback(err, res) {
      _this.body = res

      next()
    })

  })

  return this

}

DataManagementSystem.prototype.save = function save() {

  var _this = this

  this.use((next) => {

    var model = new this.Model(this.body)

    model.save(function saveCalback(err, res) {
      _this.body = res

      next()
    })

  })

  return this

}

DataManagementSystem.prototype.scrape = function scrape(operations) {

  this.use((next) => {

    var scrape = new Scrape(this.body, operations)
    this.body = scrape.body

    next()

  })

  return this

}

export {thinky}
export default DataManagementSystem
