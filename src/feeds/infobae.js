var debug = require('debug')
var FeedMe = require('feedme')
var request = require('superagent')
var News = require('../data/api/news')

const log = debug('breaking-news-aggregator:feeds:infobae')

function onfetch (data) {
  var items = data.items
  log('fetched %d items', items.length)

  News.getLastUpdate({ source: 'infobae' }, (err, lastUpdate) => {
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
        source: 'infobae',
        category: 'general'
      })
    })
  })
}

module.exports.update = function update () {
  log('requested update')
  const parser = new FeedMe(true)
  request
  .get('http://cdn01.ib.infobae.com/adjuntos/162/rss/Infobae.xml')
  .end((err, res) => {
    if (err) {
      return log('Error: %s', err)
    }
    parser.write(res.text)
    onfetch(parser.done())
  })
}

