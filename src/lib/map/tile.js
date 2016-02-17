import Entity from '../entities/entity';

class Tile {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.explored = false;
    this.entity = null;
  }

  get isOpen() {
    return this.type === Tile.TYPE.open && this.entity === null;
  }

  get isWall() {
    return this.type === Tile.TYPE.wall;
  }

  get hasEntity() {
    return this.entity !== null;
  }

  get hasPlayer() {
    return this.entity !== null && this.entity.type === Entity.TYPE.player;
  }
}

Tile.TYPE = {
  wall: 0,
  open: 1,
};

export default Tile;
