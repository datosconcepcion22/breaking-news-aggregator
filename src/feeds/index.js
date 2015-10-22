var clarinPolitica = require( './clarin-politica')
var clarinDeportes = require( './clarin-deportes')
var clarinMundo = require( './clarin-mundo')
var clarinEconomia = require( './clarin-economia')
var clarinSociedad = require( './clarin-sociedad')
var infobae = require( './infobae')
var cronista = require( './cronista')
var tiempo = require( './tiempo')
var losandes = require( './losandes')
var bae = require( './bae')
var minutouno = require('./minutouno')

module.exports.updateAll = function updateAll () {
  clarinPolitica.update()
  clarinDeportes.update()
  clarinMundo.update()
  clarinEconomia.update()
  clarinSociedad.update()
  infobae.update()
  cronista.update()
  tiempo.update()
  losandes.update()
  bae.update()
  minutouno.update()
  // http://www.bigbangnews.com/pages/rss.html
  //
}
