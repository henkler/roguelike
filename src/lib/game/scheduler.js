class Scheduler {
  constructor(game) {
    this._game = game;
  }

  tick() {
    this._game._enemy.move();
  }
}

export default Scheduler;
