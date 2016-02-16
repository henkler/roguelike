import Entity from './entity';

const DEFAULT_ENEMY_NAME = 'Clawzilla';

class Enemy extends Entity {
  constructor(world) {
    const emptyTile = world.map.getRandomEmptyTile();
    super(world, DEFAULT_ENEMY_NAME, Entity.TYPE.enemy, emptyTile);
  }

  move() {
    const newTile = this._findOpenSurroundingTile();
    if (newTile) {
      this._moveToTile(newTile);
    }
  }

  _findOpenSurroundingTile() {
    let openTiles = [];
    for (let x = this.x - 1; x <= this.x + 1; x++) {
      for (let y = this.y - 1; y <= this.y + 1; y++) {
        if (x === this.x && y === this.y) {
          continue;
        }

        const tile = this._world.map.getTile(x, y);

        if (tile.isOpen) {
          openTiles.push(tile);
        }
      }
    }

    if (openTiles.length === 0) {
      return null;
    }

    // pick a random open tile to move to
    return openTiles[Math.floor(Math.random() * openTiles.length)];
  }
}

export default Enemy;
