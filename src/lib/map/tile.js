import Entity from '../entities/entity';

class Tile {
  constructor(x, y, type) {
    this._x = x;
    this._y = y;
    this._type = type;
    this._entity = null;
    this._explored = true;
  }

  // getters
  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get type() {
    return this._type;
  }

  set type(newType) {
    this._type = newType;
  }

  get entity() {
    return this._entity;
  }

  set entity(newEnity) {
    this._entity = newEnity;
  }

  get isOpen() {
    return this._type === Tile.TYPE.open;
  }

  get isWall() {
    return this._type === Tile.TYPE.wall;
  }

  get isExplored() {
    return this._explored;
  }

  get hasEntity() {
    return this._entity !== null;
  }

  get hasPlayer() {
    return this._entity !== null && this._entity.type === Entity.TYPE.player;
  }

  get hasEnemy() {
    return this._entity !== null && this._entity.type === Entity.TYPE.enemy;
  }

  get hasWeapon() {
    return this._entity !== null && this._entity.type === Entity.TYPE.weapon;
  }

  setExplored() {
    this._explored = true;
  }
}

Tile.TYPE = {
  wall: 0,
  open: 1,
};

export default Tile;
