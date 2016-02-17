import MovingEntity from './movingEntity';
import Entity from './entity';

const DEFAULT_PLAYER_NAME = 'Hero';

const INITIAL_PLAYER_SIGHT = 4;
const INITIAL_PLAYER_HEALTH = 100;

class Player extends MovingEntity {
  constructor(game) {
    const emptyTile = game.map.getRandomEmptyTile();
    super(game, DEFAULT_PLAYER_NAME, Entity.TYPE.player, emptyTile, INITIAL_PLAYER_HEALTH, INITIAL_PLAYER_SIGHT);

    this._markTilesExplored();
  }

  move(dx, dy) {
    super.move(dx, dy);
    this._markTilesExplored();
  }

  attack(entity) {
    console.log("attacking");
  }

  // returns true if the tile is visible to the player given their sight length
  isTileVisible(tile) {
    const xDist = this.x - tile.x;
    const yDist = this.y - tile.y;

    // compute the current distance of (x,y) from player
    const distanceFromPlayer = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    return (distanceFromPlayer <= this.range);
  }

  _interactWithEntity(entity) {
    if (entity.type === Entity.TYPE.weapon) {
      console.log("picked up weapon");
      return true;
    } else {
      console.log("interacting");
    }

    return false;
  }

  _isTileInRange(tile) {
    const xDist = this.x - tile.x;
    const yDist = this.y - tile.y;
    const distanceFromStart = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    return (distanceFromStart <= this.range);
  }

  _markTilesExplored() {
    const xMin = this.x - this.range;
    const xMax = this.x + this.range;
    const yMin = this.y - this.range;
    const yMax = this.y + this.range;
    const map = this._game.map;

    // iterate in a box around the player
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        // current tile exists, and is within our sights.  Mark it as explored
        const curTile = map.getTile(x, y);
        if (curTile && this._isTileInRange(curTile)) {
          curTile.setExplored();
        }
      }
    }
  }
}

export default Player;
