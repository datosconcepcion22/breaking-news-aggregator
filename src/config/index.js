const env = process.env

module.exports = {
  appName: env.APP_NAME || 'Breaking News Aggregator API',
  port: env.PORT || 8000,
  dbURI: env.DB_URI || env.MONGO_URL || env.MONGOLAB_URI || 'mongodb://localhost/breaking-news',
  secret: env.SECRET || 'change this string'
}

