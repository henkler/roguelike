const TILE_WIDTH = 35;
const TILE_HEIGHT = 35;

class Viewport {
  constructor(game) {
    this._game = game;
    this._camera = game.camera;
    this.mapWidth = this._game.world.map.width;
    this.mapHeight = this._game.world.map.height;
    this.width = null;
    this.height = null;

    this.xMin = null;
    this.xMax = null;
    this.yMin = null;
    this.yMax = null;

    this.width = Math.floor(window.innerWidth / TILE_WIDTH);
    this.height = Math.floor(window.innerHeight / TILE_HEIGHT);

    this.update();
  }

  setWidth(width) {
    this.width = Math.floor(width / TILE_WIDTH);
    this.height = Math.floor((window.innerHeight - 20) / TILE_HEIGHT);

    this.update();
  }

  update() {
    // try to center the viewport around the camera if possible
    this.xMin = this._camera.x - Math.floor(this.width / 2);
    this.xMax = this._camera.x + Math.floor(this.width / 2);

    if (this.xMin <= 0) {
      this.xMin = 0;
      this.xMax = Math.min(this.mapWidth - 1, this.width - 1);
    } else if (this.xMax >= (this.mapWidth - 1)) {
      this.xMax = this.mapWidth - 1;
      this.xMin = Math.max(0, this.mapWidth - this.width);
    }

    this.yMin = this._camera.y - Math.floor(this.height / 2);
    this.yMax = this._camera.y + Math.floor(this.height / 2);

    if (this.yMin <= 0) {
      this.yMin = 0;
      this.yMax = Math.min(this.mapHeight - 1, this.height - 1);
    } else if (this.yMax >= (this.mapHeight - 1)) {
      this.yMax = this.mapHeight - 1;
      this.yMin = Math.max(0, this.mapHeight - this.height);
    }
  }
}

export default Viewport;
