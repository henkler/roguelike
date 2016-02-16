import EasyStar from 'easystarjs';
import Tile from './tile';

// use EasyStar.js for A* pathfinding AI for enemy
class PathFinder {
  constructor(world) {
    this._world = world;

    const easystar = new EasyStar.js();
    easystar.setGrid(this._getGridForEasystar());
    easystar.setAcceptableTiles([Tile.TYPE.open]);
    easystar.enableDiagonals();
    this._easystar = easystar;
  }

  // given an entity, finds the path between the entity and the player.  Callback is called with the path
  findPathToPlayer(entity, callback) {
    const player = this._world.player;
    this._easystar.findPath(entity.x, entity.y, player.x, player.y, callback);
    this._easystar.calculate();
  }

  // flatten tile map into something Easystar can grok
  // NOTE - easystar stores their tilemap in the reverse way we do
  _getGridForEasystar() {
    const map = this._world.map;
    const tiles = [];
    for (let y = 0; y < map.height; y++) {
      tiles.push([]);
      for (let x = 0; x < map.width; x++) {
        tiles[y][x] = map.getTile(x, y).type;
      }
    }

    return tiles;
  }
}

export default PathFinder;
