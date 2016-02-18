import Map from '../map/map';
import Player from '../entities/player';
import Boss from '../entities/boss';
import Enemy from '../entities/enemy';
import Weapon from '../entities/weapon';
import Potion from '../entities/potion';
import PathFinder from '../entities/pathfinder';

const DEFAULT_MAP_WIDTH = 30;
const DEFAULT_MAP_HEIGHT = 30;

const NUM_ENEMIES = 10;
const NUM_WEAPONS = 10;
const NUM_POTIONS = 10;

class Game {
  constructor() {
    this._map = new Map(this, DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT);
    this._player = new Player(this);
    this._boss = new Boss(this);
    this._pathfinder = new PathFinder(this);
    this._enemyList = [];
    this._weaponList = [];
    this._potionList = [];

    this._generateWeapons();
    this._generatePotions();
    this._generateEnemies();
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
  _generateEnemies() {
    for (let i = 0; i < NUM_ENEMIES; i++) {
      this._enemyList.push(Enemy.createRandom(this));
    }
  }

  _generatePotions() {
    for (let i = 0; i < NUM_POTIONS; i++) {
      this._potionList.push(Potion.createRandom(this));
    }
  }

  _generateWeapons() {
    for (let i = 0; i < NUM_WEAPONS; i++) {
      this._weaponList.push(Weapon.createRandom(this));
    }
  }
}

export default Game;

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
