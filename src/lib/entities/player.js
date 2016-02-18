import MovingEntity from './movingEntity';
import Entity from './entity';

const DEFAULT_PLAYER_NAME = 'The Hero';
const INITIAL_PLAYER_SIGHT = 4;
const INITIAL_PLAYER_HEALTH = 100;

class Player extends MovingEntity {
  constructor(game) {
    const emptyTile = game.map.getRandomEmptyTile();
    super(game,
      DEFAULT_PLAYER_NAME,
      Entity.TYPE.player,
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

  die() {
    console.log("I'm dying");
  }

  pickupWeapon(newWeapon) {
    if (!this._weapon || newWeapon.damage > this._weapon.damage) {
      this._weapon = newWeapon;
      console.log(`Equipped \'${newWeapon.name}\' with base damage ${newWeapon.damage}`);
    } else {
      console.log(`The weapon \'${newWeapon.name}\' is worse than your current weapon.  You hurl it into the bushes`);
    }
  }

  pickupPotion(potion) {
    this.health += potion.restoresHealth;
    console.log(`Found a ${potion.name}.  Restored ${potion.restoresHealth} health`);
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

  get weapon() {
    return this._weapon ? this.weapon : 'Fists';
  }

  get maxDamage() {
    if (this._weapon) {
      return this._weapon.damage * this.level;
    }
    return this.level;
  }

  get nextLevelXP() {
    return 0;
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
