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

  get isPlayer() {
    return this.type === Entity.TYPE.player;
  }

  get isEnemy() {
    return this.type === Entity.TYPE.enemy;
  }

  get isWeapon() {
    return this.type === Entity.TYPE.weapon;
  }

  get isPotion() {
    return this.type === Entity.TYPE.potion;
  }

  // method stub
  _interactWithEntity(entity) {
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

Entity.TYPE = {
  player: 0,
  boss: 1,
  enemy: 2,
  weapon: 3,
  potion: 4,
};

export default Entity;
