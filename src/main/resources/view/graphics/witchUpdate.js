import { EV_LEARN, EV_CAST, EV_BREW, EV_REST } from './gameConstants.js'

function showAnim (witch, anim, speed) {
  witch.anims.forEach(anim => {
    anim.visible = false
    anim.stop()
  })
  witch[anim].visible = true
  witch[anim].play()
  if (speed != null) {
    witch[anim].animationSpeed = speed
  }
}

export function updateWitches (previous, current, progress) {
  for (let i = 0; i < this.globalData.playerCount; ++i) {
    const witch = this.witches[i]
    witch.container.parent.removeChild(witch.container)
    showAnim(witch, 'idle')

    let parent = this.witchFrontLayer

    current.events
      .filter(e => e.playerIdx === i)
      .forEach(e => {
        if (e.type === EV_LEARN) {
          showAnim(witch, 'learn')
        } else if (e.type === EV_CAST) {
          const animIdx = e.animData.findIndex(animData => animData.start < progress && progress <= animData.end)
          if (animIdx >= 0) {
            showAnim(witch, 'stir', 0.45)
            parent = this.witchLayer
          }
        } else if (e.type === EV_BREW) {
          const animIdx = e.animData.findIndex(animData => animData.start < progress && progress <= animData.end)
          if (animIdx >= 0 && animIdx <= e.animData.length - 3) {
            showAnim(witch, 'stir', 0.65)
            parent = this.witchLayer
          }
        } else if (e.type === EV_REST) {
          showAnim(witch, 'rest')
        }
      })
    parent.addChild(witch.container)
  }
}
