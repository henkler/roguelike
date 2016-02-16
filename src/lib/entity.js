import Tile from './tile';

class Entity {
  constructor(world, type, tile) {
    this._world = world;
    this.type = type;
    this.tile = tile;
    this.tile.entity = this;
  }

  // getters and setters
  get x() {
    return this.tile.x;
  }

  get y() {
    return this.tile.y;
  }

  move(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    const newTile = this._world.map.getTile(newX, newY);

    if (newTile && newTile.type === Tile.TYPE.open && newTile.entity === null) {
      this.tile.entity = null;
      newTile.entity = this;
      this.tile = newTile;
    }
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
