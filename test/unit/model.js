import {Schema, type} from 'eisley'

var Model = require('../../lib/dms/model')

describe('Unit: Model', function() {

  it('should initialize', function(done) {

    var model = new Model(null, {
      schema: new Schema({
        foo: type('string')
      }),
      table: 'foo'
    })

    expect(model).to.be.an('object')
    //expect(model.currentMiddlewareLayer).to.be.a('number')
    expect(model.emit).to.be.a('function')
    //expect(model.middlewareLayers).to.be.an('array')
    expect(model.off).to.be.a('function')
    expect(model.on).to.be.a('function')
    expect(model.once).to.be.a('function')
    expect(model.schema).to.be.an('object')
    expect(model.table).to.equal('foo')

    done()

  })

  it('should validate successfully', function(done) {

    var model = new Model({foo: 'bar'}, {
      schema: new Schema({
        foo: type('string')
      })
    })

    var valid = model.validate()

    expect(typeof valid.err).to.equal('undefined')

    done()

  })

  it('should validate unsuccessfully', function(done) {

    var model = new Model({foo: 2}, {
      schema: new Schema({
        foo: type('string')
      })
    })

    var valid = model.validate()

    expect(valid.err).to.be.an('array')

    done()

  })

})
