import * as clarinPolitica from './clarin-politica'
import * as clarinDeportes from './clarin-deportes'
import * as clarinMundo from './clarin-mundo'
import * as clarinEconomia from './clarin-economia'
import * as clarinSociedad from './clarin-sociedad'
import * as infobae from './infobae'
import * as cronista from './cronista'
import * as tiempo from './tiempo'
import * as losandes from './losandes'

export function updateAll () {
  clarinPolitica.update()
  clarinDeportes.update()
  clarinMundo.update()
  clarinEconomia.update()
  clarinSociedad.update()
  infobae.update()
  cronista.update()
  tiempo.update()
  losandes.update()
}
