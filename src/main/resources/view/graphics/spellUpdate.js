import { ease } from '../core/transitions.js'
import { fit, getStockPosition, applyOffsets } from './utils.js'
import { TOME_INGREDIENT_SIZE, DELIVERY_INGREDIENT_SIZE } from './assetConstants.js'
import { TooltipModule } from '../tooltip/TooltipModule.js'
import { TYPE_PLAYER, TYPE_TOME, TYPE_DELIVERY, EV_NEW_POTIONS, EV_BREW, EV_CAST, EV_NEW_TOME_SPELLS, EV_LEARN, EV_LEARN_PAY, EV_REST } from './gameConstants.js'
import { WIDTH } from '../core/constants.js'
import * as utils from '../core/utils.js'

/* globals PIXI */

export function resetSpells () {
  Object.values(this.spells)
    .forEach(({ container }) => {
      container.visible = false
    })
}

const SPELL_LEARNT_OFFSETS = [
  -350,
  350
]
const FRAME_BY_TYPE = {
  [TYPE_TOME]: {
    image: 'Forme_Recettes_Dispo',
    width: 187,
    height: 72,
    stockOffset: 200,
    stockWidth: 86,
    stockHeight: 72
  },
  [TYPE_PLAYER]: {
    image: 'Forme_Recettes_Apprises',
    width: 229,
    height: 62
  },
  [TYPE_DELIVERY]: {
    image: 'Forme_Commandes',
    width: 289,
    height: 128
  }
}

export const COUNTER_WIDTH = 1708
export const COUNTER_X = WIDTH / 2 - COUNTER_WIDTH / 2
export const COUNTER_Y = 930
const BONUS_OFFSET = {
  x: 209,
  y: 40
}

export function updateBonus (previous, current, progress) {
  const total = previous.deliveries.length
  for (let bonusIdx = 0; bonusIdx < 2; ++bonusIdx) {
    const bonusData = previous.bonus[bonusIdx]

    if (bonusData != null) {
      const moving = bonusData?.value !== current.bonus[bonusIdx]?.value
      const bonus = this.getFromPool('bonus')
      bonus.text.text = `+${bonusData.value}`
      bonus.container.alpha = 1
      bonus.container.visible = true
      bonus.container.position.set(
        COUNTER_X + bonusIdx * (COUNTER_WIDTH / total) + BONUS_OFFSET.x,
        COUNTER_Y + BONUS_OFFSET.y
      )
      const spellId = previous.deliveries[bonusIdx]
      const { fadeContainer } = getSpell.bind(this)(spellId, TYPE_DELIVERY)
      setTooltip(fadeContainer, getTooltipText(this.spellMap[spellId], TYPE_DELIVERY, 0, bonusData.value))
      current.events
        .filter(e => e.type === EV_BREW)
        .filter(e => e.spellId === spellId)
        .forEach(e => {
          const animData = e.animData[e.animData.length - 1]
          const animProgress = utils.unlerp(animData.start, animData.end, progress)
          bonus.container.alpha = 1 - animProgress
        })

      const newPotionEvents = current.events
        .filter(e => e.type === EV_NEW_POTIONS)

      if (moving) {
        newPotionEvents.forEach(e => {
          const fromIdx = previous.deliveries.indexOf(spellId)
          const toIdx = current.deliveries.indexOf(spellId)
          if (fromIdx === -1 || toIdx === -1) {
            return
          }

          const animData = e.animData[0]
          const end = (animData.end + animData.start) / 2

          const animProgress = utils.unlerp(animData.start, end, progress)

          bonus.container.position.set(
            COUNTER_X + utils.lerp(fromIdx, toIdx, animProgress) * (COUNTER_WIDTH / total) + BONUS_OFFSET.x,
            COUNTER_Y + BONUS_OFFSET.y
          )
        })
      } else {
        newPotionEvents.forEach(e => {
          const animData = e.animData[0]
          const end = (animData.end + animData.start) / 2

          const animProgress = utils.unlerp(animData.start, end, progress)

          bonus.container.visible = (animProgress <= 0 || animProgress >= 1)
          if (animProgress >= 1) {
            bonus.container.alpha = 1
          }
        })
      }
    }
  }
}

const SPELL_NEW_DELIVERY_OFFSET = 500

export function updateDeliveries (previous, current, progress) {
  const newDeliveries = new Set(current.deliveries.filter(curId => previous.deliveries.indexOf(curId) === -1))
  const keptDeliveries = new Set(previous.deliveries.filter(id => current.deliveries.indexOf(id) >= 0))

  let newDeliveriesIdx = 0
  const total = previous.deliveries.length

  current.events.filter(e => e.type === EV_BREW).forEach(e => {
    const spellId = e.spellId
    const idx = previous.deliveries.indexOf(spellId)
    const container = updateDelivery.bind(this)(spellId, idx, total)

    const animData = e.animData[e.animData.length - 1]
    const animProgress = utils.unlerp(animData.start, animData.end, progress)
    container.alpha = 1 - animProgress
  })

  const newDeliveriesEvent = current.events.find(e => e.type === EV_NEW_POTIONS)
  newDeliveries.forEach((spellId) => {
    const idx = current.deliveries.indexOf(spellId)
    const container = updateDelivery.bind(this)(spellId, idx, total)

    const animData = newDeliveriesEvent.animData[newDeliveriesIdx++]
    const animProgress = utils.unlerp(animData.start, animData.end, progress)
    moveDelivery(container, idx, total, animProgress, SPELL_NEW_DELIVERY_OFFSET)
  })

  keptDeliveries.forEach(spellId => {
    const fromIdx = previous.deliveries.indexOf(spellId)
    const toIdx = current.deliveries.indexOf(spellId)
    let animProgress
    if (newDeliveriesEvent == null) {
      animProgress = progress
    } else {
      const start = newDeliveriesEvent.animData[0].start
      const end = (newDeliveriesEvent.animData[0].end + start) / 2
      animProgress = utils.unlerp(start, end, progress)
    }
    const pIdx = utils.lerp(fromIdx, toIdx, animProgress)
    const container = updateDelivery.bind(this)(spellId, pIdx, total)
    container.alpha = 1
  })
}

function moveDelivery (container, idx, total, progress, heightOffset) {
  const x = COUNTER_X + idx * (COUNTER_WIDTH / total)
  const fromPos = { x: x, y: COUNTER_Y + heightOffset }
  const toPos = { x: x, y: COUNTER_Y }
  const curPos = utils.lerpPosition(fromPos, toPos, progress)

  container.position.copy(curPos)
}

function updateDelivery (spellId, idx, total) {
  const { container } = getSpell.bind(this)(spellId, TYPE_DELIVERY)
  container.visible = true
  const x = COUNTER_X + idx * (COUNTER_WIDTH / total)
  container.position.set(x, COUNTER_Y)

  return container
}

const ALPHA_OFF = 0.2
const SPELL_LIST_OFFSET = 56
const SPELL_LIST_MARGIN = 82
const SPELL_LIST_Y = 219
const SPELL_LIST_POSITIONS = [
  {
    x: SPELL_LIST_OFFSET,
    y: SPELL_LIST_Y
  },
  {
    x: WIDTH - SPELL_LIST_OFFSET - FRAME_BY_TYPE[TYPE_PLAYER].width,
    y: SPELL_LIST_Y
  }
]

export function updatePlayerSpells (previous, current, progress) {
  for (let playerIdx = 0; playerIdx < this.globalData.playerCount; ++playerIdx) {
    const spells = []
    let spellCount = 0
    let activeSpellCount = 0

    current.playerSpells[playerIdx].forEach((spellId, idx) => {
      spells[spellId] = {
        id: spellId,
        active: false,
        selected: false,
        alpha: 1
      }

      spellCount++
    })

    const shrinkView = this.api.options.hideExhaustedSpells ? spellCount > 7 : false

    previous.active.forEach(spellId => {
      if (spells[spellId] != null) {
        activeSpellCount++
        spells[spellId].active = true
      }
    })

    spells.forEach(spell => {
      const { container, cursor, fadeContainer } = getSpell.bind(this)(spell.id, TYPE_PLAYER)

      container.visible = false
      cursor.visible = false
      fadeContainer.alpha = spell.active ? 1 : (shrinkView ? 0 : ALPHA_OFF)

      spell.container = container
      spell.cursor = cursor
      spell.fadeContainer = fadeContainer
    })

    const inactiveAlpha = shrinkView ? 0 : ALPHA_OFF

    let newAlpha = 1
    let fromColumnCount = 1
    let toColumnCount = 1
    let fromIdx = 0
    let toIdx = 0

    let hasEvent = false
    const alphaAnimProgress = utils.unlerp(0.25, 0.75, progress)

    current.events.filter(event => event.playerIdx === playerIdx)
      .forEach(event => {
        switch (event.type) {
          case EV_LEARN:
            hasEvent = true
            spells[event.resultId].active = true
            spells[event.resultId].fadeContainer.alpha = utils.lerp(0, 1, alphaAnimProgress)

            fromColumnCount = getColumnCount(shrinkView ? activeSpellCount : spellCount)
            toColumnCount = getColumnCount(shrinkView ? activeSpellCount + 1 : spellCount)

            fromIdx = 0
            toIdx = 0

            if (spellCount === 8) {
              newAlpha = utils.lerp(ALPHA_OFF, 0, utils.unlerp(0, 0.75, progress))
              spells[event.resultId].fadeContainer.alpha = utils.lerp(0, 1, utils.unlerp(0.75, 1, progress))
              spells.forEach(spell => {
                showSpell(spell, playerIdx, 0.75, 1, progress, fromIdx++, toIdx, fromColumnCount, toColumnCount)
                toIdx += spell.active
                spell.fadeContainer.alpha = spell.active ? spell.fadeContainer.alpha : newAlpha
              })
            } else {
              spells.filter(spell => shrinkView ? spell.active : true)
                .forEach(spell => {
                  showSpell(spell, playerIdx, 0.25, 0.75, progress, fromIdx, toIdx, fromColumnCount, toColumnCount)
                  fromIdx += shrinkView ? spell.active : 1
                  toIdx += shrinkView ? spell.active : 1
                })
            }
            break
          case EV_CAST:
            hasEvent = true
            spells[event.spellId].active = false
            spells[event.spellId].selected = true

            newAlpha = utils.lerp(1, inactiveAlpha, alphaAnimProgress)
            spells[event.spellId].cursor.visible = true
            spells[event.spellId].cursor.alpha = 1
            spells[event.spellId].fadeContainer.alpha = newAlpha

            fromColumnCount = getColumnCount(shrinkView ? activeSpellCount : spellCount)
            toColumnCount = getColumnCount(shrinkView ? activeSpellCount - 1 : spellCount)

            fromIdx = 0
            toIdx = 0

            spells.filter(spell => shrinkView ? (spell.active || spell.selected) : true)
              .forEach(spell => {
                showSpell(spell, playerIdx, 0.75, 1, progress, fromIdx, toIdx, fromColumnCount, toColumnCount)
                fromIdx += shrinkView ? (spell.active || spell.selected) : 1
                toIdx += shrinkView ? spell.active : 1
              })
            break
          case EV_REST: {
            hasEvent = true
            const { start, end } = event.animData[0]
            const animProgress = utils.unlerp(start, end, progress)
            newAlpha = utils.lerp(inactiveAlpha, 1, animProgress)

            fromColumnCount = getColumnCount(shrinkView ? activeSpellCount : spellCount)
            toColumnCount = getColumnCount(spellCount)

            fromIdx = 0
            toIdx = 0

            spells.forEach(spell => {
              showSpell(spell, playerIdx, start, end, progress, fromIdx, toIdx++, fromColumnCount, toColumnCount)
              fromIdx += shrinkView ? spell.active : 1
              spell.fadeContainer.alpha = spell.active ? spell.fadeContainer.alpha : newAlpha
            })
            break
          }
        }
      })

    if (!hasEvent) {
      const rowCount = getColumnCount(shrinkView ? activeSpellCount : spellCount)

      let idx = 0
      spells.filter(spell => shrinkView ? spell.active : true)
        .forEach(spell => {
          showSpell(spell, playerIdx, 0.25, 0.75, progress, idx, idx++, rowCount, rowCount)
        })
    }
  }
}

function getColumnCount (spellCount) {
  return Math.ceil(1 / 21 * spellCount + 1 - 7 / 21)
}

function showSpell (spell, playerIdx, start, end, progress, fromIdx, toIdx, fromRowCount, toRowCount) {
  const fromWidthOffset = FRAME_BY_TYPE[TYPE_PLAYER].width * (fromIdx % fromRowCount) / fromRowCount + (fromIdx % fromRowCount) * 5
  const fromHeightOffset = SPELL_LIST_MARGIN * Math.floor(fromIdx / fromRowCount) / fromRowCount
  const fromPos = applyOffsets(SPELL_LIST_POSITIONS[playerIdx], fromWidthOffset, fromHeightOffset)

  const toWidthOffset = FRAME_BY_TYPE[TYPE_PLAYER].width * (toIdx % toRowCount) / toRowCount + (toIdx % toRowCount) * 5
  const toHeightOffset = SPELL_LIST_MARGIN * Math.floor(toIdx / toRowCount) / toRowCount
  const toPos = applyOffsets(SPELL_LIST_POSITIONS[playerIdx], toWidthOffset, toHeightOffset)

  const animProgress = utils.unlerp(start, end, progress)
  const curPos = utils.lerpPosition(fromPos, toPos, ease(animProgress))
  spell.container.position.copy(curPos)

  const curScale = utils.lerp(1 / fromRowCount, 1 / toRowCount, animProgress)
  spell.container.scale.set(curScale)

  spell.container.visible = true
}

function moveTomeSpellStocks (tomeSpell, progress, radial = false) {
  if (progress === 0) {
    return
  }

  for (let i = 0; i < tomeSpell.oldCount; i++) {
    const fromPos = getStockPosition((radial ? tomeSpell.currentIdx : tomeSpell.previousIdx), i, tomeSpell.oldCount)
    const toPos = getStockPosition(tomeSpell.currentIdx, i, (radial ? tomeSpell.newCount : tomeSpell.oldCount))

    const curPos = utils.lerpPosition(fromPos, toPos, ease(progress))

    tomeSpell.stockSprites[i].position.copy(curPos)
  }
}

const TOME_SPELLS_X = 823
const TOME_SPELLS_Y = 415
const TOME_SPELLS_OFFSET = 82

function updateTomeSpellStock (tomeSpell) {
  const sprites = []

  for (let i = 0; i < tomeSpell.oldCount; i++) {
    const sprite = this.getFromPool('ingredient')
    sprite.texture = PIXI.Texture.fromFrame('Item-1')
    sprite.visible = true
    sprite.anchor.set(0.5)
    fit(sprite, TOME_INGREDIENT_SIZE, TOME_INGREDIENT_SIZE)

    sprite.position.copy(getStockPosition(tomeSpell.previousIdx, i, tomeSpell.oldCount))
    sprites.push(sprite)
  }

  return sprites
}

export function updateTomeSpells (previous, current, progress) {
  const tomeSpells = []

  previous.tomeSpells.forEach((tomeSpellId, idx) => {
    tomeSpells[tomeSpellId] = {
      id: tomeSpellId,
      oldCount: previous.stock[tomeSpellId],
      newCount: current.stock[tomeSpellId],
      hasGainedStock: false,
      previousIdx: idx,
      currentIdx: idx,
      isLearnt: false,
      isNew: false
    }
  })

  current.tomeSpells.forEach((tomeSpellId, idx) => {
    if (tomeSpells[tomeSpellId] != null) {
      const tomeSpell = tomeSpells[tomeSpellId]
      tomeSpell.currentIdx = idx
      tomeSpell.newCount = current.stock[tomeSpellId]
      tomeSpell.hasGainedStock = tomeSpell.oldCount != null && tomeSpell.newCount != null && tomeSpell.oldCount < tomeSpell.newCount
    } else {
      tomeSpells[tomeSpellId] = {
        id: tomeSpellId,
        oldCount: previous.stock[tomeSpellId],
        newCount: current.stock[tomeSpellId],
        hasGainedStock: false,
        previousIdx: idx,
        currentIdx: idx,
        isLearnt: false,
        isNew: true
      }
    }
  })

  current.events.filter(event => event.type === EV_LEARN)
    .forEach(event => {
      if (!tomeSpells[event.spellId].isLearnt) {
        tomeSpells[event.spellId].isLearnt = true
        tomeSpells[event.spellId].isDoubled = false
        tomeSpells[event.spellId].playerIdx = event.playerIdx
        tomeSpells[event.spellId].oldCount = 0
        tomeSpells[event.spellId].newCount = 0
      } else {
        tomeSpells[event.spellId].isDoubled = true
      }
    })

  tomeSpells.forEach(tomeSpell => {
    const { container, fadeContainer } = getSpell.bind(this)(tomeSpell.id, TYPE_TOME)
    tomeSpell.container = container
    tomeSpell.stockSprites = updateTomeSpellStock.bind(this)(tomeSpell, progress)

    tomeSpell.container.alpha = 1
    tomeSpell.container.visible = true

    const tomePos = { x: TOME_SPELLS_X, y: TOME_SPELLS_Y - tomeSpell.previousIdx * TOME_SPELLS_OFFSET }
    tomeSpell.container.position.copy(tomePos)

    setTooltip(fadeContainer, getTooltipText(this.spellMap[tomeSpell.id], TYPE_TOME, tomeSpell.newCount))
  })

  let animIdx = 0
  current.events.filter(event => event.type === EV_NEW_TOME_SPELLS)
    .forEach(event => {
      tomeSpells.forEach(tomeSpell => {
        const { start, end } = event.animData[animIdx]

        const fromPos = tomeSpell.isNew ? { x: TOME_SPELLS_X, y: -200 } : { x: TOME_SPELLS_X, y: TOME_SPELLS_Y - tomeSpell.previousIdx * TOME_SPELLS_OFFSET }
        const toPos = { x: TOME_SPELLS_X, y: TOME_SPELLS_Y - tomeSpell.currentIdx * TOME_SPELLS_OFFSET }

        const animProgress = utils.unlerp(start, end, progress)
        const curPos = utils.lerpPosition(fromPos, toPos, ease(animProgress))

        moveTomeSpellStocks(tomeSpell, animProgress)

        tomeSpell.container.position.copy(curPos)
      })

      animIdx++
    })

  animIdx = 0
  current.events.filter(event => event.type === EV_LEARN)
    .forEach(event => {
      const tomeSpell = tomeSpells[event.spellId]
      const { start, end } = event.animData[event.animData.length - 1]

      const fromPos = { x: TOME_SPELLS_X, y: TOME_SPELLS_Y - tomeSpell.previousIdx * TOME_SPELLS_OFFSET }
      const toPos = { x: TOME_SPELLS_X + (tomeSpell.isDoubled ? 0 : SPELL_LEARNT_OFFSETS[tomeSpell.playerIdx]), y: TOME_SPELLS_Y - tomeSpell.previousIdx * TOME_SPELLS_OFFSET }

      const animProgress = utils.unlerp(start, end, progress)
      const curPos = utils.lerpPosition(fromPos, toPos, ease(animProgress))

      tomeSpell.container.position.copy(curPos)
      tomeSpell.container.alpha = utils.lerp(1, 0, animProgress)
    })

  current.events.filter(event => event.type === EV_LEARN_PAY && event.tomeIdx !== 0)
    .forEach(event => {
      const { start, end } = event.animData[0]
      const animProgress = utils.unlerp(start, end, progress)
      tomeSpells.filter(tomeSpell => tomeSpell.hasGainedStock)
        .forEach(tomeSpell => {
          if (animProgress > 0) {
            moveTomeSpellStocks(tomeSpell, animProgress, true)
          }
        })
    })
}

function setTooltip (container, text) {
  container.interactive = true

  container.mouseover = () => {
    TooltipModule.showTooltip(text)

    container.mousemove = (event) => {
      TooltipModule.moveTooltip(event)
    }
  }

  container.mouseout = () => {
    TooltipModule.hideTooltip()
    container.mousemove = null
  }
}

function getTooltipText (spell, type, stock = 0, bonusValue = 0) {
  let text = `actionId: ${spell.id}\nactionType: ${type}\ndelta: [${spell.delta}]`

  switch (type) {
    case TYPE_DELIVERY:
      text += `\nprice: ${spell.score} ${bonusValue > 0 ? `(+${bonusValue} bonus)` : ''}`
      break
    case TYPE_TOME:
      text += `\ntaxCount: ${stock}`
      break
  }

  if (spell.repeatable) {
    text += '\nrepeatable: true'
  }

  return text
}

function initIngredientList (spellDelta, total, character, frame) {
  const textWidth = 25
  const recipeWidth = frame.width - textWidth

  const input = new PIXI.Container()
  const text = new PIXI.Text(character, {
    fontFamily: 'Arial Black, Arial',
    fontWeight: 900,
    fill: 'white',
    fontSize: 30,
    stroke: '#0000004C',
    strokeThickness: 7

  })

  text.anchor.x = 0.5
  text.position.x = textWidth / 2
  text.position.y = -23
  if (character === '+') {
    text.position.y += 2
  }

  let inputIdx = 0
  spellDelta.forEach((ingrDelta, typeIdx) => {
    const typeCount = ingrDelta < 0 ? -ingrDelta : ingrDelta
    for (let i = 0; i < typeCount; ++i) {
      const sprite = this.createEffect('ingredient')
      sprite.visible = true
      sprite.texture = PIXI.Texture.fromFrame(`Item-${typeIdx + 1}`)

      sprite.position.x = textWidth + TOME_INGREDIENT_SIZE / 2 + (Math.min(TOME_INGREDIENT_SIZE, recipeWidth / total)) * inputIdx
      fit(sprite, TOME_INGREDIENT_SIZE, TOME_INGREDIENT_SIZE)
      input.addChild(sprite)
      inputIdx++
    }
  })

  input.addChild(text)
  return input
}

function initIngredientStock () {
  const container = new PIXI.Container()
  container.x = FRAME_BY_TYPE[TYPE_TOME].stockOffset
  return container
}

function getSpell (id, type) {
  if (this.spells[id] == null) {
    const spell = this.spellMap[id]
    const graphics = new PIXI.Container()
    const frame = PIXI.Sprite.fromFrame(FRAME_BY_TYPE[type].image)
    const recipeContainer = new PIXI.Container()
    let cursor = null
    let stockContainer = null

    if (type === TYPE_DELIVERY) {
      const input = new PIXI.Container()
      let columnIdx = 0
      let rowIdx = 0

      const total = -spell.delta.reduce((a, b) => a + b, 0)
      spell.delta.forEach((ingrDelta, typeIdx) => {
        const typeCount = -ingrDelta

        for (let i = 0; i < typeCount; ++i) {
          const sprite = this.createEffect('ingredient')
          sprite.visible = true
          sprite.texture = PIXI.Texture.fromFrame(`Item-${typeIdx + 1}`)
          sprite.position.set(rowIdx * DELIVERY_INGREDIENT_SIZE, columnIdx * DELIVERY_INGREDIENT_SIZE)
          fit(sprite, DELIVERY_INGREDIENT_SIZE, DELIVERY_INGREDIENT_SIZE)
          input.addChild(sprite)
          rowIdx++
          if (rowIdx >= 3) {
            rowIdx = 0
            columnIdx++
          }
        }
      })

      if (total <= 3) {
        input.position.set(30 + DELIVERY_INGREDIENT_SIZE / 2 * (3 - total), 65)
      } else {
        input.position.set(30, 35)
      }

      const rupee = PIXI.Sprite.fromFrame('diams')

      const score = new PIXI.Text(spell.score, {
        fontFamily: 'Arial Black, Arial',
        fontWeight: 900,
        fill: 'white',
        fontSize: 72,
        stroke: '#0000004C',
        strokeThickness: 12
      })

      rupee.position.set(245, 38)
      score.position.set(213, 36)
      score.anchor.x = 0.5

      fit(rupee, 55, 52)
      score.scale.set(utils.fitAspectRatio(score.width, score.height, 55, 52))

      recipeContainer.addChild(rupee)
      recipeContainer.addChild(score)
      recipeContainer.addChild(input)
    } else {
      const height = FRAME_BY_TYPE[type].height
      const yDouble = [height / 4, 3 * height / 4]
      const ySolo = (yDouble[0] + yDouble[1]) / 2
      const totalLoss = getTotalLoss(spell.delta)
      const totalGain = getTotalGain(spell.delta)

      if (totalLoss > 0) {
        const input = initIngredientList.bind(this)(spell.delta.map(v => v < 0 ? v : 0), totalLoss, '-', FRAME_BY_TYPE[type])
        input.y = totalGain > 0 ? yDouble[0] : ySolo
        recipeContainer.addChild(input)
      }
      if (totalGain > 0) {
        const output = initIngredientList.bind(this)(spell.delta.map(v => v > 0 ? v : 0), totalGain, '+', FRAME_BY_TYPE[type])
        output.y = totalLoss > 0 ? yDouble[1] : ySolo
        recipeContainer.addChild(output)
      }

      if (type === TYPE_PLAYER) {
        cursor = PIXI.Sprite.fromFrame('Cadre')
        cursor.position.set(
          -(cursor.width - frame.width) / 2,
          -(cursor.height - frame.height) / 2
        )
        graphics.addChild(cursor)
      }

      if (type === TYPE_TOME) {
        stockContainer = initIngredientStock.bind(this)()
      }
    }

    const fadeContainer = new PIXI.Container()
    fadeContainer.addChild(frame)
    fadeContainer.addChild(recipeContainer)
    graphics.addChild(fadeContainer)
    this.tomeLayer.addChild(graphics)

    if (stockContainer != null) {
      stockContainer = graphics.addChild(stockContainer)
    }

    setTooltip(fadeContainer, getTooltipText(spell, type))

    this.spells[id] = {
      container: graphics,
      fadeContainer,
      cursor,
      stockContainer
    }
  }
  return this.spells[id]
}

function getTotalLoss (delta) {
  return -delta.filter(v => v < 0).reduce((a, b) => a + b, 0)
}
function getTotalGain (delta) {
  return delta.filter(v => v > 0).reduce((a, b) => a + b, 0)
}
