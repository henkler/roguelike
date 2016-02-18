import Entity from './entity';

const DEFAULT_MAX_DAMAGE_PER_LEVEL = 10;

class MovingEntity extends Entity {
  constructor(game, name, type, tile, initialRange, level) {
    super(game, name, type, tile);

    this.startTile = tile;
    this.range = initialRange;
    this.level = level;
    this.health = 0;
    this.xp = 0;
  }

  move(dx, dy) {
    const newTile = this._getTileForMove(dx, dy);

    // if we are trying to move to an invalid tile, return
    if (!newTile) {
      return;
    }

    if (newTile.isOpen) {
      this._moveToTile(newTile);
    }
  }

  attack(entity, damage) {
    console.log(`${this.name} attacks ${entity.name}${this.weapon ? ' with ' + this.weapon.name : ''}`);
    entity.handleAttack(this, damage);
  }

  handleAttack(entity, damage) {
    console.log(`${this.name} receives ${damage} points of damage from ${entity.name}`);
    this._takeDamage(damage);
  }

  // method stub
  die() {
    return;
  }

  get isDead() {
    return this.health === 0;
  }

  // override this to provide custom damage (e.g. for weapons)
  get maxDamage() {
    return DEFAULT_MAX_DAMAGE_PER_LEVEL * this.level;
  }

  get attackDamage() {
    // return damage in range of [maxDamage/2] to maxDamage
    return (Math.ceil(Math.random() * (this.maxDamage / 2)) + (this.maxDamage / 2));
  }

  _takeDamage(damage) {
    if (damage > this.health) {
      this.health = 0;
    } else {
      this.health -= damage;
    }

    if (this.isDead) {
      this.die();
    } else {
      console.log(`${this.name} has ${this.health} hit points remaining`);
    }
  }

  _getTileForMove(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    return this._game.map.getTile(newX, newY);
  }
}

export default MovingEntity;
