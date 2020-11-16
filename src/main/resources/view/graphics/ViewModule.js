import { EV_LEARN, EV_NEW_POTIONS, EV_NEW_TOME_SPELLS } from './gameConstants.js'
import { getRenderer, flagForDestructionOnReinit } from '../core/rendering.js'
import { parseData, parseGlobalData } from './Deserializer.js'
import { updateInventories } from './inventoryUpdate.js'
import { updateScore, updatePotions, updateSpeech } from './miscUpdate.js'
import { updateTomeSpells, updatePlayerSpells, resetSpells, updateDeliveries, updateBonus } from './spellUpdate.js'
import { updateWitches } from './witchUpdate.js'
import * as assets from './assetConstants.js'
import * as layers from './layers.js'

/* global PIXI */

const api = {
  viewModule: null,
  options: {
    debugMode: false,
    hideExhaustedSpells: true,

    // Messages
    showOthersMessages: true,
    meInGame: false,
    showMyMessages: true
  },
  setDebug: () => {},
  updateSpells: (api) => {
    updatePlayerSpells.bind(api.viewModule)(api.previousData, api.currentData, api.progress)
  }
}
export { api }

export class ViewModule {
  constructor (assets) {
    this.states = []
    this.globalData = {}
    this.pool = {}
    window.module = this
    api.viewModule = this
    this.api = api
  }

  static get name () {
    return 'graphics'
  }

  getFromPool (type) {
    if (!this.pool[type]) {
      this.pool[type] = []
    }

    for (const e of this.pool[type]) {
      if (!e.busy) {
        e.busy = true
        return e
      }
    }

    const e = this.createEffect(type)
    this.pool[type].push(e)
    e.busy = true
    return e
  }

  createEffect (type) {
    if (type === 'ingredient') {
      const graphics = new PIXI.Sprite()
      this.ingredientLayer.addChildAt(graphics, 0)
      graphics.anchor.set(0.5)

      return graphics
    } else if (type === 'potion') {
      const graphics = PIXI.extras.AnimatedSprite.fromFrames(assets.FRAMES_BOTTLE_SPAWN)
      graphics.anchor.set(229 / 498, 391 / 524)
      graphics.scale.set(1 / 0.7)
      this.potionLayer.addChild(graphics)

      return graphics
    } else if (type === 'potioff') {
      const graphics = PIXI.extras.AnimatedSprite.fromFrames(assets.FRAMES_BOTTLE_DESPAWN)
      graphics.anchor.set(219 / 419, 339 / 412)
      graphics.scale.set(1 / 0.7)
      this.potionLayer.addChild(graphics)

      return graphics
    } else if (type === 'splash') {
      const graphics = PIXI.extras.AnimatedSprite.fromFrames(assets.FRAMES_SPLASH)
      graphics.anchor.set(0.5, 1)
      graphics.scale.set(2)
      this.fxLayer.addChild(graphics)

      return graphics
    } else if (type === 'bonus') {
      const text = new PIXI.Text('', {
        fontFamily: 'Arial Black, Arial',
        fontWeight: 900,
        fill: 'white',
        fontSize: 72,
        stroke: '#0000004C',
        strokeThickness: 12
      })
      text.position.set(7, 150)
      text.anchor.set(0.5)
      const container = new PIXI.Container()
      container.addChild(text)
      this.hudLayer.addChild(container)
      container.scale.set(0.4)

      const bonus = {
        container,
        text
      }

      Object.defineProperty(bonus, 'visible', {
        set: (value) => {
          container.visible = value
        },
        get: () => {
          return container.visible
        }
      })

      return bonus
    } else {
      return new PIXI.Container()
    }
  }

  asLayer (func) {
    const layer = new PIXI.Container()
    func.bind(this)(layer)
    return layer
  }

  updateScene (previousData, currentData, progress, playerSpeed) {
    this.playerSpeed = playerSpeed || 0
    this.resetEffects()

    resetSpells.bind(this)()

    updateInventories.bind(this)(previousData, currentData, progress)
    updateTomeSpells.bind(this)(previousData, currentData, progress)
    updatePlayerSpells.bind(this)(previousData, currentData, progress)
    updateDeliveries.bind(this)(previousData, currentData, progress)
    updateBonus.bind(this)(previousData, currentData, progress)
    updateWitches.bind(this)(previousData, currentData, progress)
    updatePotions.bind(this)(previousData, currentData, progress)
    updateScore.bind(this)(previousData, currentData, progress)
    updateSpeech.bind(this)(previousData, currentData, progress)

    api.previousData = previousData
    api.currentData = currentData
    api.progress = progress
  }

  resetEffects () {
    for (const type in this.pool) {
      for (const effect of this.pool[type]) {
        effect.visible = false
        effect.busy = false
      }
    }
  }

  handleFrameData (frameInfo, raw) {
    const data = parseData(raw, this.globalData)

    const previous = this.states[this.states.length - 1]

    for (const event of data.events) {
      if (event.type === EV_LEARN) {
        this.addSpell({
          ...this.spellMap[event.spellId],
          id: event.resultId
        })
      } else if (event.type === EV_NEW_POTIONS) {
        event.spells.forEach(spell => this.addSpell(spell))
      } else if (event.type === EV_NEW_TOME_SPELLS) {
        event.spells.forEach(spell => this.addSpell(spell))
      }

      if (event.animData != null) {
        for (let i = 0; i < event.animData.length; ++i) {
          var ev = event.animData[i]
          ev.start /= frameInfo.frameDuration
          ev.end /= frameInfo.frameDuration

          if (ev.trigger != null) {
            ev.trigger /= frameInfo.frameDuration
            ev.triggerEnd /= frameInfo.frameDuration
          }
        }
      }
    }

    const state = {
      events: data.events,
      ...data,
      active: new Set(data.active)
    }

    state.previous = previous || state
    this.states.push(state)
    return state
  }

  registerAnim (animArr, timeArr, timeIdx, duration) {
    animArr.push({
      start: timeArr[timeIdx],
      end: timeArr[timeIdx] + duration
    })
    timeArr[timeIdx] += duration
  }

  newLayer () {
    return new PIXI.Container()
  }

  reinitScene (container, canvasData) {
    this.oversampling = canvasData.oversampling
    this.container = container
    this.pool = {}
    this.spells = {}

    this.backgroundLayer = this.asLayer(layers.initBackground)
    this.frontsCauldronsLayer = this.asLayer(layers.initFrontsCauldrons)
    this.witchLayer = this.asLayer(layers.initWitches)
    this.bubblingLayer = this.asLayer(layers.initBubblings)
    this.fxLayer = this.newLayer()
    this.ingredientLayer = this.newLayer()
    this.potionLayer = this.newLayer()
    this.tomeLayer = this.newLayer()
    this.playerSpellLayer = this.newLayer()
    this.deliveriesLayer = this.newLayer()
    this.hudLayer = this.asLayer(layers.initHud)
    this.messageLayer = this.asLayer(layers.initSpeech)
    this.witchFrontLayer = this.newLayer()

    this.container.addChild(this.backgroundLayer)
    this.container.addChild(this.witchLayer)
    this.container.addChild(this.bubblingLayer)
    this.container.addChild(this.tomeLayer)
    this.container.addChild(this.ingredientLayer)
    this.container.addChild(this.fxLayer)
    this.container.addChild(this.frontsCauldronsLayer)
    this.container.addChild(this.playerSpellLayer)
    this.container.addChild(this.witchFrontLayer)
    this.container.addChild(this.deliveriesLayer)
    this.container.addChild(this.potionLayer)
    this.container.addChild(this.hudLayer)
    this.container.addChild(this.messageLayer)

    this.backgroundLayer.interactiveChildren = false
    this.frontsCauldronsLayer.interactiveChildren = false
    this.witchLayer.interactiveChildren = false
    this.bubblingLayer.interactiveChildren = false
    this.fxLayer.interactiveChildren = false
    this.ingredientLayer.interactiveChildren = false
    this.potionLayer.interactiveChildren = false
    this.tomeLayer.interactiveChildren = true
    this.playerSpellLayer.interactiveChildren = true
    this.deliveriesLayer.interactiveChildren = true
    this.hudLayer.interactiveChildren = false
    this.messageLayer.interactiveChildren = false
    this.witchFrontLayer.interactiveChildren = false
  }

  generateTexture (graphics) {
    var tex = getRenderer().generateTexture(graphics)
    flagForDestructionOnReinit(tex)
    return tex
  }

  animateScene (delta) {
    for (let idx = 0; idx < this.globalData.playerCount; ++idx) {
      const { show, container } = this.bubbles[idx]
      const stepFactor = Math.pow(0.993 + (0.007 * (this.playerSpeed || 1) / 10), delta)
      const targetAlpha = show ? 1 : 0
      if (targetAlpha === 1) {
        container.alpha = 1
      } else {
        container.alpha = container.alpha * stepFactor + targetAlpha * (1 - stepFactor)
      }
    }
  }

  handleGlobalData (players, raw) {
    const globalData = parseGlobalData(raw)

    this.globalData = {
      players: players,
      playerCount: players.length
    }

    this.spellMap = {}
    // Game reconstruction vars
    this.globalData.initialSpells = {
      deliveries: globalData.deliveries.map(spell => spell.id),
      playerSpells: globalData.playerSpells.map(spells => spells.map(spell => spell.id)),
      tomeSpells: globalData.tomeSpells.map(spell => spell.id)
    }
    this.globalData.startingIngredientCount = globalData.startingIngredientCount

    const newSpells = [
      ...globalData.deliveries,
      ...globalData.playerSpells[0],
      ...globalData.playerSpells[1],
      ...globalData.tomeSpells
    ]

    newSpells.forEach((spell) => this.addSpell(spell))

    api.options.meInGame = !!players.find(p => p.isMe)
    api.globalData = globalData
  }

  addSpell (spell) {
    this.spellMap[spell.id] = spell
  }
}
