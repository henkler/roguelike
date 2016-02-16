class Tile {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.explored = false;
    this.entity = null;
  }
}

Tile.TYPE = {
  wall: 0,
  open: 1,
};

export default Tile;
