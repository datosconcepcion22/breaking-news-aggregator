var debug = require('debug')
var FeedMe = require('feedme')
var request = require('superagent')
var News = require('../data/api/news')

module.exports = function RSS (opts) {
  const log = debug('breaking-news-aggregator:feeds:' + opts.source)

  function onfetch (data) {
    if (!data || !data.items) {
      log('No data received')
      return
    }
    var items = data.items
    log('fetched %d items', items.length)

    News.getLastUpdate({ source: opts.source, category: opts.category || 'general' }, (err, lastUpdate) => {
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
    update: function update () {
      log('requested update')
      const parser = new FeedMe(true)
      request
      .get(opts.url)
      .end((err, res) => {
        if (err) {
          return log('Error: %s', err)
        }
        parser.write(res.text)
        onfetch(parser.done())
      })
    }
  }
}

