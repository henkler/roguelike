class Entity {
  constructor(game, name, type, tile) {
    this._game = game;
    this.name = name;
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
    const newTile = this._getTileForMove(dx, dy);

    // if we are trying to move to an invalid tile, return
    if (!newTile) {
      return;
    }

    if (newTile.isOpen) {
      this._moveToTile(newTile);
    }
  }

  _getTileForMove(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    return this._game.map.getTile(newX, newY);
  }

  _moveToTile(tile) {
    const newTile = tile;
    this.tile.entity = null;
    newTile.entity = this;
    this.tile = newTile;
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
