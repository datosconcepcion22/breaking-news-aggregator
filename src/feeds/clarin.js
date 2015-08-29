import debug from 'debug'
import FeedMe from 'feedme'
import request from 'superagent'
import * as News from '../data/api/news'

export default function (url, category) {
  const log = debug('breaking-news-aggregator:feeds:clarin-' + category)

  function onfetch (data) {
    let items = data.items
    log('fetched %d items', items.length)

    News.getLastUpdate({ source: 'clarin', category: category }, (err, lastUpdate) => {
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
          source: 'clarin',
          category: 'politics'
        })
      })
    })
  }

  return {
    update: function update () {
      log('requested update')
      const parser = new FeedMe(true)
      request
      .get(url)
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
