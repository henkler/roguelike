class Scheduler {
  constructor(game) {
    this._game = game;
  }

  tick() {
    this._game._enemyList.forEach((enemy) => enemy.move());
  }
}

export default Scheduler;
