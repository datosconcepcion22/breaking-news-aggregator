import * as clarinPolitica from './clarin-politica'
import * as clarinDeportes from './clarin-deportes'
import * as clarinMundo from './clarin-mundo'
import * as clarinEconomia from './clarin-economia'
import * as clarinSociedad from './clarin-sociedad'

export function updateAll () {
  clarinPolitica.update()
  clarinDeportes.update()
  clarinMundo.update()
  clarinEconomia.update()
  clarinSociedad.update()
}
