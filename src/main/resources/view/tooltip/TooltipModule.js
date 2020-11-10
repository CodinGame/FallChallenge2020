import { api as ViewModule } from '../graphics/ViewModule.js'
import { HEIGHT } from '../core/constants.js'

/* global PIXI */

const PADDING = 5
const CURSOR_WIDTH = 20

function generateText (text, size, color, align) {
  var textEl = new PIXI.Text(text, {
    fontSize: Math.round(size / 1.2) + 'px',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fill: color
  })

  textEl.lineHeight = Math.round(size / 1.2)
  if (align === 'right') {
    textEl.anchor.x = 1
  } else if (align === 'center') {
    textEl.anchor.x = 0.5
  }

  return textEl
};

function initTooltip (tooltip, text) {
  tooltip.label.text = text

  const width = tooltip.label.width + PADDING * 2
  const height = tooltip.label.height + PADDING * 2

  tooltip.offset = -width

  tooltip.background.clear()
  tooltip.background.beginFill(0x0, 0.8)
  tooltip.background.drawRect(0, 0, width, height)
  tooltip.background.endFill()

  tooltip.visible = true
}

export class TooltipModule {
  constructor (assets) {
    this.interactive = {}
    this.previousFrame = {
      registrations: {},
      extra: {}
    }
    this.lastProgress = 1
    this.lastFrame = 0
  }

  static get name () {
    return 'tooltips'
  }

  static showTooltip (text) {
    initTooltip(ViewModule.tooltip, text)
  }

  static moveTooltip (event) {
    const newPosition = event.data.getLocalPosition(ViewModule.tooltipContainer)

    let xOffset = ViewModule.tooltip.offset
    let yOffset = 0

    if (newPosition.x + xOffset < 0) {
      xOffset = CURSOR_WIDTH
    }

    if (newPosition.y + ViewModule.tooltip.height > HEIGHT) {
      yOffset = HEIGHT - newPosition.y - ViewModule.tooltip.height
    }

    ViewModule.tooltip.position.x = newPosition.x + xOffset
    ViewModule.tooltip.position.y = newPosition.y + yOffset
  }

  static hideTooltip () {
    ViewModule.tooltip.visible = false
  }

  updateScene (previousData, currentData, progress) {
    this.previousFrame = previousData
    this.currentFrame = currentData
    this.currentProgress = progress
  }

  handleFrameData (frameInfo) {
    return {}
  }

  reinitScene (container, canvasData) {
    var tooltip = new PIXI.Container()
    var background = new PIXI.Graphics()
    var label = generateText('DEFAULT', 36, 0xFFFFFF, 'left')

    label.position.x = PADDING
    label.position.y = PADDING

    tooltip.visible = false
    tooltip.background = tooltip.addChild(background)
    tooltip.label = tooltip.addChild(label)

    ViewModule.tooltip = tooltip
    ViewModule.tooltipContainer = container
    container.addChild(ViewModule.tooltip)
  }

  animateScene (delta) {

  }

  handleGlobalData (players, globalData) {

  }
}
