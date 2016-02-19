import MovingEntity from './movingEntity';
import { EntityType } from './entity';

const DEFAULT_PLAYER_NAME = 'The Hero';
const INITIAL_PLAYER_SIGHT = 4;
const INITIAL_PLAYER_HEALTH = 100;
const XP_BASE_PER_LEVEL = 25;

class Player extends MovingEntity {
  constructor(game) {
    const emptyTile = game.map.getRandomEmptyTile();
    super(game,
      DEFAULT_PLAYER_NAME,
      EntityType.player,
      emptyTile,
      INITIAL_PLAYER_SIGHT,
      1);

    this.xp = 0;
    this.health = INITIAL_PLAYER_HEALTH;
    this._weapon = null;

    this._markTilesExplored();
  }

  move(dx, dy) {
    super.move(dx, dy);
    this._markTilesExplored();
  }

  addXP(xp) {
    this.xp += xp;
    if (this.xp >= this.nextLevelXP) {
      this.level++;
    }
  }

  die() {
    this._game.storeMessage(`\n${this.name} falls to the ground.\nYou realize that evil will always triumph because good is dumb.\nFade to black.`);
    this._game.playerDie();
  }

  pickupWeapon(newWeapon) {
    if (!this._weapon || newWeapon.damage > this._weapon.damage) {
      this._weapon = newWeapon;
      this._game.storeMessage(`WEAPON: Equipping \'${newWeapon.name}\' with base damage ${newWeapon.damage}`);
    } else {
      this._game.storeMessage(`WEAPON: The weapon \'${newWeapon.name}\' is worse than your current weapon.  It is hurled into the bushes`);
    }
  }

  pickupPotion(potion) {
    this.health += potion.restoresHealth;
    this._game.storeMessage(`HEALTH: Found a ${potion.name}.  Restored ${potion.restoresHealth} health!`);
  }

  // returns true if the tile is visible to the player given their sight length
  isTileVisible(tile) {
    const xDist = this.x - tile.x;
    const yDist = this.y - tile.y;

    // compute the current distance of (x,y) from player
    const distanceFromPlayer = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    return (distanceFromPlayer <= this.range);
  }

  isTileInRange(tile) {
    return (tile.distanceTo(this.tile) <= this.range);
  }

  get weaponName() {
    return this._weapon ? this._weapon.name : 'Sweaty Palms';
  }

  get maxDamage() {
    if (this._weapon) {
      return this._weapon.damage * this.level;
    }
    return this.level;
  }

  get nextLevelXP() {
    return (this.level) * XP_BASE_PER_LEVEL;
  }

  get bossXPosition() {
    return (this._game.boss.x);
  }

  get bossYPosition() {
    return (this._game.boss.y);
  }

  _interactWithEntity(entity) {
    if (entity.isEnemy || entity.isBoss) {
      const damage = this.attackDamage;
      this.attack(entity, damage);
      // we can move through the enemy if it is dead
      return entity.isDead;
    } else if (entity.isWeapon) {
      this.pickupWeapon(entity);
      return true;
    } else if (entity.isPotion) {
      this.pickupPotion(entity);
      return true;
    }

    return false;
  }

  _markTilesExplored() {
    const xMin = this.x - this.range;
    const xMax = this.x + this.range;
    const yMin = this.y - this.range;
    const yMax = this.y + this.range;
    const map = this._game.map;

    // iterate in a box around the player
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        // current tile exists, and is within our sights.  Mark it as explored
        const curTile = map.getTile(x, y);
        if (curTile && curTile.distanceTo(this.tile) <= this.range) {
          curTile.setExplored();
        }
      }
    }
  }
}

export default Player;
