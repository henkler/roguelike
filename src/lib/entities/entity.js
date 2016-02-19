export const EntityType = {
  player: 0,
  boss: 1,
  enemy: 2,
  weapon: 3,
  potion: 4,
};

class Entity {
  constructor(game, name, type, tile) {
    this._game = game;
    this.name = name;
    this.type = type;
    this.tile = tile;
    this.tile.entity = this;
  }

  // getters
  get x() {
    return this.tile.x;
  }

  get y() {
    return this.tile.y;
  }

  get displayChar() {
    switch (this.type) {
      case EntityType.player:
        return '@';
      case EntityType.boss:
        return 'B';
      case EntityType.enemy:
        return this.level.toString();
      case EntityType.weapon:
        return '!';
      case EntityType.potion:
        return '%';
      default:
        return '_';
    }
  }

  get typeName() {
    switch (this.type) {
      case EntityType.player:
        return 'player';
      case EntityType.boss:
        return 'boss';
      case EntityType.enemy:
        return 'enemy';
      case EntityType.weapon:
        return 'weapon';
      case EntityType.potion:
        return 'potion';
      default:
        return null;
    }
  }

  get isPlayer() {
    return this.type === EntityType.player;
  }

  get isEnemy() {
    return this.type === EntityType.enemy;
  }

  get isBoss() {
    return this.type === EntityType.boss;
  }

  get isWeapon() {
    return this.type === EntityType.weapon;
  }

  get isPotion() {
    return this.type === EntityType.potion;
  }

  // method stub
  _interactWithEntity() {
    return false;
  }

  _moveToTile(newTile) {
    if (newTile.hasEntity) {
      // if the interaction with the entity fails, we can't move here
      if (!this._interactWithEntity(newTile.entity)) {
        return;
      }
    }

    this.tile.entity = null;
    this.tile = newTile;
    this.tile.entity = this;
  }
}

export default Entity;
