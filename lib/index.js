import DMS from './dms/index'

var dms = new DMS(),
    request = require('request')

function foo(next) {

  this.body = 'foo'

  next()

}

dms
  .stream(request.get('https://bitcoinwisdom.com'))
  .use(foo)
  .save()
