class Tile {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.explored = true;
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
}

Tile.TYPE = {
  wall: 0,
  open: 1,
};

export default Tile;
