import MovingEntity from './movingEntity';
import Entity from './entity';

const DEFAULT_ENEMY_RANGE = 4;
const ENEMY_BASE_HEALTH = 10;
const ENEMY_BASE_XP = 20;

class Enemy extends MovingEntity {
  constructor(game, name, level) {
    const emptyTile = game.map.getRandomEmptyTile();
    super(game,
      name,
      Entity.TYPE.enemy,
      emptyTile,
      DEFAULT_ENEMY_RANGE,
      level);

    this.xp = ENEMY_BASE_XP * this.level;
    this.health = ENEMY_BASE_HEALTH * this.level;
  }

  move() {
    if (this.isDead) {
      return;
    }

    // only move towards the player if in the enemy's range
    if (this._game.player.tile.distanceTo(this.startTile) <= this.range) {
      this._game.pathfinder.findPathToPlayer(this, this._pathFinderCallback.bind(this));
    } else {
      this._moveRandomlyInRange();
    }
  }

  die() {
    this.tile.entity = null;
    console.log(`${this.name} is dead`);
  }

  _interactWithEntity(entity) {
    if (entity.isPlayer) {
      const damage = this.attackDamage;
      this.attack(entity, damage);
    }
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

        if (tile.isOpen && tile.distanceTo(this.startTile) <= this.range) {
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

const ENEMY_LIST = [
  {
    name: 'Feral Ghoul',
    level: 3,
  },
  {
    name: 'Mireluk',
    level: 2,
  },
  {
    name: 'Super Mutant',
    level: 5,
  },
  {
    name: 'Guard dog',
    level: 2,
  },
  {
    name: 'Mole rat',
    level: 1,
  },
  {
    name: 'Deathclaw',
    level: 6,
  },
  {
    name: 'Raider',
    level: 2,
  },
  {
    name: 'Glowing One',
    level: 3,
  },
  {
    name: 'Radroach',
    level: 1,
  },
  {
    name: 'Yao guai',
    level: 2,
  },
];

Enemy.createRandom = function createRandom(game) {
  const randomEnemyStats = ENEMY_LIST[Math.floor(Math.random() * ENEMY_LIST.length)];
  return new Enemy(game, randomEnemyStats.name, randomEnemyStats.level);
};

export default Enemy;
