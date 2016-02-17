import Entity from './entity';

class MovingEntity extends Entity {
  constructor(game, name, type, tile, initialHealth, initialRange) {
    super(game, name, type, tile);

    this.startX = tile.x;
    this.startY = tile.y;
    this.range = initialRange;
    this.health = initialHealth;
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

  _isTileInRange(tile) {
    const xDist = this.startX - tile.x;
    const yDist = this.startY - tile.y;
    const distanceFromStart = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    return (distanceFromStart <= this.range);
  }
}

export default MovingEntity;
