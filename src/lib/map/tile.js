export const TileType = {
  wall: 0,
  open: 1,
};

class Tile {
  constructor(x, y, type) {
    this._x = x;
    this._y = y;
    this._type = type;
    this._entity = null;
    this._explored = false;
  }

  // getters
  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get displayChar() {
    if (!this.isExplored) {
      return '?';
    } else if (this.entity) {
      return this.entity.displayChar;
    } else if (this.type === TileType.wall) {
      return '#';
    }

    return '.';
  }

  get typeName() {
    if (!this.isExplored) {
      return 'unexplored';
    } else if (this.entity) {
      return this.entity.typeName;
    } else if (this.type === TileType.wall) {
      return 'wall';
    }

    return 'open';
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
    return this.type === TileType.open;
  }

  get isWall() {
    return this.type === TileType.wall;
  }

  get isExplored() {
    return this._explored;
  }

  get hasEntity() {
    return this.entity !== null;
  }

  get hasPlayer() {
    return this.hasEntity && this.entity.isPlayer;
  }

  get hasEnemy() {
    return this.hasEntity && this.entity.isEnemy;
  }

  get hasWeapon() {
    return this.hasEntity && this.entity.isWeapon;
  }

  get hasPotion() {
    return this.hasEntity && this.entity.isPotion;
  }

  setExplored() {
    this._explored = true;
  }

  distanceTo(otherTile) {
    const xDist = this.x - otherTile.x;
    const yDist = this.y - otherTile.y;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }
}

export default Tile;
