var debug = require('debug')
var server = require('../server')
var error = require('boom')
var News = require('../data/api/news')
var Feeds = require('../feeds')

const log = debug('breaking-news-aggregator:api')

server.route({
  method: 'GET',
  path: '/news',
  config: {
    auth: false,
    cors: false,
    tags: ['api', 'news'],
    description: 'Gets a list of the latest breaking news',
    handler: (request, reply) => {
      log('GETting /news')
      News.latest(request.params.slug, (err, docs) => {
        if (err) {
          log('Error: %s', err)
          return reply(err)
        }

        log('Delivering %d news', docs.length)
        reply(docs)
      })
    }
  }
})

server.route({
  method: 'POST',
  path: '/news/update',
  config: {
    auth: false,
    cors: false,
    tags: ['api', 'news'],
    description: 'Triggers fetching sources for latest news',
    handler: (request, reply) => {
      log('POSTting /news/update')
      Feeds.updateAll()
      reply(200)
    }
  }
})

module.exports = server

