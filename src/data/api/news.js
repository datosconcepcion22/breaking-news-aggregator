var News = require('../models/news')

module.exports.latest = function latest (options, cb) {
  News
    .find(options)
    .sort({ published: -1 })
    .exec((err, res) => cb(err, res))
}

module.exports.getLastUpdate = function getLastUpdate(query, cb) {
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

module.exports.create = function create (data, cb) {
  var news = new News()
  news.title = data.title
  news.summary = data.summary
  news.published = data.published
  news.image = data.image
  news.url = data.url
  news.source = data.source
  news.category = data.category || 'general'
  news.save(cb)
}

module.exports.remove = function remove (query, cb) {
  News.findOneAndRemove(query, cb)
}

module.exports.News = News

