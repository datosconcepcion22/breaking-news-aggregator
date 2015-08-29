import debug from 'debug'
import News from '../models/news'

const log = debug('breaking-news-aggregator:data:api:news')

export function latest (options, cb) {
  News
    .find(options)
    .sort({ published: -1 })
    .exec((err, res) => cb(err, res))
}

export function getLastUpdate(query, cb) {
  News
  .findOne(query)
  .sort({ published: -1 })
  .exec((err, doc) => {
    if (err) {
      return cb(err)
    } else if (!doc) {
      return cb(null, null)
    } else {
      return cb(null, doc.published)
    }
  })
}

export function create (data, cb) {
  let news = new News()
  news.title = data.title
  news.summary = data.summary
  news.published = data.published
  news.image = data.image
  news.url = data.url
  news.source = data.source
  news.category = data.category || 'general'
  news.save(cb)
}

export function remove (query, cb) {
  News.findOneAndRemove(query, cb)
}

export default News
