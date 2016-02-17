import Tile from './tile';
import Entity from '../entities/entity';

const GENERATOR_WALL_PERCENTAGE = 40;
const GENERATOR_ITERATIONS = 4;
const GENERATOR_SMOOTHING_ITERATIONS = 3;

class Map {
  constructor(width, height) {
    this._tiles = null;
    this._width = width;
    this._height = height;

    this._init();
  }

  // getters & setters
  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  // private methods

  // algorithm for generating map used below:
  // http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
  _init() {
    this._randomFillMap();
    this._permuteMap();
  }

  _randomFillMap() {
    var tiles = new Array(this.width);
    for (var i = 0; i < this.width; i++) {
      tiles[i] = new Array(this.height);
      for (var j = 0; j < this.height; j++) {
        // randomly determine if tile is blocked or not
        var isWall = Math.floor((Math.random() * 100) + 1) < GENERATOR_WALL_PERCENTAGE;

        // map border is always a wall
        if (this._isBorder(i, j)) {
          isWall = true;
        }

        var tile = new Tile(i, j, isWall ? Tile.TYPE.wall : Tile.TYPE.open);
        tiles[i][j] = tile;
      }
    }

    this._tiles = tiles;
  }

  _permuteMapIteration(r1_threshold, r2_threshold) {
    var nextPermutation = new Array(this.width);

    for (var i = 0; i < this.width; i++) {
      nextPermutation[i] = new Array(this.height);
      for (var j = 0; j < this._height; j++) {
        // get the number of wall tiles surrounding this tile for a radius of 1 and 2 squares
        var r1 = this._numWallsSurroundingTile(i, j, 1);
        var r2 = this._numWallsSurroundingTile(i, j, 2);

        var tileType;

        // if the walls surrounding the tile is bigger than the radius of 1 threshold, make a wall
        if (r1 >= r1_threshold) {
          tileType = Tile.TYPE.wall;
        }
        // if the walls surrounding the tile is less than the radius of 2 threshold, make a wall
        else if (r2_threshold && r2 <= r2_threshold) {
          tileType = Tile.TYPE.wall;
        }
        else {
          tileType = Tile.TYPE.open;
        }

        nextPermutation[i][j] = tileType;
      }
    }

    // copy the new tile types into the map
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        this._tiles[x][y].type = nextPermutation[x][y];
      }
    }
  }

  _permuteMap() {
    for (var i = 0; i < GENERATOR_ITERATIONS; i++) {
      this._permuteMapIteration(5, 2);
    }

    for (var j = 0; j < GENERATOR_SMOOTHING_ITERATIONS; j++) {
      this._permuteMapIteration(5, null);
    }
  }

  _isBorder(x, y) {
    return (x === 0 || y === 0 || x === (this.width - 1) || y === (this.height - 1));
  }

  _isWall(x, y) {
    // return wall for out of bounds
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return true;
    } else {
      return this._tiles[x][y].isWall;
    }
  }

  _numWallsSurroundingTile(x, y, surroundSize) {
    var wallCount = 0;

    for (var i = x - surroundSize; i <= x + surroundSize; i++) {
      for (var j = y - surroundSize; j <= y + surroundSize; j++) {
        if (i === x && j === y) {
          continue;
        }
        if (this._isWall(i,j)) {
          wallCount++;
        }
      }
    }

    return wallCount;
  }

  // public methods
  getTile(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return null;
    }

    return this._tiles[x][y];
  }

  getRandomEmptyTile() {
    var tile;
    do {
      var x = Math.floor((Math.random() * this.width));
      var y = Math.floor((Math.random() * this.height));
      tile = this.getTile(x,y);
    }
    while(tile.entity !== null || tile.type !== Tile.TYPE.open);

    return tile;
  }

  toString() {
    var map_s = '';
    for (var j = 0; j < this.height; j++) {
      for (var i = 0; i < this.width; i++) {
        var type = this._tiles[i][j].type;
        var entity = this._tiles[i][j].entity;
        if (type === Tile.TYPE.wall) {
          map_s += '#';
        }
        if (type === Tile.TYPE.open) {
          if (entity) {
            if (entity.type === Entity.TYPE.player) {
              map_s += '@';
            }
            else if (entity.type === Entity.TYPE.enemy) {
              map_s += '?';
            }
            else if (entity.type === Entity.TYPE.boss) {
              map_s += '!';
            }
            else if (entity.type === Entity.TYPE.weapon) {
              map_s += '$';
            }
            else if (entity.type === Entity.TYPE.potion) {
              map_s += '*';
            }
            else {
              map_s += 'x';
            }
          }
          else {
            map_s += '.';
          }
        }
      }
      map_s += '\n';
    }

    return map_s;
  }
}

export default Map;
