import Map from '../map/map';
import Player from '../entities/player';
import Enemy from '../entities/enemy';
import PathFinder from '../entities/pathfinder';
import Weapon from '../entities/weapon';

const DEFAULT_MAP_WIDTH = 30;
const DEFAULT_MAP_HEIGHT = 30;

const NUM_ENEMIES = 10;
const NUM_POTIONS = 5;

class World {
  constructor() {
    this._map = new Map(DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT);
    this._player = new Player(this);

    this._pathfinder = new PathFinder(this);

    this._enemy = new Enemy(this, 1);

    this._weapon = new Weapon(this, 'Claw of Death', 30);
  }

  // getters
  get map() {
    return this._map;
  }

  get player() {
    return this._player;
  }

  get pathfinder() {
    return this._pathfinder;
  }

  // public methods

  movePlayer(dx, dy) {
    this._player.move(dx, dy);
  }

  // private methods

  _init() {

  }
}

export default World;

/*
var player;
var boss;
var enemies = [];
var potions = [];

var weapons = [
  { name: 'Rotten Celery Stalk', damage: 1 },
  { name: 'Eye of the Beholder', damage: 50 },
  { name: 'Franklin\'s Rod of Lightning', damage: 100 },
  { name: 'Pokin\' Stick', damage: 10 },
  { name: 'Bigger Stick', damage: 20 },
  { name: 'Golden Orb of Silcene', damage: 30 },
  { name: 'Stinky Garbage Bucket', damage: 5 },
  { name: ';SELECT * FROM USERS WHERE ADMIN=1', damage: 75 }
  ];


function init() {
  createEnemies();
  createBoss();
  createWeapons();
}

function createEnemies() {
  for (var i = 0; i < NUM_ENEMIES; i++) {
    var cell = getRandomEmptyCell();

    var enemy = new Entity(cell.x, cell.y, ENTITY_TYPE.enemy);
    cell.entity = enemy;
    enemies.push(enemy);
  }
}

function createBoss() {
  var cell = getRandomEmptyCell();

  var b = new Entity(cell.x, cell.y, ENTITY_TYPE.boss);
  cell.entity = b;

  boss = b;
}

function createWeapons() {
  for (var i = 0; i < weapons.length; i++) {
    var cell = getRandomEmptyCell();

    var weapon = new Entity(cell.x, cell.y, ENTITY_TYPE.weapon);
    cell.entity = weapon;
  }
}*/
