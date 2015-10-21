var debug = require('debug')
require('./src/api')
var server = require('./src/server')
var mongoose = require('mongoose')
var config = require('./src/config')

const log = debug('breaking-news-aggregator:main')

/*
 * Bootstrap database connection
 */

log('Connecting to database')
mongoose.connect(config.dbURI)

/*
 * Launch server
 */

log('Launching server')
server.start(err => {
  if (err) {
    log('Server not launched due to an error')
    throw err
  }

  log('Server started in port %d', server.info.port)
})
