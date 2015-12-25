var Model = require('../../lib/dms/model')

var testDbConfig = {
  host: 'localhost',
  port: 28015,
  authKey: '',
  db: 'test03'
}

Model.prototype.dbConfig = testDbConfig

describe('Functional: Model', function() {

  it('should connect to the database', function(done) {

    var model = new Model()

    model.connect((err, connection) => {

      expect(connection).to.be.an('object')

      connection.close()

      done()

    })

  })

  it('should query the database', function(done) {

    var model = new Model()

    model.query( (r) => r.table('bitcoin_prices'), (err, res) => {

      expect(res).to.be.an('array')

      done()

    })

  })

  it('should create a table (if non-existant)', function(done) {

    var model = new Model(null, {table: 'foo'})

    done()

  })

  it('should save', function(done) {

    var model = new Model({foo: 'bar'}, {table: 'foo'})

    model.save(function(err, res) {

      expect(res).to.be.an('object')

      done()

    })

  })

  it('should get by ID', function(done) {

    var model = new Model({foo: 'bar'}, {table: 'foo'})

    model.save(function(err, res) {

      model.get((err, res) => {

        expect(res).to.be.an('object')
        expect(res.id).to.equal(model.id)

        done()

      })

    })

  })

  it('should update by ID', function(done) {

    var model = new Model({foo: 'bar'}, {table: 'foo'})

    model.save(function(err, res) {

      model.body = {foo: 'baz'}

      model.update((err, res) => {

        expect(res).to.be.an('object')
        expect(res.foo).to.equal('baz')

        done()

      })

    })

  })

})
