import { TOME_STOCKS_POSITION } from './assetConstants.js'
import * as utils from '../core/utils.js'

export function setAnimationProgress (fx, progress) {
  let idx = Math.floor(progress * fx.totalFrames)
  idx = Math.min(fx.totalFrames - 1, idx)
  fx.gotoAndStop(idx)
}

export function fit (entity, maxWidth, maxHeight) {
  entity.scale.set(utils.fitAspectRatio(entity.texture.width, entity.texture.height, maxWidth, maxHeight))
}

export function getStockPositionFromCenter (center, index, stockCount) {
  const increment = 2 * Math.PI / stockCount
  const radius = (stockCount === 1 ? 0 : 20)

  const position = {
    x: center.x + radius * Math.cos(increment * index),
    y: center.y + radius * Math.sin(increment * index)
  }

  return position
}

export function getStockPosition (tomeIdx, index, stockCount) {
  const center = TOME_STOCKS_POSITION[tomeIdx]
  return getStockPositionFromCenter(center, index, stockCount)
}

export function applyOffsets (position, widthOffset, heightOffset) {
  return {
    x: position.x + widthOffset,
    y: position.y + heightOffset
  }
}
