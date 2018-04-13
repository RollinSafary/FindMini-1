import { SyncMacroCommand } from '@koreez/pure-mvc'
import GameScene from '../view/scenes/GameScene'
import onLevelCompleteCommand from './player/onLevelCompleteCommand'
import BootScene from '../view/scenes/BootScene'
import onThemeChangeCommand from './player/onThemeChangeCommand'
import FindMiniFacade from '../FindMiniFacade'
import ChangeSoundOptionsCommand from './player/ChangeSoundOptionsCommand'

export default class RegisterPlayerCommands extends SyncMacroCommand {
  execute (notification, args) {
    this.facade.registerCommand(
      GameScene.LEVEL_COMPLETE,
      onLevelCompleteCommand,
    )
    this.facade.registerCommand(
      BootScene.THEME_CHOOSE,
      onThemeChangeCommand,
    )
    this.facade.registerCommand(
      FindMiniFacade.GAME_SOUND,
      ChangeSoundOptionsCommand,
    )
    super.execute(notification, args)
  }
}
