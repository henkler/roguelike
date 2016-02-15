import World from './world';
import Camera from './camera';
import Viewport from './viewport';

class Game {
  constructor() {
    this.world = new World();
    this.camera = new Camera(this, 0, 0);
    this.viewport = new Viewport(this);
  }
}

export default Game;
