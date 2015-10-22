var debug = require('debug')
var FeedMe = require('feedme')
var News = require('../data/api/news')
var Client = require('node-rest-client').Client

module.exports = function Atom (opts) {

  const log = debug('breaking-news-aggregator:feeds:' + opts.source)

  function onfetch (data) {
    if (!data || !data.items) {
      log('No data received')
      return
    }
    var items = data.items
    log('fetched %d items', items.length)

    News.getLastUpdate({ source: opts.source }, (err, lastUpdate) => {
      if (lastUpdate) {
        items = items.filter(i => new Date(i.pubdate) > lastUpdate)
      }
      log('%d new items', items.length)

      items
      .forEach(item => {
        News.create({
          title: item.title,
          summary: item.description,
          url: item.link,
          published: item.pubdate,
          source: opts.source,
          category: opts.category || 'general'
        })
      })
    })
  }

  return {
    update: function () {
      var client = new Client()
      client.get(opts.url, data => {
        var parser = new FeedMe(true)
        parser.write(data.toString())
        var d = parser.done()
        onfetch(d)
      })
    }
  }
}

