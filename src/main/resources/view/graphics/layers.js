import { setAnimationProgress, fit } from './utils.js'
import { WIDTH, HEIGHT } from '../core/constants.js'
import * as assets from './assetConstants.js'
import * as utils from '../core/utils.js'
/* globals PIXI */

export function initBackground (layer) {
  const back = PIXI.Sprite.fromFrame('Background.jpg')
  fit(back, WIDTH, HEIGHT)
  layer.addChild(back)
}

const WITCH_OFFSET_X = 509
const WITCH_Y = 608

const BLINK_X = 0
const BLINK_Y = 0
const BLINK_SPEED = 0.2
const BLINK_DELAY_SPEED = 1 / 200

const STIR_X = 32
const STIR_Y = -27

const LEARN_X = 65
const LEARN_Y = -14
const LEARN_SPEED = 0.45

const REST_X = -53
const REST_Y = -69
const REST_SPEED = 0.45

export function initWitches (layer) {
  this.witches = []
  for (let idx = 0; idx < this.globalData.playerCount; ++idx) {
    const flip = idx === 0 ? 1 : -1

    const idle = PIXI.extras.AnimatedSprite.fromFrames(assets.FRAMES_BLINK[idx])
    const stir = PIXI.extras.AnimatedSprite.fromFrames(assets.FRAMES_STIR[idx])
    const learn = PIXI.extras.AnimatedSprite.fromFrames(assets.FRAMES_LEARN[idx])
    const rest = PIXI.extras.AnimatedSprite.fromFrames(assets.FRAMES_REST[idx])

    idle.position.set(BLINK_X, BLINK_Y)
    stir.position.set(STIR_X, STIR_Y)
    learn.position.set(LEARN_X, LEARN_Y)
    rest.position.set(REST_X, REST_Y)

    idle.gotoAndPlay(Math.random())
    const animationSpeedMod = Math.random()
    Object.defineProperty(idle, 'animationSpeed', {
      get: () => Math.floor(idle.currentFrame === 0) ? (BLINK_DELAY_SPEED - (BLINK_DELAY_SPEED / 2) * animationSpeedMod) : BLINK_SPEED
    })
    learn.animationSpeed = LEARN_SPEED
    rest.animationSpeed = REST_SPEED

    const anims = [idle, stir, learn, rest]

    const container = new PIXI.Container()
    container.scale.x = flip

    container.position.set(WIDTH * idx + flip * WITCH_OFFSET_X, WITCH_Y)

    anims.forEach(anim => {
      anim.anchor.set(0.5, 0.5)
      anim.scale.set(1 / 0.7)
      container.addChild(anim)
      anim.visible = false
    })
    layer.addChild(container)

    this.witches.push({
      idle, stir, learn, rest, anims, container
    })
  }
}

export function initBubblings (layer) {
  for (let idx = 0; idx < this.globalData.playerCount; idx++) {
    const animation = PIXI.extras.AnimatedSprite.fromFrames(assets.FRAMES_POT)

    animation.position.copy(assets.POT_BUBBLES_POSITION[idx])
    fit(animation, assets.POT_BUBBLES_WIDTH, assets.POT_BUBBLES_HEIGHT)
    animation.anchor.set(0.5)

    animation.visible = true
    animation.loop = true

    setAnimationProgress(animation, idx / this.globalData.playerCount)
    animation.play()

    layer.addChild(animation)
  }
}

const HUD_PANEL_OFFSET_X = 0
const HUD_PANEL_Y = 0
const NAME_ZONE_WIDTH = 430
const NAME_ZONE_HEIGHT = 66

const NAME_OFFSET_X = 354
const NAME_Y = 35

const AVATAR_OFFSET_X = 69
const AVATAR_Y = 68
const AVATAR_SIZE = 130

function wordWrap (text) {
  var wordWrapWidth = this._style.wordWrapWidth
  var self = this
  text = text.replace(/\w+/g, function (text) {
    if (self.context.measureText(text).width > wordWrapWidth) {
      var list = []
      while (text.length > 0) {
        var length = 1
        while (length <= text.length && self.context.measureText(text.slice(0, length)).width < wordWrapWidth) {
          length++
        }
        list.push(text.slice(0, length - 1))
        text = text.slice(length - 1)
      }
      return list.join('\n')
    }
    return text
  })
  return this._wordWrap(text)
}

const SPEECH_OFFSET_X = 710
const SPEECH_OFFSET_Y = [-46, 46]
const SPEECH_Y = 700

export function initSpeech (layer) {
  this.bubbles = []
  for (let idx = 0; idx < this.globalData.playerCount; ++idx) {
    const player = this.globalData.players[idx]
    const flip = idx === 0 ? 1 : -1

    const container = new PIXI.Container()

    const bubble = PIXI.Sprite.fromFrame('dial0.png')
    bubble.alpha = 1
    bubble.scale.x = flip
    bubble.x -= 15 * flip

    bubble.anchor.y = 1
    const speech = new PIXI.Text('', {
      fontFamily: 'Arial Black, Arial',
      fontWeight: 900,
      fontSize: 40,
      fill: idx === 0 ? '#0000FF' : player.color,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 300
    })
    speech._wordWrap = speech.wordWrap
    speech.wordWrap = wordWrap
    speech.anchor.set(0.5)

    container.position.set(WIDTH * idx + flip * SPEECH_OFFSET_X, SPEECH_Y + SPEECH_OFFSET_Y[idx])
    container.alpha = 0
    container.targetAlpha = 0
    bubble.height = assets.SPEECH_HEIGHT
    bubble.width = assets.SPEECH_WIDTH

    bubble.alpha = 0.5

    speech.x = (idx === 0 ? bubble.width / 2 : -bubble.width / 2)
    speech.y = bubble.height / 2 - 100

    container.addChild(bubble)
    container.addChild(speech)
    layer.addChild(container)
    this.bubbles.push({ container, bubble, speech })
  }
}

export function initHud (layer) {
  this.scores = []
  for (let idx = 0; idx < this.globalData.playerCount; ++idx) {
    const player = this.globalData.players[idx]
    const flip = idx === 0 ? 1 : -1

    const playerHud = new PIXI.Container()

    const panelContainer = new PIXI.Container()
    panelContainer.position.set(WIDTH * idx + flip * HUD_PANEL_OFFSET_X, HUD_PANEL_Y)

    const hudPanel = PIXI.Sprite.fromFrame(`HUD_${idx}`)
    hudPanel.anchor.set(idx, 0)

    const rupees = PIXI.Sprite.fromFrame('diams')

    rupees.anchor.set(0.5)
    if (idx === 0) {
      rupees.position.set(206, 126)
      rupees.rotation = 0
    } else {
      rupees.position.set(1534, 124)
      rupees.rotation = -Math.PI / 10
    }

    const name = new PIXI.Text(player.name, {
      fill: 0xFFFFFF,
      fontWeight: 900,
      fontSize: 60,
      stroke: '#0000004C',
      strokeThickness: 10,
      fontFamily: 'Arial Black, Arial'
    })
    name.anchor.set(0.5, 0.5)
    name.x = WIDTH * idx + flip * NAME_OFFSET_X
    name.y = NAME_Y
    const coeff = utils.fitAspectRatio(name.width, name.height, NAME_ZONE_WIDTH, NAME_ZONE_HEIGHT)
    name.scale.set(Math.min(1, coeff))

    const avatar = new PIXI.Sprite(player.avatar)
    avatar.x = WIDTH * idx + flip * AVATAR_OFFSET_X
    avatar.y = AVATAR_Y
    avatar.anchor.set(0.5)
    avatar.width = AVATAR_SIZE
    avatar.height = AVATAR_SIZE

    const mask = new PIXI.Graphics()
    mask.position.set(WIDTH * idx + flip * AVATAR_OFFSET_X, AVATAR_Y)
    mask.beginFill(0, 1)
    mask.drawCircle(0, 0, AVATAR_SIZE / 2)
    mask.endFill()
    avatar.mask = mask

    const score = new PIXI.Text('0', {
      fill: 0xFFFFFF,
      fontWeight: 900,
      fontSize: 60,
      stroke: '#0000004C',
      strokeThickness: 10,
      fontFamily: 'Arial Black, Arial'
    })
    score.anchor.set(0, 0.5)
    if (idx === 0) {
      score.position.set(248, 126)
      score.rotation = -0.01
    } else {
      score.position.set(1576, 124)
      score.rotation = 0.03
    }

    this.scores.push(score)
    panelContainer.addChild(hudPanel)
    playerHud.addChild(avatar)
    playerHud.addChild(mask)
    playerHud.addChild(panelContainer)
    playerHud.addChild(rupees)
    playerHud.addChild(name)
    playerHud.addChild(score)
    layer.addChild(playerHud)
  }
}

const FRONTS_CAULDRONS_X = 961
const FRONTS_CAULDRONS_Y = 785
const FRONTS_CAULDRONS_ANCHOR = 0.5

export function initFrontsCauldrons (layer) {
  const fronts = PIXI.Sprite.fromFrame('cauldrons_front.png')
  fronts.visible = true
  fronts.anchor.set(FRONTS_CAULDRONS_ANCHOR)
  fronts.position.x = FRONTS_CAULDRONS_X
  fronts.position.y = FRONTS_CAULDRONS_Y
  layer.addChild(fronts)
}
