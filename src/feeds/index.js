var atom = require('./atom')
var rss = require('./rss')

module.exports.updateAll = function updateAll () {
  rss({ source: 'clarin', category: 'politics', url: 'http://www.clarin.com/rss/politica/' }).update()
  rss({ source: 'clarin', category: 'sports', url: 'http://www.clarin.com/rss/deportes/' }).update()
  rss({ source: 'clarin', category: 'economics', url: 'http://www.clarin.com/rss/economia/' }).update()
  rss({ source: 'clarin', category: 'world', url: 'http://www.clarin.com/rss/mundo/' }).update()
  rss({ source: 'clarin', category: 'society', url: 'http://www.clarin.com/rss/sociedad/' }).update()
  rss({ source: 'infobae', url: 'http://cdn01.ib.infobae.com/adjuntos/162/rss/Infobae.xml' }).update()
  rss({ source: 'cronista', url: 'http://f2.cronista.com/rss.html' }).update()
  rss({ source: 'tiempo', url: 'http://www.infonews.com/rss/infonews.xml' }).update()
  rss({ source: 'losandes', url: 'http://www.losandes.com.ar/rss' }).update()
  atom({ source: 'bae', url: 'http://www.diariobae.com/feed' }).update()
  atom({ source: 'minutouno', url: 'http://www.minutouno.com/rss/principal.xml' }).update()
  // http://www.bigbangnews.com/pages/rss.html
  //
}
