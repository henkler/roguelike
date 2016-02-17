import MovingEntity from './movingEntity';
import Entity from './entity';

const DEFAULT_ENEMY_NAME = 'Mireluk';
const DEFAULT_ENEMY_RANGE = 5;
const DEFAULT_ENEMY_HEALTH = 20;

class Enemy extends MovingEntity {
  constructor(game) {
    const emptyTile = game.map.getRandomEmptyTile();
    super(game, DEFAULT_ENEMY_NAME, Entity.TYPE.enemy, emptyTile, DEFAULT_ENEMY_HEALTH, DEFAULT_ENEMY_RANGE);
  }

  move() {
    // only move towards the player if in the enemy's range
    if (super._isTileInRange(this._game.player.tile)) {
      this._game.pathfinder.findPathToPlayer(this, this._pathFinderCallback.bind(this));
    } else {
      this._moveRandomlyInRange();
    }
  }

  _interactWithEntity(entity) {
    console.log("Enemy interaction");
    return false;
  }

  _pathFinderCallback(path) {
    let newTile = null;
    if (path === null || path.length === 0) {
      return;
    }

    // set the next tile to be the next step on the path to the player
    newTile = this._game.map.getTile(path[1].x, path[1].y);

    if (newTile) {
      this._moveToTile(newTile);
    }
  }

  _moveRandomlyInRange() {
    let openTiles = [];

    for (let x = this.x - 1; x <= this.x + 1; x++) {
      for (let y = this.y - 1; y <= this.y + 1; y++) {
        if (x === this.x && y === this.y) {
          continue;
        }

        const tile = this._game.map.getTile(x, y);

        if (tile.isOpen && this._isTileInRange(tile)) {
          openTiles.push(tile);
        }
      }
    }

    if (openTiles.length !== 0) {
      // pick a random open tile to move to
      const newTile = openTiles[Math.floor(Math.random() * openTiles.length)];
      this._moveToTile(newTile);
    }
  }
}

export default Enemy;
