import Camera from './ui/camera';
import Viewport from './ui/viewport';
import Scheduler from './game/scheduler';
import MessageLogger from './game/messageLogger';
import Map from './map/map';
import Player from './entities/player';
import Enemy from './entities/enemy';
import Boss from './entities/boss';
import Weapon from './entities/weapon';
import Potion from './entities/potion';
import PathFinder from './entities/pathfinder';

const DEFAULT_MAP_WIDTH = 150;
const DEFAULT_MAP_HEIGHT = 150;

const NUM_ENEMIES = 50;
const NUM_WEAPONS = 20;
const NUM_POTIONS = 30;

class Game {
  constructor() {
    this._camera = null;
    this._viewport = null;
    this._scheduler = null;
    this._logger = null;
    this._map = null;
    this._player = null;
    this._boss = null;
    this._pathfinder = null;
    this._enemyList = null;
    this._weaponList = null;
    this._potionList = null;

    this._status = Game.STATUS.loading;

    this._init();
  }

  // getters
  get logger() {
    return this._logger;
  }

  get camera() {
    return this._camera;
  }

  get viewport() {
    return this._viewport;
  }

  get scheduler() {
    return this._scheduler;
  }

  get map() {
    return this._map;
  }

  get player() {
    return this._player;
  }

  get pathfinder() {
    return this._pathfinder;
  }

  get status() {
    return this._status;
  }

  // public methods
  storeMessage(text) {
    this._logger.storeMessage(text);
  }

  movePlayer(dx, dy) {
    this._player.move(dx, dy);
  }

  playerDie() {
    this._status = Game.STATUS.lose;
    this._cleanup();
  }

  playerWin() {
    this._status = Game.STATUS.win;
    this._cleanup();
  }

  // private methods
  _init() {
    this._scheduler = new Scheduler(this);
    this._map = new Map(this, DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT);
    this._player = new Player(this);
    this._camera = new Camera(this._player);
    this._viewport = new Viewport(this, this._map, this._camera);
    this._logger = new MessageLogger(this);
    this._boss = new Boss(this);
    this._pathfinder = new PathFinder(this);
    this._enemyList = [];
    this._weaponList = [];
    this._potionList = [];

    this._generateWeapons();
    this._generatePotions();
    this._generateEnemies();

    this._status = Game.STATUS.playing;
    this._introMessage();

    this.storeMessage(`${this._player.name} awakens in a strange place, naked and afraid.\n`);
  }

  _cleanup() {
    this._boss = null;
    this._enemyList = [];
    this._weaponList = [];
    this._potionList = [];
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

Game.STATUS = {
  loading: 0,
  playing: 1,
  win: 2,
  lose: 3,
};

export default Game;
