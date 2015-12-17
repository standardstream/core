import DMS from './dms/index'

var dms = new DMS(),
    request = require('request')

function foo(next) {

  this.body = 'foo'

  next()

}
