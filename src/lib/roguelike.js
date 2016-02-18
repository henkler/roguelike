import Game from './game/game';
import Camera from './ui/camera';
import Viewport from './ui/viewport';
import Scheduler from './game/scheduler';

class RogueLike {
  constructor() {
    this._game = new Game();
    this._camera = new Camera(this._game.player);
    this._viewport = new Viewport(this._game, this._camera);
    this._scheduler = new Scheduler(this._game);
  }

  // getters
  get game() {
    return this._game;
  }

  get player() {
    return this._game.player;
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
}

export default RogueLike;
