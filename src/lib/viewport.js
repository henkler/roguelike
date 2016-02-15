class Viewport {
  constructor(game) {
    this._game = game;
    this._camera = game.camera;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.xMin = null;
    this.xMax = null;
    this.yMin = null;
    this.yMax = null;

    console.log(this.width);

    this.update();
  }

  update() {
    var vp = [];

    var viewWidth = this.width;
    var viewHeight = this.height;

    this.xMin = Math.max(0, this._camera.x - Math.floor(viewWidth / 2));
    this.xMax = Math.min(viewWidth, this._game.world.map.width, this._camera.x + Math.floor(viewWidth / 2));

    this.yMin = Math.max(0, this._camera.y - Math.floor(viewHeight / 2));
    this.yMax = Math.min(viewHeight, this._game.world.map.height, this._camera.y + Math.floor(viewHeight / 2));
  }
}

export default Viewport;
