import Enemy from './enemy';
import { EntityType } from './entity';

const BOSS_HEALTH = 500;
const BOSS_LEVEL = 10;
const BOSS_NAME = 'Mireluk Queen';

class Boss extends Enemy {
  constructor(game) {
    super(game, BOSS_NAME, BOSS_LEVEL);
    this.type = EntityType.boss;
    this.health = BOSS_HEALTH;
  }

  die() {
    super.die();
    this._game.playerWin();
  }
}

export default Boss;
