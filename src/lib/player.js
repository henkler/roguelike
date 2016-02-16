import Entity from './entity';

const DEFAULT_PLAYER_SIGHT = 4;
const DEFAULT_PLAYER_NAME = 'Hero';

class Player extends Entity {
  constructor(world) {
    const emptyTile = world.map.getRandomEmptyTile();
    super(world, DEFAULT_PLAYER_NAME, Entity.TYPE.player, emptyTile);

    this.sight = DEFAULT_PLAYER_SIGHT;
    this._markTilesExplored();
  }

  move(dx, dy) {
    super.move(dx, dy);
    this._markTilesExplored();
  }

  _markTilesExplored() {
    const xMin = this.x - this.sight;
    const xMax = this.x + this.sight;
    const yMin = this.y - this.sight;
    const yMax = this.y + this.sight;
    const map = this._world.map;

    // iterate in a box around the player
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        const xDist = this.x - x;
        const yDist = this.y - y;

        // compute the current distance of (x,y) from player
        const distanceFromPlayer = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

        // this tile is further away than the players sight.  Get the next tile
        if (distanceFromPlayer >= this.sight) {
          continue;
        }

        // current tile exists, and is within our sights.  Mark it as explored
        const curTile = map.getTile(x, y);
        if (curTile) {
          curTile.explored = true;
        }
      }
    }
  }
}

export default Player;
