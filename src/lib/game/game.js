import Map from '../map/map';
import MessageLogger from './messageLogger';
import Player from '../entities/player';
import Boss from '../entities/boss';
import Enemy from '../entities/enemy';
import Weapon from '../entities/weapon';
import Potion from '../entities/potion';
import PathFinder from '../entities/pathfinder';

const DEFAULT_MAP_WIDTH = 150;
const DEFAULT_MAP_HEIGHT = 150;

const NUM_ENEMIES = 50;
const NUM_WEAPONS = 20;
const NUM_POTIONS = 20;

class Game {
  constructor() {
    this._map = null;
    this._logger = null;
    this._player = null;
    this._boss = null;
    this._pathfinder = null;
    this._enemyList = null;
    this._weaponList = null;
    this._potionList = null;

    this._init();
  }

  // getters
  get map() {
    return this._map;
  }

  get logger() {
    return this._logger;
  }

  get player() {
    return this._player;
  }

  get pathfinder() {
    return this._pathfinder;
  }

  // public methods
  storeMessage(text) {
    this._logger.storeMessage(text);
  }

  movePlayer(dx, dy) {
    this._player.move(dx, dy);
  }

  // private methods
  _init() {
    this._map = new Map(this, DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT);
    this._logger = new MessageLogger(this);
    this._player = new Player(this);
    this._boss = new Boss(this);
    this._pathfinder = new PathFinder(this);
    this._enemyList = [];
    this._weaponList = [];
    this._potionList = [];

    this._generateWeapons();
    this._generatePotions();
    this._generateEnemies();

    this._introMessage();

    this.storeMessage(`${this._player.name} awakens in a strange place, naked and afraid.\n`);
  }

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

  _introMessage() {
    let message =
` ______    _______  _______  __   __  _______  ___      ___   ___   _  _______
|    _ |  |       ||       ||  | |  ||       ||   |    |   | |   | | ||       |
|   | ||  |   _   ||    ___||  | |  ||    ___||   |    |   | |   |_| ||    ___|
|   |_||_ |  | |  ||   | __ |  |_|  ||   |___ |   |    |   | |      _||   |___
|    __  ||  |_|  ||   ||  ||       ||    ___||   |___ |   | |     |_ |    ___|
|   |  | ||       ||   |_| ||       ||   |___ |       ||   | |    _  ||   |___
|___|  |_||_______||_______||_______||_______||_______||___| |___| |_||_______|`;

    message += '\n';
    message += '<<explore, collect weapons, collect potions, avoid/kill enemies, level up, kill the boss>>\n';

    this.storeMessage(message);
  }
}

export default Game;
