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
  // da error: rss({ source: 'telam', url: 'http://www.telam.com.ar/rss2/ultimasnoticas.xml' }).update()
  atom({ source: 'bae', url: 'http://www.diariobae.com/feed' }).update()
  atom({ source: 'minutouno', url: 'http://www.minutouno.com/rss/principal.xml' }).update()
  atom({ source: 'bigbangnews', category: 'politics', url: 'http://www.bigbangnews.com/rss/politica.xml' }).update()
  atom({ source: 'bigbangnews', category: 'general', url: 'http://www.bigbangnews.com/rss/actualidad.xml' }).update()
  atom({ source: 'bigbangnews', category: 'sports', url: 'http://www.bigbangnews.com/rss/sports.xml' }).update()
  atom({ source: 'bigbangnews', category: 'world', url: 'http://www.bigbangnews.com/rss/mundo.xml' }).update()
  //da error: rss({ source: 'eldia', url: 'http://www.eldia.com/.rss' }).update()
  // da error: atom({ source: 'pagina', url: 'http://www.pagina12.com.ar/diario/rss/ultimas_noticias.xml' }).update()
}

