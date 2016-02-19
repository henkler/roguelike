class Scheduler {
  constructor(game) {
    this._game = game;
  }

  tick() {
    // nothing happens if the game isn't playing
    if (!this._game.isPlaying) {
      return;
    }

    this._game._enemyList.forEach((enemy) => enemy.move());
  }
}

export default Scheduler;
