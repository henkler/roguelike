import Entity from './entity';

const DEFAULT_ENEMY_NAME = 'Mireluk';
const DEFAULT_ENEMY_RANGE = 5;

class Enemy extends Entity {
  constructor(game) {
    const emptyTile = game.map.getRandomEmptyTile();
    super(game, DEFAULT_ENEMY_NAME, Entity.TYPE.enemy, emptyTile);

    this.startX = emptyTile.x;
    this.startY = emptyTile.y;
    this.range = DEFAULT_ENEMY_RANGE;
  }

  move() {
    // only move towards the player if in the enemy's range
    if (this._isTileInRange(this._world.player.tile)) {
      this._world.pathfinder.findPathToPlayer(this, this._pathFinderCallback.bind(this));
    } else {
      this._moveRandom();
    }
  }

  attack() {
    console.log("attacking");
  }

  _pathFinderCallback(path) {
    let newTile = null;
    // if a path cannot be found to the player, move randomly to an open tile in range
    if (path === null || path.length === 0) {
      return;
    }

    // set the next tile to be the next step on the path to the player
    newTile = this._world.map.getTile(path[1].x, path[1].y);

    if (newTile) {
      if (newTile.hasPlayer) {
        this.attack();
      } else {
        this._moveToTile(newTile);
      }
    }
  }

  _isTileInRange(tile) {
    const xDist = this.startX - tile.x;
    const yDist = this.startY - tile.y;
    const distanceFromStart = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    return (distanceFromStart <= this.range);
  }

  _moveRandom() {
    let openTiles = [];

    for (let x = this.x - 1; x <= this.x + 1; x++) {
      for (let y = this.y - 1; y <= this.y + 1; y++) {
        if (x === this.x && y === this.y) {
          continue;
        }

        const tile = this._world.map.getTile(x, y);

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
