import { easeIn, ease, bell } from '../core/transitions.js'
import { EV_CAST, EV_LEARN, EV_LEARN_PAY, EV_BREW } from './gameConstants.js'
import { INVENTORY_INGREDIENT_SIZE, INVENTORY_POSITION, POT_POSITION, TOME_INGREDIENT_SIZE, OBLIVION_POSITION } from './assetConstants.js'
import { setAnimationProgress, fit, getStockPosition } from './utils.js'
import { unlerp, lerp, lerpPosition } from '../core/utils.js'

/* globals PIXI */

const SPLASH_OFFSET = -35
const POT_WIDTH = 200

function updateSplash (position, start, end, progress) {
  if (progress < start || progress > end) {
    return
  }

  const splash = this.getFromPool('splash')
  splash.visible = true
  splash.position.x = position.x
  splash.position.y = position.y + SPLASH_OFFSET

  const animProgress = unlerp(start, end, progress)
  setAnimationProgress(splash, animProgress)
}

function getIngredient (type) {
  const sprite = this.getFromPool('ingredient')
  sprite.visible = true
  sprite.texture = PIXI.Texture.fromFrame(`Item-${type + 1}`)
  fit(sprite, INVENTORY_INGREDIENT_SIZE, INVENTORY_INGREDIENT_SIZE)
  return sprite
}

function getArrivingIngredientIndex (stacks, type) {
  let stack = stacks[type]
  for (let typeIdx = type; typeIdx > 0 && stack.length === 0; typeIdx--) {
    stack = stacks[typeIdx]
  }
  return stack.length === 0 ? 0 : stack[stack.length - 1].curShelfIdx + 1
}

function pushArrivingIngredient (stacks, type, count = 1) {
  if (count <= 0) {
    return []
  }

  const newIngs = []
  let idx = getArrivingIngredientIndex(stacks, type)

  for (let i = 0; i < count; i++) {
    const newIng = {
      sprite: getIngredient.bind(this)(type),
      arriving: true,
      leaving: false,
      prevShelfIdx: idx,
      curShelfIdx: idx++
    }
    newIngs.push(newIng)
    stacks[type].push(newIng)
  }

  for (let typeIdx = type + 1; typeIdx < stacks.length; typeIdx++) {
    stacks[typeIdx].forEach(ing => {
      ing.pevShelfIdx = ing.curShelfIdx
      ing.curShelfIdx = idx++
    })
  }

  return newIngs
}

function popArrivingIngredientIndex (stacks, type, count = 1) {
  if (count <= 0) {
    return []
  }

  const oldIngs = []
  for (let i = count; i > 0 && stacks[type].length > 0; i--) {
    oldIngs.push(stacks[type].pop())
  }

  let idx = stacks[type].length
  for (let typeIdx = type + 1; typeIdx < stacks.length; typeIdx++) {
    stacks[typeIdx].forEach(ing => {
      ing.prevShelfIdx = ing.curShelfIdx
      ing.curShelfIdx = idx++
    })
  }

  return oldIngs
}

function updateInventory (stacks, playerIdx, start, end, progress) {
  stacks.forEach(stack => stack.filter(ing => !ing.arriving && !ing.leaving)
    .forEach(ing => {
      const fromPos = INVENTORY_POSITION[playerIdx][ing.prevShelfIdx]
      const toPos = INVENTORY_POSITION[playerIdx][ing.curShelfIdx]
      moveIngredient(ing, start, end, progress, fromPos, toPos, ease)
    })
  )
}

export function updateInventories (previous, current, progress) {
  let stockIdx = 0
  const stockPoses = calculateStocksPoses(previous, current)

  for (let playerIdx = 0; playerIdx < this.globalData.playerCount; ++playerIdx) {
    const events = current.events.filter(event => event.playerIdx === playerIdx)

    const stacks = []
    let idx = 0

    previous.inventories[playerIdx].forEach((amount, typeIdx) => {
      const stack = []
      for (let i = 0; i < amount; i++) {
        stack.push({
          sprite: getIngredient.bind(this)(typeIdx),
          arriving: false,
          leaving: true,
          prevShelfIdx: idx,
          curShelfIdx: idx
        })
        idx++
      }
      stacks[typeIdx] = stack
    })

    idx = 0
    current.inventories[playerIdx].forEach((amount, typeIdx) => {
      for (let i = 0; i < amount; i++) {
        if (stacks[typeIdx][i] != null) {
          stacks[typeIdx][i].leaving = false
          stacks[typeIdx][i].curShelfIdx = idx
        } else {
          stacks[typeIdx].push({
            sprite: getIngredient.bind(this)(typeIdx),
            arriving: true,
            leaving: false,
            prevShelfIdx: null,
            curShelfIdx: idx
          })
        }
        idx++
      }
    })

    const comes = stacks.flatMap(stack => stack.filter(ing => ing.arriving))
    const leaves = stacks.flatMap(stack => stack.filter(ing => ing.leaving))

    let newIngredients = []
    let sortStart = 0
    let sortEnd = 1

    let hasUpdatedInventory = false

    events.forEach(event => {
      let animIdx = 0
      switch (event.type) {
        case EV_CAST: {
          leaves.forEach(ing => {
            const { start, end, trigger, triggerEnd } = event.animData[animIdx++]
            moveIngredientToPot(ing, playerIdx, start, end, progress, easeIn)
            updateSplash.bind(this)(ing.sprite.position, trigger, triggerEnd, progress)
          })

          sortStart = event.animData[animIdx].start
          sortEnd = event.animData[animIdx++].end
          updateInventory(stacks, playerIdx, sortStart, sortEnd, progress)
          hasUpdatedInventory = true

          comes.forEach(ing => {
            const { start, end } = event.animData[animIdx++]
            moveIngredientFromPot(ing, event.playerIdx, start, end, progress)
          })

          break
        }

        case EV_BREW: {
          leaves.forEach(ing => {
            const { start, end, trigger, triggerEnd } = event.animData[animIdx++]
            moveIngredientToPot(ing, event.playerIdx, start, end, progress, easeIn)
            updateSplash.bind(this)(ing.sprite.position, trigger, triggerEnd, progress)
          })

          sortStart = event.animData[animIdx].start
          sortEnd = event.animData[animIdx++].end
          updateInventory(stacks, playerIdx, sortStart, sortEnd, progress)
          hasUpdatedInventory = true

          break
        }

        case EV_LEARN: {
          let fromStockIdx = 0
          if (event.acquired > 0) {
            sortStart = event.animData[animIdx].start
            sortEnd = event.animData[animIdx].end

            comes.forEach(ing => {
              const { start, end } = event.animData[animIdx++]
              moveIngredientFromTome(ing, event.acquired, event.tomeIdx, event.playerIdx, fromStockIdx++, start, end, progress, ease)
            })

            if (fromStockIdx < event.acquired) {
              newIngredients = pushArrivingIngredient.bind(this)(stacks, 0, event.acquired - fromStockIdx)
              newIngredients.forEach(ing => {
                const { start, end } = event.animData[animIdx++]
                moveIngredientFromTome(ing, event.acquired, event.tomeIdx, event.playerIdx, fromStockIdx++, start, end, progress, ease)
              })
            }

            updateInventory(stacks, playerIdx, sortStart, sortEnd, progress)
            hasUpdatedInventory = true
          }

          if (event.lost > 0) {
            for (let i = event.acquired; i < event.lost + event.acquired; i++) {
              const { start, end } = event.animData[animIdx++]
              moveIngredientFromTomeToOblivion.bind(this)(event.lost + event.acquired, event.tomeIdx, i, start, end, progress)
            }
          }

          animIdx++
          break
        }

        case EV_LEARN_PAY: {
          if (event.tomeIdx === 0) {
            break
          }

          sortStart = event.animData[animIdx].start
          sortEnd = event.animData[animIdx].end

          leaves.forEach(ingredient => {
            const { start, end } = event.animData[animIdx++]
            moveIngredientToTome(ingredient, stockPoses, event.playerIdx, stockIdx++, start, end, progress)
          })

          if (progress > sortStart) {
            popArrivingIngredientIndex(stacks, 0, newIngredients.length).forEach(ing => {
              const { start, end } = event.animData[animIdx++]
              moveIngredientToTome(ing, stockPoses, event.playerIdx, stockIdx++, start, end, progress)
            })
            updateInventory(stacks, playerIdx, sortStart, sortEnd, progress)
            hasUpdatedInventory = true
          }

          break
        }
      }
    })

    if (!hasUpdatedInventory) {
      updateInventory(stacks, playerIdx, sortStart, sortEnd, progress)
    }
  }
}

const potTargetOffsets = [
  -POT_WIDTH / 2,
  -POT_WIDTH / 2.5,
  -POT_WIDTH / 3.33,
  -POT_WIDTH / 5,
  -POT_WIDTH / 10,
  POT_WIDTH / 10,
  POT_WIDTH / 5,
  POT_WIDTH / 3.33,
  POT_WIDTH / 2.5,
  POT_WIDTH / 2
]

function getPotPos (ingredient, playerIdx) {
  const index = ((playerIdx + 1) * 7 + ingredient.prevShelfIdx * 13) % potTargetOffsets.length
  const offset = potTargetOffsets[index]

  return {
    x: POT_POSITION[playerIdx].x + offset,
    y: POT_POSITION[playerIdx].y
  }
}

function lerpFitBell (ingredient, start, end, progress, fromScale, toScale) {
  const animProgress = unlerp(start, end, progress)
  const curScale = lerp(fromScale, toScale, animProgress) + bell(animProgress) * 40
  fit(ingredient.sprite, curScale, curScale)
}

function moveIngredient (ingredient, start, end, progress, fromPos, toPos, transition, lerpPosFunc=funkyLerp) {
  const animProgress = unlerp(start, end, progress)

  
  const dist = Math.abs(toPos.y - fromPos.y) + Math.abs(toPos.x - fromPos.x)
  let curPos
  if (dist === 0) {
    curPos = fromPos || toPos

  } else {
    let invert = (ingredient.prevShelfIdx || ingredient.curShelfIdx) % 2 === 0 ? 1 : -1
    curPos = lerpPosFunc(fromPos, toPos, transition(animProgress), invert)
  }
  ingredient.sprite.position.copy(curPos)
}

function funkyLerp(fromPos, toPos, u, invert) 
{
  let waveAmpl = 20
  let waveFreq = 4
  const dir = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x) + Math.PI/2
  return {
    x: (toPos.x - fromPos.x) * u + fromPos.x + Math.cos(dir) * invert * ((Math.cos(u*3.14+3.14*1.5) * Math.sin(u * Math.PI * waveFreq) / 2) * waveAmpl),
    y: (toPos.y - fromPos.y) * u + fromPos.y + Math.sin(dir) * invert * ((Math.cos(u*3.14+3.14*1.5) * Math.sin(u * Math.PI * waveFreq) / 2) * waveAmpl)
  }
}

function moveIngredientToPot (ingredient, playerIdx, start, end, progress, transition = ease) {
  if (progress > end) {
    ingredient.sprite.visible = false
  }

  const fromPos = INVENTORY_POSITION[playerIdx][ingredient.prevShelfIdx]
  const toPos = getPotPos(ingredient, playerIdx)

  moveIngredient(ingredient, start, end, progress, fromPos, toPos, transition)
}

function moveIngredientFromPot (ingredient, playerIdx, start, end, progress, transition = ease, sort = false) {
  if (progress < start) {
    ingredient.sprite.visible = false
  }

  const fromPos = POT_POSITION[playerIdx]
  const toPos = INVENTORY_POSITION[playerIdx][ingredient.curShelfIdx]

  moveIngredient(ingredient, start, end, progress, fromPos, toPos, transition)
}

function calculateStocksPoses (previous, current) {
  const tomeStocksPoses = []

  for (let tomeIdx = 0; tomeIdx < current.tomeSpells.length; tomeIdx++) {
    const id = current.tomeSpells[tomeIdx]

    if (id != null) {
      const count = current.stock[id] != null ? current.stock[id] : 0
      const previousCount = previous.stock[id] != null ? previous.stock[id] : 0

      if (previousCount < count) {
        const stocksPoses = []
        for (let index = previousCount; index < count; index++) {
          stocksPoses.push(getStockPosition(tomeIdx, index, count))
        }
        tomeStocksPoses.push(stocksPoses)
      }
    }
  }

  const globalStocksPoses = []

  while (tomeStocksPoses.length > 0 && tomeStocksPoses[0].length > 0) {
    tomeStocksPoses.forEach(stocksPoses => {
      globalStocksPoses.push(stocksPoses.pop())
    })
  }

  return globalStocksPoses
}

function moveIngredientToTome (ingredient, stockPoses, playerIdx, stockIdx, start, end, progress, transition = ease) {
  const fromPos = INVENTORY_POSITION[playerIdx][ingredient.prevShelfIdx]
  const toPos = stockIdx < stockPoses.length ? stockPoses[stockIdx] : OBLIVION_POSITION

  const fromScale = INVENTORY_INGREDIENT_SIZE
  const toScale = TOME_INGREDIENT_SIZE

  moveIngredient(ingredient, start, end, progress, fromPos, toPos, transition, lerpPosition)
  lerpFitBell(ingredient, start, end, progress, fromScale, toScale)
}

function moveIngredientFromTome (ingredient, stockCount, tomeIdx, playerIdx, stockIdx, start, end, progress, transition = ease) {
  const fromPos = getStockPosition(tomeIdx, stockIdx, stockCount)
  const toPos = INVENTORY_POSITION[playerIdx][ingredient.curShelfIdx]

  const fromScale = TOME_INGREDIENT_SIZE
  const toScale = INVENTORY_INGREDIENT_SIZE

  moveIngredient(ingredient, start, end, progress, fromPos, toPos, transition, lerpPosition)
  lerpFitBell(ingredient, start, end, progress, fromScale, toScale)
}

function moveIngredientFromTomeToOblivion (stockCount, tomeIdx, stockIdx, start, end, progress) {
  const sprite = this.getFromPool('ingredient')
  sprite.texture = PIXI.Texture.fromFrame('Item-1')
  sprite.visible = true
  fit(sprite, TOME_INGREDIENT_SIZE, TOME_INGREDIENT_SIZE)

  const ingredient = {
    sprite: sprite
  }

  const fromPos = getStockPosition(tomeIdx, stockIdx, stockCount)
  const toPos = OBLIVION_POSITION

  const fromScale = TOME_INGREDIENT_SIZE
  const toScale = INVENTORY_INGREDIENT_SIZE

  moveIngredient(ingredient, start, end, progress, fromPos, toPos, ease, lerpPosition)
  lerpFitBell(ingredient, start, end, progress, fromScale, toScale)
}
