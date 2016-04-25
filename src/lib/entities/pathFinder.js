import EasyStar from 'easystarjs';
import { TileType } from '../map/tile';

// use EasyStar.js for A* pathfinding AI for enemy
class PathFinder {
  constructor(game) {
    this._game = game;

    // eslint-disable-next-line new-cap
    const easystar = new EasyStar.js();
    easystar.setGrid(this._getGridForEasystar());
    easystar.setAcceptableTiles([TileType.open]);
    this._easystar = easystar;
  }

  // given an entity, finds the path between the entity and the player.
  // Callback is called with the path
  findPathToPlayer(entity, callback) {
    const player = this._game.player;
    this._easystar.findPath(entity.x, entity.y, player.x, player.y, callback);
    this._easystar.calculate();
  }

  // flatten tile map into something Easystar can grok
  // NOTE - easystar stores their tilemap in the reverse way we do
  _getGridForEasystar() {
    const map = this._game.map;
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
