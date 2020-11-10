import { EV_BREW } from './gameConstants.js'
import { setAnimationProgress } from './utils.js'
import { WIDTH } from '../core/constants.js'
import * as assets from './assetConstants.js'
import * as utils from '../core/utils.js'

export function updateScore (previous, current, progress) {
  previous.scores.forEach((score, idx) => {
    this.scores[idx].text = score.toString()
  })
  current.events
    .filter(ev => ev.type === EV_BREW)
    .forEach(ev => {
      const animIdx = ev.animData.findIndex(animData => animData.start < progress && progress <= animData.end)
      if (animIdx > ev.animData.length - 2 || animIdx === -1) {
        this.scores[ev.playerIdx].text = current.scores[ev.playerIdx].toString()
      }
    })
}

const POTION_OFFSET_X = 627
const POTION_Y = 883
const POTION_BOUNCE_HEIGHT = 50

function bounceLerpPosition (from, to, progress) {
  const result = utils.lerpPosition(from, to, progress)
  result.y -= POTION_BOUNCE_HEIGHT * Math.abs(Math.sin(Math.PI * progress * 2)) * (Math.cos(progress * Math.PI) + 3) / 4
  return result
}

export function updatePotions (previous, current, progress) {
  current.events
    .filter(ev => ev.type === EV_BREW)
    .forEach(ev => {
      const animIdx = ev.animData.findIndex(animData => animData.start < progress && progress <= animData.end)
      if (animIdx === ev.animData.length - 3) {
        const anim = ev.animData[animIdx]
        // POTION spawn
        const potion = this.getFromPool('potion')
        potion.position.set(ev.playerIdx === 0 ? POTION_OFFSET_X : (WIDTH - POTION_OFFSET_X), POTION_Y)
        potion.visible = true
        const animP = utils.unlerp(anim.start, anim.end, progress)
        setAnimationProgress(potion, animP)
      } else if (animIdx === ev.animData.length - 2) {
        const anim = ev.animData[animIdx]
        // POTION to counter
        const potion = this.getFromPool('potion')
        const spellContainer = this.spells[ev.spellId].container
        const from = {
          x: ev.playerIdx === 0 ? POTION_OFFSET_X : (WIDTH - POTION_OFFSET_X),
          y: POTION_Y
        }
        const to = {
          x: spellContainer.position.x + spellContainer.width / 2,
          y: spellContainer.position.y
        }

        potion.visible = true
        const animP = utils.unlerp(anim.start, anim.end, progress)
        potion.position.copy(bounceLerpPosition(from, to, animP))
        setAnimationProgress(potion, 1)
      } else if (animIdx === ev.animData.length - 1) {
        const anim = ev.animData[animIdx]
        // POTION to counter
        const potion = this.getFromPool('potioff')
        const spellContainer = this.spells[ev.spellId].container

        potion.position.set(
          spellContainer.position.x + spellContainer.width / 2,
          spellContainer.position.y
        )

        potion.visible = true
        const animP = utils.unlerp(anim.start, anim.end, progress)
        setAnimationProgress(potion, animP)
      }
    })
}

const SPEECH_PAD_X = 60
const SPEECH_PAD_Y = -8

export function updateSpeech (previous, current, progress) {
  for (let idx = 0; idx < this.globalData.playerCount; ++idx) {
    const { container, speech, bubble } = this.bubbles[idx]

    const message = current.messages[idx]
    this.bubbles[idx].show = !!message
    const textMaxWidth = assets.SPEECH_WIDTH - SPEECH_PAD_X
    const textMaxHeight = assets.SPEECH_HEIGHT - SPEECH_PAD_Y

    speech.scale.set(1)
    speech.style.wordWrapWidth = textMaxWidth
    if (message) {
      speech.text = message
    }
    if (speech.height > textMaxHeight) {
      const scale = utils.fitAspectRatio(speech.width, speech.height, textMaxWidth, textMaxHeight)
      speech.scale.set(scale)
      speech.style.wordWrapWidth *= 1 / speech.scale.x
    } else {
      const scale = utils.fitAspectRatio(speech.width, speech.height, textMaxWidth, textMaxHeight)
      speech.scale.set(Math.min(1.6, scale))
    }
  }
}
