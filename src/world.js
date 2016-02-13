import Map from './map';

const DEFAULT_MAP_WIDTH = 800;
const DEFAULT_MAP_HEIGHT = 800;

const NUM_ENEMIES = 10;
const NUM_POTIONS = 5;

class World {
  constructor() {
    this._map = new Map(DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT);
  }

  // getters
  get map() {
    return this._map;
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
