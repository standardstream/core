import through2 from 'through2'

import Save   from './save'
import Scrape from './scrape'
import thinky from '../../config/db'

class DataManagementSystem {

  constructor() {
    this.thinky = thinky

    this.body                   = null
    this.middlewareLayers       = [null]
    this.currentMiddlewareLayer = 0

  }

  next() {

    this.currentMiddlewareLayer++

    var nextMiddleware = this.middlewareLayers[this.currentMiddlewareLayer]

    if(nextMiddleware) {

      nextMiddleware.call(this, this.next.bind(this))

    }

    else if(this.middlewareLayers.length == this.currentMiddlewareLayer) {

      console.log('done calling middleware')

    }

  }

  streamToString(whatever) {

    var chunks = '',
        _this  = this

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

DataManagementSystem.prototype.save = function save(Model) {

  this.use((next) => {

    var save = new Save(this.body, Model)

    next()

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
