
class Scheduler {
  constructor(world) {
    this._world = world;
  }

  tick() {
    this._world._enemy.move();
  }
}

export default Scheduler;
