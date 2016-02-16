class Camera {
  constructor(followEntity) {
    this._entity = followEntity;
  }

  // getters and setters
  get x() {
    return this._entity.x;
  }

  get y() {
    return this._entity.y;
  }
}

export default Camera;
