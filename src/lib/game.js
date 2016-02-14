import World from './world';

class Game {
  constructor() {
    this.world = new World();

    this.width = window.innerWidth;
    this.height = window.innerHeight;

  }
}

export default Game;
