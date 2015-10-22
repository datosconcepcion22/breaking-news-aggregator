var debug = require('debug')
var FeedMe = require('feedme')
var News = require('../data/api/news')
var Client = require('node-rest-client').Client

const log = debug('breaking-news-aggregator:feeds:bae')

function onfetch (data) {
  var items = data.items
  log('fetched %d items', items.length)

  News.getLastUpdate({ source: 'bae' }, (err, lastUpdate) => {
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
        source: 'bae',
        category: 'general'
      })
    })
  })
}

module.exports.update = function update () {
  var client = new Client()
  client.get('http://www.diariobae.com/feed', data => {
    var parser = new FeedMe(true)
    parser.write(data.toString())
    var d = parser.done()
    onfetch(d)
  })
}

