var debug = require('debug')
var Hapi = require('hapi')
var jwt = require('hapi-auth-jwt2')
var swagger = require('hapi-swagger')
var pack = require('../package')
var config = require('./config')

const log = debug('promise-tracker-api:server')

const server = new Hapi.Server()

/**
 * Configure the server
 */

server.connection({
  port: config.port
})

/**
 * Set up JSON Web Tokens handling
 */

server.register(jwt, err => {
  if (err) {
    return log('Error registering jwt: %s', err)
  }

  server.auth.strategy('jwt', 'jwt', true, {
    key: config.secret,
    // Let's assume that if it's decoded, it's valid
    validateFunc: (decoded, request, cb) => cb(null, decoded.id),
    verifyOptions: { algorithms: ['HS256'] }
  })
})

/**
 * Set up hapi-swagger for live documentation
 */

const swaggerOpts = {
  apiVersion: pack.version,
  info: {
    title: config.appName,
    description: pack.description
  }
}

server.register({
    register: swagger,
    options: swaggerOpts
  }, err => {
    if (err) {
      log('hapi-swagger load error: %s', err)
    } else {
      log('hapi-swagger interface loaded')
    }
})

/**
 * Expose the server instance, as a singleton
 */

module.exports = server

