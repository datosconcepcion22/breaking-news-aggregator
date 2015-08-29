import debug from 'debug'
import FeedMe from 'feedme'
import request from 'superagent'
import * as News from '../data/api/news'

const log = debug('breaking-news-aggregator:feeds:losandes')

function onfetch (data) {
  let items = data.items
  log('fetched %d items', items.length)

  News.getLastUpdate({ source: 'losandes' }, (err, lastUpdate) => {
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
        published: Date.now(),
        source: 'losandes',
        category: 'general'
      })
    })
  })
}

export function update () {
  log('requested update')
  const parser = new FeedMe(true)
  request
  .get('http://www.losandes.com.ar/rss')
  .end((err, res) => {
    if (err) {
      return log('Error: %s', err)
    }
    parser.write(res.text)
    onfetch(parser.done())
  })
}
