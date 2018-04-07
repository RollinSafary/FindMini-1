import { gameConfig } from '../../constants/GameConfig'
import { SCENE_GAME } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import Phaser from 'phaser'

export default class GameScene extends FindMiniScene {
  static NAME = 'GameScene'
  static START = `${GameScene.NAME}Start`

  constructor () {
    super(SCENE_GAME)
  }

  create () {
    this.distance = 30
    this.startX = this.distance
    this.startY = this.distance
    this.endX = gameConfig.width - this.distance
    this.endY = gameConfig.height - this.distance
  }

  startNewGame (options) {
    this.events.on('onSphereCLick', this.onSphereClick, this)
    this.events.on('onSphereMustDestroy', this.destroySphere, this)
    this.clearWorld()
    this.createNumbersArray(options.length)
    this.createSpheres(options)
  }

  clearWorld () {
    if (this.spheresContainer) {
      this.spheresContainer.destroy()
    }
    this.spheresContainer = null
  }

  createSpheres (options) {
    this.spheresContainer = this.add.container(0, 0)
    for (let i = 0; i < options.length; i++) {
      const sphereType = options[i]
      const x = Phaser.Math.Between(this.startX, this.endX)
      const y = Phaser.Math.Between(this.startY, this.endY)
      const number = this.numbersArray[i]
      this.spheresContainer.add(new sphereType(this, x, y, number))
    }
  }

  createNumbersArray (length) {
    this.numbersArray = []
    for (let i = 0; i < length; i++) {
      this.numbersArray.push(this.generateNumber(1, length + 10))
    }
  }

  generateNumber (min, max) {
    let randomNumber = 0
    do {
      randomNumber = Phaser.Math.Between(min, max)
    } while (this.numbersArray.includes(randomNumber))
    return randomNumber
  }

  onSphereClick (target) {
    if (!this.checkToRemove(target)) {
      return
    }
    target.onClickAction()
  }

  checkToRemove (target) {
    for (const sphere of this.spheresContainer.list) {
      if (target.number > sphere.number) {
        return false
      }
    }
    return true
  }
  destroySphere (target) {
    target.destroy()
  }

  update () {
    if (this.spheresContainer) {
      for (const sphere of this.spheresContainer.list) {
        sphere.update()
      }
    }
  }
}
