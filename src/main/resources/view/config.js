import { ViewModule, api } from './graphics/ViewModule.js'
import { EndScreenModule } from './endscreen-module/EndScreenModule.js'
import { TooltipModule } from './tooltip/TooltipModule.js'

export const modules = [
  ViewModule,
  TooltipModule,
  EndScreenModule
]

export const playerColors = [
  '#22a1e4', // curious blue
  '#ff1d5c', // radical red
  '#de6ddf', // lavender pink
  '#6ac371', // mantis green
  '#9975e2', // medium purple
  '#3ac5ca', // scooter blue
  '#ff0000' // solid red
]
export const gameName = 'Fall2020'

export const stepByStepAnimateSpeed = 3

export const options = [
  {
    title: 'HIDE EXHAUSTED SPELLS',
    get: function () {
      return api.options.hideExhaustedSpells
    },
    set: function (value) {
      if (api.viewModule && api.options.hideExhaustedSpells !== value) {
        api.options.hideExhaustedSpells = value
        api.updateSpells(api)
      }
    },
    values: {
      ON: true,
      OFF: false
    }
  }
]
