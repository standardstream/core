var cheerio = require('cheerio')

class Scrape {

  constructor(body, operations) {

    var $ = this.$ = cheerio.load(body)

    this.body = operations($)

  }

}

export default Scrape
