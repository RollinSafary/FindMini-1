import Phaser from 'phaser'
import { gameConfig } from '../../../constants/GameConfig'

export default class HardCoreNavigationView extends Phaser.GameObjects.Container {
  static NAME = 'HardCoreNavigationView'
  static STARTED = `${HardCoreNavigationView.NAME}Started`
  static MENU_CLICKED = `${HardCoreNavigationView.NAME}MenuClicked`

  constructor (scene) {
    super(scene, 0, 0)
    this.createBody()
  }

  createBody () {
    this.createBackground()
    this.createMenuButton()
    this.createTimer()
    this.createScore()
    this.createSoundButton()
    this.disableButtons()
  }

  createBackground () {
    this.bg = new Phaser.Geom.Rectangle(0, 0, gameConfig.width, 75)
    const graphics = this.scene.make.graphics({
      fillStyle: { color: 0x0f35ba },
    })
    graphics.fillRectShape(this.bg)
    this.add(graphics)
    graphics.alpha = 0.8
  }
  createMenuButton () {
    this.menuButton = this.scene.add.sprite(0, 0, 'back').setInteractive()
    this.menuButton.x = this.menuButton.displayWidth / 2 + 5
    this.menuButton.y = this.menuButton.displayHeight / 2 + 5
    this.menuButton.once('pointerup', () => {
      this.events.emit('menuClicked')
    })
    this.add(this.menuButton)
  }
  createTimer () {
    this.timerBackground = new Phaser.Geom.Rectangle(
      gameConfig.width / 4 - 5,
      5,
      gameConfig.width / 4,
      65,
    )
    const graphics = this.scene.make.graphics({
      fillStyle: { color: 0xff4b1a },
    })
    graphics.fillRectShape(this.timerBackground)
    this.timerText = this.scene.add
      .text(this.timerBackground.centerX, this.timerBackground.centerY, '0', {
        fontFamily: 'Arial',
        fontSize: 36,
        color: '#feffc5',
      })
      .setOrigin(0.5)
    this.add(graphics)
    this.add(this.timerText)
  }

  setTimer (value) {
    this.timerText.setText(value)
  }

  getTimerValue () {
    return parseInt(this.timerText.text)
  }

  createScore () {
    this.scoreBackground = new Phaser.Geom.Rectangle(
      gameConfig.width / 2 + 5,
      5,
      gameConfig.width / 4,
      65,
    )
    const graphics = this.scene.make.graphics({
      fillStyle: { color: 0x29a3b8 },
    })
    graphics.fillRectShape(this.scoreBackground)
    this.scoreText = this.scene.add
      .text(this.scoreBackground.centerX, this.scoreBackground.centerY, '0', {
        fontFamily: 'Arial',
        fontSize: 36,
        color: '#feffc5',
      })
      .setOrigin(0.5)
    this.add(graphics)
    this.add(this.scoreText)
  }

  setScore (value) {
    this.scene.add.tween({
      targets: this.scoreText,
      text: value,
      duration: 300,
      ease: 'Power1',
      onStart: () => {
        this.scoreText.text = parseInt(this.scoreText.text)
      },
      onUpdate: () => {
        this.scoreText.setText(Math.ceil(this.scoreText.text))
      },
    })
  }

  createSoundButton () {
    this.soundButton = this.scene.add.sprite(0, 0, 'musicOn').setInteractive()
    this.soundButton.x = this.bg.right - this.menuButton.x
    this.soundButton.y = this.bg.top + this.soundButton.height / 2 + 5
    this.add(this.soundButton)
  }

  turnOffSound () {
    this.soundButton.setTexture('musicOff')
    this.events.emit('musicOff')
    this.soundButton.once('pointerup', this.turnOnSound, this)
  }

  turnOnSound () {
    this.soundButton.setTexture('musicOn')
    this.events.emit('musicOn')
    this.soundButton.once('pointerup', this.turnOffSound, this)
  }

  setSoundState (isEnabled) {
    this.soundButton.setTexture(isEnabled ? 'musicOn' : 'musicOff')
    this.soundButton.once(
      'pointerup',
      isEnabled ? this.turnOffSound : this.turnOnSound,
      this,
    )
  }

  enableButtons () {
    this.menuButton.input.enabled = true
    this.soundButton.input.enabled = true
  }
  disableButtons () {
    this.menuButton.input.enabled = false
    this.soundButton.input.enabled = false
  }

  get isSoundOn () {
    return this.soundButton.texture.key === 'musicOn'
  }

  get events () {
    return this.scene.events
  }
}
