import Tile, { TileType } from './tile';
import { EntityType } from '../entities/entity';

const GENERATOR_WALL_PERCENTAGE = 40;
const GENERATOR_ITERATIONS = 4;
const GENERATOR_SMOOTHING_ITERATIONS = 3;

class Map {
  constructor(game, width, height) {
    this._game = game;
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
    const tiles = new Array(this.width);

    for (let i = 0; i < this.width; i++) {
      tiles[i] = new Array(this.height);
      for (let j = 0; j < this.height; j++) {
        // randomly determine if tile is blocked or not
        let isWall = Math.floor((Math.random() * 100) + 1) < GENERATOR_WALL_PERCENTAGE;

        // map border is always a wall
        if (this._isBorder(i, j)) {
          isWall = true;
        }

        tiles[i][j] = new Tile(i, j, isWall ? TileType.wall : TileType.open);
      }
    }

    this._tiles = tiles;
  }

  _permuteMapIteration(r1Threshold, r2Threshold) {
    const nextPermutation = new Array(this.width);

    for (let i = 0; i < this.width; i++) {
      nextPermutation[i] = new Array(this.height);
      for (let j = 0; j < this._height; j++) {
        // get the number of wall tiles surrounding this tile for a radius of 1 and 2 squares
        const r1 = this._numWallsSurroundingTile(i, j, 1);
        const r2 = this._numWallsSurroundingTile(i, j, 2);

        let tileType;

        // if the walls surrounding the tile is bigger than the radius of 1 threshold, make a wall
        if (r1 >= r1Threshold) {
          tileType = TileType.wall;
        } else if (r2Threshold && r2 <= r2Threshold) {
          // if the walls surrounding the tile is less than the radius of 2 threshold, make a wall
          tileType = TileType.wall;
        } else {
          tileType = TileType.open;
        }

        nextPermutation[i][j] = tileType;
      }
    }

    // copy the new tile types into the map
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this._tiles[x][y].type = nextPermutation[x][y];
      }
    }
  }

  _permuteMap() {
    for (let i = 0; i < GENERATOR_ITERATIONS; i++) {
      this._permuteMapIteration(5, 2);
    }

    for (let j = 0; j < GENERATOR_SMOOTHING_ITERATIONS; j++) {
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
    }

    return this._tiles[x][y].isWall;
  }

  _numWallsSurroundingTile(x, y, surroundSize) {
    let wallCount = 0;

    for (let i = x - surroundSize; i <= x + surroundSize; i++) {
      for (let j = y - surroundSize; j <= y + surroundSize; j++) {
        if (i === x && j === y) {
          continue;
        }
        if (this._isWall(i, j)) {
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
    let tile = null;
    let numIterations = 0;
    do {
      const x = Math.floor((Math.random() * this.width));
      const y = Math.floor((Math.random() * this.height));
      const newTile = this.getTile(x, y);
      if (newTile.isOpen && !newTile.hasEntity) {
        // if the tile is open and there is no player
        if (!this._game.player) {
          tile = newTile;
        } else {
          // if the tile is not in the player's range, we'll use it
          if (!this._game.player.isTileInRange(newTile)) {
            tile = newTile;
          }
        }
      }
      numIterations++;
    }
    while (!tile && numIterations < 20);

    return tile;
  }

  toString() {
    let mapString = '';
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        const type = this._tiles[i][j].type;
        const entity = this._tiles[i][j].entity;
        if (type === TileType.wall) {
          mapString += '#';
        }
        if (type === TileType.open) {
          if (entity) {
            if (entity.type === EntityType.player) {
              mapString += '@';
            } else if (entity.type === EntityType.enemy) {
              mapString += '?';
            } else if (entity.type === EntityType.boss) {
              mapString += '!';
            } else if (entity.type === EntityType.weapon) {
              mapString += '$';
            } else if (entity.type === EntityType.potion) {
              mapString += '*';
            } else {
              mapString += 'x';
            }
          } else {
            mapString += '.';
          }
        }
      }
      mapString += '\n';
    }

    return mapString;
  }
}

export default Map;
