import through2 from 'through2'

import Save from './save'

class DataManagementSystem {

  constructor() {

    this.body                   = null
    this.middlewareLayers       = [null]
    this.currentMiddlewareLayer = 0

  }

  next() {

    this.currentMiddlewareLayer++

    var nextMiddleware = this.middlewareLayers[this.currentMiddlewareLayer]

    if(nextMiddleware) {

      nextMiddleware.call(this, this.next)

    }

    else if(this.middlewareLayers.length == this.currentMiddlewareLayer) {

      console.log('done calling middleware')

    }

  }

  stream(whatever) {

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

DataManagementSystem.prototype.save = function save() {

  return new Save()

}

export default DataManagementSystem
